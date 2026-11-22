import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRating, deleteRating, getRatings, updateRating, type Rating } from "../../api/ratings";
import { useAuthStore } from "../../stores/auth-store";

export function RatingPanel({ movieId }: { movieId: number }) {
  const token = useAuthStore((state) => state.accessToken);
  const memberId = useAuthStore((state) => state.memberId);
  const query = useQuery({ queryKey: ["ratings", memberId],
    queryFn: () => getRatings(memberId!), enabled: Boolean(token && memberId), retry: false });
  if (!token) return <p><Link to="/login" className="text-blue-600">로그인</Link> 후 평점을 남길 수 있어요.</p>;
  if (!memberId) return <p role="alert">회원 번호를 확인할 수 없어요. 이 브라우저에서 가입한 계정으로 로그인해 주세요.</p>;
  if (query.isLoading) return <p role="status">내 평점을 불러오는 중이에요.</p>;
  if (query.isError) return <div role="alert">평점을 불러오지 못했어요. <button onClick={() => void query.refetch()}>다시 시도</button></div>;
  const rating = query.data?.find((item) => item.movieId === movieId);
  return <RatingForm key={`${memberId}-${movieId}-${rating?.ratingId ?? "new"}-${rating?.updatedAt ?? ""}`} movieId={movieId} memberId={memberId} saved={rating} />;
}

function RatingForm({ movieId, memberId, saved }: { movieId: number; memberId: number; saved?: Rating }) {
  const [score, setScore] = useState(saved?.score ?? 0);
  const [comment, setComment] = useState(saved?.comment ?? "");
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (action: "save" | "delete") => {
      if (action === "delete") {
        if (!saved) throw new Error("삭제할 평점이 없어요.");
        return deleteRating(saved.ratingId);
      }
      return saved ? updateRating(saved.ratingId, { score, comment }) : createRating({ movieId, score, comment });
    },
    onSuccess: async () => { await client.invalidateQueries({ queryKey: ["ratings", memberId] }); },
  });
  const canSubmit = score >= 1 && score <= 5 && comment.length <= 500;
  return <section>
    <h2 className="text-xl font-bold">내 평점</h2>
    <p className="mt-1 text-xs text-gray-500">별점은 필수, 후기는 선택이에요. (최대 500자)</p>
    <form onSubmit={(event) => {
      event.preventDefault();
      if (canSubmit && !mutation.isPending) mutation.mutate("save");
    }}>
      <fieldset disabled={mutation.isPending} className="mt-3">
        <legend className="sr-only">별점 선택</legend>
        <div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => <button
          key={star} type="button" aria-label={`${star}점`} aria-pressed={score === star}
          className={`size-10 rounded-lg border border-gray-200 text-2xl ${star <= score ? "text-amber-400" : "text-gray-400"}`}
          onClick={() => setScore(star)}>★</button>)}</div>
        <textarea aria-label="영화 후기" maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)}
          className="mt-3 h-28 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm" placeholder="영화를 보고 느낀 점을 남겨보세요." />
        <p className="text-right text-xs text-gray-500">{comment.length}/500</p>
        <button type="submit" disabled={!canSubmit || mutation.isPending} className="mt-2 h-10 w-full rounded-lg bg-gray-900 text-sm font-semibold text-white disabled:opacity-50">
          {mutation.isPending ? "처리 중" : saved ? "평점 수정" : "평점 저장"}
        </button>
        {saved && <button type="button" className="mt-2 w-full py-2 text-sm text-red-600" onClick={() => {
          if (!mutation.isPending) mutation.mutate("delete");
        }}>평점 삭제</button>}
      </fieldset>
      {mutation.isError && <p role="alert" className="mt-2 text-sm text-red-600">평점 변경에 실패했어요. 다시 시도해 주세요.</p>}
      {mutation.isSuccess && <p role="status" className="mt-2 text-sm">평점을 반영했어요.</p>}
    </form>
  </section>;
}
