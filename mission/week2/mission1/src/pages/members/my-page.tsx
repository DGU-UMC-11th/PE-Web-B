import { Link } from "@tanstack/react-router";
import { AuthLayout } from "../../components/auth/auth-layout";
import { useProfileStore } from "../../stores/profile-store";

export function MyPage() {
  const profile = useProfileStore((state) => state.profile);

  return (
    <AuthLayout title="내 정보">
      <section className="flex flex-col rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-4 border-b border-line p-6">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-page">
            <img src="/icons/person.svg" alt="" width={32} height={32} />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate text-lg font-bold">{profile.nickname}</p>
            <p className="truncate text-[13px] text-ink-secondary">{profile.email}</p>
          </div>
        </div>

        <dl className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <img src="/icons/mail.svg" alt="" width={20} height={20} />
            <dt className="w-16 shrink-0 text-sm font-bold">이메일</dt>
            <dd className="min-w-0 truncate text-sm text-ink-secondary">{profile.email}</dd>
          </div>
          <div className="flex items-center gap-3">
            <img src="/icons/person.svg" alt="" width={20} height={20} />
            <dt className="w-16 shrink-0 text-sm font-bold">닉네임</dt>
            <dd className="min-w-0 truncate text-sm text-ink-secondary">{profile.nickname}</dd>
          </div>
        </dl>
      </section>

      <Link
        to="/me/edit"
        className="flex h-[46px] items-center justify-center gap-2 rounded-lg border border-line bg-surface text-[15px] font-extrabold hover:bg-page"
      >
        <img src="/icons/edit.svg" alt="" width={20} height={20} />
        정보 수정
      </Link>
    </AuthLayout>
  );
}
