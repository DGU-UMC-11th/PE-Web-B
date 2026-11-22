import ky from "ky";
import { env } from "../condig/env.ts";

// 회원 서버(Spring)용 클라이언트. TMDB용 tmdbClient와 분리해요.
export const apiClient = ky.create({ baseUrl: env.apiBaseUrl });
