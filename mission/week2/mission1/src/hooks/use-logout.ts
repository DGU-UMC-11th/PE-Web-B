import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { queryKeys } from "../api/query-keys";
import { useAuthStore } from "../stores/auth-store";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return async () => {
    // 로그인 전용 페이지에서 토큰을 먼저 지우면 로그인 화면으로 튕기므로, 홈으로 이동한 뒤 지워요.
    await navigate({ to: "/" });
    setAccessToken(null);
    queryClient.removeQueries({ queryKey: queryKeys.me });
    queryClient.removeQueries({ queryKey: queryKeys.favorites.all });
    queryClient.removeQueries({ queryKey: queryKeys.ratings.all });
  };
}
