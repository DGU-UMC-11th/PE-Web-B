import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

// 로그인한 사용자만 접근할 수 있는 페이지들의 공통 Layout Route
export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: Outlet,
});
