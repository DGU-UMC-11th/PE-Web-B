import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login} from "../api/auth/login.ts";
import {useAuthStore} from "../stores/auth-store.ts";
import {ME_QUERY_KEY} from "./use-me-query.ts";

// 로그인 요청과 로그인 후 공통 처리(토큰 저장, 내 정보 캐시 갱신, 결과 안내)를 맡아요.
// 화면 이동은 호출하는 페이지에서 mutate 옵션으로 정해요. (회원가입 hook과 같은 방식)
export function useLoginMutation() {
    const queryClient = useQueryClient();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    return useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            setAccessToken(response.result.accessToken);
            // 이전에 캐시된 다른 계정의 내 정보가 남지 않도록 다시 불러와요.
            queryClient.invalidateQueries({queryKey: ME_QUERY_KEY});
            // 즐겨찾기 캐시는 키에 회원 구분이 없어서, 다른 계정으로 로그인했을 때 남지 않도록 지워요.
            // (평점 캐시는 키에 memberId가 들어 있어 계정마다 따로 저장돼요)
            queryClient.removeQueries({queryKey: ["favorites"]});
            alert("로그인에 성공했어요.");
        },
        onError: () => {
            alert("로그인에 실패했어요. 다시 시도해 주세요.");
        },
    });
}
