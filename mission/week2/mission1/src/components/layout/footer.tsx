export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-2 px-20 py-4">
        <img src="/images/logos/tmdb-logo.svg" alt="TMDB" width={24} height={24} />
        <p className="text-xs text-ink-secondary">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="underline"
            href="https://www.themoviedb.org/?language=ko"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
