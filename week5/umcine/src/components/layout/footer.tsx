export function Footer() {
  return (
    <footer className="flex h-[57px] items-center justify-end gap-2 border-t border-[#e3e6eb] px-20">
      <img
        src="/images/logos/tmdb-logo.svg"
        alt=""
        width={24}
        height={24}
      />
      <p className="text-xs text-[#606774]">
        This product uses the TMDB API but is not endorsed or certified by{" "}
        <a
          href="https://www.themoviedb.org/?language=ko"
          target="_blank"
          className="underline"
        >
          TMDB
        </a>
        .
      </p>
    </footer>
  );
}
