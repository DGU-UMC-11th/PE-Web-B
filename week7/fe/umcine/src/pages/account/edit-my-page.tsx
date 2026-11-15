import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function EditMyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(
    () => localStorage.getItem("umcine-profile-nickname") || "gs0428",
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSave = () => {
    localStorage.setItem("umcine-profile-nickname", nickname);
    void navigate({ to: "/mypage" });
  };

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-20 pb-7 pt-7 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[30px] font-bold tracking-[-0.8px]">내 정보 수정</h1>
          <p className="mt-2 text-sm text-[#667085]">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
        </div>
        <button onClick={handleSave} type="button" className="shrink-0 rounded-md bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white">
          변경사항 저장
        </button>
      </div>
      <div className="mt-10 grid grid-cols-[minmax(170px,1fr)_2fr] items-start gap-10 max-[760px]:grid-cols-1">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="profile-image" className="relative grid size-20 cursor-pointer place-items-center overflow-hidden rounded-full bg-[#e5e7eb]">
            {profileImage ? (
              <img src={profileImage} alt="선택한 프로필 이미지" className="h-full w-full object-cover" />
            ) : (
              <img src="/icons/person.svg" alt="" className="size-12" />
            )}
            <img src="/icons/edit.svg" alt="" className="absolute bottom-0 right-0 size-5 rounded-full bg-white p-0.5" />
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 5 * 1024 * 1024) {
                alert("5MB 이하 이미지만 선택할 수 있어요.");
                return;
              }
              if (profileImage) URL.revokeObjectURL(profileImage);
              setProfileImage(URL.createObjectURL(file));
            }}
          />
          <label htmlFor="profile-image" className="cursor-pointer text-sm font-semibold">프로필 이미지</label>
          <p className="text-xs text-[#98a2b3]">선택 사항 · 최대 5MB</p>
        </div>
        <div className="space-y-5">
          <div>
            <label htmlFor="edit-nickname" className="mb-2 block text-sm font-semibold">닉네임</label>
            <div className="relative">
              <input
                id="edit-nickname"
                type="text"
                className="h-12 w-full rounded-lg border border-[#e0e4eb] bg-white px-4 pr-24 text-sm"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#2563eb]">
                중복 확인
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="edit-email" className="mb-2 block text-sm font-semibold">이메일</label>
            <input id="edit-email" type="email" className="h-12 w-full rounded-lg border border-[#e0e4eb] bg-white px-4 text-sm" value="gwangsoo@cinemalab.kr" readOnly />
          </div>
        </div>
      </div>
      <section className="mt-auto pt-20">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-[#f87171] bg-[#fef2f2] p-5">
          <div>
            <h2 className="text-sm font-semibold text-[#dc2626]">회원 탈퇴</h2>
            <p className="mt-1 text-xs text-[#dc2626]">탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.</p>
          </div>
          <button type="button" className="shrink-0 rounded-md border border-[#ef4444] bg-white px-4 py-2 text-xs font-semibold text-[#dc2626]">회원 탈퇴</button>
        </div>
      </section>
    </main>
  );
}
