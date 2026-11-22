import { Link } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import type { Rating } from "../../api/ratings/ratings";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useMyMovieRatingQuery,
  useUpdateRatingMutation,
} from "../../hooks/use-ratings";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const RATING_SCORES = [1, 2, 3, 4, 5];
const COMMENT_MAX_LENGTH = 500;

interface MyRatingPanelProps {
  movieId: number;
}

/** 영화 상세 오른쪽의 내 평점 영역: 조회, 등록, 수정, 삭제 */
export function MyRatingPanel({ movieId }: MyRatingPanelProps) {
  return (
    <aside className="flex w-[360px] shrink-0 flex-col gap-2 border-l border-line pb-[41px] pl-[30px]">
      <h2 className="text-[21px] font-bold tracking-[-0.63px]">내 평점</h2>
      <MyRatingContent movieId={movieId} />
    </aside>
  );
}

function MyRatingContent({ movieId }: MyRatingPanelProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const ratingQuery = useMyMovieRatingQuery(movieId);
  const [isEditing, setIsEditing] = useState(false);

  if (!accessToken) {
    return (
      <p className="text-sm text-ink-secondary">
        <Link to="/login" className="font-extrabold text-primary">
          로그인
        </Link>
        하면 평점을 남길 수 있어요.
      </p>
    );
  }
  if (ratingQuery.isPending) {
    return <p className="text-sm text-ink-secondary">내 평점을 불러오는 중이에요.</p>;
  }
  if (ratingQuery.isError) {
    return <p className="text-sm text-ink-secondary">내 평점을 불러오지 못했어요.</p>;
  }

  const rating = ratingQuery.data;

  // 평점이 있으면 보기 화면, 수정 중이거나 평점이 없으면 입력 폼
  if (rating && !isEditing) {
    return <RatingView rating={rating} onEdit={() => setIsEditing(true)} />;
  }

  return (
    <RatingForm
      // 평점이 바뀌면 입력값을 새로 채우도록 key로 폼을 다시 만들어요.
      key={rating?.ratingId ?? "new"}
      movieId={movieId}
      rating={rating}
      onDone={() => setIsEditing(false)}
    />
  );
}

function ScoreStars({ score }: { score: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`별점 ${score}점`}>
      {RATING_SCORES.map((value) => (
        <img
          key={value}
          src={value <= score ? "/icons/star.svg" : "/icons/star-outline.svg"}
          alt=""
          width={24}
          height={24}
        />
      ))}
    </div>
  );
}

interface RatingViewProps {
  rating: Rating;
  onEdit: () => void;
}

function RatingView({ rating, onEdit }: RatingViewProps) {
  const deleteMutation = useDeleteRatingMutation();

  const handleDelete = () => {
    if (deleteMutation.isPending) return;
    if (!confirm("평점을 삭제할까요?")) return;
    deleteMutation.mutate(rating.ratingId);
  };

  return (
    <div className="flex flex-col gap-3">
      <ScoreStars score={rating.score} />
      <p className="min-h-[60px] rounded-lg bg-page px-3 py-3 text-[13px] leading-[19.5px] whitespace-pre-wrap text-ink-secondary">
        {rating.comment || "남긴 후기가 없어요."}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="h-[42px] flex-1 rounded-lg bg-ink text-sm font-extrabold text-white hover:bg-ink-secondary disabled:opacity-60"
          disabled={deleteMutation.isPending}
          onClick={onEdit}
        >
          수정
        </button>
        <button
          type="button"
          className="h-[42px] flex-1 rounded-lg border border-line bg-surface text-sm font-extrabold text-ink-secondary hover:bg-page disabled:opacity-60"
          disabled={deleteMutation.isPending}
          onClick={handleDelete}
        >
          {deleteMutation.isPending ? "삭제 중" : "삭제"}
        </button>
      </div>
    </div>
  );
}

interface RatingFormProps {
  movieId: number;
  /** 있으면 수정, 없으면 등록 */
  rating: Rating | null;
  onDone: () => void;
}

function RatingForm({ movieId, rating, onDone }: RatingFormProps) {
  const createMutation = useCreateRatingMutation();
  const updateMutation = useUpdateRatingMutation();
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");

  const isEditMode = rating !== null;
  const isPending = createMutation.isPending || updateMutation.isPending;
  const canSubmit = score >= 1 && comment.length <= COMMENT_MAX_LENGTH;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || isPending) return;

    // 후기는 선택이라 비어 있으면 보내지 않아요. (수정 시 빼면 기존 후기가 지워져요)
    const trimmedComment = comment.trim() || undefined;

    if (rating) {
      updateMutation.mutate(
        { ratingId: rating.ratingId, score, comment: trimmedComment },
        { onSuccess: onDone },
      );
    } else {
      createMutation.mutate({ movieId, score, comment: trimmedComment });
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <p className="text-xs text-ink-tertiary">별점은 필수, 후기는 선택이에요.</p>
      <div className="flex gap-1" role="radiogroup" aria-label="별점">
        {RATING_SCORES.map((value) => {
          const isFilled = value <= score;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={value === score}
              aria-label={`${value}점`}
              disabled={isPending}
              className={cn(
                "flex size-[38px] items-center justify-center rounded-lg border bg-surface",
                isFilled ? "border-ink-secondary" : "border-line",
              )}
              onClick={() => setScore(value)}
            >
              <img
                src={isFilled ? "/icons/star.svg" : "/icons/star-outline.svg"}
                alt=""
                width={24}
                height={24}
              />
            </button>
          );
        })}
      </div>
      <textarea
        className="h-[102px] resize-none rounded-lg border border-line bg-surface px-3 pt-4 pb-[18px] text-[13px] leading-[19.5px] outline-none placeholder:text-ink-tertiary focus:border-ink-tertiary"
        aria-label="후기"
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        maxLength={COMMENT_MAX_LENGTH}
        value={comment}
        disabled={isPending}
        onChange={(e) => setComment(e.target.value)}
      />
      <p className="text-right text-xs text-ink-tertiary">
        {comment.length}/{COMMENT_MAX_LENGTH}
      </p>
      <button
        type="submit"
        className="h-[42px] rounded-lg bg-ink text-sm font-extrabold text-white hover:bg-ink-secondary disabled:opacity-45"
        disabled={!canSubmit || isPending}
      >
        {isPending ? "저장 중" : isEditMode ? "평점 수정" : "평점 저장"}
      </button>
      {isEditMode && (
        <button
          type="button"
          className="h-[42px] rounded-lg border border-line bg-surface text-sm font-extrabold text-ink-secondary hover:bg-page"
          disabled={isPending}
          onClick={onDone}
        >
          취소
        </button>
      )}
    </form>
  );
}
