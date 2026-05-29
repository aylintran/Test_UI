import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  InlineStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { useAvisShell } from "./app.avis";
import { productGroups } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisProductGroupsRoute() {
  const { showToast } = useAvisShell();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Product Groups"
        subtitle="Combine separate Shopify products into unified listings."
        actions={[
          { content: "Import CSV", onAction: () => showToast("CSV group import opened") },
          { content: "Download template", onAction: () => showToast("Template downloaded") },
          { content: "Create group", onAction: () => setPanelOpen(true), primary: true },
        ]}
      />

      <Card>
        <div className={styles.cardInset}>
          <Text as="p" variant="bodyMd">
            Use product groups when each color or style is a separate Shopify
            product but should appear as one listing.
          </Text>
        </div>
      </Card>

      <Card>
        <div className={styles.cardInset}>
          <div
            className={styles.tableHeader}
            style={{
              gridTemplateColumns:
                "minmax(0,1.5fr) 110px 90px 150px 88px 120px 100px 88px",
            }}
          >
            <span>Group name</span>
            <span>Option label</span>
            <span>Products</span>
            <span>Preview</span>
            <span>Status</span>
            <span>Issues</span>
            <span>Updated</span>
            <span>Actions</span>
          </div>
          <div className={styles.inlineTable} style={{ marginTop: 16 }}>
            {productGroups.map((group) => (
              <div
                key={group.id}
                className={styles.tableRow}
                style={{
                  gridTemplateColumns:
                    "minmax(0,1.5fr) 110px 90px 150px 88px 120px 100px 88px",
                }}
              >
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  {group.name}
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  {group.optionLabel}
                </Text>
                <Text as="p" variant="bodySm">
                  {group.products}
                </Text>
                <InlineStack gap="100" wrap={false}>
                  {group.preview.length ? (
                    group.preview.slice(0, 5).map((item) =>
                      item.startsWith("#") ? (
                        <span
                          key={item}
                          className={styles.swatchDot}
                          style={{ background: item }}
                        />
                      ) : (
                        <span key={item} className={styles.swatchText}>
                          {item}
                        </span>
                      ),
                    )
                  ) : (
                    <span style={{ color: "#8c9196" }}>Empty</span>
                  )}
                </InlineStack>
                <Badge tone={group.status === "Active" ? "success" : undefined}>
                  {group.status}
                </Badge>
                <Text as="p" variant="bodySm" tone="subdued">
                  {group.issues}
                </Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  {group.updated}
                </Text>
                <Button onClick={() => setPanelOpen(true)}>Edit</Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className={styles.cardInset}>
          <Text as="h2" variant="headingMd">
            CSV import flow
          </Text>
          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            {[
              "1. Download template",
              "2. Add product handles",
              "3. Import CSV",
              "4. Review mapping",
            ].map((step) => (
              <div key={step} className={styles.tableRow}>
                <Text as="p" variant="bodyMd">
                  {step}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {panelOpen ? (
        <>
          <button
            type="button"
            className={styles.sidePanelBackdrop}
            onClick={() => setPanelOpen(false)}
            aria-label="Close create group panel"
          />
          <aside className={styles.sidePanel}>
            <Text as="h2" variant="headingLg">
              Create group
            </Text>
            <div className={styles.fieldGrid} style={{ marginTop: 18 }}>
              <TextField
                label="Group name"
                autoComplete="off"
                value="Summer Dress Collection"
                onChange={() => undefined}
              />
              <TextField
                label="Option label"
                autoComplete="off"
                value="Color"
                onChange={() => undefined}
              />
              <TextField
                label="Select products"
                autoComplete="off"
                value="summer-dress-red, summer-dress-blue, summer-dress-green"
                onChange={() => undefined}
                multiline={3}
              />
              <TextField
                label="Swatch value per product"
                autoComplete="off"
                value={"summer-dress-red = Red\nsummer-dress-blue = Blue\nsummer-dress-green = Green"}
                onChange={() => undefined}
                multiline={4}
              />
            </div>
            <div style={{ marginTop: 18 }} className={styles.actionsRow}>
              <Button onClick={() => setPanelOpen(false)}>Cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  setPanelOpen(false);
                  showToast("Product group saved");
                }}
              >
                Save group
              </Button>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
