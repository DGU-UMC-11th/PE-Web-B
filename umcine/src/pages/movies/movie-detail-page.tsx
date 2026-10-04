import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../../data/movies";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

const containerClass = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 xl:px-20";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className={cn(containerClass, "flex-1 py-24 text-center text-gray-500")}>
        영화를 찾을 수 없어요.
      </main>
    );
  }

  // 다른 영화로 이동하면 key가 바뀌어 즐겨찾기·평점 상태가 새로 시작돼요.
  return <MovieDetail key={movie.id} movie={movie} />;
}

function MovieDetail({ movie }: { movie: Movie }) {
  const [isBookmarked, setIsBookmarked] = useState(movie.isBookmarked);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <main className="flex-1">
      <section className="relative h-[300px] overflow-hidden bg-[#191b1f] md:h-[360px]">
        <img
          className="absolute inset-0 size-full object-cover"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
        />
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
            <p className="mt-1 mb-0 text-sm text-white/80">{movie.originalTitle}</p>
            <p className="mt-2 mb-0 text-xs font-semibold text-white/90 md:text-sm">
              {[movie.releaseDate, movie.genres.join(" · "), movie.runtime].join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      <div className={cn(containerClass, "flex flex-col gap-10 pt-6 pb-16 lg:flex-row lg:gap-8 md:pb-24")}>
        <div className="flex flex-1 flex-col gap-6 sm:flex-row">
          <img
            className="block aspect-[200/288] w-40 shrink-0 rounded-[10px] object-cover shadow-lg sm:w-[200px]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
          <div className="min-w-0">
            <h2 className="m-0 text-lg font-bold tracking-[-0.5px]">{movie.tagline}</h2>
            <p className="mt-3 mb-0 text-[13px] leading-6 text-gray-600">{movie.overview}</p>
            <button
              type="button"
              className={cn(
                "mt-4 inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-white",
                isBookmarked ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-700",
              )}
              aria-pressed={isBookmarked}
              onClick={() => setIsBookmarked((current) => !current)}
            >
              <img
                className="size-4 invert"
                src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                alt=""
              />
              {isBookmarked ? "즐겨찾기됨" : "즐겨찾기"}
            </button>
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
