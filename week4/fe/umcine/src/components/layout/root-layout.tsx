import { Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "./header";
import { Footer } from "./footer";
import { MoviesProvider } from "../../contexts/movies-provider";

export function RootLayout() {
  const emptySearch = useRouterState({ select: (state) => state.location.pathname === "/search" && !(typeof state.location.search.query === "string" && state.location.search.query.trim()) });
  return <MoviesProvider><div className="flex min-h-svh flex-col"><Header /><Outlet />{!emptySearch && <Footer />}</div></MoviesProvider>;
}


