import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/movies/bookmark-button";
import { MovieImage } from "../../components/movies/movie-image";
import { formatReleaseDate, formatRuntime } from "../../utils/movies/format-movie";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

const ratingScores = [1, 2, 3, 4, 5];

function DetailStatus({ children }: { children: string }) {
  return (
    <main className="mx-auto max-w-[1440px] px-20 py-20 text-center text-ink-secondary">
      {children}
    </main>
  );
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(isValidMovieId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    async function loadMovie() {
      setIsLoading(true);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) return <DetailStatus>올바르지 않은 영화 번호예요.</DetailStatus>;
  if (isLoading) return <DetailStatus>영화 정보를 불러오는 중이에요.</DetailStatus>;
  if (errorMessage) return <DetailStatus>{errorMessage}</DetailStatus>;
  if (!movie) return <DetailStatus>영화를 찾을 수 없어요.</DetailStatus>;

  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <main>
      <section className="relative h-[360px] overflow-hidden bg-ink">
        <MovieImage
          className="absolute inset-0 size-full bg-ink-secondary text-white/70"
          src={getTmdbBackdropUrl(movie.backdrop_path)}
          alt=""
        />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-20 py-6 text-white">
          <Link to="/" className="flex items-center gap-1 self-start text-[13px] font-bold">
            <img src="/icons/back.svg" alt="" width={24} height={24} />
            영화 목록
          </Link>

          <div className="flex w-[800px] flex-col gap-2">
            <h1 className="text-[46px] leading-[49.68px] font-bold tracking-[-2.3px]">
              {movie.title}
            </h1>
            <p className="text-sm">{movie.original_title}</p>
            <p className="flex gap-2 text-[13px] font-bold">
              <span>{formatReleaseDate(movie.release_date)}</span>
              {genreNames && <span>{genreNames}</span>}
              <span>{formatRuntime(movie.runtime)}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1440px] items-start gap-8 px-20 py-6">
        <MovieImage
          className="h-[286px] w-[200px] shrink-0 rounded-[10px] shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
          src={getTmdbPosterUrl(movie.poster_path)}
          alt={`${movie.title} 포스터`}
        />

        <section className="flex min-w-0 flex-1 flex-col items-start gap-3">
          {movie.tagline && (
            <h2 className="text-[21px] font-bold tracking-[-0.63px]">{movie.tagline}</h2>
          )}
          <p className="text-sm leading-6 text-ink-secondary">
            {movie.overview || "줄거리 정보가 없어요."}
          </p>
          <BookmarkButton movieId={movie.id} movieTitle={movie.title} variant="labeled" />
        </section>

        <aside className="flex w-[360px] shrink-0 flex-col gap-2 border-l border-line pb-[41px] pl-[30px]">
          <h2 className="text-[21px] font-bold tracking-[-0.63px]">내 평점</h2>
          <p className="text-xs text-ink-tertiary">별점은 필수, 후기는 선택이에요.</p>
          <div className="flex gap-1">
            {ratingScores.map((score) => (
              <button
                key={score}
                type="button"
                aria-label={`${score}점`}
                className="flex size-[38px] items-center justify-center rounded-lg border border-line bg-surface"
              >
                <img src="/icons/star.svg" alt="" width={24} height={24} />
              </button>
            ))}
          </div>
          <textarea
            className="h-[102px] resize-none rounded-lg border border-line bg-surface px-3 pt-4 pb-[18px] text-[13px] leading-[19.5px] outline-none placeholder:text-ink-tertiary focus:border-ink-tertiary"
            aria-label="후기"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
          />
          <button
            type="button"
            className="h-[42px] rounded-lg bg-ink text-sm font-extrabold text-white"
          >
            평점 저장
          </button>
        </aside>
      </div>
    </main>
  );
}
