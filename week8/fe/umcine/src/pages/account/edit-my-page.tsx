import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import type { MemberInfo } from "../../api/members/me";

export function EditMyPage() {
  const me = useMeQuery();
  if (me.isLoading) return <main className="p-16" role="status">내 정보를 불러오는 중이에요.</main>;
  if (me.isError || !me.data) return <main className="p-16" role="alert">내 정보를 불러오지 못했어요. <button onClick={() => void me.refetch()}>다시 시도</button></main>;
  return <EditForm key={me.data.email} member={me.data} />;
}

function EditForm({ member }: { member: MemberInfo }) {
  const [nickname, setNickname] = useState(member.nickname);
  const mutation = useUpdateMeMutation();
  const navigate = useNavigate();
  const value = nickname.trim();
  const canSubmit = value.length >= 2 && value.length <= 12;
  return <main className="mx-auto w-full max-w-[1440px] flex-1 px-20 py-7 max-[760px]:px-6">
    <h1 className="text-3xl font-bold">내 정보 수정</h1>
    <p className="mt-2 text-sm text-gray-500">닉네임은 2~12자로 변경할 수 있어요.</p>
    <form className="mt-10 max-w-xl space-y-5" onSubmit={(event) => {
      event.preventDefault();
      if (!canSubmit || mutation.isPending) return;
      mutation.mutate({ nickname: value }, { onSuccess: () => { void navigate({ to: "/mypage" }); } });
    }}>
      <div><label htmlFor="edit-nickname" className="mb-2 block text-sm font-semibold">닉네임</label>
        <input id="edit-nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} disabled={mutation.isPending}
          className="h-12 w-full rounded-lg border border-gray-200 px-4" />
        {!canSubmit && <p className="mt-1 text-xs text-red-600">닉네임은 2~12자로 입력해 주세요.</p>}
      </div>
      <div><label htmlFor="edit-email" className="mb-2 block text-sm font-semibold">이메일</label>
        <input id="edit-email" type="email" readOnly value={member.email} className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 px-4" />
      </div>
      {mutation.isError && <p role="alert" className="text-sm text-red-600">수정하지 못했어요. 닉네임 중복 여부를 확인하고 다시 시도해 주세요.</p>}
      <div className="flex items-center gap-4"><button type="submit" disabled={!canSubmit || mutation.isPending}
        className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{mutation.isPending ? "저장 중" : "변경사항 저장"}</button>
        <Link to="/mypage" className="text-sm">취소</Link></div>
    </form>
  </main>;
}
