import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useRatingMutations, useMyRating } from "../../hooks/use-ratings";
import { cn } from "../../utils/cn";

interface MovieRatingSectionProps {
  movieId: number;
}

const SCORES = [1, 2, 3, 4, 5];

export function MovieRatingSection({ movieId }: MovieRatingSectionProps) {
  const { memberId, isLoading, rating } = useMyRating(movieId);
  const { create, update, remove } = useRatingMutations(movieId);

  // 서버에 저장된 평점이 있으면 그 값에서 시작하고, 없으면 빈 상태에서 시작해요.
  // 저장된 평점이 바뀌면 key로 컴포넌트를 다시 만들어 입력값을 맞춰요.
  if (memberId === null) {
    return (
      <section className="flex flex-col gap-2 border-t border-[#e3e6eb] px-20 py-6">
        <h2 className="text-base font-bold text-[#17191e]">내 평점</h2>
        <p className="text-sm text-[#606774]">
          평점을 남기려면{" "}
          <Link to="/login" className="font-bold text-[#2563eb]">
            로그인
          </Link>
          해 주세요.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="border-t border-[#e3e6eb] px-20 py-6">
        <p className="text-sm text-[#606774]">내 평점을 불러오는 중이에요.</p>
      </section>
    );
  }

  return (
    <RatingForm
      key={rating?.ratingId ?? "new"}
      initialScore={rating?.score ?? 0}
      initialComment={rating?.comment ?? ""}
      ratingId={rating?.ratingId}
      isPending={create.isPending || update.isPending || remove.isPending}
      onCreate={(body) => create.mutate(body)}
      onUpdate={(ratingId, body) => update.mutate({ ratingId, ...body })}
      onRemove={(ratingId) => remove.mutate(ratingId)}
    />
  );
}

interface RatingFormProps {
  initialScore: number;
  initialComment: string;
  ratingId?: number;
  isPending: boolean;
  onCreate: (body: { score: number; comment?: string }) => void;
  onUpdate: (ratingId: number, body: { score: number; comment?: string }) => void;
  onRemove: (ratingId: number) => void;
}

function RatingForm({
  initialScore,
  initialComment,
  ratingId,
  isPending,
  onCreate,
  onUpdate,
  onRemove,
}: RatingFormProps) {
  const [score, setScore] = useState(initialScore);
  const [comment, setComment] = useState(initialComment);
  const hasRating = ratingId !== undefined;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (score < 1 || isPending) return;

    const body = { score, comment: comment.trim() || undefined };
    if (hasRating) onUpdate(ratingId, body);
    else onCreate(body);
  };

  return (
    <section className="flex flex-col gap-3 border-t border-[#e3e6eb] px-20 py-6">
      <h2 className="text-base font-bold text-[#17191e]">내 평점</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-1.5">
          {SCORES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setScore(value)}
              className={cn(
                "h-9 w-9 rounded-lg border text-sm font-bold",
                value <= score
                  ? "border-[#2563eb] bg-[#2563eb] text-white"
                  : "border-[#e3e6eb] bg-white text-[#606774]",
              )}
            >
              {value}
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          placeholder="후기를 남겨 보세요. (500자 이하, 선택)"
          className="h-24 w-full max-w-[600px] resize-none rounded-lg border border-[#e3e6eb] p-3 text-sm outline-none focus:border-[#2563eb]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={score < 1 || isPending}
            className="h-10 rounded-lg bg-[#2563eb] px-4 text-sm font-bold text-white disabled:opacity-50"
          >
            {hasRating ? "평점 수정" : "평점 등록"}
          </button>
          {hasRating && (
            <button
              type="button"
              disabled={isPending}
              onClick={() => onRemove(ratingId)}
              className="h-10 rounded-lg border border-red-500 bg-white px-4 text-sm font-bold text-red-600 disabled:opacity-50"
            >
              삭제
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
