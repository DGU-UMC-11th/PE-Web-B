import { useState } from "react";
import { Link } from "@tanstack/react-router";

const DEFAULT_FORM = { email: "", password: "" };

type FormKey = keyof typeof DEFAULT_FORM;

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChangeField = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 API 연결은 이후 단계에서 추가
  };

  const labelClass = "mb-1.5 block text-[13px] font-bold text-[#17191e]";
  const inputClass =
    "h-12 w-full rounded-lg border border-[#e3e6eb] bg-white pr-3.5 pl-10 text-sm text-[#17191e] outline-none placeholder:text-[#969da8] focus:border-[#2563eb]";
  const iconClass = "absolute top-1/2 left-3.5 size-4 -translate-y-1/2";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 pt-[120px] pb-20"
    >
      <h1 className="mb-1 text-[32px] font-bold text-[#17191e]">로그인</h1>

      <div>
        <label htmlFor="email" className={labelClass}>
          이메일
        </label>
        <div className="relative">
          <img src="/icons/mail.svg" alt="" className={iconClass} />
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => handleChangeField("email", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          비밀번호
        </label>
        <div className="relative">
          <img src="/icons/lock.svg" alt="" className={iconClass} />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) => handleChangeField("password", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-[#2563eb] text-sm font-bold text-white"
      >
        로그인
      </button>

      <p className="text-center text-xs text-[#606774]">
        처음이신가요?{" "}
        <Link to="/signup" className="font-bold text-[#2563eb]">
          회원가입
        </Link>
      </p>
    </form>
  );
}
