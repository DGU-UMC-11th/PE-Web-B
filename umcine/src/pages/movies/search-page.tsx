import { BookmarkButton } from "../../components/bookmark-button";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../api/movies/search-movies";
import { MoviePoster } from "../../components/movies/movie-poster";
import { StatusMessage } from "../../components/status-message";
import { cn } from "../../utils/cn";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

const containerClass =
  "mx-auto w-full max-w-[1440px] flex-1 px-4 sm:px-6 md:px-8 xl:px-20";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [syncedQuery, setSyncedQuery] = useState(query);

  // 뒤로/앞으로 가기로 URL의 query가 바뀌면 입력창도 함께 맞춰요.
  if (syncedQuery !== query) {
    setSyncedQuery(query);
    setSearchText(query ?? "");
  }

  const normalizedQuery = query?.trim() ?? "";

  // 검색어를 key에 넣어서 검색어마다 캐시를 따로 저장하고, 빈 검색어는 요청하지 않아요.
  const searchQuery = useQuery({
    queryKey: ["movies", "search", { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];
  const totalResults = searchQuery.data?.total_results ?? 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  const searchForm = (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg border border-[#191b1f] bg-white py-1.5 pr-1.5 pl-3",
        !normalizedQuery && "max-w-[520px]",
      )}
      role="search"
    >
      <img className="size-5 opacity-60" src="/icons/search.svg" alt="" />
      <input
        aria-label="검색어"
        placeholder="영화 제목을 입력하세요."
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <button
        type="submit"
        className="h-8 shrink-0 rounded-md bg-[#191b1f] px-4 text-sm font-semibold text-white"
      >
        검색
      </button>
    </form>
  );

  if (!normalizedQuery) {
    return (
      <main
        className={cn(
          containerClass,
          "flex flex-col items-center justify-center gap-6 py-24",
        )}
      >
        <h1 className="m-0 text-2xl font-bold tracking-[-0.8px] md:text-[28px]">
          어떤 영화를 찾고 있나요?
        </h1>
        {searchForm}
        <p className="m-0 text-sm text-gray-500">검색어를 입력해 주세요.</p>
      </main>
    );
  }

  return (
    <main className={cn(containerClass, "pt-6 pb-16 md:pb-32")}>
      <h1 className="mt-0 mb-5 text-[28px] leading-9 font-bold tracking-[-1.2px] md:text-4xl md:leading-[44px]">
        영화 검색
      </h1>
      {searchForm}

      {searchQuery.isLoading ? (
        <StatusMessage message="검색 결과를 불러오는 중이에요." />
      ) : searchQuery.isError ? (
        <StatusMessage message="검색 결과를 불러오지 못했어요." />
      ) : (
        <>
          <div className="mt-6 mb-4 flex items-baseline gap-2">
            <h2 className="m-0 text-base font-semibold">‘{normalizedQuery}’ 검색 결과</h2>
            <p className="m-0 text-sm text-gray-500">영화 {totalResults}편</p>
          </div>

          {searchResults.length === 0 ? (
            <StatusMessage message="조건에 맞는 영화가 없어요." />
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-6 p-0 lg:grid-cols-2">
              {searchResults.map((movie) => (
                <li key={movie.id} className="flex gap-4">
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="shrink-0"
                  >
                    <MoviePoster
                      className="block h-[136px] w-24 rounded-lg"
                      src={getTmdbPosterUrl(movie.poster_path)}
                      alt={`${movie.title} 포스터`}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="m-0 truncate text-base font-semibold">{movie.title}</h3>
                    <p className="m-0 text-xs text-gray-500">{movie.original_title}</p>
                    <p className="mt-1 mb-0 text-xs text-gray-400">{movie.release_date}</p>
                    <p className="mt-2 mb-0 line-clamp-2 text-[13px] leading-5 text-gray-600">
                      {movie.overview}
                    </p>
                    <BookmarkButton movieId={movie.id} title={movie.title} className="mt-2 w-fit" />
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] font-semibold text-blue-600 no-underline hover:underline"
                    >
                      상세 보기
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
