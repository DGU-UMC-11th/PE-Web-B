
import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbPosterUrl,
  getTmdbBackdropUrl,
} from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../../components/bookmark-button";
import { RatingPanel } from "../../components/movies/rating-panel";

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({
    from: "/movies/$movieId",
  });
  const movieId = Number(movieIdParam);
  const isValidMovieId =
    Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
});

  if (!isValidMovieId) {
    return <StatusPage message="올바르지 않은 영화 번호예요." />;
  }

  if (movieDetailQuery.isPending) {
    return <StatusPage message="영화 정보를 불러오는 중이에요." />;
  }

  if (movieDetailQuery.isError) {
    return (
      <StatusPage
        message={getMovieDetailErrorMessage(movieDetailQuery.error)}
      />
    );
  }

  if (!movieDetailQuery.data) {
    return <StatusPage message="영화를 찾을 수 없어요." />;
  }

  const movie = movieDetailQuery.data;

  return <MovieDetail key={movie.id} movie={movie} />;
}

function StatusPage({ message }: { message: string }) {
  return (
    <main className="grid flex-1 place-items-center px-4 py-32">
      <div className="text-center">
        <h1 className="text-lg font-semibold">{message}</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-sm text-blue-600"
        >
          영화 목록으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

function MovieDetail({ movie }: { movie: TmdbMovieDetail }) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  const runtimeText =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  return (
    <main className="flex-1">
      <section className="relative h-[360px] overflow-hidden bg-[#191b1f]">
        {backdropUrl ? (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={backdropUrl}
            alt=""
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 text-white">
            이미지 없음
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />

        <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-20 py-6 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
          <Link
            className="flex w-fit items-center gap-2 text-xs font-semibold text-white"
            to="/"
          >
            <img
              className="size-5 invert"
              src="/icons/chevron-left.svg"
              alt=""
            />
            영화 목록
          </Link>

          <div className="text-white">
            <h1 className="text-[44px] leading-tight font-bold tracking-[-1.5px] max-[760px]:text-[30px]">
              {movie.title}
            </h1>
            <p className="mt-2 text-sm">{movie.original_title}</p>
            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold">
              <span>{movie.release_date}</span>
              <span>
                {movie.genres.map((genre) => genre.name).join(" · ")}
              </span>
              <span>{runtimeText}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-[200px_minmax(0,1fr)_360px] gap-8 px-20 py-6 max-[1100px]:grid-cols-[180px_minmax(0,1fr)] max-[1100px]:px-8 max-[760px]:grid-cols-1 max-[760px]:px-6 max-[540px]:px-4">
        {posterUrl ? (
          <img
            className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-xl max-[1100px]:w-[180px]"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="flex h-[286px] w-[200px] items-center justify-center rounded-[10px] bg-gray-200 text-sm text-gray-500">
            이미지 없음
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold tracking-[-0.6px]">
            {movie.tagline}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#667085]">
            {movie.overview}
          </p>

          <BookmarkButton movieId={movie.id} detail className="mt-4 rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white" />
        </div>

        <aside className="border-l border-[#e0e4eb] pl-[30px] max-[1100px]:col-start-2 max-[1100px]:border-l-0 max-[1100px]:pl-0 max-[760px]:col-start-auto">
          <RatingPanel movieId={movie.id} />
        </aside>
      </section>
    </main>
  );
}
