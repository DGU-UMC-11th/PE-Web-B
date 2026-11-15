// 이메일 형식 검사 (g 플래그 붙이면 test()마다 lastIndex가 바뀌어서 결과가 달라짐)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

export function isValidNickname(nickname: string) {
  const length = nickname.trim().length;
  return length >= 2 && length <= 12;
}
