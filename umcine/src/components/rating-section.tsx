import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMemberRatings } from "../api/ratings";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useUpdateRatingMutation,
} from "../hooks/use-rating-mutations";
import { useAuthStore } from "../stores/auth-store";
import { getMemberIdFromToken } from "../utils/get-member-id-from-token";

const SCORES = [1, 2, 3, 4, 5];

export function RatingSection({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromToken(accessToken);

  // "이 영화의 내 평점" API가 없어서 내 평점 목록에서 찾음
  // ponytail: 최근 100개까지만 찾음. 평점이 100개를 넘으면 서버에 movieId 조회 API 추가
  const myRatingQuery = useQuery({
    queryKey: ["ratings", memberId],
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== null,
    select: (ratings) => ratings.find((rating) => rating.movieId === movieId) ?? null,
  });
  const myRating = myRatingQuery.data;

  const createMutation = useCreateRatingMutation();
  const updateMutation = useUpdateRatingMutation();
  const deleteMutation = useDeleteRatingMutation();
  const isBusy = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const [isEditing, setIsEditing] = useState(false);
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  if (memberId === null) {
    return (
      <p className="mt-6 text-sm text-gray-500">
        <Link to="/login" className="text-brand underline">로그인</Link>하면 평점을 남길 수 있어요.
      </p>
    );
  }
  if (myRatingQuery.isLoading) return <p className="mt-6 text-sm">평점 불러오는 중</p>;

  const startEdit = () => {
    if (!myRating) return;
    setScore(myRating.score);
    setComment(myRating.comment ?? "");
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (!myRating || isBusy || !confirm("평점을 삭제할까요?")) return;
    deleteMutation.mutate(myRating.ratingId);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBusy) return;
    const body = { score, comment: comment.trim() || undefined };

    if (myRating) {
      updateMutation.mutate(
        { ratingId: myRating.ratingId, ...body },
        { onSuccess: () => setIsEditing(false) },
      );
    } else {
      createMutation.mutate({ movieId, ...body });
    }
  };

  // 내 평점이 있고 수정 중이 아니면 보기 모드
  if (myRating && !isEditing) {
    return (
      <section className="mt-6 rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-bold">내 평점</h3>
        <p className="mt-1 text-lg text-brand">
          {"★".repeat(myRating.score)}
          <span className="text-gray-300">{"★".repeat(5 - myRating.score)}</span>
        </p>
        {myRating.comment && <p className="mt-1 text-sm text-gray-600">{myRating.comment}</p>}
        <div className="mt-3 flex gap-2 text-xs font-bold">
          <button type="button" onClick={startEdit} disabled={isBusy}>수정</button>
          <button type="button" onClick={handleDelete} disabled={isBusy} className="text-red-500">
            {deleteMutation.isPending ? "삭제 중" : "삭제"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
      <label htmlFor="score" className="text-sm font-bold">
        {myRating ? "평점 수정" : "평점 남기기"}
      </label>
      <select
        id="score"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="w-fit rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        {SCORES.map((value) => (
          <option key={value} value={value}>{"★".repeat(value)} ({value}점)</option>
        ))}
      </select>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={500}
        placeholder="후기를 남겨 주세요 (선택, 500자 이하)"
        aria-label="후기"
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isBusy}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white disabled:bg-brand/40"
        >
          {isBusy ? "저장 중" : "저장"}
        </button>
        {myRating && (
          <button type="button" onClick={() => setIsEditing(false)} className="text-sm">
            취소
          </button>
        )}
      </div>
    </form>
  );
}
