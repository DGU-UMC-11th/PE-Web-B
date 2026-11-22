import { Link, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store.ts";

// 로그인한 사용자만 볼 수 있는 페이지((member) 그룹)의 공통 레이아웃이에요.
// 토큰이 없으면 하위 페이지 대신 로그인 안내를 보여주고, 있으면 <Outlet />으로 하위 페이지를 그려요.
export default function MemberLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-64px-80px)] w-full max-w-[1360px] flex-col items-center gap-4 px-4 pt-24 text-center">
        <img src="/movie-icons/lock.svg" alt="" className="size-10 opacity-40" />
        <h1 className="text-xl font-extrabold text-gray-900">로그인이 필요한 페이지예요</h1>
        <p className="text-sm text-gray-500">로그인하면 내 정보와 즐겨찾기를 확인할 수 있어요.</p>
        <Link
          to="/login"
          className="mt-2 flex h-10 items-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          로그인하러 가기
        </Link>
      </div>
    );
  }

  return <Outlet />;
}
