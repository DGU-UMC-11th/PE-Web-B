import { Link } from "@tanstack/react-router";
import { movies } from "../../data/movies";

const favoriteMovies = movies.filter((movie) => [1, 2, 5].includes(movie.id));

export function MyPage() {
  const nickname = localStorage.getItem("umcine-profile-nickname") || "gs0428";

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-20 pb-16 pt-7 max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4">
      <div className="flex items-center justify-between border-b border-[#e0e4eb] pb-7">
        <h1 className="text-[30px] font-bold tracking-[-0.8px]">내 정보</h1>
        <Link to="/mypage-edit" className="rounded-md bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white">정보 수정</Link>
      </div>
      <section className="border-b border-[#e0e4eb] py-4">
        <h2 className="mb-5 text-base font-bold">기본 정보</h2>
        <div className="flex flex-wrap items-center gap-6 max-[540px]:gap-4">
          <div className="grid size-20 place-items-center rounded-full bg-[#e5e7eb]">
            <img src="/icons/person.svg" alt="" className="size-11" />
          </div>
          <div className="w-[300px] max-[540px]:w-auto">
            <p className="text-xs text-[#98a2b3]">닉네임</p>
            <p className="mt-1 text-sm font-semibold">{nickname}</p>
          </div>
          <div>
            <p className="text-xs text-[#98a2b3]">이메일</p>
            <p className="mt-1 text-sm font-semibold">gwangsoo@cinemalab.kr</p>
          </div>
        </div>
      </section>
      <section className="pt-7">
        <h2 className="mb-4 text-base font-bold">내 즐겨찾기</h2>
        <div className="grid max-w-[720px] grid-cols-3 gap-5 max-[540px]:grid-cols-2">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="min-w-0">
              <img src={movie.posterPath} alt={`${movie.title} 포스터`} className="aspect-[0.88] w-full rounded-[10px] object-cover" />
              <h3 className="mt-2 truncate text-sm font-semibold">{movie.title}</h3>
              <p className="text-xs text-[#98a2b3]">{movie.releaseDate}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex max-w-[720px] justify-center">
          <span className="rounded-lg bg-[#191b1f] px-4 py-2 text-sm text-white">1</span>
        </div>
      </section>
    </main>
  );
}
