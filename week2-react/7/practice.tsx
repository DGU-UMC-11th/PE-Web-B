import { useState } from "react";

interface Movie {
    id: number,
    title: string,
    releasedDate: Date,
    isBookmarked: boolean,
}

const initialMovies: Movie[] = [
    {
        id: 1,
        title: "오디세이",
        releasedDate: new Date("2026.08.05"),
        isBookmarked: true,
    },
    {
        id: 2,
        title: "토이 스토리 5",
        releasedDate: new Date("2026.06.17"),
        isBookmarked: false,
    },
];

export default function App() {
    const [movies, setMovies] = useState(initialMovies);

    function handleToggleBookmark(movieID: number) {
        
        function getUpdatedMovies(currentMovies: Movie[])
        {
            currentMovies = currentMovies.map((movie) =>
                movie.id === movieID
                ? { ...movie, isBookmarked: !movie.isBookmarked} //덮어씌우기 !로 토글
                : movie,
            )
            return currentMovies;
        }

        setMovies(getUpdatedMovies);
    }

    function deleteMovie(movieID: number) {
        setMovies((currentMovies) => 
            currentMovies.filter((movie) => 
                movie.id !== movieID
            ) //조건 맞는 값들만 리턴
        )
    }

    function addMovie() {
        setMovies((currentMovies) =>
            [...currentMovies, 
                {
                    id : 99,
                    title : "ㅇ",
                    releasedDate: new Date("2026.09.22"),
                    isBookmarked: false,
                }
            ]
        )
    }

    return (
        <>
            <h1>영화목록</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.releasedDate.toLocaleDateString()}</p>
                        <button 
                            aria-pressed={movie.isBookmarked}
                            onClick={() => handleToggleBookmark(movie.id)}
                        >
                            {movie.isBookmarked
                                ? "[O] 북마크 됨"
                                : "[ ] 북마크하기"
                            }
                        </button>
                        <button
                            onClick={() => deleteMovie(movie.id)}
                        >
                            영화 제거하기
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={addMovie}
            >
                영화 추가하기
            </button>
        </>
    );

    /*
    setMovies(a => a) 처럼 아예 새로운 값으로 바꾸는 듯
    function handleToggleBookmark(movieID : number) {
        setMovies((currentMovies) => 
            currentMovies.map((movie) =>
                movie.id === movieID
                ? { ...movie, isBookmarked: !movie.isBookmarked} //덮어씌우기 !로 토글
                : movie,
            )
        );
    }*/
}