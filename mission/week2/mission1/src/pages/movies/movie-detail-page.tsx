import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

const ratingScores = [1, 2, 3, 4, 5];

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-20 text-center text-ink-secondary">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main>
      <section className="relative h-[360px] overflow-hidden">
        <img
          className="absolute inset-0 size-full object-cover"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
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
            <p className="text-sm">{movie.originalTitle}</p>
            <p className="flex gap-2 text-[13px] font-bold">
              <span>{movie.releaseDate}</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>{movie.runtime}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1440px] items-start gap-8 px-20 py-6">
        <img
          className="h-[286px] w-[200px] shrink-0 rounded-[10px] bg-page object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <section className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <h2 className="text-[21px] font-bold tracking-[-0.63px]">{movie.tagline}</h2>
          <p className="text-sm leading-6 text-ink-secondary">{movie.overview}</p>
          <button
            type="button"
            className="flex h-[42px] items-center gap-2 rounded-lg border border-white bg-primary px-4 text-sm font-extrabold text-white hover:bg-primary-hover"
          >
            <img src="/icons/bookmark-small.svg" alt="" width={16} height={16} />
            즐겨찾기
          </button>
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
