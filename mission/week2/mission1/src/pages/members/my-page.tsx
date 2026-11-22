import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { Favorite } from "../../api/favorites/favorites";
import { movieDetailQueryOptions } from "../../api/movies/movie-detail-query";
import { AuthLayout } from "../../components/auth/auth-layout";
import { MovieImage } from "../../components/movies/movie-image";
import { useFavoritesQuery } from "../../hooks/use-favorites";
import { useLogout } from "../../hooks/use-logout";
import { useMeQuery } from "../../hooks/use-me-query";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MyPage() {
  const meQuery = useMeQuery();
  const logout = useLogout();

  if (meQuery.isPending) {
    return (
      <AuthLayout title="마이페이지">
        <p className="text-sm text-ink-secondary">내 정보를 불러오는 중이에요.</p>
      </AuthLayout>
    );
  }
  if (meQuery.isError) {
    return (
      <AuthLayout title="마이페이지">
        <p className="text-sm text-ink-secondary">내 정보를 불러오지 못했어요.</p>
      </AuthLayout>
    );
  }

  const me = meQuery.data;

  return (
    <AuthLayout title="마이페이지">
      <section className="flex flex-col rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-4 border-b border-line p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-page">
            <img src="/icons/person.svg" alt="" width={32} height={32} />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate text-lg font-bold">{me.nickname}</p>
            <p className="truncate text-[13px] text-ink-secondary">{me.email}</p>
          </div>
        </div>

        <dl className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <img src="/icons/mail.svg" alt="" width={20} height={20} />
            <dt className="w-16 shrink-0 text-sm font-bold">이메일</dt>
            <dd className="min-w-0 truncate text-sm text-ink-secondary">{me.email}</dd>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/person.svg" alt="" width={20} height={20} />
            <dt className="w-16 shrink-0 text-sm font-bold">닉네임</dt>
            <dd className="min-w-0 truncate text-sm text-ink-secondary">{me.nickname}</dd>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/movie.svg" alt="" width={20} height={20} />
            <dt className="w-16 shrink-0 text-sm font-bold">가입일</dt>
            <dd className="min-w-0 truncate text-sm text-ink-secondary">
              {new Date(me.createdAt).toLocaleDateString("ko-KR")}
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex gap-2.5">
        <Link
          to="/me/edit"
          className="flex h-[46px] flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-surface text-[15px] font-extrabold hover:bg-page"
        >
          <img src="/icons/edit.svg" alt="" width={20} height={20} />
          정보 수정
        </Link>
        <button
          type="button"
          className="h-[46px] rounded-lg border border-line bg-surface px-5 text-[15px] font-extrabold text-ink-secondary hover:bg-page"
          onClick={logout}
        >
          로그아웃
        </button>
      </div>

      <FavoriteSection />
    </AuthLayout>
  );
}

/** GET /favorites로 내 즐겨찾기 목록을 보여 줘요. */
function FavoriteSection() {
  const favoritesQuery = useFavoritesQuery();

  return (
    <section className="mt-6 flex flex-col gap-3">
      <h2 className="text-[21px] font-bold tracking-[-0.63px]">
        즐겨찾기
        {favoritesQuery.isSuccess && (
          <span className="ml-2 text-base text-ink-tertiary">{favoritesQuery.data.length}</span>
        )}
      </h2>

      {favoritesQuery.isPending ? (
        <p className="text-sm text-ink-secondary">즐겨찾기를 불러오는 중이에요.</p>
      ) : favoritesQuery.isError ? (
        <p className="text-sm text-ink-secondary">즐겨찾기를 불러오지 못했어요.</p>
      ) : favoritesQuery.data.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface py-10 text-center text-sm text-ink-tertiary">
          아직 즐겨찾기한 영화가 없어요.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-x-3 gap-y-4">
          {favoritesQuery.data.map((favorite) => (
            <li key={favorite.favoriteId}>
              <FavoriteMovieItem favorite={favorite} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** 즐겨찾기 응답에는 movieId만 있어서 TMDB 상세로 제목과 포스터를 채워요. */
function FavoriteMovieItem({ favorite }: { favorite: Favorite }) {
  const movieQuery = useQuery(movieDetailQueryOptions(favorite.movieId));
  const movie = movieQuery.data;
  const title = movie?.title ?? (movieQuery.isError ? "영화 정보 없음" : "불러오는 중");

  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: String(favorite.movieId) }}
      className="flex flex-col gap-1"
    >
      <MovieImage
        className="aspect-[2/3] w-full rounded-lg bg-page"
        src={getTmdbPosterUrl(movie?.poster_path ?? null)}
        alt={movie ? `${movie.title} 포스터` : ""}
      />
      <p className="truncate text-[13px] font-extrabold">{title}</p>
    </Link>
  );
}
