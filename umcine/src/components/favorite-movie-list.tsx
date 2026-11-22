import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getFavorites } from "../api/favorites";
import { getMovieDetail } from "../api/movies/get-movie-detail";
import { toMovieDetail } from "../utils/movies/movie-adapter";
import Poster from "./movies/poster";

export function FavoriteMovieList() {
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  if (favoritesQuery.isLoading) return <p className="text-sm">불러오는 중</p>;
  if (favoritesQuery.isError) return <p className="text-sm">즐겨찾기를 불러오지 못했어요.</p>;
  if (!favoritesQuery.data?.length) return <p className="text-sm text-gray-500">즐겨찾기한 영화가 없어요.</p>;

  return (
    <ul className="grid grid-cols-3 gap-3">
      {favoritesQuery.data.map((favorite) => (
        <FavoriteMovieItem key={favorite.favoriteId} movieId={favorite.movieId} />
      ))}
    </ul>
  );
}

// 서버는 movieId만 주므로 제목·포스터는 TMDB에서 가져옴
// 상세 페이지와 같은 query key라 이미 본 영화는 캐시를 재사용함
function FavoriteMovieItem({ movieId }: { movieId: number }) {
  const { data: movie } = useQuery({
    queryKey: ["movies", "detail", { movieId }],
    queryFn: () => getMovieDetail(movieId),
    select: toMovieDetail,
  });

  return (
    <li className="min-w-0">
      <Link to="/movies/$movieId" params={{ movieId: String(movieId) }}>
        {movie ? (
          <Poster
            src={movie.posterUrl}
            alt={`${movie.title} 포스터`}
            className="aspect-[2/3] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="aspect-[2/3] w-full animate-pulse rounded-lg bg-gray-200" />
        )}
        <p className="mt-1 truncate text-xs font-bold">{movie?.title ?? " "}</p>
      </Link>
    </li>
  );
}
