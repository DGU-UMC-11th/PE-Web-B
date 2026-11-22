// 회원 서버 데이터의 query key를 한곳에서 관리해요.
export const queryKeys = {
  me: ["members", "me"] as const,
  favorites: {
    all: ["favorites"] as const,
    list: ["favorites", "list"] as const,
    status: (movieId: number) => ["favorites", "status", movieId] as const,
  },
  ratings: {
    all: ["ratings"] as const,
    member: (memberId: number) => ["ratings", "member", memberId] as const,
  },
};
