import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMeQuery } from "../../hooks/use-me-query";
import { useFavoritesQuery } from "../../hooks/use-favorites";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function MyPage() {
  const me = useMeQuery();
  const favorites = useFavoritesQuery();
  return <main className="mx-auto w-full max-w-[1440px] flex-1 px-20 pt-7 pb-16 max-[760px]:px-6">
    <div className="flex items-center justify-between border-b border-gray-200 pb-7">
      <h1 className="text-3xl font-bold">내 정보</h1>
      <Link to="/mypage-edit" className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white">정보 수정</Link>
    </div>
    <section className="border-b border-gray-200 py-6">
      <h2 className="mb-5 font-bold">기본 정보</h2>
      {me.isLoading ? <p role="status">내 정보를 불러오는 중이에요.</p> : me.isError ?
        <p role="alert">내 정보를 불러오지 못했어요. <button onClick={() => void me.refetch()}>다시 시도</button></p> :
        <dl className="flex flex-wrap gap-10"><div><dt className="text-xs text-gray-500">닉네임</dt><dd>{me.data?.nickname}</dd></div>
          <div><dt className="text-xs text-gray-500">이메일</dt><dd>{me.data?.email}</dd></div></dl>}
    </section>
    <section className="pt-7">
      <h2 className="mb-4 font-bold">내 즐겨찾기</h2>
      {favorites.isLoading ? <p role="status">즐겨찾기를 불러오는 중이에요.</p> : favorites.isError ?
        <p role="alert">즐겨찾기를 불러오지 못했어요. <button onClick={() => void favorites.refetch()}>다시 시도</button></p> :
        !favorites.data?.length ? <p>아직 즐겨찾기한 영화가 없어요.</p> :
        <ul className="grid max-w-[960px] grid-cols-4 gap-5 max-[760px]:grid-cols-2">
          {favorites.data.map((favorite) => <FavoriteMovie key={favorite.favoriteId} movieId={favorite.movieId} />)}
        </ul>}
    </section>
  </main>;
}

function FavoriteMovie({ movieId }: { movieId: number }) {
  const query = useQuery({ queryKey: ["movies", "detail", movieId], queryFn: () => getMovieDetail(movieId) });
  const poster = getTmdbPosterUrl(query.data?.poster_path ?? null);
  return <li className="min-w-0">
    <Link to="/movies/$movieId" params={{ movieId: String(movieId) }}>
      {poster ? <img src={poster} alt={`${query.data?.title} 포스터`} className="aspect-[0.88] w-full rounded-lg object-cover" /> :
        <div className="grid aspect-[0.88] place-items-center rounded-lg bg-gray-100 text-sm">{query.isLoading ? "불러오는 중" : "이미지 없음"}</div>}
      <h3 className="mt-2 truncate text-sm font-semibold">{query.data?.title ?? `영화 ${movieId}`}</h3>
    </Link>
    {query.isError && <button className="text-xs text-red-600" onClick={() => void query.refetch()}>영화 정보 다시 불러오기</button>}
  </li>;
}
