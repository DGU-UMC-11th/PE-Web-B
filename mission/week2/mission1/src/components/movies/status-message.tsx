import { cn } from "../../utils/cn";

interface StatusMessageProps {
  children: string;
  tone?: "default" | "error";
}

// 로딩, 오류, 빈 결과 문구를 같은 모양으로 보여 줌.
export function StatusMessage({ children, tone = "default" }: StatusMessageProps) {
  return (
    <p
      className={cn(
        "py-20 text-center text-sm",
        tone === "error" ? "text-red-600" : "text-ink-secondary",
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
