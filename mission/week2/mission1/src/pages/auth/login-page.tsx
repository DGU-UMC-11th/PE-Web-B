import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { AuthLayout } from "../../components/auth/auth-layout";
import { FormField, SubmitButton } from "../../components/auth/form-field";
import { useLoginMutation } from "../../hooks/use-login-mutation";
import { isValidEmail } from "../../utils/auth/validation";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type LoginFormKey = keyof typeof DEFAULT_FORM;

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const loginMutation = useLoginMutation();

  const isEmailValid = isValidEmail(form.email);
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const canSubmit = isEmailValid && form.password.length > 0;

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    // 토큰 저장, 내 정보 갱신, 홈 이동은 useLoginMutation의 onSuccess에서 해요.
    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <AuthLayout title="로그인">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <FormField
          id="login-email"
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => handleChangeField("email", e.target.value)}
          error={showEmailError ? "이메일 형식을 확인해 주세요." : undefined}
        />

        <FormField
          id="login-password"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호 입력"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
        />

        <div className="mt-2">
          <SubmitButton disabled={!canSubmit || loginMutation.isPending}>
            {loginMutation.isPending ? "로그인 중" : "로그인"}
          </SubmitButton>
        </div>
      </form>

      <p className="mt-2 text-center text-[13px] text-ink-tertiary">
        아직 계정이 없나요?{" "}
        <Link to="/signup" className="font-extrabold text-primary">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}
