import MovieCard from "./movie-card";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useViewSettingsStore } from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  const cardSize = useViewSettingsStore((state) => state.cardSize);
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-[18px] gap-y-[21px] sm:grid-cols-2",
        cardSize === "large"
          ? "md:grid-cols-2 lg:grid-cols-3"
          : "md:grid-cols-3 lg:grid-cols-5",
      )}
    >
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
