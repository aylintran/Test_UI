import { useState } from "react";
import {
  Banner,
  Button,
  Card,
  Checkbox,
  ChoiceList,
  InlineStack,
  Layout,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { useAvisShell } from "./app.avis";
import { collectionPreviewProducts } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisCollectionSwatchRoute() {
  const { showToast } = useAvisShell();
  const [enabled, setEnabled] = useState(true);
  const [placements, setPlacements] = useState([
    "collection",
    "homepage",
    "search",
  ]);
  const [interaction, setInteraction] = useState(["hover"]);
  const [changeImage, setChangeImage] = useState(true);
  const [quickAddEnabled, setQuickAddEnabled] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [displayLimit, setDisplayLimit] = useState("5");
  const [quickAddBehavior, setQuickAddBehavior] = useState("selected");
  const [soldOutBehavior, setSoldOutBehavior] = useState("disable");

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Collection Swatch"
        subtitle="Show swatches on product cards across collection pages, homepage grids, and search results."
        actions={[
          {
            content: enabled ? "Enabled" : "Disabled",
            onAction: () => setEnabled((value) => !value),
            primary: enabled,
          },
        ]}
      />

      <Layout>
        <Layout.Section>
          <div className={styles.pageSection}>
            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  Placement
                </Text>
                <div style={{ marginTop: 16 }}>
                  <ChoiceList
                    title="Placement"
                    titleHidden
                    allowMultiple
                    choices={[
                      { label: "Collection pages", value: "collection" },
                      { label: "Homepage product grid", value: "homepage" },
                      { label: "Search results", value: "search" },
                    ]}
                    selected={placements}
                    onChange={setPlacements}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  Interaction
                </Text>
                <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                  <ChoiceList
                    title="Interaction mode"
                    choices={[
                      { label: "Hover to preview image", value: "hover" },
                      { label: "Click to select variant", value: "click" },
                    ]}
                    selected={interaction}
                    onChange={setInteraction}
                  />
                  <Checkbox
                    label="Change product image on swatch interaction"
                    checked={changeImage}
                    onChange={setChangeImage}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  Quick Add to Cart
                </Text>
                <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                  <Button
                    variant={quickAddEnabled ? "primary" : "secondary"}
                    onClick={() => setQuickAddEnabled((value) => !value)}
                  >
                    {quickAddEnabled ? "Enabled" : "Disabled"}
                  </Button>
                  <Select
                    label="Behavior"
                    options={[
                      { label: "Add selected variant", value: "selected" },
                      { label: "Open product page", value: "product-page" },
                      { label: "Show variant picker", value: "picker" },
                    ]}
                    value={quickAddBehavior}
                    onChange={setQuickAddBehavior}
                  />
                  <Banner tone="info">
                    Quick add appears only after a shopper selects a swatch on
                    the product card.
                  </Banner>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">
                  Display limit
                </Text>
                <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                  <TextField
                    label="Maximum swatches to show"
                    type="number"
                    autoComplete="off"
                    value={displayLimit}
                    onChange={setDisplayLimit}
                  />
                  <Checkbox
                    label='Show "+N more"'
                    checked={showMore}
                    onChange={setShowMore}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Select
                  label="Sold-out behavior"
                  options={[
                    { label: "Disable and gray out", value: "disable" },
                    { label: "Show with strikethrough", value: "strike" },
                    { label: "Hide sold-out values", value: "hide" },
                    { label: "Keep selectable", value: "keep" },
                  ]}
                  value={soldOutBehavior}
                  onChange={setSoldOutBehavior}
                />
              </div>
            </Card>
          </div>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <div className={styles.previewPanel}>
            <div className={styles.previewCard}>
              <InlineStack align="space-between">
                <Text as="h2" variant="headingMd">
                  Product card preview
                </Text>
                <Button onClick={() => showToast("Collection preview refreshed")}>
                  Refresh
                </Button>
              </InlineStack>
              <div className={styles.collectionGrid} style={{ marginTop: 16 }}>
                {collectionPreviewProducts.map((product) => (
                  <div key={product.title} className={styles.collectionCard}>
                    <div className={styles.collectionImage} />
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {product.title}
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {product.price}
                    </Text>
                    <div className={styles.swatchRow} style={{ marginTop: 12 }}>
                      {product.colors.slice(0, 5).map((color, index) => (
                        <span
                          key={`${product.title}-${color}-${index}`}
                          className={`${styles.swatchSelectable} ${index === 0 ? styles.swatchSelected : ""}`}
                          style={{ background: color }}
                        />
                      ))}
                      {product.more ? <span className={styles.pill}>+{product.more} more</span> : null}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <Button fullWidth variant="primary">
                        {product.quickAdd}
                      </Button>
                    </div>
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
