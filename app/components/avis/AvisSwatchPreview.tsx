import styles from "./avis-ui.module.css";

type Preview =
  | { kind: "color"; value: string }
  | { kind: "image"; value: string }
  | { kind: "text"; value: string }
  | { kind: "button"; value: string };

export function AvisSwatchPreview({
  preview,
}: {
  preview?: Preview;
}) {
  if (!preview) {
    return <span style={{ color: "#8c9196" }}>—</span>;
  }

  if (preview.kind === "color") {
    return (
      <span
        className={styles.swatchDot}
        style={{ background: preview.value, display: "inline-block" }}
      />
    );
  }

  if (preview.kind === "image") {
    return (
      <span
        className={styles.swatchImage}
        style={{ backgroundImage: preview.value }}
      />
    );
  }

  return <span className={styles.swatchText}>{preview.value}</span>;
}
