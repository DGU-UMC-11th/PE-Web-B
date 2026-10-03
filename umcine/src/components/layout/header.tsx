import { Link } from "@tanstack/react-router"

const navClass = "text-sm text-gray-600";
const activeProps = { className: "font-bold text-ink underline underline-offset-4" };

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-[1170px] items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
                    <img src="/icons/movie.svg" alt="" className="size-8 rounded-lg border-2 border-ink p-0.5" />
                    UMCine
                </Link>
                <nav className="flex flex-1 items-center gap-6">
                    <Link to="/" className={navClass} activeProps={activeProps} activeOptions={{ exact: true }}>영화</Link>
                    <Link to="/search" className={navClass} activeProps={activeProps}>검색</Link>
                    {/* placeholder: 라우트 없음 */}
                    <button type="button" className={navClass}>내 정보</button>
                </nav>
                <Link to="/search" aria-label="검색" className="rounded-lg border border-gray-200 p-2">
                    <img src="/icons/search.svg" alt="" className="size-5" />
                </Link>
                {/* placeholder: 로그인 동작 없음 */}
                <button type="button" className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white">로그인</button>
            </div>
        </header>
    );
}
