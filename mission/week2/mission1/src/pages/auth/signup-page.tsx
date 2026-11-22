import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { AuthLayout } from "../../components/auth/auth-layout";
import { FieldActionButton, FormField, SubmitButton } from "../../components/auth/form-field";
import { useSignupMutation } from "../../hooks/use-signup-mutation";
import { isValidEmail, isValidNickname, isValidPassword } from "../../utils/auth/validation";

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const signupMutation = useSignupMutation();

  // 입력값의 유효성 검사
  const isEmailValid = isValidEmail(form.email);
  const isNicknameValid = isValidNickname(form.nickname);
  const isPasswordValid = isValidPassword(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError = form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 true
  const isFormValid = isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid && duplicateCheck.email.isAvailable && duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(isAvailable ? `사용할 수 있는 ${label}이에요.` : `이미 사용 중인 ${label}이에요.`);
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();
    if (!canSubmit || signupMutation.isPending) return;

    // 성공(alert 후 로그인 이동)·실패 처리는 useSignupMutation의 onSuccess/onError에서 해요.
    signupMutation.mutate({
      email: form.email.trim(),
      nickname: form.nickname.trim(),
      password: form.password,
    });
  };

  return (
    <AuthLayout title="회원가입">
      {/* noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔 */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <FormField
          id="signup-email"
          label="이메일"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          value={form.email}
          disabled={duplicateCheck.email.isChecking}
          onChange={(e) => handleChangeField("email", e.target.value)}
          error={showEmailError ? "이메일 형식을 확인해 주세요." : undefined}
          action={
            <FieldActionButton
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </FieldActionButton>
          }
        />

        <FormField
          id="signup-nickname"
          label="닉네임"
          autoComplete="nickname"
          placeholder="2~12자"
          value={form.nickname}
          disabled={duplicateCheck.nickname.isChecking}
          onChange={(e) => handleChangeField("nickname", e.target.value)}
          error={showNicknameError ? "닉네임은 2~12자로 입력해 주세요." : undefined}
          action={
            <FieldActionButton
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </FieldActionButton>
          }
        />

        <FormField
          id="signup-password"
          label="비밀번호"
          type="password"
          autoComplete="new-password"
          placeholder="8자 이상"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
          error={showPasswordError ? "비밀번호 조건을 확인해 주세요." : undefined}
          hint="영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요"
        />

        <FormField
          id="signup-password-confirm"
          label="비밀번호 확인"
          type="password"
          autoComplete="new-password"
          placeholder="다시 입력"
          value={form.passwordConfirm}
          onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
          error={showPasswordConfirmError ? "비밀번호가 일치하지 않아요." : undefined}
        />

        <div className="mt-2">
          <SubmitButton disabled={!canSubmit || signupMutation.isPending}>
            {signupMutation.isPending ? "가입 중" : "가입하기"}
          </SubmitButton>
        </div>
      </form>

      <p className="mt-2 text-center text-[13px] text-ink-tertiary">
        이미 계정이 있나요?{" "}
        <Link to="/login" className="font-extrabold text-primary">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}
