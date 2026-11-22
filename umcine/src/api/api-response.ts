import { HTTPError } from "ky";

// 회원 서버(Spring)의 공통 응답 형식이에요.
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

// 서버가 보낸 오류 메시지를 꺼내요. 서버 응답이 없으면(네트워크 오류 등) fallback을 써요.
// ky v2는 오류 응답 본문을 error.data에 미리 읽어 둬요.
export function getApiErrorMessage(error: unknown, fallback: string) {
    if (error instanceof HTTPError) {
        const data = error.data as Partial<ApiResponse<unknown>> | undefined;
        if (data && typeof data === "object" && typeof data.message === "string") {
            return data.message;
        }
    }
    return fallback;
}

export function getApiErrorStatus(error: unknown) {
    return error instanceof HTTPError ? error.response.status : undefined;
}
