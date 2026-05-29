import { Text } from "@shopify/polaris";
import type { MetricItem } from "./mockData";
import { AvisStatusPill } from "./AvisStatusPill";
import styles from "./avis-ui.module.css";

export function AvisMetricCard({ label, value, tone, hint }: MetricItem) {
  return (
    <div className={styles.metricCard}>
      <Text as="p" variant="bodySm" tone="subdued">
        {label}
      </Text>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <div className={styles.metricValue}>{value}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <span className={styles.metricHint}>{hint}</span>
        {tone ? <AvisStatusPill tone={tone}>{label}</AvisStatusPill> : null}
      </div>
    </div>
  );
}
