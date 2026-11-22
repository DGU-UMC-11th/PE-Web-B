import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import FavoriteToggleButton from "../../components/movies/favorite-toggle-button";
import MyRatingBox from "../../components/movies/my-rating-box";
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

  const onBack = () => navigate({ to: "/" });

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
            <FavoriteToggleButton movieId={movie.id} />
          </div>

          {/* Right Rating Box */}
          <MyRatingBox movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
