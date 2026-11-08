import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from './routeTree.gen';
import "./css/index.css";
// import "./examples/promise-status";
// import "./examples/promise-syntax";
// import "./examples/fetch-movies";

const ONE_MINUTE = 60 * 1000;

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: ONE_MINUTE } } });
const router = createRouter({routeTree});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
)
