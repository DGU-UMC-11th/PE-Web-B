interface Movie {
    id : number,
    title : string,
    releasedDate : Date,
}

const movies : Movie[] = [
    {id: 1, title: "영화1", releasedDate: new Date("2026-09-22")},
    {id: 2, title: "영화2", releasedDate: new Date("2026-09-23")},
];

function MovieList()
{
    return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id}> {/* 나중에 id 쓰려고*/}
                    <h1>{movie.title}</h1>
                    <p>{movie.releasedDate.toLocaleDateString()}</p>
                    <p>id : {movie.id}</p>
                </li>
            ))}
        </ul>
    );
}

function MovieSection()
{
    return (
        <>
            {movies.length === 0 ? (<p>표시할 영화가 없어요.</p>) : (MovieList())}
        </>
    );
}

export default function App()
{
    return  (
        <>
            <MovieSection></MovieSection>
        </>
    );
}