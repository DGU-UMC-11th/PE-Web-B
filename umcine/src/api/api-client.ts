import ky from "ky";
import { env } from "../config/env";

export const apiClient = ky.create({ baseUrl: `${env.apiBaseUrl}/` });

// 서버 공통 응답 형태
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
