import { cn } from "../utils/cn";

interface StatusMessageProps {
  message: string;
  className?: string;
}

export function StatusMessage({ message, className }: StatusMessageProps) {
  return (
    <p className={cn("m-0 py-20 text-center text-sm text-gray-500", className)}>{message}</p>
  );
}
