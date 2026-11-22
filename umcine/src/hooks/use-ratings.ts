import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage, getApiErrorStatus } from "../api/api-response.ts";
import { createRating } from "../api/ratings/create-rating.ts";
import { deleteRating } from "../api/ratings/delete-rating.ts";
import { getAllMemberRatings } from "../api/ratings/get-member-ratings.ts";
import type { Rating } from "../api/ratings/models.ts";
import { updateRating } from "../api/ratings/update-rating.ts";
import { useAuthStore } from "../stores/auth-store.ts";
import { getMemberIdFromToken } from "../utils/auth/jwt.ts";
import { queryKeys } from "./query-keys.ts";

// 로그인 응답과 GET /members/me에는 memberId가 없어서 토큰의 sub 클레임에서 꺼내요.
export function useMyMemberId() {
    return useAuthStore((state) =>
        state.accessToken ? getMemberIdFromToken(state.accessToken) : null,
    );
}

// 이 영화에 남긴 내 평점. 내 평점 목록을 한 번 불러와 캐시에 두고, 영화별로 골라 써요.
// 평점은 영화마다 하나뿐이라 없으면 null이에요.
export function useMyMovieRatingQuery(movieId: number) {
    const memberId = useMyMemberId();

    return useQuery({
        queryKey: queryKeys.memberRatings(memberId ?? 0),
        queryFn: () => getAllMemberRatings(memberId!),
        enabled: memberId !== null,
        select: (ratings) => ratings.find((rating) => rating.movieId === movieId) ?? null,
    });
}

// 평점 변경 hook들이 같은 캐시(내 평점 목록)를 고치도록 묶었어요.
function useUpdateMyRatingsCache() {
    const queryClient = useQueryClient();
    const memberId = useMyMemberId();

    const updateCache = (updater: (ratings: Rating[]) => Rating[]) => {
        if (memberId === null) return;
        queryClient.setQueryData<Rating[]>(queryKeys.memberRatings(memberId), (prev) =>
            prev ? updater(prev) : prev,
        );
    };
    const refetch = () => {
        if (memberId === null) return;
        queryClient.invalidateQueries({ queryKey: queryKeys.memberRatings(memberId) });
    };

    return { updateCache, refetch };
}

// POST /ratings: 응답에 만들어진 평점이 있어서 그대로 목록 맨 앞에 넣어요.
export function useCreateRatingMutation() {
    const { updateCache, refetch } = useUpdateMyRatingsCache();

    return useMutation({
        mutationFn: createRating,
        onSuccess: (created) => {
            updateCache((ratings) => [created, ...ratings]);
            alert("평점을 등록했어요.");
        },
        onError: (error) => {
            // 409면 다른 곳(다른 탭 등)에서 이미 등록했다는 뜻이라 서버 값으로 다시 맞춰요.
            if (getApiErrorStatus(error) === 409) refetch();
            alert(getApiErrorMessage(error, "평점을 등록하지 못했어요. 다시 시도해 주세요."));
        },
    });
}

// PATCH /ratings/{ratingId}: 응답 result가 null이라, 요청에 보낸 점수와 후기로 캐시를 바꿔요.
// 서버가 값을 바꾸지 않고 그대로 저장하기 때문에 이렇게 해도 최신 상태와 같아요.
export function useUpdateRatingMutation() {
    const { updateCache, refetch } = useUpdateMyRatingsCache();

    return useMutation({
        mutationFn: updateRating,
        onSuccess: (_, { ratingId, score, comment }) => {
            updateCache((ratings) =>
                ratings.map((rating) =>
                    rating.ratingId === ratingId ? { ...rating, score, comment } : rating,
                ),
            );
            alert("평점을 수정했어요.");
        },
        onError: (error) => {
            // 404면 이미 지워진 평점이라 목록을 다시 불러와요.
            if (getApiErrorStatus(error) === 404) refetch();
            alert(getApiErrorMessage(error, "평점을 수정하지 못했어요. 다시 시도해 주세요."));
        },
    });
}

// DELETE /ratings/{ratingId}: 지운 평점을 캐시에서 빼요.
export function useDeleteRatingMutation() {
    const { updateCache, refetch } = useUpdateMyRatingsCache();

    return useMutation({
        mutationFn: deleteRating,
        onSuccess: (_, ratingId) => {
            updateCache((ratings) => ratings.filter((rating) => rating.ratingId !== ratingId));
            alert("평점을 삭제했어요.");
        },
        onError: (error) => {
            if (getApiErrorStatus(error) === 404) refetch();
            alert(getApiErrorMessage(error, "평점을 삭제하지 못했어요. 다시 시도해 주세요."));
        },
    });
}
