import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-[408px]">
        <h1 className="mb-7 text-[32px] font-bold tracking-[-0.8px]">로그인</h1>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-semibold">이메일</label>
            <div className="relative">
              <img src="/icons/mail.svg" alt="" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 opacity-60" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="h-12 w-full rounded-lg border border-[#e0e4eb] bg-white pl-11 pr-4 text-sm placeholder:text-[#a0a7b2]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-semibold">비밀번호</label>
            <div className="relative">
              <img src="/icons/lock.svg" alt="" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 opacity-60" />
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                className="h-12 w-full rounded-lg border border-[#e0e4eb] bg-white pl-11 pr-4 text-sm placeholder:text-[#a0a7b2]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="h-12 w-full rounded-lg bg-[#2563eb] text-sm font-semibold text-white">
            로그인
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-[#98a2b3]">
          처음이신가요?{" "}
          <Link to="/signup" className="font-semibold text-[#2563eb]">회원가입</Link>
        </p>
      </div>
    </main>
  );
}
