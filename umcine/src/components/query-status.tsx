/*export function LoadingMessage() {
    return <p className="py-16 text-center text-gray-500">불러오는 중…</p>;
}*/
export function LoadingMessage() {
    return (
        <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <p>불러오는 중</p>
            <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            </span>
        </div>
    );
}

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
    isRetrying: boolean;
}

export function ErrorMessage({ message, onRetry, isRetrying }: ErrorMessageProps) {
    return (
        <div className="py-16 text-center text-gray-500">
            <p>{message}</p>
            <button
                type="button"
                onClick={onRetry}
                disabled={isRetrying}
                className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
                {isRetrying ? "다시 시도 중…" : "다시 시도"}
            </button>
        </div>
    );
}
