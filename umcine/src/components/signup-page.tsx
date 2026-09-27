import { useState } from "react";
import styles from "./signup-page.module.css";

interface SignupPageProps {
  onNavigateLogin: () => void;
  onSignupSuccess?: () => void;
}

export default function SignupPage({
  onNavigateLogin,
  onSignupSuccess,
}: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignupSuccess) {
      onSignupSuccess();
    } else {
      onNavigateLogin();
    }
  };

  return (
    <div className={styles["signup-page"]}>
      <div className={styles.container}>
        <h1 className={styles.title}>회원가입</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <div className={styles["input-row"]}>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles["check-btn"]}
                onClick={() => alert("사용 가능한 이메일입니다.")}
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 닉네임 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="nickname">
              닉네임
            </label>
            <div className={styles["input-row"]}>
              <input
                id="nickname"
                type="text"
                className={styles.input}
                placeholder="2~12자"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles["check-btn"]}
                onClick={() => alert("사용 가능한 닉네임입니다.")}
              >
                중복 확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className={styles["full-input"]}
              placeholder="8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className={styles.caption}>
              영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles["form-group"]}>
            <label className={styles.label} htmlFor="confirm-password">
              비밀번호 확인
            </label>
            <input
              id="confirm-password"
              type="password"
              className={styles["full-input"]}
              placeholder="다시 입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles["submit-btn"]}>
            가입하기
          </button>
        </form>

        <p className={styles.footer}>
          이미 계정이 있나요?{" "}
          <button
            type="button"
            className={styles["login-link"]}
            onClick={onNavigateLogin}
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
