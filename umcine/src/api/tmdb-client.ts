import ky from "ky";
import {env} from "../condig/env.ts";

export const tmdbClient = ky.create({
    baseUrl: `${env.tmdbApiBaseUrl}/`,
    headers: {
        Authorization: `Bearer ${env.tmdbAccessToken}`,
    },
});