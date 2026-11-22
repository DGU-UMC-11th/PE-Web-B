import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export function AuthLayout() {
  const token = useAuthStore((state) => state.accessToken);
  // 페이지가 열린 뒤 401로 토큰이 삭제된 경우에도 보호해요.
  return token ? <Outlet /> : <Navigate to="/login" />;
}
