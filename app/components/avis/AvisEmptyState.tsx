import { Button, Text } from "@shopify/polaris";
import styles from "./avis-ui.module.css";

export function AvisEmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className={styles.emptyState}>
      <Text as="h3" variant="headingMd">
        {title}
      </Text>
      <div style={{ marginTop: 8, marginBottom: 14 }}>
        <Text as="p" variant="bodyMd" tone="subdued">
          {description}
        </Text>
      </div>
      {actionLabel ? (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
