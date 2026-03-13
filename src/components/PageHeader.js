import styles from "./PageHeader.module.css";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className={styles.header}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
}
