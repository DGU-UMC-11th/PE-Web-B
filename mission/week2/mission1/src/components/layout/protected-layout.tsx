import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

/** 로그인 후에만 볼 수 있는 페이지들의 공통 레이아웃 */
export function ProtectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 페이지를 보는 중에 401로 토큰이 비워지면 로그인으로 이동해요.
  if (!accessToken) return <Navigate to="/login" />;

  return <Outlet />;
}
