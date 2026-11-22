import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { queryKeys } from "../api/query-keys";
import { useAuthStore } from "../stores/auth-store";

/** 헤더, 마이페이지, 내 정보 수정이 같은 query key로 내 정보를 공유해요. */
export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    // 401이면 토큰이 비워지므로 같은 조회를 자동 재시도하지 않아요.
    retry: false,
  });
}
