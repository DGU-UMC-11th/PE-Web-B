import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.attribution}>
          <img
            src="/images/logos/tmdb-logo.svg"
            alt="TMDB Logo"
            className={styles.logo}
          />
          <p className={styles.text}>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
