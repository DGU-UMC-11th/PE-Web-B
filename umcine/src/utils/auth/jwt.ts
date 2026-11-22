// JWT의 payload를 디코딩해서 memberId(sub 클레임)를 꺼내요.
// 서명은 검증하지 않아요(비밀키는 서버에만 있어요). 그래서 이 값은 화면에서 "누구의 데이터를 불러올지"
// 정하는 데만 쓰고, 실제 권한 확인은 서버가 토큰 서명을 검증해서 해요.
export function getMemberIdFromToken(token: string): number | null {
    const payload = token.split(".")[1];
    if (!payload) return null;

    try {
        // payload는 Base64URL이라 atob이 읽을 수 있게 Base64로 바꾸고 길이를 4의 배수로 맞춰요.
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const json = new TextDecoder().decode(Uint8Array.from(atob(padded), (c) => c.charCodeAt(0)));
        const memberId = Number((JSON.parse(json) as { sub?: unknown }).sub);
        return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
    } catch {
        return null;
    }
}
