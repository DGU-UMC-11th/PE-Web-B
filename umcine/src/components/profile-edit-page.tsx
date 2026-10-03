import { useState } from "react";
import styles from "./profile-edit-page.module.css";

interface ProfileEditPageProps {
  currentNickname: string;
  currentEmail: string;
  onSave: (newNickname: string) => void;
  onWithdraw: () => void;
}

export default function ProfileEditPage({
  currentNickname,
  currentEmail,
  onSave,
  onWithdraw,
}: ProfileEditPageProps) {
  const [nickname, setNickname] = useState(currentNickname);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(nickname);
  };

  const handleWithdrawClick = () => {
    if (
      window.confirm(
        "정말로 탈퇴하시겠습니까? 작성한 평점, 후기와 즐겨찾기가 모두 삭제됩니다."
      )
    ) {
      onWithdraw();
    }
  };

  return (
    <div className={styles["profile-edit-page"]}>
      <div className={styles.container}>
        <div className={styles["header-row"]}>
          <div>
            <h1 className={styles.title}>내 정보 수정</h1>
            <p className={styles.subtitle}>
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>
          <button
            type="button"
            className={styles["save-btn"]}
            onClick={handleSave}
          >
            변경사항 저장
          </button>
        </div>

        <div className={styles["content-card"]}>
          {/* 아바타 영역 */}
          <div className={styles["avatar-section"]}>
            <div className={styles["avatar-box"]}>
              <div className={styles["avatar-circle"]}>
                <img
                  src="/movie-icons/person.svg"
                  alt="Profile Avatar"
                  className={styles["person-icon"]}
                />
              </div>
              <button
                type="button"
                className={styles["edit-badge"]}
                aria-label="프로필 이미지 변경"
              >
                <img
                  src="/movie-icons/edit.svg"
                  alt=""
                  className={styles["edit-icon"]}
                />
              </button>
            </div>
            <p className={styles["avatar-title"]}>프로필 이미지</p>
            <p className={styles["avatar-desc"]}>선택 사항 · 최대 5MB</p>
          </div>

          {/* 입력 폼 영역 */}
          <div className={styles["form-section"]}>
            <div className={styles["form-group"]}>
              <label className={styles.label} htmlFor="nickname">
                닉네임
              </label>
              <div className={styles["input-row"]}>
                <input
                  id="nickname"
                  type="text"
                  className={styles.input}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
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

            <div className={styles["form-group"]}>
              <label className={styles.label} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className={styles["disabled-input"]}
                value={currentEmail}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 영역 */}
        <div className={styles["withdraw-box"]}>
          <div className={styles["withdraw-info"]}>
            <h2 className={styles["withdraw-title"]}>회원 탈퇴</h2>
            <p className={styles["withdraw-desc"]}>
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>
          <button
            type="button"
            className={styles["withdraw-btn"]}
            onClick={handleWithdrawClick}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
