import { apiClient } from "../api-client.ts";
import type { Rating } from "./models.ts";

const PAGE_SIZE = 50;

// GET /members/{memberId}/ratings?page=&size=: 회원이 남긴 평점 목록 (최근 순)
// 누구나 볼 수 있는 API라 토큰 없이 요청하고, 다른 API와 달리 ApiResponse로 감싸지 않은 배열을 응답해요.
export function getMemberRatings(memberId: number, page: number, size = PAGE_SIZE) {
    return apiClient
        .get(`members/${memberId}/ratings`, { searchParams: { page, size } })
        .json<Rating[]>();
}

// 영화 상세에서 "이 영화에 남긴 내 평점"을 찾으려면 내 평점 전체가 필요해요.
// 서버에 영화별 조회 API가 없어서, 마지막 페이지(PAGE_SIZE보다 적게 온 페이지)까지 이어서 불러와요.
export async function getAllMemberRatings(memberId: number) {
    const ratings: Rating[] = [];
    for (let page = 0; ; page += 1) {
        const pageRatings = await getMemberRatings(memberId, page);
        ratings.push(...pageRatings);
        if (pageRatings.length < PAGE_SIZE) return ratings;
    }
}
