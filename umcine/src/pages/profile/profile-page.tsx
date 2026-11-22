import { Link, useNavigate } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail.ts";
import type { TmdbMovieDetail } from "../../api/movies/models";
import MovieCard from "../../components/movies/movie-card";
import { useFavoritesQuery } from "../../hooks/use-favorites.ts";
import { useMeQuery } from "../../hooks/use-me-query.ts";

// 로그인 여부는 (member) 레이아웃에서 확인해요.
export default function ProfilePage() {
  const navigate = useNavigate();
  // 내 정보 수정에 성공하면 같은 캐시가 바뀌어서 다시 요청하지 않아도 새 닉네임이 보여요.
  const meQuery = useMeQuery();
  // 서버에는 영화 id만 저장돼 있어서(GET /favorites), 포스터와 제목은 TMDB에서 영화별로 불러와요.
  const favoritesQuery = useFavoritesQuery();
  const favoriteMovieIds = favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];

  // 영화 상세 페이지와 같은 queryKey를 써서 이미 본 영화는 다시 요청하지 않아요.
  const favoriteMovieQueries = useQueries({
    queries: favoriteMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  const favoriteMovies = favoriteMovieQueries
    .map((query) => query.data)
    .filter((movie): movie is TmdbMovieDetail => movie !== undefined);
  const isFavoriteMoviesPending =
    favoritesQuery.isPending || favoriteMovieQueries.some((query) => query.isPending);

  return (
    <div className="min-h-[calc(100vh-64px-80px)] w-full">
      <div className="mx-auto max-w-[1360px] px-4 pt-10 pb-[60px] sm:px-6 lg:px-10">
        <div className="mb-9 flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-[-0.5px] text-gray-900">내 정보</h1>
          <Link
            to="/me/edit"
            className="flex h-[38px] items-center rounded-lg bg-blue-600 px-[18px] text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            정보 수정
          </Link>
        </div>

        {/* 기본 정보 */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-bold text-gray-900">기본 정보</h2>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 border-b border-gray-200 pt-6 pb-8">
            <div className="flex size-[68px] items-center justify-center rounded-full bg-gray-200">
              <img src="/movie-icons/person.svg" alt="" className="size-9 opacity-60" />
            </div>
            {meQuery.isPending ? (
              <p className="text-sm text-gray-400">내 정보를 불러오는 중이에요...</p>
            ) : meQuery.isError ? (
              <p className="text-sm text-red-500">내 정보를 불러오지 못했어요.</p>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400">닉네임</span>
                  <span className="text-[15px] font-bold text-gray-900">{meQuery.data.nickname}</span>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-xs text-gray-400">이메일</span>
                  <span className="truncate text-[15px] font-bold text-gray-900">{meQuery.data.email}</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* 내 즐겨찾기 */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-bold text-gray-900">내 즐겨찾기</h2>
          {favoritesQuery.isError ? (
            <p className="py-10 text-sm text-red-500">즐겨찾기 목록을 불러오지 못했어요.</p>
          ) : isFavoriteMoviesPending && favoriteMovies.length === 0 ? (
            <p className="py-10 text-sm text-gray-400">즐겨찾기한 영화를 불러오는 중이에요...</p>
          ) : favoriteMovieIds.length === 0 ? (
            <p className="py-10 text-sm text-gray-400">아직 즐겨찾기한 영화가 없어요.</p>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 min-[1201px]:grid-cols-5">
              {favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelectMovie={(movieId) =>
                    navigate({ to: "/movies/$movieId", params: { movieId: String(movieId) } })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
