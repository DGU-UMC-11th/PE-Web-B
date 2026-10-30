import { cn } from "../../utils/cn";

interface PosterProps {
    src: string | undefined;
    alt: string;
    className?: string;
}

// 포스터가 없으면 회색 박스
export default function Poster({ src, alt, className }: PosterProps) {
    return src ? (
        <img src={src} alt={alt} className={className} />
    ) : (
        <div role="img" aria-label={alt} className={cn("bg-gray-200", className)} />
    );
}
