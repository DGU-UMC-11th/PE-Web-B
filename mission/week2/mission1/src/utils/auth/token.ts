// 로그인·내 정보 응답에는 memberId가 없어서, 평점 조회에 필요한 memberId는 토큰의 sub에서 읽어요.
// 서명 검증은 서버가 하므로 여기서는 payload만 꺼내 봐요.
export function getMemberIdFromToken(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const { sub } = JSON.parse(atob(base64)) as { sub?: unknown };
    const memberId = Number(sub);
    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
