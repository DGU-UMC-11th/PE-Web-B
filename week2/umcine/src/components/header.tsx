import "./header.css";

export type NavItem = "영화" | "검색" | "내 정보";

const NAV_ITEMS: NavItem[] = ["영화", "검색", "내 정보"];

interface HeaderProps {
    activeMenu: NavItem;
}

export default function Header({ activeMenu }: HeaderProps) {
    return (
        <header className="header">
            <div className="header__brand-row">
                <a href="#" className="header__brand">
                    <span className="header__mark">
                        <img src="/icons/movie.svg" alt="" width={24} height={24} />
                    </span>
                    <span className="header__logo">UMCine</span>
                </a>
                <nav aria-label="주요 메뉴">
                    <ul className="header__nav">
                        {NAV_ITEMS.map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className={
                                        item === activeMenu
                                            ? "header__nav-link header__nav-link--active"
                                            : "header__nav-link"
                                    }
                                    aria-current={item === activeMenu ? "page" : undefined}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="header__actions">
                <button type="button" className="header__search-button" aria-label="영화 검색">
                    <img src="/icons/search.svg" alt="" width={24} height={24} />
                </button>
                <button type="button" className="header__login-button">
                    로그인
                </button>
            </div>
        </header>
    );
}
