import styles from "./Marquee.module.css";

export default function Marquee({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
