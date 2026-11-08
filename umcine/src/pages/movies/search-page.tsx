import { useEffect, useState, type SubmitEvent } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { searchMovies } from "../../api/movies/search-movies.ts";
import type {TmdbMovieListItem} from "../../api/movies/models.ts";
import { formatReleaseDate } from "../../utils/movies/format-movie.ts";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image.ts";

export default function SearchPage() {
  const { query = "" } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const normalizedQuery = query.trim();

  const [searchText, setSearchText] = useState(query);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(normalizedQuery !== "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL의 query가 바뀌면(검색, 뒤로 가기 등) 렌더링 중에 바로 상태를 초기화해요.
  // effect 안에서 setState를 하면 렌더링이 한 번 더 일어나서 이렇게 처리해요.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
      setPrevQuery(query);
      setSearchText(query);

      // 공백만 달라진 경우엔 같은 검색이라 결과를 그대로 둬요.
      if (normalizedQuery !== prevQuery.trim()) {
          setMovies([]);
          setErrorMessage(null);
          setIsLoading(normalizedQuery !== "");
      }
  }

  useEffect(() => {
      if (!normalizedQuery) return;

      let ignore = false;

      searchMovies({ query: normalizedQuery })
          .then((response) => {
              if (!ignore) setMovies(response.results);
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

  function handleClear() {
    setSearchText("");
    navigate({ search: {} });
  }

  return (
    <div className="min-h-[calc(100vh-64px-80px)] w-full">
      <div className="mx-auto max-w-[1360px] px-10 pt-10 pb-[60px]">
        {!normalizedQuery ? (
          <div className="flex flex-col items-center justify-center gap-8 py-[120px]">
            <h1 className="text-[32px] font-extrabold tracking-[-0.5px] text-gray-900">어떤 영화를 찾고 있나요?</h1>
            <form className="flex h-[52px] w-full max-w-[600px] items-center gap-3 rounded-xl border-[1.5px] border-gray-900 bg-white pr-2 pl-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]" onSubmit={handleSubmit}>
              <img
                src="/movie-icons/search.svg"
                alt=""
                className="size-[18px] opacity-60"
              />
              <input
                type="text"
                aria-label="검색어"
                className="h-full flex-1 bg-transparent text-[15px] text-gray-900 outline-none"
                placeholder="예: 스파이더맨"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
              <button type="submit" className="h-[38px] rounded-md bg-gray-900 px-[18px] text-sm font-semibold text-white transition-colors hover:bg-gray-700">
                검색
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col">
            <h1 className="mb-6 text-[26px] font-bold tracking-[-0.5px] text-gray-900">영화 검색</h1>

            <form className="mb-6 flex h-12 w-full items-center gap-3 rounded-lg border border-gray-300 bg-white pr-1.5 pl-4" onSubmit={handleSubmit}>
              <img
                src="/movie-icons/search.svg"
                alt=""
                className="size-[18px] opacity-60"
              />
              <input
                type="text"
                aria-label="검색어"
                className="h-full flex-1 bg-transparent text-[15px] text-gray-900 outline-none"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
              {searchText && (
                <button
                  type="button"
                  className="flex size-7 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
                  onClick={handleClear}
                  aria-label="검색어 지우기"
                >
                  <img
                    src="/movie-icons/close.svg"
                    alt=""
                    className="size-4"
                  />
                </button>
              )}
              <button type="submit" className="h-[38px] rounded-md bg-gray-900 px-[18px] text-sm font-semibold text-white transition-colors hover:bg-gray-700">
                다시 검색
              </button>
            </form>

            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-[17px] font-bold text-gray-900">
                &apos;{query}&apos; 검색 결과
              </h2>
              {!isLoading && !errorMessage && (
                <span className="text-[13px] text-gray-400">
                  영화 {movies.length}편
                </span>
              )}
            </div>

            {isLoading ? (
              <p className="text-sm text-gray-400">검색 중이에요...</p>
            ) : errorMessage ? (
              <p className="text-sm text-red-500">{errorMessage}</p>
            ) : movies.length === 0 ? (
              <p>검색 결과가 없어요.</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-7 min-[901px]:grid-cols-2">
                {movies.map((movie) => {
                  const posterUrl = getTmdbPosterUrl(movie.poster_path);

                  return (
                    <article key={movie.id} className="flex items-start gap-[18px]">
                      <div className="aspect-[2/3] w-[110px] min-w-[110px] overflow-hidden rounded-lg bg-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                        {posterUrl ? (
                          <img
                            src={posterUrl}
                            alt={`${movie.title} 포스터`}
                            className="block size-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center">
                            <img src="/movie-icons/movie.svg" alt="" className="size-8 opacity-40" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-base font-bold text-gray-900">{movie.title}</h3>
                        <p className="text-xs text-gray-500">
                          {movie.original_title} {formatReleaseDate(movie.release_date)}
                        </p>
                        <p className="line-clamp-2 text-[13px] leading-[1.45] text-gray-600">{movie.overview}</p>
                        <Link
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                          className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
                        >
                          상세 보기
                          <img
                            src="/movie-icons/arrow-right.svg"
                            alt=""
                            className="size-3.5 [filter:invert(34%)_sepia(87%)_saturate(2250%)_hue-rotate(210deg)_brightness(97%)_contrast(92%)]"
                          />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
