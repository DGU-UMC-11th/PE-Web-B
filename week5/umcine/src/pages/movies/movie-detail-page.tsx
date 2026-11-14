import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime === null) return "상영 시간 정보가 없어요.";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}시간 ${minutes}분`;
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

    setIsLoading(true);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error) => {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isValidMovieId, parsedMovieId]);

  if (!isValidMovieId) {
    return <main>올바르지 않은 영화 번호예요.</main>;
  }

  if (isLoading) {
    return <main>영화 정보를 불러오는 중이에요.</main>;
  }

  if (errorMessage) {
    return <main>{errorMessage}</main>;
  }

  if (!movie) {
    return null;
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  return (
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
              {movie.title}
            </h1>
            <p className="text-sm">{movie.original_title}</p>
            <div className="mt-1 flex gap-2.5 text-[13px] font-bold">
              <p>{movie.release_date}</p>
              <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              <p>{formatRuntime(movie.runtime)}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-8 px-20 py-6">
        <div className="relative shrink-0">
          <BookmarkButton movieId={movie.id} />
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
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
            {movie.tagline}
          </h2>
          <p className="text-sm leading-6 text-[#606774]">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}
