import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { FavoriteMovieList } from "../../components/favorite-movie-list";

export function MyPage() {
  // 헤더와 같은 query key → 캐시를 같이 씀
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
  const [form, setForm] = useState({ nickname: "" });
  const updateMeMutation = useUpdateMeMutation();

  const nickname = form.nickname.trim();
  const canSubmit = nickname.length >= 2 && nickname.length <= 12;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate({ nickname });
  };

  if (meQuery.isLoading) return <p className="mt-16 text-center">불러오는 중</p>;
  if (!meQuery.data) return <p className="mt-16 text-center">내 정보를 불러오지 못했어요.</p>;

  return (
    <div className="mx-auto mt-16 flex w-full max-w-sm flex-col gap-5 px-4">
      <h1 className="text-center text-2xl font-extrabold">내 정보</h1>
      <dl className="text-sm">
        <dt className="font-bold">이메일</dt>
        <dd className="mb-2">{meQuery.data.email}</dd>
        <dt className="font-bold">닉네임</dt>
        <dd>{meQuery.data.nickname}</dd>
      </dl>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <label htmlFor="nickname" className="text-sm font-bold">
          새 닉네임
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="2~12자로 입력해 주세요"
          value={form.nickname}
          onChange={(e) => setForm({ nickname: e.target.value })}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={!canSubmit || updateMeMutation.isPending}
          className="w-full rounded-lg bg-brand py-3 font-bold text-white disabled:bg-brand/40"
        >
          {updateMeMutation.isPending ? "저장 중" : "저장"}
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-lg font-bold">즐겨찾기</h2>
        <FavoriteMovieList />
      </section>
    </div>
  );
}
