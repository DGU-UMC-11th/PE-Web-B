// TMDB는 page를 500까지만 허용
export const MAX_PAGE = 500;

// 1페이지는 URL에서 생략(undefined)
export function parsePage(value: unknown): number | undefined {
    const page = Number(value);
    if (!Number.isInteger(page) || page <= 1) return undefined;
    return Math.min(page, MAX_PAGE);
}
