import { Button, Text } from "@shopify/polaris";
import styles from "./avis-ui.module.css";

export function AvisStickySaveBar({
  onSave,
  onDiscard,
}: {
  onSave: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className={styles.saveBar}>
      <div>
        <Text as="p" variant="bodyMd" fontWeight="medium">
          Unsaved changes
        </Text>
        <Text as="p" variant="bodySm" tone="subdued">
          Preview-only settings can still demonstrate save and discard states.
        </Text>
      </div>
      <div className={styles.actionsRow}>
        <Button onClick={onDiscard}>Discard</Button>
        <Button variant="primary" onClick={onSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
