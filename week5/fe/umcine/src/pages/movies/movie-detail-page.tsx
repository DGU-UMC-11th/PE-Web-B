
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
      setMovie(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setMovie(null);

    getMovieDetail(parsedMovieId)
      .then((response) => {
        if (!ignore) setMovie(response);
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setErrorMessage(getMovieDetailErrorMessage(error));
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [parsedMovieId]);

  if (!Number.isInteger(parsedMovieId) || parsedMovieId <= 0) {
    return <StatusPage message="올바르지 않은 영화 번호예요." />;
  }

  if (isLoading || (movie && movie.id !== parsedMovieId)) {
    return <StatusPage message="영화 정보를 불러오는 중이에요." />;
  }

  if (errorMessage) {
    return <StatusPage message={errorMessage} />;
  }

  if (!movie) {
    return <StatusPage message="영화를 찾을 수 없어요." />;
  }

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
  const bookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movie.id)
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark
  );

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  const runtimeText =
    movie.runtime === null
      ? "상영 시간 정보가 없어요."
      : `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`;

  const [savedReview] = useState(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(`umcine-review-${movie.id}`) ?? "null"
      );

      if (
        saved &&
        typeof saved === "object" &&
        "rating" in saved &&
        "review" in saved &&
        typeof saved.rating === "number" &&
        Number.isInteger(saved.rating) &&
        saved.rating >= 1 &&
        saved.rating <= 5 &&
        typeof saved.review === "string"
      ) {
        return { rating: saved.rating, review: saved.review };
      }
    } catch {
      // 저장된 값이 없거나 읽을 수 없는 경우
    }

    return { rating: 0, review: "" };
  });

  const [rating, setRating] = useState(savedReview.rating);
  const [review, setReview] = useState(savedReview.review);
  const [message, setMessage] = useState("");

  function handleReviewSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rating) {
      setMessage("별점을 선택해 주세요.");
      return;
    }

    try {
      localStorage.setItem(
        `umcine-review-${movie.id}`,
        JSON.stringify({ rating, review })
      );
      setMessage("이 브라우저에 평점을 저장했어요.");
    } catch {
      setMessage("평점을 저장하지 못했어요.");
    }
  }

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

          <button
            className={cn(
              "mt-4 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold",
              bookmarked
                ? "bg-blue-700 text-white"
                : "bg-[#2563eb] text-white hover:bg-blue-700"
            )}
            type="button"
            aria-pressed={bookmarked}
            onClick={() => toggleBookmark(movie.id)}
          >
            <img
              className="size-4 invert"
              src={
                bookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
            />
            {bookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
          </button>
        </div>

        <aside className="border-l border-[#e0e4eb] pl-[30px] max-[1100px]:col-start-2 max-[1100px]:border-l-0 max-[1100px]:pl-0 max-[760px]:col-start-auto">
          <h2 className="text-xl font-bold">내 평점</h2>
          <p className="mt-1 text-xs text-[#98a2b3]">
            별점은 필수, 후기는 선택이에요.
          </p>

          <form onSubmit={handleReviewSubmit}>
            <div
              className="mt-2 flex gap-1"
              role="group"
              aria-label="별점 선택"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={cn(
                    "grid size-[38px] place-items-center rounded-lg border border-[#e0e4eb] bg-white text-2xl",
                    star <= rating
                      ? "text-amber-400"
                      : "text-[#667085]"
                  )}
                  type="button"
                  aria-label={`${star}점`}
                  aria-pressed={rating === star}
                  onClick={() => {
                    setRating(star);
                    setMessage("");
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              aria-label="영화 후기"
              className="mt-2 h-[102px] w-full resize-none rounded-lg border border-[#e0e4eb] bg-white p-3 text-xs leading-5 placeholder:text-[#98a2b3]"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />

            <button
              className="mt-2 h-10 w-full rounded-lg bg-[#191b1f] text-sm font-semibold text-white hover:bg-gray-700"
              type="submit"
            >
              평점 저장
            </button>

            <p role="status" className="mt-2 text-xs text-[#667085]">
              {message}
            </p>
          </form>
        </aside>
      </section>
    </main>
  );
}
