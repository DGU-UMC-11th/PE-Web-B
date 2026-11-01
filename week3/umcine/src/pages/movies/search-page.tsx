import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  return <SearchContent key={query ?? ""} query={query ?? ""} />;
}
function SearchContent({ query }: { query: string }) {
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const results = normalizedQuery ? movies.filter((movie) => [movie.title, movie.originalTitle].some((title) => title.toLocaleLowerCase().includes(normalizedQuery))) : [];
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    void navigate({ to: "/search", search: searchText.trim() ? { query: searchText.trim() } : {} });
  }
  return <main className={cn("mx-auto w-full max-w-[1440px] flex-1 px-20 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4", normalizedQuery ? "pt-6 pb-12" : "pt-[204px] max-[760px]:pt-28")}>
    <h1 className={cn("font-bold tracking-[-1.2px]", normalizedQuery ? "mb-5 text-4xl leading-11" : "mb-9 text-center text-[44px] leading-[58px] max-[760px]:text-[30px]")}>{normalizedQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}</h1>
    <form role="search" onSubmit={handleSubmit} className={cn("flex w-full items-center gap-4 bg-white", normalizedQuery ? "h-[54px] rounded-lg border border-[#e0e4eb] px-3" : "mx-auto h-[74px] max-w-[790px] rounded-xl border-2 border-[#191b1f] px-4 shadow-lg")}>
      <img className="size-6 opacity-65" src="/icons/search.svg" alt="" />
      <input name="query" aria-label="검색어" className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-[#98a2b3]" placeholder="예: 스파이더맨" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
      {searchText && <button type="button" aria-label="검색어 지우기" className="grid size-8 shrink-0 place-items-center" onClick={() => setSearchText("")}><img src="/icons/close.svg" className="size-5" alt="" /></button>}
      <button type="submit" className="h-[42px] shrink-0 rounded-lg bg-[#191b1f] px-4 text-sm font-semibold text-white hover:bg-gray-700">{normalizedQuery ? "다시 검색" : "검색"}</button>
    </form>
    {normalizedQuery && <>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e0e4eb] py-4" aria-live="polite">
        <h2 className="font-bold break-all">‘{query.trim()}’ 검색 결과</h2>
        <p className="text-xs text-[#98a2b3]">영화 {results.length}편</p>
      </div>
      {results.length ? <ul className="grid grid-cols-2 gap-x-10 max-[760px]:grid-cols-1">
        {results.map((movie) => <li key={movie.id} className="border-b border-[#e0e4eb] py-5">
          <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }} className="group flex h-full gap-[18px] rounded-lg">
            <img className="h-[190px] w-[126px] shrink-0 rounded-lg object-cover max-[540px]:h-[150px] max-[540px]:w-[100px]" src={movie.posterPath} alt={`${movie.title} 포스터`} />
            <div className="min-w-0 flex-1 py-1">
              <h3 className="text-lg font-bold group-hover:text-blue-600">{movie.title}</h3>
              <p className="mt-2 flex flex-wrap gap-x-2 text-xs text-[#98a2b3]"><span>{movie.originalTitle}</span><span>{movie.releaseDate}</span></p>
              <p className="mt-2 text-xs leading-5 text-[#667085]">{movie.overview}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">상세 보기 <img className="size-4" src="/icons/arrow-right.svg" alt="" /></span>
            </div>
          </Link>
        </li>)}
      </ul> : <div className="flex min-h-[350px] flex-col items-center justify-center gap-2 text-[#667085]"><p className="font-semibold">검색 결과가 없어요.</p><p className="text-sm">다른 영화 제목으로 다시 검색해 보세요.</p></div>}
    </>}
  </main>;
}

