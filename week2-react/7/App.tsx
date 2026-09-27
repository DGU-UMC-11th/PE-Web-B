/*
구조 설계
MovieCardProps로 타입

App
ㄴMovieGrid
 ㄴMovieCard
   ㄴ Movie 관련 버튼 등
*/
import { useState } from "react";

interface Movie {
    id: number,
    title: string,
    releasedDate: Date,
    isBookmarked: boolean,
}

interface Arguments {
    movies: Movie[],
    onToggleBookmark: (id:number) => void
}

const initialMovies: Movie[] = [
    {id:1, title:"영화1", releasedDate:new Date("2026.09.22"), isBookmarked:false},
    {id:2, title:"영화2", releasedDate:new Date("2026.09.21"), isBookmarked:true},
    {id:3, title:"영화3", releasedDate:new Date("2026.09.20"), isBookmarked:false},
]

function MovieList({movies, onToggleBookmark}: Arguments) {
    return (
        <ul>
            {movies.map((movie) => 

                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.releasedDate.toLocaleDateString()}</p>
                    <button
                        aria-pressed={movie.isBookmarked}
                        onClick={() => onToggleBookmark(movie.id)}
                    >
                        {movie.isBookmarked
                            ? "[O] 북마크 됨"
                            : "[ ] 북마크 하기"
                        }
                    </button>
                </li>

            )}
        </ul>
    );
}

function MovieGrid({movies, onToggleBookmark}: Arguments) {
    return (
        <>
            {movies.length === 0
                ? <p>영화가 없습니다.</p>
                : <MovieList movies={movies} onToggleBookmark={onToggleBookmark}/>
            }
        </>
    );
}

export default function App() {
    const [movies, setMovies] = useState(initialMovies);

    function onChangeBookmark(id: number)
    {
        setMovies((currentMovies) => 
            currentMovies.map((movie) =>
                (movie.id === id)
                    ? {...movie, isBookmarked: !movie.isBookmarked}
                    : movie
            )
        );
    }

    return (
        <>
            <h1>영화 목록</h1>
            <MovieGrid movies={movies} onToggleBookmark={onChangeBookmark} />
        </>
    )
}