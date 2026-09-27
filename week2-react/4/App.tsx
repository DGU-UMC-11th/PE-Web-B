import type { MovieCardProp } from "./components";
//이건 엄격함 때문에 추가됨

function MovieCard(prop: MovieCardProp)
{
    return (
        <article>
            <h1>{prop.title}</h1>
            <p>{prop.releasedDate}</p>
            <p>{prop.isBookmarked ? "북마크 됨" : "북마크하기"}</p>
        </article>
    );
}

function MovieList()
{
    return (
        <>
            <MovieCard 
                title="영화1"
                releasedDate="날짜1"
                isBookmarked={true}
            />
            <MovieCard 
                title="영화2"
                releasedDate="날짜2"
                isBookmarked={false}
            />
            <MovieCard 
                title="영화3"
                releasedDate="날짜3"
                isBookmarked={true}
            />
        </>
    )
}

export default function App()
{
    return  (
        <>
            <MovieList></MovieList>
            {/* <MovieList />랑 완전히 똑같다 */}
        </>
    );
}
/*
interface MovieCardProps {
    title: string;
    releasedDate: string;
    isBookmarked: boolean;
    test?: string; //이걸로 없어도 된다 표시 ts ㅇㅇ
}
function MovieCard(prop: MovieCardProps)
{
    return (
        <article>
            <h2>{prop.title}</h2>
            <p>{prop.releasedDate}</p>
            <p>{prop.isBookmarked ? "북마크됨" : "북마크 안 됨"}</p>
        </article>
    );
}
  
export default function App() {
    return (
        <>
            <MovieCard
                title="오디세이"
                releasedDate="2026.08.05"
                isBookmarked={true}
            />
            <MovieCard
                title="토이 스토리 5"
                releasedDate="2026.06.17"
                isBookmarked={false}
            />
        </>
    );
}
*/
/*  
function MovieCard({
    title,
    releasedDate: theDate,
    isBookmarked,
}: MovieCardProps)
{
    return (
        <article>
            <h2>{title}</h2>
            <p>{theDate}</p>
            <p>{isBookmarked ? "북마크됨" : "북마크 안 됨"}</p>
        </article>
    );
}
  
export default function App() {
    return (
        <>
            <MovieCard
                title="오디세이"
                releasedDate="2026.08.05"
                isBookmarked={true}
            />
            <MovieCard
                title="토이 스토리 5"
                releasedDate="2026.06.17"
                isBookmarked={false}
            />
        </>
    );
}
*/

/*
// ① 인터페이스(규칙 설계도)
interface MovieCardProps {
    title: string;          // 👈 'title'이라는 이름표 필수!
    releasedDate: string;   // 👈 'releasedDate' 필수!
    isBookmarked: boolean;  // 👈 'isBookmarked' 필수!
}
 
// ② 컴포넌트 (받는 곳)
function MovieCard({
    title,          // 👈 설계도에 있는 이름이랑 정확히 같아야 함
    releasedDate: 별명,   // 👈 (다른 이름으로 바꾸려면 별칭 써야 함)
    isBookmarked,
}: MovieCardProps)
{
    별명
}

export ... App
*/