import { useState } from "react";
import { cn } from "../../utils/cn";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
// 로그인 페이지 연결 후 사용
// import { useNavigate } from "@tanstack/react-router";

// 이메일 형식 검사
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

type DuplicateCheckKey = "email" | "nickname";
type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

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
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
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
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand",
      hasError ? "border-red-500" : "border-gray-200",
    );
  const errorClass = "mt-1 text-xs text-red-500";

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-16 flex w-full max-w-sm flex-col gap-5 px-4"
    >
      <h1 className="text-center text-2xl font-extrabold">회원가입</h1>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="email" className="text-sm font-bold">
            이메일
          </label>
          <button
            type="button"
            disabled={!isEmailValid || duplicateCheck.email.isChecking}
            onClick={() => handleCheckDuplicate("email")}
            className="text-xs font-bold text-brand disabled:text-gray-400"
          >
            {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
          </button>
        </div>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          disabled={duplicateCheck.email.isChecking}
          onChange={(e) => handleChangeField("email", e.target.value)}
          className={inputClass(showEmailError)}
        />
        {showEmailError && (
          <p role="alert" className={errorClass}>
            올바른 이메일 형식이 아니에요
          </p>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="nickname" className="text-sm font-bold">
            닉네임
          </label>
          <button
            type="button"
            disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
            onClick={() => handleCheckDuplicate("nickname")}
            className="text-xs font-bold text-brand disabled:text-gray-400"
          >
            {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
          </button>
        </div>
        <input
          id="nickname"
          type="text"
          placeholder="2~12자로 입력해 주세요"
          value={form.nickname}
          disabled={duplicateCheck.nickname.isChecking}
          onChange={(e) => handleChangeField("nickname", e.target.value)}
          className={inputClass(showNicknameError)}
        />
        {showNicknameError && (
          <p role="alert" className={errorClass}>
            닉네임은 2~12자로 입력해 주세요
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-bold">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
          className={inputClass(showPasswordError)}
        />
        <p
          className={cn(
            "mt-1 text-xs",
            showPasswordError ? "text-red-500" : "text-gray-500",
          )}
        >
          영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
        </p>
      </div>

      <div>
        <label
          htmlFor="passwordConfirm"
          className="mb-1 block text-sm font-bold"
        >
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
          className={inputClass(showPasswordConfirmError)}
        />
        {showPasswordConfirmError && (
          <p role="alert" className={errorClass}>
            비밀번호가 일치하지 않아요
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className="w-full rounded-lg bg-brand py-3 font-bold text-white disabled:bg-brand/40"
      >
        {isSubmitting ? "가입 중" : "가입하기"}
      </button>

      <p className="text-center text-xs text-gray-500">
        이미 계정이 있으신가요? 로그인
      </p>
    </form>
  );
}