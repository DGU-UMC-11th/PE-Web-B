import { useState } from "react";

interface ProfileEditPageProps {
  currentNickname: string;
  currentEmail: string;
  onSave: (newNickname: string) => void;
  onWithdraw: () => void;
}

export default function ProfileEditPage({
  currentNickname,
  currentEmail,
  onSave,
  onWithdraw,
}: ProfileEditPageProps) {
  const [nickname, setNickname] = useState(currentNickname);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(nickname);
  };

  const handleWithdrawClick = () => {
    if (
      window.confirm(
        "정말로 탈퇴하시겠습니까? 작성한 평점, 후기와 즐겨찾기가 모두 삭제됩니다."
      )
    ) {
      onWithdraw();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px-80px)] w-full">
      <div className="mx-auto flex max-w-[1360px] flex-col px-10 pt-10 pb-20">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-[26px] font-extrabold tracking-[-0.5px] text-gray-900">내 정보 수정</h1>
            <p className="mt-1 text-sm text-gray-500">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>
          <button
            type="button"
            className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            onClick={handleSave}
          >
            변경사항 저장
          </button>
        </div>

        <div className="mb-[60px] grid grid-cols-1 gap-8 min-[769px]:grid-cols-[280px_1fr] min-[769px]:gap-[60px]">
          {/* 아바타 영역 */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3 size-[100px]">
              <div className="flex size-full items-center justify-center rounded-full bg-gray-200">
                <img
                  src="/movie-icons/person.svg"
                  alt="Profile Avatar"
                  className="size-12 opacity-60"
                />
              </div>
              <button
                type="button"
                className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] transition-colors hover:bg-gray-100"
                aria-label="프로필 이미지 변경"
              >
                <img
                  src="/movie-icons/edit.svg"
                  alt=""
                  className="size-4"
                />
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900">프로필 이미지</p>
            <p className="mt-0.5 text-xs text-gray-400">선택 사항 · 최대 5MB</p>
          </div>

          {/* 입력 폼 영역 */}
          <div className="flex max-w-[600px] flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-900" htmlFor="nickname">
                닉네임
              </label>
              <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600">
                <input
                  id="nickname"
                  type="text"
                  className="h-full flex-1 bg-transparent text-sm text-gray-900 outline-none"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button
                  type="button"
                  className="text-[13px] font-semibold whitespace-nowrap text-blue-600 hover:text-blue-700"
                  onClick={() => alert("사용 가능한 닉네임입니다.")}
                >
                  중복 확인
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-gray-900" htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className="h-12 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
                value={currentEmail}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 영역 */}
        <div className="mt-10 flex items-center justify-between rounded-[10px] border border-rose-200 bg-rose-50 px-6 py-5">
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
      </div>
    </div>
  );
}
