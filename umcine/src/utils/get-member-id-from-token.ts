// JWT는 "헤더.페이로드.서명" 구조이고, 페이로드는 base64url로 인코딩된 JSON이에요.
// 서버가 페이로드의 sub에 memberId를 넣어 주므로 그 값을 꺼내요.
// 서명 검증은 하지 않아요. 화면 표시용일 뿐이고, 진짜 검증은 서버가 해요.
export function getMemberIdFromToken(token: string | null): number | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const memberId = Number(JSON.parse(atob(payload)).sub);
    return Number.isInteger(memberId) ? memberId : null;
  } catch {
    return null;
  }
}
