// TMDB 날짜("2026-07-29")를 화면용("2026.07.29")으로 바꿔요.
export function formatReleaseDate(releaseDate: string) {
    return releaseDate.replaceAll("-", ".");
}

// TMDB 상영 시간(분)을 "2시간 25분" 형태로 바꿔요.
export function formatRuntime(runtime: number | null) {
    if (!runtime) return null;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) return `${minutes}분`;
    return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
}
