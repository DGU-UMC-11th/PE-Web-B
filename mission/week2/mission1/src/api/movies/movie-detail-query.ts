import { queryOptions } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import { getMovieDetail } from "./get-movie-detail";

/** 영화 상세와 마이페이지 즐겨찾기 목록이 같은 캐시를 쓰도록 옵션을 공유해요. */
export function movieDetailQueryOptions(movieId: number) {
  return queryOptions({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    staleTime: 30 * 1000,
    // 없는 영화(404)는 다시 요청해도 결과가 같으므로 재시도하지 않아요.
    retry: (failureCount, error) =>
      !(isHTTPError(error) && error.response.status === 404) && failureCount < 3,
  });
}
