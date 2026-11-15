import { useState, type SubmitEvent } from "react";
import { TextField } from "../../components/auth/text-field";
import { isValidNickname } from "../../utils/auth/validation";

// GET /members/me 응답 모양에 맞춘 임시 데이터 (API 연결은 8주차)
const MOCK_MY_INFO = {
  email: "movie@umc.com",
  nickname: "영화광",
  createdAt: "2026-09-02T21:14:03",
};

function formatDate(value: string) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}

export function MyPage() {
  const [myInfo, setMyInfo] = useState(MOCK_MY_INFO);
  const [isEditing, setIsEditing] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(myInfo.nickname);

  const trimmedNickname = nicknameInput.trim();
  const isNicknameValid = isValidNickname(nicknameInput);
  const isChanged = trimmedNickname !== myInfo.nickname;
  const showNicknameError = nicknameInput.length > 0 && !isNicknameValid;
  const canSave = isNicknameValid && isChanged;

  const handleStartEdit = () => {
    setNicknameInput(myInfo.nickname);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setNicknameInput(myInfo.nickname);
    setIsEditing(false);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    // PATCH /members/me 대신 지금은 화면 상태만 바꿈
    setMyInfo((prev) => ({ ...prev, nickname: trimmedNickname }));
    setIsEditing(false);
  };

  return (
    <main className="flex w-full flex-1 items-start justify-center px-4 py-12 sm:py-20">
      <section className="w-full max-w-[560px] rounded-2xl border border-[#e0e4eb] bg-white px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="m-0 text-2xl font-bold tracking-[-0.8px]">내 정보</h1>
          {!isEditing && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e0e4eb] bg-white px-3 text-sm font-semibold text-[#191b1f]"
            >
              <img className="size-4" src="/icons/edit.svg" alt="" />
              수정
            </button>
          )}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-blue-50 text-2xl font-bold text-blue-600">
            {myInfo.nickname.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="m-0 truncate text-lg font-bold">{myInfo.nickname}</p>
            <p className="m-0 truncate text-sm text-gray-500">{myInfo.email}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            <TextField
              id="my-email"
              label="이메일"
              icon="/icons/mail.svg"
              value={myInfo.email}
              disabled
            />
            <TextField
              id="my-nickname"
              label="닉네임"
              icon="/icons/person.svg"
              placeholder="2~12자로 입력해 주세요."
              value={nicknameInput}
              autoFocus
              onChange={(e) => setNicknameInput(e.target.value)}
              errorMessage={
                showNicknameError ? "닉네임은 2자 이상 12자 이하로 입력해 주세요." : undefined
              }
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="h-11 flex-1 rounded-lg border border-[#e0e4eb] bg-white text-sm font-semibold text-gray-600"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!canSave}
                className="h-11 flex-1 rounded-lg bg-blue-600 text-sm font-semibold text-white disabled:bg-gray-300"
              >
                저장
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-8 mb-0 divide-y divide-[#eef0f3] border-y border-[#eef0f3]">
            {[
              ["이메일", myInfo.email],
              ["닉네임", myInfo.nickname],
              ["가입일", formatDate(myInfo.createdAt)],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="m-0 truncate text-sm font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </main>
  );
}
