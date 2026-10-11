export default function Footer() {
  return (
    <footer className="mt-auto w-full py-8">
      <div className="mx-auto flex max-w-[1360px] justify-end px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logos/tmdb-logo.svg"
            alt="TMDB Logo"
            className="block h-3.5 w-auto"
          />
          <p className="text-xs leading-none text-gray-500">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
