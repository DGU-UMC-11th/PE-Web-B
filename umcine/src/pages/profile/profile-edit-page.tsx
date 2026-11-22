import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate.ts";
import type { MemberInfo } from "../../api/members/me.ts";
import { useMeQuery } from "../../hooks/use-me-query.ts";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation.ts";
import { cn } from "../../utils/cn";

// 내 정보를 불러온 뒤에 폼을 그려요.
// 폼을 먼저 그리면 닉네임 입력의 초기값이 빈 문자열로 고정되기 때문이에요.
// 로그인 여부는 (member) 레이아웃에서 확인하므로 여기서는 토큰이 있다고 보고 그려요.
export default function ProfileEditPage() {
  const meQuery = useMeQuery();

  if (meQuery.isPending) return <ProfileEditMessage>내 정보를 불러오는 중이에요...</ProfileEditMessage>;
  if (meQuery.isError) return <ProfileEditMessage>내 정보를 불러오지 못했어요.</ProfileEditMessage>;

  return <ProfileEditForm me={meQuery.data} />;
}

function ProfileEditMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px-80px)] w-full max-w-[1360px] flex-col items-center gap-4 px-4 pt-20 text-sm text-gray-500">
      <p>{children}</p>
      <Link to="/me" className="font-semibold text-blue-600 underline underline-offset-[3px]">
        내 정보로 돌아가기
      </Link>
    </div>
  );
}

function ProfileEditForm({ me }: { me: MemberInfo }) {
  const navigate = useNavigate();
  const updateMeMutation = useUpdateMeMutation();

  const [form, setForm] = useState({ nickname: me.nickname });
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const nickname = form.nickname.trim();
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 12;
  const isChanged = nickname !== me.nickname;
  // 닉네임을 2~12자로 바꿨을 때만 저장할 수 있어요. 중복이면 서버가 409로 거절해요.
  const canSubmit = isNicknameValid && isChanged;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const isBusy = isChecking || updateMeMutation.isPending;

  const handleChangeNickname = (value: string) => {
    if (isBusy) return;
    setIsAvailable(false);
    setForm({ nickname: value });
  };

  // 저장 전에 미리 확인해 볼 수 있는 선택 기능이에요.
  const handleCheckDuplicate = async () => {
    if (!canSubmit || isBusy) return;

    setIsChecking(true);
    setIsAvailable(false);
    try {
      const response = await checkNicknameDuplicate(nickname);
      setIsAvailable(response.available);
      alert(response.available ? "사용할 수 있는 닉네임이에요." : "이미 사용 중인 닉네임이에요.");
    } catch {
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate(
      { nickname },
      {
        onSuccess: () => navigate({ to: "/me" }),
      },
    );
  };

  const handleWithdrawClick = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? 작성한 평점, 후기와 즐겨찾기가 모두 삭제됩니다.")) {
      // 회원 탈퇴 API 연동은 이후 주차에서 진행해요.
      alert("회원 탈퇴 기능은 아직 준비 중이에요.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-80px)] w-full">
      <form
        className="mx-auto flex max-w-[1360px] flex-col px-4 pt-10 pb-20 sm:px-6 lg:px-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-extrabold tracking-[-0.5px] text-gray-900">내 정보 수정</h1>
            <p className="mt-1 text-sm text-gray-500">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/me"
              className="flex h-10 items-center rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!canSubmit || updateMeMutation.isPending}
            >
              {updateMeMutation.isPending ? "저장 중" : "저장"}
            </button>
          </div>
        </div>

        <div className="mb-[60px] grid grid-cols-1 gap-8 min-[769px]:grid-cols-[280px_1fr] min-[769px]:gap-[60px]">
          {/* 아바타 영역 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3 size-[100px]">
              <div className="flex size-full items-center justify-center rounded-full bg-gray-200">
                <img src="/movie-icons/person.svg" alt="프로필 이미지" className="size-12 opacity-60" />
              </div>
              <button
                type="button"
                className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-colors hover:bg-gray-100"
                aria-label="프로필 이미지 변경"
              >
                <img src="/movie-icons/edit.svg" alt="" className="size-4" />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900">프로필 이미지</p>
            <p className="mt-0.5 text-xs text-gray-400">선택 사항 · 최대 5MB</p>
          </div>

          {/* 입력 폼 영역 */}
          <div className="flex max-w-[600px] flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-900" htmlFor="edit-nickname">
                닉네임
              </label>
              <div
                className={cn(
                  "flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600",
                  showNicknameError && "border-rose-500 focus-within:border-rose-500",
                )}
              >
                <input
                  id="edit-nickname"
                  type="text"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none disabled:text-gray-400"
                  value={form.nickname}
                  onChange={(e) => handleChangeNickname(e.target.value)}
                  disabled={isBusy}
                  aria-invalid={showNicknameError}
                />
                <button
                  type="button"
                  className="text-[13px] font-semibold whitespace-nowrap text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300"
                  disabled={!canSubmit || isBusy}
                  onClick={handleCheckDuplicate}
                >
                  {isChecking ? "확인 중" : "중복 확인"}
                </button>
              </div>
              {showNicknameError ? (
                <p className="mt-0.5 text-xs leading-[1.4] text-rose-500">닉네임은 2~12자로 입력해 주세요.</p>
              ) : isAvailable ? (
                <p className="mt-0.5 text-xs leading-[1.4] text-blue-600">사용할 수 있는 닉네임이에요.</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-900" htmlFor="edit-email">
                이메일
              </label>
              <input
                id="edit-email"
                type="email"
                className="h-12 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
                value={me.email}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 영역 */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[10px] border border-rose-200 bg-rose-50 px-6 py-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-bold text-rose-600">회원 탈퇴</h2>
            <p className="text-[13px] text-rose-500">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>
          <button
            type="button"
            className="h-9 rounded-md border border-rose-300 bg-white px-[18px] text-[13px] font-bold text-rose-600 transition-colors hover:border-rose-400 hover:bg-rose-100"
            onClick={handleWithdrawClick}
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </div>
  );
}
