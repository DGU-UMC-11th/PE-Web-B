import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useContext, useState, type SubmitEvent } from "react";
import { MovieContext } from "../../contexts/movie-context";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const { movies } = useContext(MovieContext);
  const [searchText, setSearchText] = useState(query ?? "");

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

  const hasQuery = !!normalizedQuery;

  return (
    <main className={cn("mx-auto w-full max-w-[1170px] flex-1 py-8", !hasQuery && "pt-32")}>
      <h1 className={cn("font-extrabold", hasQuery ? "mb-4 text-4xl" : "mb-8 text-center text-4xl")}>
        {hasQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center gap-3 rounded-xl bg-white p-2 pl-4",
          hasQuery
            ? "border border-gray-200"
            : "mx-auto max-w-[720px] border-2 border-ink p-3 pl-4 shadow-lg",
        )}
      >
        <img src="/icons/search.svg" alt="" className="size-5" />
        <input
          aria-label="검색어"
          placeholder="예: 스파이더맨"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value ?? "")}
          className="flex-1 bg-transparent text-sm outline-none"
        />
        {hasQuery && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => { setSearchText(""); navigate({ search: {} }); }}
            className="p-1"
          >
            <img src="/icons/close.svg" alt="" className="size-5" />
          </button>
        )}
        <button type="submit" className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white">
          {hasQuery ? "다시 검색" : "검색"}
        </button>
      </form>

      {hasQuery && (
        <>
          <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="font-bold">‘{query}’ 검색 결과</h2>
            <p className="text-xs text-gray-400">영화 {searchResults.length}편 · 1페이지</p>
          </div>
          {searchResults.length === 0 ? (
            <p className="py-16 text-center text-gray-500">검색 결과가 없어요.</p>
          ) : (
            <ul className="grid gap-x-8 md:grid-cols-2">
              {searchResults.map((movie) => (
                <li key={movie.id} className="flex gap-4 border-b border-gray-200 py-5">
                  <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="h-[174px] w-[115px] shrink-0 rounded-md object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-lg font-bold">{movie.title}</h3>
                    <p className="text-xs text-gray-400">
                      {movie.originalTitle} <span className="ml-1">{movie.releaseDate}</span>
                    </p>
                    <p className="line-clamp-2 text-sm text-gray-600">{movie.overview}</p>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-auto flex items-center gap-1 text-xs font-bold text-brand"
                    >
                      상세 보기 <span aria-hidden className="size-4 bg-brand [mask:url(/icons/arrow-right.svg)_center/contain_no-repeat]" />
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
