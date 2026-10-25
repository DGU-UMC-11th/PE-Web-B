import { cn } from "../../utils/cn";

interface MoviePosterProps {
  src: string | null;
  alt: string;
  className?: string;
}

// 이미지 URL이 없으면 <img>에 null이나 빈 문자열을 넣지 않고 같은 크기의 회색 영역을 보여 줘요.
export function MoviePoster({ src, alt, className }: MoviePosterProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("grid place-items-center bg-gray-200 text-xs text-gray-500", className)}
      >
        이미지 없음
      </div>
    );
  }

  return <img className={cn("object-cover", className)} src={src} alt={alt} />;
}
