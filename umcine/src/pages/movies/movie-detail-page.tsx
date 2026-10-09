//movie-detail-page.tsx

import { Link, useParams } from "@tanstack/react-router";
import { useContext } from "react";
import { MovieContext } from "../../contexts/movie-context";
import { BookmarkButtonDetailPage } from "../../components/bookmark-button";

export function MovieDetailPage() {
    const {movieId} = useParams({from: "/movies/$movieId"});
    const {movies} = useContext(MovieContext);

    const movie = movies.find((m) => m.id === Number(movieId));
    if (!movie) {
        return (
            <main className="mx-auto w-full max-w-[1170px] flex-1 py-10">
                <p>해당하는 영화를 찾을 수 없어요.</p>
                <Link to="/" className="text-brand underline">영화 목록</Link>
            </main>
        )
    }

    return (
        <main className="flex-1">
            <section className="relative h-[330px] text-white">
                <img src={movie.backdropPath} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
                {/* aria-hidden:true 단순 꾸미기 용도. 스크린 리더는 이거 건너뛰셈 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <div className="relative mx-auto flex h-full max-w-[1170px] flex-col justify-between py-6">
                    <Link to="/" className="flex w-fit items-center gap-1 text-xs font-bold">
                        <img src="/icons/chevron-left.svg" alt="" className="size-4 invert" />
                        영화 목록
                    </Link>
                    <div>
                        <h1 className="text-5xl font-extrabold">{movie.title}</h1>
                        <p className="mt-2 text-sm">{movie.originalTitle}</p>
                        <p className="mt-1 text-xs font-bold">
                            {movie.releaseDate} <span className="ml-1">{movie.genres.join(" · ")}</span> <span className="ml-1">{movie.runtime}</span>
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-[1170px] gap-8 py-5 md:grid-cols-[183px_1fr]"> {/*_300px*/}
                <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="w-[183px] rounded-lg shadow-lg"
                />
                <div>
                    <h2 className="text-xl font-bold">{movie.tagline}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{movie.overview}</p>
                    <BookmarkButtonDetailPage movieId={movie.id}/>
                </div>
                {/* <div className="md:border-l md:border-gray-200 md:pl-6">
                    
                </div> */}
            </div>
        </main>
    );
}
