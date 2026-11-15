import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AuthCard } from "../../components/auth/auth-card";
import { TextField } from "../../components/auth/text-field";
import { EMAIL_REGEX } from "../../utils/auth/validation";

const DEFAULT_FORM = { email: "", password: "" };

type LoginFormKey = keyof typeof DEFAULT_FORM;

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  // 로그인에서는 비밀번호 규칙까지 검사 안 하고 입력 여부만 확인 (서버와 동일)
  const isPasswordFilled = form.password.length > 0;
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = isEmailValid && isPasswordFilled;

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // 이번 주는 퍼블리싱까지. POST /auth/login 연결은 8주차에서 진행
    setSubmittedEmail(form.email.trim());
  };

  return (
    <AuthCard title="로그인" description="로그인하고 내 평점과 정보를 관리해 보세요.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          id="login-email"
          label="이메일"
          type="email"
          icon="/icons/mail.svg"
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          value={form.email}
          onChange={(e) => handleChangeField("email", e.target.value)}
          errorMessage={showEmailError ? "올바른 이메일 형식이 아니에요." : undefined}
        />

        <TextField
          id="login-password"
          label="비밀번호"
          type="password"
          icon="/icons/lock.svg"
          placeholder="비밀번호를 입력해 주세요."
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
        />

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 h-12 rounded-lg bg-blue-600 text-[15px] font-semibold text-white disabled:bg-gray-300"
        >
          로그인
        </button>

        {submittedEmail && (
          <p className="m-0 rounded-lg bg-[#f6f7f9] px-4 py-3 text-sm text-gray-600" role="status">
            <strong className="text-[#191b1f]">{submittedEmail}</strong> 계정으로 로그인을
            요청했어요.
          </p>
        )}

        <p className="m-0 text-center text-sm text-gray-500">
          아직 회원이 아닌가요?{" "}
          <Link to="/signup" className="font-semibold text-blue-600 no-underline hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
