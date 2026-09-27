import { useState } from "react";
import styles from "./login-page.module.css";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateSignup: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onNavigateSignup,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles.container}>
        <h1 className={styles.title}>로그인</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="login-email">
              이메일
            </label>
            <div className={styles["input-wrapper"]}>
              <img
                src="/movie-icons/mail.svg"
                alt=""
                className={styles.icon}
              />
              <input
                id="login-email"
                type="email"
                className={styles.input}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="login-password">
              비밀번호
            </label>
            <div className={styles["input-wrapper"]}>
              <img
                src="/movie-icons/lock.svg"
                alt=""
                className={styles.icon}
              />
              <input
                id="login-password"
                type="password"
                className={styles.input}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            로그인
          </button>
        </form>

        <p className={styles.footer}>
          처음이신가요?{" "}
          <button
            type="button"
            className={styles["signup-link"]}
            onClick={onNavigateSignup}
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}
