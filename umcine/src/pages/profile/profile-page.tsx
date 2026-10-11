import type { Movie } from "../../types/movie";
import MovieCard from "../../components/movies/movie-card";
import Pagination from "../../components/movies/pagination";

interface ProfilePageProps {
  nickname: string;
  email: string;
  bookmarkedMovies: Movie[];
  onToggleBookmark: (id: number) => void;
  onNavigateEdit: () => void;
}

export default function ProfilePage({
  nickname,
  email,
  bookmarkedMovies,
  onToggleBookmark,
  onNavigateEdit,
}: ProfilePageProps) {
  return (
    <div className="min-h-[calc(100vh-64px-80px)] w-full">
      <div className="mx-auto max-w-[1360px] px-10 pt-10 pb-[60px]">
        <div className="mb-9 flex items-center justify-between">
          <h1 className="text-[26px] font-extrabold tracking-[-0.5px] text-gray-900">내 정보</h1>
          <button
            type="button"
            className="h-[38px] rounded-lg bg-blue-600 px-[18px] text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            onClick={onNavigateEdit}
          >
            정보 수정
          </button>
        </div>

        {/* 기본 정보 */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-bold text-gray-900">기본 정보</h2>
          <div className="flex items-center gap-12 border-b border-gray-200 pt-6 pb-8">
            <div className="flex size-[68px] items-center justify-center rounded-full bg-gray-200">
              <img
                src="/movie-icons/person.svg"
                alt=""
                className="size-9 opacity-60"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">닉네임</span>
              <span className="text-[15px] font-bold text-gray-900">{nickname}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">이메일</span>
              <span className="text-[15px] font-bold text-gray-900">{email}</span>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-bold text-gray-900">내 즐겨찾기</h2>
          {bookmarkedMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-x-5 gap-y-7 min-[641px]:grid-cols-3 min-[901px]:grid-cols-4 min-[1201px]:grid-cols-5">
                {bookmarkedMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={onToggleBookmark}
                  />
                ))}
              </div>
              <Pagination currentPage={1} totalPages={1} />
            </>
          ) : (
            <p className="py-10 text-sm text-gray-400">
              아직 즐겨찾기한 영화가 없습니다.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
