import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { formatReleaseDate, formatRuntime } from "../../utils/movies/format-movie";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export default function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const navigate = useNavigate();
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    // 숫자가 아니거나 0 이하인 id는 요청하지 않아요.
    enabled: isValidMovieId,
    staleTime: 30 * 1000
  });

  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const onBack = () => navigate({ to: "/" });

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("별점을 선택해 주세요.");
      return;
    }
    alert("평점이 저장되었습니다!");
  };

  if (!isValidMovieId || movieDetailQuery.isPending || movieDetailQuery.isError) {
    const message = !isValidMovieId
      ? "올바르지 않은 영화 번호예요."
      : movieDetailQuery.isPending
        ? "영화 정보를 불러오는 중이에요..."
        : getMovieDetailErrorMessage(movieDetailQuery.error);

    return (
      <div className="mx-auto w-full max-w-[1360px] px-4 py-20 sm:px-6 lg:px-10">
        {message}
      </div>
    );
  }

  const movie = movieDetailQuery.data;
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const movieMeta = [
    formatReleaseDate(movie.release_date),
    movie.genres.map((genre) => genre.name).join(" · "),
    formatRuntime(movie.runtime),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="w-full">
      {/* Backdrop Banner */}
      <div className="relative h-[380px] w-full overflow-hidden bg-gray-900">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            className="size-full object-cover opacity-65"
          />
        )}
        <div className="absolute inset-0 flex items-end bg-linear-to-b from-gray-900/40 to-gray-900/85">
          <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-2 px-10 pb-10">
            <button type="button" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-200 transition-colors hover:text-white" onClick={onBack}>
              <img
                src="/movie-icons/chevron-left.svg"
                alt=""
                className="size-4 brightness-0 invert"
              />
              영화 목록
            </button>
            <h1 className="text-[34px] font-extrabold tracking-[-0.5px] text-white">{movie.title}</h1>
            <p className="text-sm text-gray-300">{movie.original_title}</p>
            <p className="mt-1 text-sm text-gray-400">{movieMeta}</p>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="mx-auto max-w-[1360px] px-10 pt-10 pb-20">
        <div className="grid grid-cols-1 items-start gap-10 min-[769px]:grid-cols-[200px_1fr] min-[1025px]:grid-cols-[240px_1fr_340px]">
          {/* Left Poster */}
          <div className="aspect-[2/3] w-full overflow-hidden rounded-xl bg-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="block size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <img src="/movie-icons/movie.svg" alt="" className="size-12 opacity-40" />
              </div>
            )}
          </div>

          {/* Center Info */}
          <div className="flex flex-col gap-4">
            {movie.tagline && (
              <h2 className="text-xl font-extrabold leading-[1.4] text-gray-900">{movie.tagline}</h2>
            )}
            <p className="text-[15px] leading-[1.7] text-gray-600">
              {movie.overview || "등록된 줄거리가 없어요."}
            </p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-2 self-start rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              onClick={() => toggleBookmark(movie.id)}
              aria-pressed={isBookmarked}
            >
              <img
                src={
                  isBookmarked
                    ? "/movie-icons/bookmark.svg"
                    : "/movie-icons/bookmark-outline.svg"
                }
                alt=""
                className="size-[18px] brightness-0 invert"
              />
              즐겨찾기
            </button>
          </div>

          {/* Right Rating Box */}
          <aside className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-[769px]:col-span-2 min-[1025px]:col-span-1 min-[1025px]:mt-0">
            <h3 className="text-[17px] font-bold text-gray-900">내 평점</h3>
            <p className="mt-1 mb-4 text-xs text-gray-400">
              별점은 필수, 후기는 선택이에요.
            </p>

            <form onSubmit={handleSaveReview}>
              <div className="mb-4 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-0.5"
                    onClick={() => setRating(star)}
                    aria-label={`${star}점`}
                  >
                    <img
                      src={
                        star <= rating
                          ? "/movie-icons/star.svg"
                          : "/movie-icons/star-outline.svg"
                      }
                      alt=""
                      className="size-6 opacity-80"
                    />
                  </button>
                ))}
              </div>

              <textarea
                className="mb-4 w-full resize-y rounded-lg border border-gray-200 p-3 font-[inherit] text-[13px] text-gray-900 outline-none focus:border-blue-600"
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
              />

              <button type="submit" className="h-[42px] w-full rounded-md bg-gray-900 text-sm font-bold text-white transition-colors hover:bg-gray-700">
                평점 저장
              </button>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}
