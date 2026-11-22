import { useState } from "react";
import { useLoginMutation } from "../../hooks/use-login-mutation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation();
  const canSubmit =
    EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-16 flex w-full max-w-sm flex-col gap-5 px-4"
    >
      <h1 className="text-center text-2xl font-extrabold">로그인</h1>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-bold">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-bold">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit || loginMutation.isPending}
        className="w-full rounded-lg bg-brand py-3 font-bold text-white disabled:bg-brand/40"
      >
        {loginMutation.isPending ? "로그인 중" : "로그인"}
      </button>
    </form>
  );
}
