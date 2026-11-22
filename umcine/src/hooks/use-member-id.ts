import { useAuthStore } from "../stores/auth-store";

// JWT payload(Base64URL)를 디코딩해서 sub(memberId)를 꺼내요.
// 디코딩일 뿐 서명 검증은 아니므로, 화면 표시용으로만 사용해요.
function decodeMemberId(token: string | null): number | null {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    const memberId = Number(JSON.parse(json).sub);
    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}

export function useMemberId() {
  const accessToken = useAuthStore((state) => state.accessToken);
  return decodeMemberId(accessToken);
}
