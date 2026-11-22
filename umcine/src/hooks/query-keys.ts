// 회원 서버 데이터의 queryKey를 한곳에서 관리해요.
// 조회 hook과 변경 hook이 같은 키를 써야 캐시를 정확히 바꿀 수 있어요.
export const queryKeys = {
    me: ["members", "me"] as const,
    favorites: ["favorites", "list"] as const,
    favoriteStatus: (movieId: number) => ["favorites", "status", movieId] as const,
    memberRatings: (memberId: number) => ["ratings", "member", memberId] as const,
};
