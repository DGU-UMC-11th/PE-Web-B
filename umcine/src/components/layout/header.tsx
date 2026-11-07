import { Link } from "@tanstack/react-router";

const NAV_ITEMS = [
    { label: "영화", to: "/" },
    { label: "검색", to: "/search" },
] as const;

export function Header() {
    return (
        <header className="flex items-center justify-between border-b border-[#e3e6eb] bg-white px-20 py-6">
            <div className="flex items-center gap-[42px]">
                <Link to="/" className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191e]">
                        <img src="/icons/movie.svg" alt="" width={24} height={24} />
                    </span>
                    <span className="text-xl font-black tracking-[-0.7px] text-[#17191e]">UMCine</span>
                </Link>
                <nav aria-label="주요 메뉴">
                    <ul className="flex items-center gap-[30px]">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="text-sm font-bold"
                                    activeProps={{ className: "text-[#17191e] underline" }}
                                    inactiveProps={{ className: "text-[#606774]" }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="flex items-center gap-2.5">
                <Link
                    to="/search"
                    aria-label="영화 검색"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white"
                >
                    <img src="/icons/search.svg" alt="" width={24} height={24} />
                </Link>
                <button
                    type="button"
                    className="h-[42px] rounded-lg border border-white bg-blue-600 px-4 text-sm font-extrabold text-white"
                >
                    로그인
                </button>
            </div>
        </header>
    );
}
