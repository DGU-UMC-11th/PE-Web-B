import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/movies/bookmark-button";
import { MovieImage } from "../../components/movies/movie-image";
import { StatusMessage } from "../../components/movies/status-message";
import { formatReleaseDate } from "../../utils/movies/format-movie";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [syncedQuery, setSyncedQuery] = useState(query);

  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setSearchText(query ?? "");
  }

  const normalizedQuery = query?.trim() ?? "";
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setMovies([]);
    setTotalResults(0);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (ignore) return;
        setMovies(response.results);
        setTotalResults(response.total_results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [normalizedQuery]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  if (!normalizedQuery) {
    return (
      <main className="flex flex-col items-center px-[72px] pt-[209px] pb-[210px]">
        <div className="flex w-[790px] flex-col items-center gap-9">
          <h1 className="text-[46px] leading-[52.44px] font-bold tracking-[-2.3px]">
            어떤 영화를 찾고 있나요?
          </h1>
          <form
            className="flex h-[74px] w-full items-center gap-3.5 rounded-xl border-2 border-ink bg-surface pr-[17px] pl-[21px] drop-shadow-[0_12px_17px_rgba(17,19,24,0.08)]"
            onSubmit={handleSubmit}
          >
            <img src="/icons/search.svg" alt="" width={24} height={24} />
            <input
              className="min-w-0 flex-1 px-0.5 text-[17px] outline-none placeholder:text-ink-tertiary"
              aria-label="검색어"
              placeholder="예: 스파이더맨"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              type="submit"
              className="h-[42px] rounded-lg bg-ink px-4 text-sm font-extrabold text-white"
            >
              검색
            </button>
          </form>
          <p className="text-sm text-ink-tertiary">검색어를 입력해 주세요.</p>
        </div>
      </main>
    );
  }

  function renderResults() {
    if (isLoading) return <StatusMessage>검색 결과를 불러오는 중이에요.</StatusMessage>;
    if (errorMessage) return <StatusMessage tone="error">{errorMessage}</StatusMessage>;
    if (movies.length === 0) return <StatusMessage>검색 결과가 없어요.</StatusMessage>;

    return (
      <ul className="grid grid-cols-2 gap-x-10">
        {movies.map((movie) => (
          <li key={movie.id}>
            <article className="flex gap-[18px] border-b border-line py-5">
              <div className="relative h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-page">
                <MovieImage
                  className="size-full"
                  src={getTmdbPosterUrl(movie.poster_path)}
                  alt={`${movie.title} 포스터`}
                />
                <BookmarkButton
                  movieId={movie.id}
                  movieTitle={movie.title}
                  className="absolute top-2 right-2"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
                <h3 className="text-lg leading-[24.3px] font-bold">{movie.title}</h3>
                <p className="flex gap-2 text-xs text-ink-tertiary">
                  <span>{movie.original_title}</span>
                  <span>{formatReleaseDate(movie.release_date)}</span>
                </p>
                <p className="line-clamp-3 h-[66px] text-[12.5px] leading-[20.25px] text-ink-secondary">
                  {movie.overview || "줄거리 정보가 없어요."}
                </p>
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
                  className="flex items-center gap-1 self-start text-xs font-extrabold text-primary"
                >
                  상세 보기
                  <img src="/icons/arrow-right.svg" alt="" width={16} height={16} />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="mx-auto flex max-w-[1440px] flex-col px-20 py-6">
      <div className="flex flex-col gap-[17px]">
        <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px]">
          영화 검색
        </h1>
        <form
          className="flex h-[54px] items-center gap-[18px] rounded-[9px] border border-line bg-surface pr-2.5 pl-[15px]"
          onSubmit={handleSubmit}
        >
          <img src="/icons/search.svg" alt="" width={24} height={24} />
          <input
            className="min-w-0 flex-1 px-0.5 text-sm font-bold outline-none placeholder:font-normal placeholder:text-ink-tertiary"
            aria-label="검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setSearchText("")}
          >
            <img src="/icons/close.svg" alt="" width={24} height={24} />
          </button>
          <button
            type="submit"
            className="h-[42px] rounded-lg bg-ink px-4 text-sm font-extrabold text-white"
          >
            다시 검색
          </button>
        </form>
      </div>

      <div className="flex h-[54px] items-center justify-between border-y border-line">
        <h2 className="text-lg font-bold">‘{query}’ 검색 결과</h2>
        {!isLoading && !errorMessage && (
          <span className="text-xs text-ink-tertiary">영화 {totalResults}편</span>
        )}
      </div>

      {renderResults()}
    </main>
  );
}
