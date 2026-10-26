export function LoadingMessage() {
    return <p className="py-16 text-center text-gray-500">불러오는 중…</p>;
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
