import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProtectedLayout } from "../../components/layout/protected-layout";
import { useAuthStore } from "../../stores/auth-store";

/**
 * (protected) 그룹의 공통 Layout Route.
 * 그룹 이름은 주소에 포함되지 않으므로 하위 페이지는 /me, /me/edit 그대로예요.
 */
export const Route = createFileRoute("/(protected)")({
  // 페이지를 그리기 전에 토큰이 없으면 로그인으로 보내요.
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProtectedLayout,
});
