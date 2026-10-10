import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
  notFoundComponent: () => (
    <main className="mx-auto max-w-[1440px] px-20 py-20 text-center text-ink-secondary">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
