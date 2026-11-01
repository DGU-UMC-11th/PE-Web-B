function Header() {
  return (
    <header className="topbar">
      <div className="header-inner">
        <a className="logo" href="#movies" aria-label="UMCine 홈">
          <span className="logo-icon"><img src="/icons/movie.svg" alt="" /></span>
          <strong>UMCine</strong>
        </a>

        <nav className="nav" aria-label="주 메뉴">
          <a className="active" href="#movies" aria-current="page">
            영화
          </a>
          <a href="#">검색</a>
          <a href="#">내 정보</a>
        </nav>

        <div className="header-actions">
          <button className="search-button" type="button" aria-label="영화 검색">
            <img src="/icons/search.svg" alt="" />
          </button>
          <button className="login-button">로그인</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
