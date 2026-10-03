import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/header.tsx";
import Footer from "../components/layout/footer.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-[1360px] px-4 py-20 sm:px-6 lg:px-10">
      페이지를 찾을 수 없어요.
    </div>
  ),
});
