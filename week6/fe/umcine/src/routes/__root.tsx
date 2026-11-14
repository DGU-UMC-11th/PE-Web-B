import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../components/layout/root-layout";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <main className="grid flex-1 place-items-center p-16">페이지를 찾을 수 없어요.</main>,
});
