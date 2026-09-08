import styles from "./Button.module.css";

export const CTA_LABEL = "Quero um orçamento";

function ArrowIcon() {
  return (
    <span className={styles.icon}>
      <svg width="6" height="10" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.5 0.5L4.5 4.5L0.5 8.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Button({
  children = CTA_LABEL,
  variant = "light",
  type = "button",
  onClick,
  fullWidth = false,
  withIcon = true,
  className = "",
  ...rest
}) {
  const variantClass = variant === "dark" ? styles.dark : styles.light;
  const widthClass = fullWidth ? styles.fullWidth : "";
  const noIconClass = withIcon ? "" : styles.noIcon;

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${widthClass} ${noIconClass} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {withIcon && <ArrowIcon />}
      {children}
    </button>
  );
}
