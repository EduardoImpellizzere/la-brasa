import styles from "./ChipByState.module.css";

export default function ChipByState({ state, label }) {
  const isOk = state === "confirmado" || state === "comprado";
  const isWarning = state === "warning";

  return (
    <span
      className={`${styles.chip} ${isOk ? styles.chipOk : styles.chipPending} ${isWarning ? styles.chipWarn : ""}`}
    >
      {isOk ? "✓" : ""} {label}
    </span>
  );
}
