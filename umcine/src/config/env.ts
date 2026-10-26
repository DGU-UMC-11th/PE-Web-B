const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL;
const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if(!tmdbApiBaseUrl || !tmdbAccessToken) {
    throw new Error("tmdb 환경변수 필요.");
}

export const env = {
    tmdbApiBaseUrl,
    tmdbAccessToken,
};