import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { useQuery } from "@tanstack/react-query";
import { movieQueries } from "../../api/movies/movie-queries";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  const normalizedQuery = query?.trim() ?? "";

  const searchQuery = useQuery({
    ...movieQueries.search(normalizedQuery),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="flex flex-col gap-5 px-20 py-6">
      <h1 className="text-[38px] font-bold leading-[44px] tracking-[-1.71px]">
        영화 검색
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex h-12 items-center gap-3 rounded-lg border border-[#e3e6eb] bg-white px-4"
      >
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          type="submit"
          className="h-9 shrink-0 rounded-md bg-[#17191e] px-3.5 text-xs font-extrabold text-white"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-sm text-[#606774]">검색어를 입력해 주세요.</p>
      ) : searchQuery.isLoading ? (
        <p className="text-sm text-[#606774]">검색 결과를 불러오는 중이에요.</p>
      ) : searchQuery.isError ? (
        <p className="text-sm text-[#606774]">{searchQuery.error.message}</p>
      ) : searchQuery.isSuccess && searchResults.length === 0 ? (
        <p className="text-sm text-[#606774]">검색 결과가 없어요.</p>
      ) : (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-bold">‘{query}’ 검색 결과</h2>
            <p className="text-xs text-[#969da8]">
              영화 {searchResults.length}편
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            {searchResults.map((movie) => {
              const posterUrl = getTmdbPosterUrl(movie.poster_path);

              return (
                <li
                  key={movie.id}
                  className="flex gap-4 border-b border-[#e3e6eb] pb-4"
                >
                  <div className="relative shrink-0">
                    <BookmarkButton movieId={movie.id} />
                    {posterUrl ? (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                        className="h-[190px] w-[126px] shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-[190px] w-[126px] shrink-0 items-center justify-center rounded-lg bg-[#e3e6eb] text-xs text-[#969da8]">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="text-[15px] font-bold">{movie.title}</h3>
                    <div className="mt-1 flex gap-2 text-xs text-[#969da8]">
                      <p>{movie.original_title}</p>
                      <p>{movie.release_date}</p>
                    </div>
                    <p className="mt-2 text-[13px] leading-5 text-[#606774]">
                      {movie.overview}
                    </p>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-2.5 w-fit text-xs font-bold text-blue-600"
                    >
                      상세 보기
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}
