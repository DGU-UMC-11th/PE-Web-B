export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex min-h-14 w-full max-w-[1440px] items-center justify-end gap-2 px-4 py-4 text-[10px] leading-[18px] text-[#667085] sm:px-6 sm:py-0 sm:text-xs md:px-8 xl:px-20">
        <img className="h-auto w-6" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p className="m-0">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a className="underline" href="https://www.themoviedb.org/">
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
