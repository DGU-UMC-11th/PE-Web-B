import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FormFieldProps extends Omit<ComponentProps<"input">, "className"> {
  id: string;
  label: string;
  /** 입력창 오른쪽에 붙는 버튼 (예: 중복 확인) */
  action?: ReactNode;
  /** 오류 메시지. 있으면 hint 대신 빨간 글씨로 표시 */
  error?: string;
  /** 항상 보이는 안내 문구 */
  hint?: string;
}

export function FormField({ id, label, action, error, hint, disabled, ...inputProps }: FormFieldProps) {
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-lg border border-line bg-surface px-[13px] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
          disabled && "bg-page",
        )}
      >
        <input
          id={id}
          className="min-w-0 flex-1 text-[15px] outline-none placeholder:text-ink-tertiary disabled:text-ink-secondary"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...inputProps}
        />
        {action}
      </div>
      {message && (
        <p
          id={messageId}
          className={cn("text-xs", error ? "text-[13px] text-red-600" : "text-ink-tertiary")}
        >
          {message}
        </p>
      )}
    </div>
  );
}

interface FieldActionButtonProps extends Omit<ComponentProps<"button">, "className" | "type"> {}

/** 입력창 안쪽 오른쪽에 놓는 작은 텍스트 버튼 */
export function FieldActionButton(props: FieldActionButtonProps) {
  return (
    <button
      type="button"
      className="shrink-0 text-[13px] font-extrabold text-primary disabled:opacity-60"
      {...props}
    />
  );
}

interface SubmitButtonProps extends Omit<ComponentProps<"button">, "className" | "type"> {}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="h-[46px] w-full rounded-lg bg-primary text-[15px] font-extrabold text-white hover:bg-primary-hover disabled:bg-primary/45"
      {...props}
    />
  );
}
