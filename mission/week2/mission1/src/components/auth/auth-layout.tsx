import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

/** 회원가입·로그인·내 정보 화면이 함께 쓰는 가운데 정렬 레이아웃 */
export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <main className="flex justify-center px-4 py-[180px]">
      <div className="flex w-full max-w-[430px] flex-col gap-5">
        <h1 className="text-[34px] leading-[42px] font-bold tracking-[-1.2px]">{title}</h1>
        {children}
      </div>
    </main>
  );
}
