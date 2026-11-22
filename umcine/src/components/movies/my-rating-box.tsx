import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Rating } from "../../api/ratings/models.ts";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useMyMovieRatingQuery,
  useUpdateRatingMutation,
} from "../../hooks/use-ratings.ts";
import { useAuthStore } from "../../stores/auth-store.ts";
import { cn } from "../../utils/cn.ts";

const COMMENT_MAX_LENGTH = 500;
const STARS = [1, 2, 3, 4, 5];

interface MyRatingBoxProps {
  movieId: number;
}

// 영화 상세 오른쪽의 "내 평점" 영역이에요.
// 이 영화에 남긴 평점이 없으면 등록(POST), 있으면 수정(PATCH)과 삭제(DELETE)를 할 수 있어요.
export default function MyRatingBox({ movieId }: MyRatingBoxProps) {
  const isLoggedIn = useAuthStore((state) => Boolean(state.accessToken));
  const myRatingQuery = useMyMovieRatingQuery(movieId);

  return (
    <aside className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] min-[769px]:col-span-2 min-[1025px]:col-span-1 min-[1025px]:mt-0">
      <h3 className="text-[17px] font-bold text-gray-900">내 평점</h3>
      {!isLoggedIn ? (
        <p className="mt-3 text-sm text-gray-500">
          로그인하면 평점을 남길 수 있어요.{" "}
          <Link to="/login" className="font-semibold text-blue-600 underline underline-offset-[3px]">
            로그인
          </Link>
        </p>
      ) : myRatingQuery.isPending ? (
        <p className="mt-3 text-sm text-gray-400">내 평점을 불러오는 중이에요...</p>
      ) : myRatingQuery.isError ? (
        <p className="mt-3 text-sm text-red-500">내 평점을 불러오지 못했어요.</p>
      ) : (
        // 평점이 생기거나(등록) 없어지면(삭제) key가 바뀌어 폼이 서버 값으로 다시 채워져요.
        <MyRatingForm
          key={myRatingQuery.data?.ratingId ?? "new"}
          movieId={movieId}
          rating={myRatingQuery.data}
        />
      )}
    </aside>
  );
}

interface MyRatingFormProps {
  movieId: number;
  rating: Rating | null;
}

function MyRatingForm({ movieId, rating }: MyRatingFormProps) {
  const createRatingMutation = useCreateRatingMutation();
  const updateRatingMutation = useUpdateRatingMutation();
  const deleteRatingMutation = useDeleteRatingMutation();

  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");

  const trimmedComment = comment.trim();
  const isScoreValid = score >= 1 && score <= 5;
  const isCommentValid = comment.length <= COMMENT_MAX_LENGTH;
  // 수정할 때는 바뀐 내용이 있어야 저장할 수 있어요.
  const isChanged =
    !rating || score !== rating.score || trimmedComment !== (rating.comment ?? "");
  const isBusy =
    createRatingMutation.isPending || updateRatingMutation.isPending || deleteRatingMutation.isPending;
  const canSubmit = isScoreValid && isCommentValid && isChanged && !isBusy;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (rating) {
      updateRatingMutation.mutate({ ratingId: rating.ratingId, score, comment: trimmedComment });
    } else {
      createRatingMutation.mutate({ movieId, score, comment: trimmedComment });
    }
  };

  const handleDelete = () => {
    if (!rating || isBusy) return;
    if (!window.confirm("이 영화에 남긴 평점을 삭제할까요?")) return;
    deleteRatingMutation.mutate(rating.ratingId);
  };

  const submitLabel = rating
    ? updateRatingMutation.isPending ? "수정 중" : "평점 수정"
    : createRatingMutation.isPending ? "저장 중" : "평점 저장";

  return (
    <>
      <p className="mt-1 mb-4 text-xs text-gray-400">
        {rating ? "이미 남긴 평점이에요. 수정하거나 삭제할 수 있어요." : "별점은 필수, 후기는 선택이에요."}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4 flex gap-1.5" role="radiogroup" aria-label="별점">
          {STARS.map((star) => (
            <button
              key={star}
              type="button"
              className="p-0.5 disabled:cursor-not-allowed"
              onClick={() => setScore(star)}
              disabled={isBusy}
              role="radio"
              aria-checked={score === star}
              aria-label={`${star}점`}
            >
              <img
                src={star <= score ? "/movie-icons/star.svg" : "/movie-icons/star-outline.svg"}
                alt=""
                className="size-6 opacity-80"
              />
            </button>
          ))}
        </div>

        <textarea
          className={cn(
            "w-full resize-y rounded-lg border border-gray-200 p-3 font-[inherit] text-[13px] text-gray-900 outline-none focus:border-blue-600 disabled:bg-gray-50",
            !isCommentValid && "border-rose-500 focus:border-rose-500",
          )}
          placeholder="영화를 보고 느낀 점을 남겨보세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isBusy}
          rows={4}
        />
        <p className={cn("mb-4 text-right text-xs", isCommentValid ? "text-gray-400" : "text-rose-500")}>
          {comment.length} / {COMMENT_MAX_LENGTH}
        </p>

        <button
          type="submit"
          className="h-[42px] w-full rounded-md bg-gray-900 text-sm font-bold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!canSubmit}
        >
          {submitLabel}
        </button>

        {rating && (
          <button
            type="button"
            className="mt-2 h-[38px] w-full rounded-md border border-rose-200 bg-white text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleDelete}
            disabled={isBusy}
          >
            {deleteRatingMutation.isPending ? "삭제 중" : "평점 삭제"}
          </button>
        )}
      </form>
    </>
  );
}
