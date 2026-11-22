import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMe} from "../api/members/update-me.ts";
import type {MemberInfo} from "../api/members/me.ts";
import {ME_QUERY_KEY} from "./use-me-query.ts";

export function useUpdateMeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMe,
        onSuccess: (response) => {
            // 서버가 수정된 회원 정보 전체(email, nickname, createdAt)를 응답하므로
            // 다시 GET /members/me를 요청하지 않고 응답 데이터로 캐시를 바로 바꿔요.
            queryClient.setQueryData<MemberInfo>(ME_QUERY_KEY, response.result);
            alert("내 정보를 수정했어요.");
        },
        onError: () => {
            alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
        },
    });
}
