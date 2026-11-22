import {apiClient} from "./api-client.ts";
import {useAuthStore} from "../stores/auth-store.ts";

export const authApi = apiClient.extend({
    hooks: {
        beforeRequest: [
            ({ request }) => {
                const accessToken = useAuthStore.getState().accessToken;
                if (accessToken) {
                    request.headers.set("Authorization", `Bearer ${accessToken}`);
                }
            }
        ],
        afterResponse: [
            ({ response }) => {
                if(response.status === 401) {
                    useAuthStore.getState().setAccessToken(null);
                }
            }
        ]
    }
})