import { BookmarkButton } from "../../components/bookmark-button";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { MoviePoster } from "../../components/movies/movie-poster";
import { StatusMessage } from "../../components/status-message";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { cn } from "../../utils/cn";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

type MovieDetailResult =
  | { movieId: number; status: "success"; movie: TmdbMovieDetail }
  | { movieId: number; status: "error"; message: string };

// 148 → "2시간 28분"
function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
}

const containerClass = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 xl:px-20";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
  const [result, setResult] = useState<MovieDetailResult | null>(null);

  useEffect(() => {
    // 올바르지 않은 영화 번호는 요청하지 않아요.
    if (!isValidMovieId) return;

    let ignore = false;

    async function loadMovieDetail() {
      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setResult({ movieId: parsedMovieId, status: "success", movie: response });
      } catch (error) {
        if (!ignore) {
          setResult({ movieId: parsedMovieId, status: "error", message: getMovieDetailErrorMessage(error) });
        }
      }
    }

    loadMovieDetail();

    return () => {
      ignore = true;
    };
  }, [isValidMovieId, parsedMovieId]);

  if (!isValidMovieId) {
    return <StatusMessage className={cn(containerClass, "flex-1 py-24")} message="올바르지 않은 영화 번호예요." />;
  }

  // 저장된 결과가 현재 영화의 결과가 아니면 아직 로딩 중이에요.
  if (result?.movieId !== parsedMovieId) {
    return <StatusMessage className={cn(containerClass, "flex-1 py-24")} message="영화 정보를 불러오는 중이에요." />;
  }

  if (result.status === "error") {
    return <StatusMessage className={cn(containerClass, "flex-1 py-24")} message={result.message} />;
  }

  // 다른 영화로 이동하면 key가 바뀌어 평점·후기 상태가 새로 시작돼요.
  return <MovieDetail key={result.movie.id} movie={result.movie} />;
}

function MovieDetail({ movie }: { movie: TmdbMovieDetail }) {
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <main className="flex-1">
      <section className="relative h-[300px] overflow-hidden bg-[#191b1f] md:h-[360px]">
        {backdropUrl ? (
          <img
            className="absolute inset-0 size-full object-cover"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gray-500 text-sm text-gray-200">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className={cn(containerClass, "relative flex h-full flex-col py-6 text-white md:py-8")}>
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-white no-underline hover:underline"
          >
            <img className="size-4 invert" src="/icons/chevron-left.svg" alt="" />
            영화 목록
          </Link>

          <div className="mt-auto">
            <h1 className="m-0 text-3xl leading-tight font-bold tracking-[-1.2px] md:text-[40px]">
              {movie.title}
            </h1>
            <p className="mt-1 mb-0 text-sm text-white/80">{movie.original_title}</p>
            <p className="mt-2 mb-0 text-xs font-semibold text-white/90 md:text-sm">
              {[movie.release_date, genres, formatRuntime(movie.runtime)].filter(Boolean).join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      <div className={cn(containerClass, "flex flex-col gap-10 pt-6 pb-16 lg:flex-row lg:gap-8 md:pb-24")}>
        <div className="flex flex-1 flex-col gap-6 sm:flex-row">
          <MoviePoster
            className="block aspect-[200/288] w-40 shrink-0 rounded-[10px] shadow-lg sm:w-[200px]"
            src={getTmdbPosterUrl(movie.poster_path)}
            alt={`${movie.title} 포스터`}
          />
          <div className="min-w-0">
            {movie.tagline && <h2 className="m-0 text-lg font-bold tracking-[-0.5px]">{movie.tagline}</h2>}
            <p className="mt-3 mb-0 text-[13px] leading-6 text-gray-600">{movie.overview || "줄거리 정보가 없어요."}</p>
            <BookmarkButton movieId={movie.id} title={movie.title} className="mt-4" />
          </div>
        </div>

        <aside className="w-full border-gray-200 lg:w-[328px] lg:shrink-0 lg:border-l lg:pl-8">
          <h2 className="m-0 text-lg font-bold">내 평점</h2>
          <p className="mt-1 mb-3 text-xs text-gray-400">별점은 필수, 후기는 선택이에요.</p>

          <div className="flex gap-1.5" role="radiogroup" aria-label="별점">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                role="radio"
                aria-checked={rating === score}
                aria-label={`${score}점`}
                className={cn(
                  "grid size-8 place-items-center rounded-md border bg-white",
                  score <= rating ? "border-amber-400" : "border-gray-200",
                )}
                onClick={() => setRating(score)}
              >
                <img
                  className="size-5"
                  src={score <= rating ? "/icons/star.svg" : "/icons/star-outline.svg"}
                  alt=""
                />
              </button>
            ))}
          </div>

          <textarea
            className="mt-3 block h-[100px] w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-[13px] outline-none placeholder:text-gray-400 focus:border-gray-400"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={review}
            onChange={(event) => setReview(event.target.value)}
          />

          <button
            type="button"
            disabled={rating === 0}
            className="mt-3 h-10 w-full rounded-md bg-[#191b1f] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            평점 저장
          </button>
        </aside>
      </div>
    </main>
  );
}
