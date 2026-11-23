import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate.ts";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate.ts";
import { signup } from "../../api/members/signup.ts";
import { cn } from "../../utils/cn.ts";

// 이메일 형식 검사 (g 플래그를 붙이면 test()마다 결과가 달라질 수 있어 붙이지 않아요)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];
type DuplicateCheckKey = "email" | "nickname";

const fieldBox =
  "flex h-12 items-center rounded-lg border border-gray-200 bg-white px-4 transition-colors focus-within:border-blue-600";
const fieldBoxError = "border-rose-500 focus-within:border-rose-500";
const fieldInput =
  "h-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:text-gray-400";
const duplicateButton =
  "py-1 text-[13px] font-semibold whitespace-nowrap text-blue-600 transition-colors hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300";

function FieldMessage({ error, children }: { error?: boolean; children: React.ReactNode }) {
  return (
    <p className={cn("mt-0.5 text-xs leading-[1.4]", error ? "text-rose-500" : "text-gray-400")}>
      {children}
    </p>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값의 유효성 검사
  const trimmedNickname = form.nickname.trim();
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid = trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError = form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

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
          : await checkNicknameDuplicate(trimmedNickname);
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: trimmedNickname,
        password: form.password,
      });
      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      // 실패하면 입력값을 유지한 채 다시 요청할 수 있어요.
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDuplicateMessage = (key: DuplicateCheckKey) => {
    if (duplicateCheck[key].isAvailable) return `사용할 수 있는 ${key === "email" ? "이메일" : "닉네임"}이에요.`;
    return null;
  };

  return (
    <div className="flex min-h-[calc(100vh-64px-80px)] w-full items-center justify-center px-5 pt-[60px] pb-20">
      <div className="flex w-full max-w-[440px] flex-col">
        <h1 className="mb-8 text-center text-[28px] font-extrabold text-gray-900">회원가입</h1>

        {/* noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔 */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="email">
              이메일
            </label>
            <div className={cn(fieldBox, showEmailError && fieldBoxError)}>
              <input
                id="email"
                type="email"
                className={fieldInput}
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => handleChangeField("email", e.target.value)}
                disabled={duplicateCheck.email.isChecking}
                aria-invalid={showEmailError}
              />
              <button
                type="button"
                className={duplicateButton}
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate("email")}
              >
                {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showEmailError && <FieldMessage error>올바른 이메일 형식을 입력해 주세요.</FieldMessage>}
            {!showEmailError && getDuplicateMessage("email") && (
              <p className="mt-0.5 text-xs leading-[1.4] text-blue-600">{getDuplicateMessage("email")}</p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="nickname">
              닉네임
            </label>
            <div className={cn(fieldBox, showNicknameError && fieldBoxError)}>
              <input
                id="nickname"
                type="text"
                className={fieldInput}
                placeholder="2~12자"
                autoComplete="nickname"
                value={form.nickname}
                onChange={(e) => handleChangeField("nickname", e.target.value)}
                disabled={duplicateCheck.nickname.isChecking}
                aria-invalid={showNicknameError}
              />
              <button
                type="button"
                className={duplicateButton}
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && <FieldMessage error>닉네임은 2~12자로 입력해 주세요.</FieldMessage>}
            {!showNicknameError && getDuplicateMessage("nickname") && (
              <p className="mt-0.5 text-xs leading-[1.4] text-blue-600">{getDuplicateMessage("nickname")}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="password">
              비밀번호
            </label>
            <div className={cn(fieldBox, showPasswordError && fieldBoxError)}>
              <input
                id="password"
                type="password"
                className={fieldInput}
                placeholder="8자 이상"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => handleChangeField("password", e.target.value)}
                aria-invalid={showPasswordError}
              />
            </div>
            <FieldMessage error={showPasswordError}>
              영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
            </FieldMessage>
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-900" htmlFor="password-confirm">
              비밀번호 확인
            </label>
            <div className={cn(fieldBox, showPasswordConfirmError && fieldBoxError)}>
              <input
                id="password-confirm"
                type="password"
                className={fieldInput}
                placeholder="다시 입력"
                autoComplete="new-password"
                value={form.passwordConfirm}
                onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
                aria-invalid={showPasswordConfirmError}
              />
            </div>
            {showPasswordConfirmError && <FieldMessage error>비밀번호가 일치하지 않아요.</FieldMessage>}
          </div>

          <button
            type="submit"
            className="mt-3 h-12 w-full rounded-lg bg-blue-600 text-[15px] font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? "가입 중" : "가입하기"}
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-gray-500">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-semibold text-blue-600 underline underline-offset-[3px]">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
