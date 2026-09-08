import styles from "./ImagePlaceholder.module.css";

// Bloco visual temporário até a imagem real ser adicionada em src/assets/images/
export default function ImagePlaceholder({
  fileName,
  ratio,
  height,
  className = "",
}) {
  const style = height ? { height } : { aspectRatio: ratio || "4 / 3" };

  return (
    <div className={`${styles.placeholder} ${className}`} style={style}>
      <span className={styles.label}>{fileName}</span>
    </div>
  );
}
