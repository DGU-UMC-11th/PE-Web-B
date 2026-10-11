export function Footer() {
  return <footer className="shrink-0 border-t border-[#e0e4eb] bg-white">
    <div className="mx-auto flex min-h-14 w-full max-w-[1440px] items-center justify-end gap-2 px-20 text-xs text-[#667085] max-[1100px]:px-8 max-[760px]:px-6 max-[540px]:px-4 max-[540px]:py-4 max-[540px]:text-[10px]">
      <img className="w-6" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
      <p>This product uses the TMDB API but is not endorsed or certified by <a href="https://www.themoviedb.org/" className="hover:underline">TMDB</a>.</p>
    </div>
  </footer>;
}

