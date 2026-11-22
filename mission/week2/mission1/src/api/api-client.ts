import ky from "ky";
import { env } from "../config/env";

// baseUrl에 경로(/v8)가 있으면 끝에 /가 있어야 "auth/login"이 /v8/auth/login으로 붙어요.
// 없으면 URL 규칙상 마지막 경로가 교체되어 /auth/login으로 요청돼요.
const baseUrl = env.apiBaseUrl.endsWith("/") ? env.apiBaseUrl : `${env.apiBaseUrl}/`;

export const apiClient = ky.create({ baseUrl });
