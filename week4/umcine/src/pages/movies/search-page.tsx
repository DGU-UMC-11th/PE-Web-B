import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

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
      ) : (
        <>
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-bold">‘{query}’ 검색 결과</h2>
            <p className="text-xs text-[#969da8]">
              영화 {searchResults.length}편
            </p>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-sm text-[#606774]">검색 결과가 없어요.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex gap-4 border-b border-[#e3e6eb] pb-4"
                >
                  <div className="relative shrink-0">
                    <BookmarkButton movieId={movie.id} />
                    <img
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                      className="h-[190px] w-[126px] shrink-0 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="text-[15px] font-bold">{movie.title}</h3>
                    <div className="mt-1 flex gap-2 text-xs text-[#969da8]">
                      <p>{movie.originalTitle}</p>
                      <p>{movie.releaseDate}</p>
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
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
