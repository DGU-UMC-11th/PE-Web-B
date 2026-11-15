import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <main className="flex w-full flex-1 items-start justify-center px-4 py-12 sm:py-20">
      <section className="w-full max-w-[440px] rounded-2xl border border-[#e0e4eb] bg-white px-6 py-8 sm:px-10 sm:py-10">
        <h1 className="m-0 text-2xl font-bold tracking-[-0.8px]">{title}</h1>
        {description && (
          <p className="mt-2 mb-0 text-sm text-gray-500">{description}</p>
        )}
        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
