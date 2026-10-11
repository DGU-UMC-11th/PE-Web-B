import { useState } from "react";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateSignup: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onNavigateSignup,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="flex min-h-[calc(100vh-64px-80px)] w-full items-center justify-center px-5 pt-[60px] pb-20">
      <div className="flex w-full max-w-[440px] flex-col">
        <h1 className="mb-8 text-center text-[28px] font-extrabold text-gray-900">로그인</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="login-email">
              이메일
            </label>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600">
              <img
                src="/movie-icons/mail.svg"
                alt=""
                className="size-[18px] opacity-50"
              />
              <input
                id="login-email"
                type="email"
                className="h-full flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="login-password">
              비밀번호
            </label>
            <div className="flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600">
              <img
                src="/movie-icons/lock.svg"
                alt=""
                className="size-[18px] opacity-50"
              />
              <input
                id="login-password"
                type="password"
                className="h-full flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="mt-3 h-12 w-full rounded-lg bg-blue-600 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-gray-500">
          처음이신가요?{" "}
          <button
            type="button"
            className="font-semibold text-blue-600 underline underline-offset-[3px]"
            onClick={onNavigateSignup}
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}
