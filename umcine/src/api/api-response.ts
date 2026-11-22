// 서버 공통 응답 형식 (평점 목록 조회처럼 래퍼 없이 배열을 주는 API는 예외)
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
