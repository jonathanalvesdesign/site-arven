import styles from "./FaqItem.module.css";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqItem({ pergunta, resposta, open, onToggle }) {
  return (
    <div className={styles.item}>
      <button
        className={styles.header}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.question}>{pergunta}</span>
        <ChevronIcon open={open} />
      </button>
      <div className={`${styles.answer} ${open ? styles.answerOpen : ""}`}>
        <div className={styles.answerInner}>{resposta}</div>
      </div>
    </div>
  );
}
