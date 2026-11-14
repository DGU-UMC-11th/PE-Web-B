import { Link, useParams } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";
import { useQuery } from "@tanstack/react-query";
import { movieQueries } from "../../api/movies/movie-queries";

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}시간 ${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    ...movieQueries.detail(movieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  const posterUrl = getTmdbPosterUrl(
    movieDetailQuery.data?.poster_path ?? null,
  );
  const backdropUrl = getTmdbBackdropUrl(
    movieDetailQuery.data?.backdrop_path ?? null,
  );

  return (
    <>
      {!isValidMovieId ? (
        <p>올바르지 않은 영화 번호예요.</p>
      ) : movieDetailQuery.isPending ? (
        <p>영화 상세 정보를 불러오는 중이에요.</p>
      ) : movieDetailQuery.isError ? (
        <p>{getMovieDetailErrorMessage(movieDetailQuery.error)}</p>
      ) : (
        <>
          <main>
            <section className="relative h-[360px] text-white">
              {backdropUrl ? (
                <img
                  src={backdropUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#969da8] text-sm">
                  이미지 없음
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

              <div className="relative flex h-full flex-col justify-between px-20 py-6">
                <Link to="/" className="w-fit text-[13px] font-bold">
                  영화 목록
                </Link>

                <div className="flex max-w-[800px] flex-col gap-1.5">
                  <h1 className="text-[46px] font-bold leading-[1.08]">
                    {movieDetailQuery.data.title}
                  </h1>
                  <p className="text-sm">
                    {movieDetailQuery.data.original_title}
                  </p>
                  <div className="mt-1 flex gap-2.5 text-[13px] font-bold">
                    <p>{movieDetailQuery.data.release_date}</p>
                    <p>
                      {movieDetailQuery.data.genres
                        .map((genre) => genre.name)
                        .join(", ")}
                    </p>
                    <p>{formatRuntime(movieDetailQuery.data.runtime)}</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex gap-8 px-20 py-6">
              <div className="relative shrink-0">
                <BookmarkButton movieId={movieDetailQuery.data.id} />
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`${movieDetailQuery.data.title} 포스터`}
                    className="h-[286px] w-[200px] shrink-0 rounded-[10px] object-cover"
                  />
                ) : (
                  <div className="flex h-[286px] w-[200px] shrink-0 items-center justify-center rounded-[10px] bg-[#e3e6eb] text-xs text-[#969da8]">
                    이미지 없음
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <h2 className="text-[21px] font-bold leading-[25px]">
                  {movieDetailQuery.data.tagline}
                </h2>
                <p className="text-sm leading-6 text-[#606774]">
                  {movieDetailQuery.data.overview}
                </p>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
