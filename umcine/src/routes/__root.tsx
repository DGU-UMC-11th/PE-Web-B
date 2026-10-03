import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import { MovieProvider } from '../contexts/movie-context'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <main className="mx-auto w-full max-w-[1170px] flex-1 py-10">페이지를 찾을 수 없어요.</main>
})

function RootComponent() {
    return (
        <MovieProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </MovieProvider>
    )
}
