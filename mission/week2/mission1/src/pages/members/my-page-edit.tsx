import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import type { MemberInfo } from "../../api/members/me";
import { AuthLayout } from "../../components/auth/auth-layout";
import { FormField, SubmitButton } from "../../components/auth/form-field";
import { useMeQuery } from "../../hooks/use-me-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { isValidNickname } from "../../utils/auth/validation";

export function MyPageEdit() {
  const meQuery = useMeQuery();

  return (
    <AuthLayout title="내 정보 수정">
      {meQuery.isPending ? (
        <p className="text-sm text-ink-secondary">내 정보를 불러오는 중이에요.</p>
      ) : meQuery.isError ? (
        <p className="text-sm text-ink-secondary">내 정보를 불러오지 못했어요.</p>
      ) : (
        // 조회한 닉네임을 입력 초기값으로 쓰기 위해 데이터를 받은 뒤 폼을 그려요.
        <EditForm me={meQuery.data} />
      )}
    </AuthLayout>
  );
}

function EditForm({ me }: { me: MemberInfo }) {
  const navigate = useNavigate();
  const updateMeMutation = useUpdateMeMutation();
  const [nickname, setNickname] = useState(me.nickname);

  const trimmedNickname = nickname.trim();
  const isNicknameValid = isValidNickname(nickname);
  const showNicknameError = nickname.length > 0 && !isNicknameValid;
  const isChanged = trimmedNickname !== me.nickname;
  const canSubmit = isNicknameValid && isChanged;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    // 캐시 갱신(setQueryData)은 훅에서 하고, 화면 이동만 여기서 처리해요.
    updateMeMutation.mutate(
      { nickname: trimmedNickname },
      { onSuccess: () => navigate({ to: "/me" }) },
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <FormField
        id="edit-email"
        label="이메일"
        type="email"
        value={me.email}
        disabled
        hint="이메일은 변경할 수 없어요."
      />

      <FormField
        id="edit-nickname"
        label="닉네임"
        autoComplete="nickname"
        placeholder="2~12자"
        value={nickname}
        disabled={updateMeMutation.isPending}
        onChange={(e) => setNickname(e.target.value)}
        error={showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : undefined}
      />

      <div className="mt-2 flex flex-col gap-2.5">
        <SubmitButton disabled={!canSubmit || updateMeMutation.isPending}>
          {updateMeMutation.isPending ? "저장 중" : "저장하기"}
        </SubmitButton>
        <Link
          to="/me"
          className="flex h-[46px] items-center justify-center rounded-lg border border-line bg-surface text-[15px] font-extrabold text-ink-secondary hover:bg-page"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
