import { useState } from "react";

// 로그인 API 연결 전까지 사용하는 임시 사용자 정보
const SAMPLE_USER = { nickname: "gs0428", email: "gwangsoo@cinemalab.kr" };

export function MyPageEdit() {
  const [nickname, setNickname] = useState(SAMPLE_USER.nickname);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 정보 수정 API 연결은 이후 단계에서 추가
  };

  const labelClass = "mb-1.5 block text-[13px] font-bold text-[#17191e]";
  const inputClass =
    "h-12 w-full rounded-lg border border-[#e3e6eb] bg-white px-3.5 text-sm text-[#17191e] outline-none focus:border-[#2563eb] read-only:text-[#606774]";

  return (
    <main className="flex min-h-[calc(100vh-92px)] flex-col px-20 py-6">
      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[#17191e]">내 정보 수정</h1>
            <p className="mt-1 text-xs text-[#606774]">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>
          <button
            type="submit"
            className="h-[42px] rounded-lg bg-[#2563eb] px-4 text-sm font-extrabold text-white"
          >
            변경사항 저장
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center gap-1 pt-4">
            <div className="relative">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#e3e6eb]">
                <img src="/icons/person.svg" alt="" className="size-8" />
              </div>
              <button
                type="button"
                aria-label="프로필 이미지 변경"
                className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border border-[#17191e] bg-white"
              >
                <img src="/icons/edit.svg" alt="" className="size-3.5" />
              </button>
            </div>
            <span className="mt-1 text-xs font-bold text-[#17191e]">
              프로필 이미지
            </span>
            <span className="text-[11px] text-[#969da8]">
              선택 사항 · 최대 5MB
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="nickname" className={labelClass}>
                닉네임
              </label>
              <div className="relative">
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className={`${inputClass} pr-20`}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-bold text-[#2563eb]"
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={SAMPLE_USER.email}
                readOnly
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <section className="mt-auto flex items-center justify-between rounded-lg border border-red-500 bg-red-50 px-4 py-3">
          <div>
            <h2 className="text-xs font-bold text-red-600">회원 탈퇴</h2>
            <p className="mt-0.5 text-[11px] text-red-600">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
              없습니다.
            </p>
          </div>
          <button
            type="button"
            className="h-9 rounded-lg border border-red-500 bg-white px-4 text-xs font-bold text-red-600"
          >
            회원 탈퇴
          </button>
        </section>
      </form>
    </main>
  );
}
