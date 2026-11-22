import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import type { MemberInfo } from "../api/members/me";
import { updateMe } from "../api/members/update-me";
import { queryKeys } from "../api/query-keys";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (response) => {
      // 응답에 수정된 내 정보가 담겨 있으므로 다시 조회하지 않고 캐시를 바로 바꿔요.
      queryClient.setQueryData<MemberInfo>(queryKeys.me, response.result);
      alert("내 정보 수정에 성공했어요.");
    },
    onError: (error) => {
      if (isHTTPError(error) && error.response.status === 409) {
        alert("이미 사용 중인 닉네임이에요.");
        return;
      }
      alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
