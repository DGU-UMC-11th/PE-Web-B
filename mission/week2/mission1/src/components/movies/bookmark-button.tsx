import { useNavigate } from "@tanstack/react-router";
import {
  useFavoritesQuery,
  useFavoriteStatusQuery,
  useToggleFavoriteMutation,
} from "../../hooks/use-favorites";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  // icon: 포스터 위에 겹치는 아이콘 버튼, labeled: 상세 화면의 문구 버튼
  variant?: "icon" | "labeled";
  className?: string;
}

export function BookmarkButton({ variant = "icon", ...props }: BookmarkButtonProps) {
  return variant === "labeled" ? <LabeledBookmarkButton {...props} /> : <IconBookmarkButton {...props} />;
}

type ButtonProps = Omit<BookmarkButtonProps, "variant">;

/** 로그인 확인 후 즐겨찾기 등록·해제 요청을 보내요. */
function useToggleFavorite(movieId: number, isFavorite: boolean) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const toggleMutation = useToggleFavoriteMutation();

  const toggle = () => {
    if (!accessToken) {
      alert("로그인 후 즐겨찾기할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (toggleMutation.isPending) return;
    toggleMutation.mutate({ movieId, isFavorite });
  };

  return { toggle, isPending: toggleMutation.isPending };
}

/** 상세 화면: GET /favorites/{movieId}로 이 영화의 즐겨찾기 여부를 확인해요. */
function LabeledBookmarkButton({ movieId, className }: ButtonProps) {
  const statusQuery = useFavoriteStatusQuery(movieId);
  const isFavorite = statusQuery.data ?? false;
  const { toggle, isPending } = useToggleFavorite(movieId, isFavorite);
  const isChecking = statusQuery.isLoading;

  const label = isChecking
    ? "확인 중"
    : isPending
      ? "변경 중"
      : isFavorite
        ? "즐겨찾기 해제"
        : "즐겨찾기 추가";

  return (
    <button
      type="button"
      className={cn(
        "flex h-[42px] items-center gap-2 rounded-lg px-4 text-sm font-extrabold text-white disabled:opacity-60",
        isFavorite ? "bg-primary hover:bg-primary-hover" : "bg-ink hover:bg-ink-secondary",
        className,
      )}
      aria-pressed={isFavorite}
      disabled={isChecking || isPending}
      onClick={toggle}
    >
      <img src="/icons/bookmark-small.svg" alt="" width={16} height={16} />
      {label}
    </button>
  );
}

/** 목록 카드: 카드마다 요청하지 않도록 GET /favorites 목록 하나로 여부를 판단해요. */
function IconBookmarkButton({ movieId, movieTitle, className }: ButtonProps) {
  const favoritesQuery = useFavoritesQuery();
  const isFavorite =
    favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ?? false;
  const { toggle, isPending } = useToggleFavorite(movieId, isFavorite);

  return (
    <button
      type="button"
      className={cn(
        "flex size-[34px] items-center justify-center rounded-lg border disabled:opacity-60",
        isFavorite ? "border-primary bg-primary" : "border-white bg-ink",
        className,
      )}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `${movieTitle} 즐겨찾기 해제` : `${movieTitle} 즐겨찾기 추가`}
      disabled={favoritesQuery.isLoading || isPending}
      onClick={toggle}
    >
      <img
        src={isFavorite ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
