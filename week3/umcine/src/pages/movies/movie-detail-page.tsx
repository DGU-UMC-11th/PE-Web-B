import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main>
      <section className="relative h-[360px] text-white">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between px-20 py-6">
          <Link to="/" className="w-fit text-[13px] font-bold">
            영화 목록
          </Link>

          <div className="flex max-w-[800px] flex-col gap-1.5">
            <h1 className="text-[46px] font-bold leading-[1.08]">{movie.title}</h1>
            <p className="text-sm">{movie.originalTitle}</p>
            <div className="mt-1 flex gap-2.5 text-[13px] font-bold">
              <p>{movie.releaseDate}</p>
              <p>{movie.genres.join(" · ")}</p>
              <p>{movie.runtime}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-8 px-20 py-6">
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="h-[286px] w-[200px] shrink-0 rounded-[10px] object-cover"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="text-[21px] font-bold leading-[25px]">{movie.tagline}</h2>
          <p className="text-sm leading-6 text-[#606774]">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}
