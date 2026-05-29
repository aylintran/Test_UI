import { useState } from "react";
import {
  Banner,
  Card,
  Checkbox,
  ChoiceList,
  Layout,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { variantCards } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisVariantOnCollectionRoute() {
  const [enabled, setEnabled] = useState(true);
  const [naming, setNaming] = useState(["name-variant"]);
  const [canonical, setCanonical] = useState(true);
  const [preventIndexing, setPreventIndexing] = useState(true);
  const [hideSoldOut, setHideSoldOut] = useState(true);

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Variant on Collection"
        subtitle="Display each variant as a separate product card on collection pages."
        actions={[
          {
            content: enabled ? "Enabled" : "Disabled",
            onAction: () => setEnabled((value) => !value),
            primary: enabled,
          },
        ]}
      />

      <Card>
        <div className={styles.cardInset}>
          <Text as="h2" variant="headingMd">
            Variant splitting
          </Text>
          <div style={{ marginTop: 16 }}>
            <Banner tone="info">
              When enabled, selected variants can appear as individual product
              cards, helping customers find exact colors or styles faster.
            </Banner>
          </div>
        </div>
      </Card>

      <Layout>
        <Layout.Section>
          <div className={styles.pageSection}>
            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  Split rule
                </Text>
                <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                  <Select
                    label="Split by option"
                    options={[{ label: "Color", value: "color" }]}
                    value="color"
                    onChange={() => undefined}
                  />
                  <TextField
                    label="Apply to collections"
                    autoComplete="off"
                    value="Summer essentials, New arrivals"
                    onChange={() => undefined}
                  />
                  <TextField
                    label="Exclude products"
                    autoComplete="off"
                    value="Gift card, Sample bundle"
                    onChange={() => undefined}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <ChoiceList
                  title="Card naming"
                  choices={[
                    { label: "Product name only", value: "name" },
                    { label: "Product name + variant value", value: "name-variant" },
                    { label: "Custom format", value: "custom" },
                  ]}
                  selected={naming}
                  onChange={setNaming}
                />
                <div style={{ marginTop: 12 }}>
                  <Text as="p" variant="bodySm" tone="subdued">
                    Example: Classic T-Shirt - Red
                  </Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  SEO & URL
                </Text>
                <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                  <Checkbox
                    label="Keep canonical URL on parent product"
                    checked={canonical}
                    onChange={setCanonical}
                  />
                  <Checkbox
                    label="Prevent duplicate indexing"
                    checked={preventIndexing}
                    onChange={setPreventIndexing}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Checkbox
                  label="Hide sold-out variant cards"
                  checked={hideSoldOut}
                  onChange={setHideSoldOut}
                />
              </div>
            </Card>
          </div>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <div className={styles.previewCard}>
            <Text as="h2" variant="headingMd">
              Before and after
            </Text>
            <div className={styles.variantCompare} style={{ marginTop: 16 }}>
              <div className={styles.collectionCard}>
                <div className={styles.collectionImage} />
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  Before
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  One product card with multiple swatches
                </Text>
                <div className={styles.swatchRow} style={{ marginTop: 12 }}>
                  <span className={styles.swatchSelectable} style={{ background: "#D72C0D" }} />
                  <span className={styles.swatchSelectable} style={{ background: "#2C6ECB" }} />
                  <span className={styles.swatchSelectable} style={{ background: "#108043" }} />
                </div>
              </div>
              <div className={styles.splitGrid}>
                {variantCards.map((card) => (
                  <div key={card.title} className={styles.collectionCard}>
                    <div
                      className={styles.collectionImage}
                      style={{
                        background: `linear-gradient(135deg, ${card.color}22 0%, ${card.color}77 100%)`,
                      }}
                    />
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {card.title}
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {card.status}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </div>
  );
}
