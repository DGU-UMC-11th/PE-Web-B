import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  icon?: string;
  errorMessage?: string;
  helperMessage?: string;
  action?: ReactNode;
}

export function TextField({
  id,
  label,
  icon,
  errorMessage,
  helperMessage,
  action,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-[#191b1f]">
        {label}
      </label>
      <div className="flex gap-2">
        <div
          className={cn(
            "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border bg-white px-3 focus-within:border-[#191b1f]",
            errorMessage ? "border-red-500" : "border-[#e0e4eb]",
            inputProps.disabled && "bg-gray-50",
          )}
        >
          {icon && <img className="size-[18px] opacity-50" src={icon} alt="" />}
          <input
            id={id}
            aria-invalid={Boolean(errorMessage)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 disabled:text-gray-500"
            {...inputProps}
          />
        </div>
        {action}
      </div>
      {errorMessage ? (
        <p className="m-0 text-xs text-red-500">{errorMessage}</p>
      ) : helperMessage ? (
        <p className="m-0 text-xs text-blue-600">{helperMessage}</p>
      ) : null}
    </div>
  );
}
