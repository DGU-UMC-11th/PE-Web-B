//movie-detail-page.tsx

import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { BookmarkButtonDetailPage } from "../../components/bookmark-button";
import Poster from "../../components/movies/poster";
import { ErrorMessage, LoadingMessage } from "../../components/query-status";
import { toMovieDetail } from "../../utils/movies/movie-adapter";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

export function MovieDetailPage() {
    const {movieId} = useParams({from: "/movies/$movieId"});
    const parsedMovieId = Number(movieId);
    const isValidId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;
    const { data: movie, isPending, error, isFetching, refetch } = useQuery({
        queryKey: ["movie", parsedMovieId],
        queryFn: () => getMovieDetail(parsedMovieId),
        select: toMovieDetail,
        enabled: isValidId,
        retry: (count, err) =>
            !(isHTTPError(err) && err.response.status === 404) && count < 3,
    });

    if (!isValidId || isPending || error) {
        return (
            <main className="mx-auto w-full max-w-[1170px] flex-1 py-10">
                {!isValidId ? (
                    <p>올바르지 않은 영화 번호예요.</p>
                ) : error ? (
                    <ErrorMessage
                        message={getMovieDetailErrorMessage(error)}
                        onRetry={() => refetch()}
                        isRetrying={isFetching}
                    />
                ) : (
                    <LoadingMessage />
                )}
                <Link to="/" className="text-brand underline">영화 목록</Link>
            </main>
        );
    }

    return (
        <main className="flex-1">
            <section className="relative h-[330px] bg-gray-800 text-white">
                {movie.backdropUrl && (
                    <img src={movie.backdropUrl} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover" />
                )}
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
                            {movie.releaseDate} <span className="ml-1">{movie.genreText}</span> <span className="ml-1">{movie.runtimeText}</span>
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-[1170px] gap-8 py-5 md:grid-cols-[183px_1fr]"> {/*_300px*/}
                <Poster
                    src={movie.posterUrl}
                    alt={`${movie.title} 포스터`}
                    className="aspect-[2/3] w-[183px] rounded-lg object-cover shadow-lg"
                />
                <div>
                    <h2 className="text-xl font-bold">{movie.tagline}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{movie.overview}</p>
                    <BookmarkButtonDetailPage movieId={movie.id}/>
                </div>
            </div>
        </main>
    );
}
