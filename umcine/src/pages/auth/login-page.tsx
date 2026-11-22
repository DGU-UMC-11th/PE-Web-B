import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useLoginMutation } from "../../hooks/use-login-mutation.ts";
import { EMAIL_REGEX } from "../../utils/auth/validation.ts";
import { cn } from "../../utils/cn.ts";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type LoginFormKey = keyof typeof DEFAULT_FORM;

const fieldBox =
  "flex h-12 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600";
const fieldBoxError = "border-rose-500 focus-within:border-rose-500";
const fieldInput =
  "h-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:text-gray-400";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const [form, setForm] = useState(DEFAULT_FORM);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  // 입력을 시작했는데 형식이 틀린 경우에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = isEmailValid && form.password.length > 0;

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate(
      {
        email: form.email.trim(),
        password: form.password,
      },
      {
        onSuccess: () => navigate({ to: "/" }),
      },
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-64px-80px)] w-full items-center justify-center px-5 pt-[60px] pb-20">
      <div className="flex w-full max-w-[440px] flex-col">
        <h1 className="mb-8 text-center text-[28px] font-extrabold text-gray-900">로그인</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="login-email">
              이메일
            </label>
            <div className={cn(fieldBox, showEmailError && fieldBoxError)}>
              <img src="/movie-icons/mail.svg" alt="" className="size-[18px] opacity-50" />
              <input
                id="login-email"
                type="email"
                className={fieldInput}
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleChangeField("email", e.target.value)}
                disabled={loginMutation.isPending}
                aria-invalid={showEmailError}
              />
            </div>
            {showEmailError && (
              <p className="mt-0.5 text-xs leading-[1.4] text-rose-500">올바른 이메일 형식을 입력해 주세요.</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="login-password">
              비밀번호
            </label>
            <div className={fieldBox}>
              <img src="/movie-icons/lock.svg" alt="" className="size-[18px] opacity-50" />
              <input
                id="login-password"
                type="password"
                className={fieldInput}
                placeholder="비밀번호"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => handleChangeField("password", e.target.value)}
                disabled={loginMutation.isPending}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 h-12 w-full rounded-lg bg-blue-600 text-[15px] font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={!canSubmit || loginMutation.isPending}
          >
            {loginMutation.isPending ? "로그인 중" : "로그인"}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-gray-500">
          처음이신가요?{" "}
          <Link to="/signup" className="font-semibold text-blue-600 underline underline-offset-[3px]">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
