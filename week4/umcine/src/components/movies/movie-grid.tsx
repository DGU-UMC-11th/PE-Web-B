import MovieCard from "./movie-card";
import { movies } from "../../data/movies";
import { useViewSettingsStore } from "../../stores/view-settings-store";
import { cn } from "../../utils/cn";

export default function MovieGrid() {
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
