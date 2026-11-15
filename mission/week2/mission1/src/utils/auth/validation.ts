// 이메일 형식 검사
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 12;

export function isValidEmail(email: string) {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidNickname(nickname: string) {
  const length = nickname.trim().length;
  return length >= NICKNAME_MIN_LENGTH && length <= NICKNAME_MAX_LENGTH;
}

export function isValidPassword(password: string) {
  return PASSWORD_REGEX.test(password);
}
