import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../../data/movies";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => String(item.id) === movieId);
  if (!movie) return <main className="grid flex-1 place-items-center px-4 py-32"><div className="text-center"><h1 className="text-lg font-semibold">영화를 찾을 수 없어요.</h1><Link to="/" className="mt-4 inline-block text-sm text-blue-600">영화 목록으로 돌아가기</Link></div></main>;
  return <MovieDetail key={movie.id} movie={movie} />;
}
function MovieDetail({ movie }: { movie: Movie }) {
  const [bookmarked, setBookmarked] = useState(movie.isBookmarked);
  const [savedReview] = useState(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(`umcine-review-${movie.id}`) ?? "null");
      if (saved && typeof saved === "object" && "rating" in saved && "review" in saved && typeof saved.rating === "number" && Number.isInteger(saved.rating) && saved.rating >= 1 && saved.rating <= 5 && typeof saved.review === "string") return { rating: saved.rating, review: saved.review };
    } catch { /* Storage may be unavailable. */ }
    return { rating: 0, review: "" };
  });
  const [rating, setRating] = useState(savedReview.rating);
  const [review, setReview] = useState(savedReview.review);
  const [message, setMessage] = useState("");
  return <main className="flex-1">
    <section className="relative h-[360px] overflow-hidden bg-[#191b1f]">
      <img className="absolute inset-0 h-full w-full object-cover" src={movie.backdropPath} alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-20 py-6 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
        <Link className="flex w-fit items-center gap-2 text-xs font-semibold text-white" to="/"><img className="size-5 invert" src="/icons/chevron-left.svg" alt="" />영화 목록</Link>
        <div className="text-white">
          <h1 className="text-[44px] leading-tight font-bold tracking-[-1.5px] max-[760px]:text-[30px]">{movie.title}</h1>
          <p className="mt-2 text-sm">{movie.originalTitle}</p>
          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold"><span>{movie.releaseDate}</span><span>{movie.genres.join(" · ")}</span><span>{movie.runtime}</span></div>
        </div>
      </div>
    </section>
    <section className="mx-auto grid w-full max-w-[1440px] grid-cols-[200px_minmax(0,1fr)_360px] gap-8 px-20 py-6 max-[1100px]:grid-cols-[180px_minmax(0,1fr)] max-[1100px]:px-8 max-[760px]:grid-cols-1 max-[760px]:px-6 max-[540px]:px-4">
      <img className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-xl max-[1100px]:w-[180px]" src={movie.posterPath} alt={`${movie.title} 포스터`} />
      <div>
        <h2 className="text-xl font-bold tracking-[-0.6px]">{movie.tagline}</h2>
        <p className="mt-3 text-sm leading-6 text-[#667085]">{movie.overview}</p>
        <button className={cn("mt-4 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold", bookmarked ? "bg-blue-700 text-white" : "bg-[#2563eb] text-white hover:bg-blue-700")} type="button" aria-pressed={bookmarked} onClick={() => setBookmarked(!bookmarked)}><img className="size-4 invert" src={bookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"} alt="" />{bookmarked ? "즐겨찾기 해제" : "즐겨찾기"}</button>
      </div>
      <aside className="border-l border-[#e0e4eb] pl-[30px] max-[1100px]:col-start-2 max-[1100px]:border-l-0 max-[1100px]:pl-0 max-[760px]:col-start-auto">
        <h2 className="text-xl font-bold">내 평점</h2>
        <p className="mt-1 text-xs text-[#98a2b3]">별점은 필수, 후기는 선택이에요.</p>
        <form onSubmit={(event) => { event.preventDefault(); if (!rating) { setMessage("별점을 선택해 주세요."); return; } try { localStorage.setItem(`umcine-review-${movie.id}`, JSON.stringify({ rating, review })); setMessage("이 브라우저에 평점을 저장했어요."); } catch { setMessage("평점을 저장하지 못했어요. 브라우저 저장 설정을 확인해 주세요."); } }}>
          <div className="mt-2 flex gap-1" role="group" aria-label="별점 선택">{[1, 2, 3, 4, 5].map((star) => <button key={star} className={cn("grid size-[38px] place-items-center rounded-lg border border-[#e0e4eb] bg-white text-2xl", star <= rating ? "text-amber-400" : "text-[#667085]")} type="button" aria-label={`${star}점`} aria-pressed={rating === star} onClick={() => { setRating(star); setMessage(""); }}>★</button>)}</div>
          <textarea aria-label="영화 후기" className="mt-2 h-[102px] w-full resize-none rounded-lg border border-[#e0e4eb] bg-white p-3 text-xs leading-5 placeholder:text-[#98a2b3]" placeholder="영화를 보고 느낀 점을 남겨보세요." value={review} onChange={(event) => setReview(event.target.value)} />
          <button className="mt-2 h-10 w-full rounded-lg bg-[#191b1f] text-sm font-semibold text-white hover:bg-gray-700" type="submit">평점 저장</button>
          <p role="status" className="mt-2 text-xs text-[#667085]">{message}</p>
        </form>
      </aside>
    </section>
  </main>;
}

