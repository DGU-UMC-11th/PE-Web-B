function Header()
{
    return <h1>테스트 헤더</h1>;
}

function MovieList()
{
    return (
        <>
            <MovieCard />
            <MovieCard />
        </>
    );
    //Fragment이다. 여러 개를 하나의 객체로 묶어서 리턴
}

function MovieCard()
{
    return <h3>테스트 영화</h3>;
}
  
export default function App() {
    return (
        <main>
            <Header />
            <MovieList />
        </main>
    );
}