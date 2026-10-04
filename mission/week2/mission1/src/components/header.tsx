import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__left">
          <a className="header__logo" href="/">
            <span className="header__logo-mark">
              <img className="icon-invert" src="/icons/movie.svg" alt="" />
            </span>
            <span className="header__logo-text">UMCine</span>
          </a>

          <nav className="header__nav">
            <a className="header__nav-link header__nav-link--active" href="/">
              영화
            </a>
            <a className="header__nav-link" href="/">
              검색
            </a>
            <a className="header__nav-link" href="/">
              내 정보
            </a>
          </nav>
        </div>

        <div className="header__actions">
          <button type="button" className="header__search" aria-label="검색">
            <img src="/icons/search.svg" alt="" />
          </button>
          <button type="button" className="header__login">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
