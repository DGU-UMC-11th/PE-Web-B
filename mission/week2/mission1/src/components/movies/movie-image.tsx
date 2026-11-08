import { cn } from "../../utils/cn";

interface MovieImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

// URL이 없으면 <img>를 그리지 않고 같은 영역에 "이미지 없음"을 표시.
export function MovieImage({ src, alt, className }: MovieImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-line text-xs text-ink-tertiary",
          className,
        )}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <img
      className={cn("object-cover", className)}
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
    />
  );
}
