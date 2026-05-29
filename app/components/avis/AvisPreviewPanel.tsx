import { Button, InlineStack, Text } from "@shopify/polaris";
import styles from "./avis-ui.module.css";

export function AvisPreviewPanel() {
  return (
    <div className={styles.previewPanel}>
      <div className={styles.previewCard}>
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Live preview
          </Text>
          <span className={styles.pill}>Storefront</span>
        </InlineStack>
        <div style={{ marginTop: 16 }} className={styles.productHero}>
          <div className={styles.productImage} />
          <div className={styles.productBody}>
            <div>
              <div className={styles.productTitle}>Classic T-Shirt</div>
              <div className={styles.productPrice}>$29.99</div>
              <div className={styles.productMeta}>Color: Ruby Red</div>
            </div>
            <div className={styles.swatchRow}>
              <span
                className={`${styles.swatchSelectable} ${styles.swatchSelected}`}
                style={{ background: "#D72C0D" }}
              />
              <span
                className={styles.swatchSelectable}
                style={{ background: "#2C6ECB" }}
              />
              <span
                className={`${styles.swatchSelectable} ${styles.swatchSoldOut}`}
                style={{ background: "#108043" }}
              />
              <span
                className={styles.swatchSelectable}
                style={{ background: "#F59E0B" }}
              />
            </div>
            <Button variant="primary" fullWidth>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
