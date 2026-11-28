import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "@/components/movies/movie-grid";
import Pagination from "@/components/movies/pagination";
import { movieQueries } from "@/api/movies/movie-queries";
import { useBookmarkStore } from "@/stores/bookmark-store";

// 로그인 API 연결 전까지 사용하는 임시 사용자 정보
const SAMPLE_USER = { nickname: "gs0428", email: "gwangsoo@cinemalab.kr" };

export function MyPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const moviesQuery = useQuery(movieQueries.list(1));
  const favorites = (moviesQuery.data?.results ?? []).filter((movie) =>
    bookmarkedMovieIds.includes(movie.id),
  );

  return (
    <main className="flex flex-col gap-6 px-20 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#17191e]">내 정보</h1>
        <Link
          to="/me/edit"
          className="flex h-[42px] items-center rounded-lg bg-[#2563eb] px-4 text-sm font-extrabold text-white"
        >
          정보 수정
        </Link>
      </div>

      <section className="flex flex-col gap-4 border-t border-[#e3e6eb] pt-4">
        <h2 className="text-base font-bold text-[#17191e]">기본 정보</h2>
        <div className="flex items-center gap-8 border-b border-[#e3e6eb] pb-6">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#e3e6eb]">
            <img src="/icons/person.svg" alt="" className="size-8" />
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-8">
            <div>
              <dt className="text-xs text-[#969da8]">닉네임</dt>
              <dd className="text-sm font-bold text-[#17191e]">
                {SAMPLE_USER.nickname}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#969da8]">이메일</dt>
              <dd className="text-sm font-bold text-[#17191e]">
                {SAMPLE_USER.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-[#17191e]">내 즐겨찾기</h2>
        {favorites.length === 0 ? (
          <p className="text-sm text-[#606774]">즐겨찾기한 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={favorites} />
        )}
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </section>
    </main>
  );
}
