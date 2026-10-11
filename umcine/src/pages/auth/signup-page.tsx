import { useState } from "react";

interface SignupPageProps {
  onNavigateLogin: () => void;
  onSignupSuccess?: () => void;
}

export default function SignupPage({
  onNavigateLogin,
  onSignupSuccess,
}: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignupSuccess) {
      onSignupSuccess();
    } else {
      onNavigateLogin();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px-80px)] w-full items-center justify-center px-5 pt-[60px] pb-20">
      <div className="flex w-full max-w-[440px] flex-col">
        <h1 className="mb-8 text-center text-[28px] font-extrabold text-gray-900">회원가입</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="email">
              이메일
            </label>
            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600">
              <input
                id="email"
                type="email"
                className="h-full flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className="py-1 text-[13px] font-semibold whitespace-nowrap text-blue-600 transition-colors hover:text-blue-700"
                onClick={() => alert("사용 가능한 이메일입니다.")}
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="nickname">
              닉네임
            </label>
            <div className="flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600">
              <input
                id="nickname"
                type="text"
                className="h-full flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="2~12자"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <button
                type="button"
                className="py-1 text-[13px] font-semibold whitespace-nowrap text-blue-600 transition-colors hover:text-blue-700"
                onClick={() => alert("사용 가능한 닉네임입니다.")}
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-blue-600 placeholder:text-gray-400"
              placeholder="8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mt-0.5 text-xs leading-[1.4] text-gray-400">
              영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="confirm-password">
              비밀번호 확인
            </label>
            <input
              id="confirm-password"
              type="password"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-colors focus:border-blue-600 placeholder:text-gray-400"
              placeholder="다시 입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="mt-3 h-12 w-full rounded-lg bg-blue-600 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
            가입하기
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-gray-500">
          이미 계정이 있나요?{" "}
          <button
            type="button"
            className="font-semibold text-blue-600 underline underline-offset-[3px]"
            onClick={onNavigateLogin}
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
