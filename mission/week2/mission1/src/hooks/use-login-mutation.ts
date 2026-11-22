import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth/login";
import { queryKeys } from "../api/query-keys";
import { useAuthStore } from "../stores/auth-store";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setAccessToken(response.result.accessToken);
      alert("로그인에 성공했어요.");
      // 이전 계정의 즐겨찾기·평점이 남아 보이지 않도록 지우고, 내 정보는 다시 조회해요.
      queryClient.removeQueries({ queryKey: queryKeys.favorites.all });
      queryClient.removeQueries({ queryKey: queryKeys.ratings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      navigate({ to: "/" });
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
