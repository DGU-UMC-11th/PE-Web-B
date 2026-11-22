import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createRating,
  deleteRating,
  getMemberRatings,
  updateRating,
  type Rating,
  type RatingBody,
} from "../api/ratings/ratings";
import { useMemberId } from "./use-member-id";

const ratingQueries = {
  byMember: (memberId: number) =>
    queryOptions({
      queryKey: ["ratings", memberId],
      queryFn: () => getMemberRatings(memberId),
    }),
};

// 이 영화에 남긴 내 평점 (없으면 undefined)
export function useMyRating(movieId: number) {
  const memberId = useMemberId();
  const query = useQuery({
    ...ratingQueries.byMember(memberId ?? 0),
    enabled: memberId !== null,
    retry: false,
  });

  return {
    memberId,
    isLoading: query.isLoading,
    rating: query.data?.find((rating) => rating.movieId === movieId),
  };
}

// 평점 등록/수정/삭제. 서버가 결과를 돌려주는 등록·수정은 setQueryData로 캐시를 직접 갱신하고,
// 돌려줄 데이터가 없는 삭제는 캐시에서 해당 항목을 걷어내요.
export function useRatingMutations(movieId: number) {
  const queryClient = useQueryClient();
  const memberId = useMemberId();
  const queryKey = ["ratings", memberId ?? 0];

  const create = useMutation({
    mutationFn: (body: RatingBody) => createRating({ movieId, ...body }),
    onSuccess: (created) => {
      queryClient.setQueryData<Rating[]>(queryKey, (prev = []) => [
        created,
        ...prev,
      ]);
    },
    onError: () => alert("평점 등록에 실패했어요. 다시 시도해 주세요."),
  });

  const update = useMutation({
    mutationFn: ({ ratingId, ...body }: RatingBody & { ratingId: number }) =>
      updateRating(ratingId, body),
    onSuccess: (updated) => {
      queryClient.setQueryData<Rating[]>(queryKey, (prev = []) =>
        prev.map((rating) =>
          rating.ratingId === updated.ratingId ? updated : rating,
        ),
      );
    },
    onError: () => alert("평점 수정에 실패했어요. 다시 시도해 주세요."),
  });

  const remove = useMutation({
    mutationFn: (ratingId: number) => deleteRating(ratingId),
    onSuccess: (_data, ratingId) => {
      queryClient.setQueryData<Rating[]>(queryKey, (prev = []) =>
        prev.filter((rating) => rating.ratingId !== ratingId),
      );
    },
    onError: () => alert("평점 삭제에 실패했어요. 다시 시도해 주세요."),
  });

  return { create, update, remove };
}
