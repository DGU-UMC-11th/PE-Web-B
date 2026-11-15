import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { AuthLayout } from "../../components/auth/auth-layout";
import { FormField, SubmitButton } from "../../components/auth/form-field";
import { useProfileStore } from "../../stores/profile-store";
import { isValidNickname } from "../../utils/auth/validation";

export function MyPageEdit() {
  const profile = useProfileStore((state) => state.profile);
  const updateNickname = useProfileStore((state) => state.updateNickname);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(profile.nickname);

  const trimmedNickname = nickname.trim();
  const isNicknameValid = isValidNickname(nickname);
  const showNicknameError = nickname.length > 0 && !isNicknameValid;
  const isChanged = trimmedNickname !== profile.nickname;
  const canSubmit = isNicknameValid && isChanged;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    // 내 정보 수정 API 연결은 8주차에 진행. 지금은 화면 상태에만 반영
    updateNickname(trimmedNickname);
    alert("내 정보가 수정됐어요.");
    navigate({ to: "/me" });
  };

  return (
    <AuthLayout title="내 정보 수정">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <FormField
          id="edit-email"
          label="이메일"
          type="email"
          value={profile.email}
          disabled
          hint="이메일은 변경할 수 없어요."
        />

        <FormField
          id="edit-nickname"
          label="닉네임"
          autoComplete="nickname"
          placeholder="2~12자"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          error={showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : undefined}
        />

        <div className="mt-2 flex flex-col gap-2.5">
          <SubmitButton disabled={!canSubmit}>저장하기</SubmitButton>
          <Link
            to="/me"
            className="flex h-[46px] items-center justify-center rounded-lg border border-line bg-surface text-[15px] font-extrabold text-ink-secondary hover:bg-page"
          >
            취소
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
