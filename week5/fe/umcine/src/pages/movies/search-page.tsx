
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  return <SearchContent key={query ?? ""} query={query ?? ""} />;
}

function SearchContent({ query }: { query: string }) {
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query);

  const [results, setResults] = useState<TmdbMovieListItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedQuery = query.trim();

  useEffect(() => {
    let ignore = false;

    setResults([]);
    setTotalResults(0);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) {
          setResults(response.results);
          setTotalResults(response.total_results);
        }
      })
      .catch(() => {
        if (!ignore) {
          setErrorMessage("검색 결과를 불러오지 못했어요.");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    void navigate({
      to: "/search",
      search: searchText.trim()
        ? { query: searchText.trim() }
        : {},
    });
  }

  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[1440px] flex-1 px-20 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4",
        normalizedQuery
          ? "pt-6 pb-12"
          : "pt-[204px] max-[760px]:pt-28"
      )}
    >
      <h1
        className={cn(
          "font-bold tracking-[-1.2px]",
          normalizedQuery
            ? "mb-5 text-4xl leading-11"
            : "mb-9 text-center text-[44px] leading-[58px] max-[760px]:text-[30px]"
        )}
      >
        {normalizedQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
      </h1>

      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full items-center gap-4 bg-white",
          normalizedQuery
            ? "h-[54px] rounded-lg border border-[#e0e4eb] px-3"
            : "mx-auto h-[74px] max-w-[790px] rounded-xl border-2 border-[#191b1f] px-4 shadow-lg"
        )}
      >
        <img className="size-6 opacity-65" src="/icons/search.svg" alt="" />

        <input
          name="query"
          aria-label="검색어"
          className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-[#98a2b3]"
          placeholder="예: 스파이더맨"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        {searchText && (
          <button
            type="button"
            aria-label="검색어 지우기"
            className="grid size-8 shrink-0 place-items-center"
            onClick={() => setSearchText("")}
          >
            <img src="/icons/close.svg" className="size-5" alt="" />
          </button>
        )}

        <button
          type="submit"
          className="h-[42px] shrink-0 rounded-lg bg-[#191b1f] px-4 text-sm font-semibold text-white hover:bg-gray-700"
        >
          {normalizedQuery ? "다시 검색" : "검색"}
        </button>
      </form>

      {normalizedQuery && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e0e4eb] py-4">
            <h2 className="font-bold break-all">
              ‘{normalizedQuery}’ 검색 결과
            </h2>
            <p className="text-xs text-[#98a2b3]">
              영화 {totalResults}편
            </p>
          </div>

          {isLoading ? (
            <p role="status" className="py-10 text-center">
              검색 중이에요...
            </p>
          ) : errorMessage ? (
            <p role="alert" className="py-10 text-center text-red-500">
              {errorMessage}
            </p>
          ) : results.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center gap-2 text-[#667085]">
              <p className="font-semibold">검색 결과가 없어요.</p>
              <p className="text-sm">다른 영화 제목으로 다시 검색해 보세요.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-10 max-[760px]:grid-cols-1">
              {results.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <li
                    key={movie.id}
                    className="border-b border-[#e0e4eb] py-5"
                  >
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="group flex h-full gap-[18px] rounded-lg"
                    >
                      {posterUrl ? (
                        <img
                          className="h-[190px] w-[126px] shrink-0 rounded-lg object-cover max-[540px]:h-[150px] max-[540px]:w-[100px]"
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                        />
                      ) : (
                        <div className="flex h-[190px] w-[126px] shrink-0 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
                          이미지 없음
                        </div>
                      )}

                      <div className="min-w-0 flex-1 py-1">
                        <h3 className="text-lg font-bold group-hover:text-blue-600">
                          {movie.title}
                        </h3>

                        <p className="mt-2 flex flex-wrap gap-x-2 text-xs text-[#98a2b3]">
                          <span>{movie.original_title}</span>
                          <span>{movie.release_date}</span>
                        </p>

                        <p className="mt-2 text-xs leading-5 text-[#667085]">
                          {movie.overview}
                        </p>

                        <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                          상세 보기
                          <img className="size-4" src="/icons/arrow-right.svg" alt="" />
                        </span>
                      </div>
                    </Link>

                    <div className="mt-3 text-sm">
                      <BookmarkButton movieId={movie.id} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
