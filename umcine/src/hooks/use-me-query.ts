import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me.ts";
import { useAuthStore } from "../stores/auth-store.ts";
import { queryKeys } from "./query-keys.ts";

const FIVE_MINUTES = 5 * 60 * 1000;

// 조회, 수정, 로그인 hook이 같은 키를 쓰도록 한곳에서 관리해요.
export const ME_QUERY_KEY = queryKeys.me;

// 로그인한 사용자의 정보를 조회해요. 토큰이 없으면 요청하지 않아요.
// 헤더와 내 정보 페이지가 같은 queryKey를 써서 캐시를 함께 써요.
export function useMeQuery() {
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
        queryKey: ME_QUERY_KEY,
        queryFn: getMe,
        enabled: Boolean(accessToken),
        staleTime: FIVE_MINUTES,
        // 401이면 authApi가 토큰을 지우므로 다시 시도하지 않아요.
        retry: false,
    });
}
