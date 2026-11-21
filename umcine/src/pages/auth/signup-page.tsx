import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";
// import { useNavigate } from "@tanstack/react-router";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";
import { AuthCard } from "../../components/auth/auth-card";
import { TextField } from "../../components/auth/text-field";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  isValidNickname,
} from "../../utils/auth/validation";

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

const checkButtonClass =
  "h-11 shrink-0 rounded-lg border border-[#191b1f] bg-white px-3 text-sm font-semibold text-[#191b1f] disabled:border-[#e0e4eb] disabled:text-gray-400";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const navigate = useNavigate();

  // 입력값 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid = isValidNickname(form.nickname);
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  const isFormValid =
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfirmValid;

  // 입력 조건 + 두 중복 확인을 모두 통과해야 제출 가능
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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    // 폼 제출 시 새로고침 방지
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
      // 로그인 API 연결(8주차) 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      // 실패하면 입력값은 그대로 두고 다시 시도할 수 있게
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard title="회원가입" description="UMCine에서 영화 평점을 남겨 보세요.">
      {/* noValidate: 브라우저 기본 검사 끄고 우리 검사만 사용 */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          id="signup-email"
          label="이메일"
          type="email"
          icon="/icons/mail.svg"
          placeholder="이메일을 입력해 주세요."
          autoComplete="email"
          value={form.email}
          disabled={duplicateCheck.email.isChecking}
          onChange={(e) => handleChangeField("email", e.target.value)}
          errorMessage={showEmailError ? "올바른 이메일 형식이 아니에요." : undefined}
          helperMessage={
            duplicateCheck.email.isAvailable ? "사용할 수 있는 이메일이에요." : undefined
          }
          action={
            <button
              type="button"
              className={checkButtonClass}
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          }
        />

        <TextField
          id="signup-nickname"
          label="닉네임"
          icon="/icons/person.svg"
          placeholder="2~12자로 입력해 주세요."
          autoComplete="nickname"
          value={form.nickname}
          disabled={duplicateCheck.nickname.isChecking}
          onChange={(e) => handleChangeField("nickname", e.target.value)}
          errorMessage={
            showNicknameError ? "닉네임은 2자 이상 12자 이하로 입력해 주세요." : undefined
          }
          helperMessage={
            duplicateCheck.nickname.isAvailable ? "사용할 수 있는 닉네임이에요." : undefined
          }
          action={
            <button
              type="button"
              className={checkButtonClass}
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          }
        />

        <TextField
          id="signup-password"
          label="비밀번호"
          type="password"
          icon="/icons/lock.svg"
          placeholder="영문 대소문자, 숫자, 특수문자 포함 8자 이상"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
          errorMessage={
            showPasswordError
              ? "영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상 입력해 주세요."
              : undefined
          }
        />

        <TextField
          id="signup-password-confirm"
          label="비밀번호 확인"
          type="password"
          icon="/icons/lock.svg"
          placeholder="비밀번호를 한 번 더 입력해 주세요."
          autoComplete="new-password"
          value={form.passwordConfirm}
          onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
          errorMessage={showPasswordConfirmError ? "비밀번호가 일치하지 않아요." : undefined}
        />

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="mt-2 h-12 rounded-lg bg-blue-600 text-[15px] font-semibold text-white disabled:bg-gray-300"
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>

        <p className="m-0 text-center text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="font-semibold text-blue-600 no-underline hover:underline">
            로그인
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
