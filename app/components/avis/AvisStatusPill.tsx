import styles from "./avis-ui.module.css";

type Tone = "success" | "warning" | "critical" | "info";

export function AvisStatusPill({
  children,
  tone,
}: {
  children: string;
  tone: Tone;
}) {
  const toneClass =
    tone === "success"
      ? styles.pillSuccess
      : tone === "warning"
        ? styles.pillWarning
        : tone === "critical"
          ? styles.pillCritical
          : styles.pillInfo;

  return <span className={`${styles.pill} ${toneClass}`}>{children}</span>;
}
