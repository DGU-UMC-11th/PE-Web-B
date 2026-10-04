import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-svh flex-col bg-[#f6f7f9]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ),
  notFoundComponent: () => (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-24 text-center text-gray-500 sm:px-6 md:px-8 xl:px-20">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
