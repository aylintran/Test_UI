import { useMemo, useState } from "react";
import {
  Badge,
  Banner,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { AvisEmptyState } from "../components/avis/AvisEmptyState";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { AvisSwatchPreview } from "../components/avis/AvisSwatchPreview";
import { useAvisShell } from "./app.avis";
import { swatchRows } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

const typeFilters = ["All", "Color", "Image", "Text", "Button"] as const;

export default function AvisSwatchLibraryRoute() {
  const { showToast } = useAvisShell();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<(typeof typeFilters)[number]>("All");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return swatchRows.filter((row) => {
      const bySearch =
        !search ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.label.toLowerCase().includes(search.toLowerCase()) ||
        row.optionValue.toLowerCase().includes(search.toLowerCase());
      const byType = type === "All" || row.type === type;
      const byStatus =
        status === "all" || row.status.toLowerCase() === status.toLowerCase();
      return bySearch && byType && byStatus;
    });
  }, [search, status, type]);

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Swatch Library"
        subtitle="Create reusable swatches and map them to product option values."
        actions={[
          { content: "Import CSV", onAction: () => showToast("CSV import drawer previewed") },
          { content: "Export CSV", onAction: () => showToast("CSV export generated") },
          { content: "Create swatch", onAction: () => showToast("Create swatch flow previewed"), primary: true },
        ]}
      />

      <Card>
        <div className={styles.cardInset}>
          <InlineStack gap="300" wrap={false} blockAlign="end">
            <div style={{ flex: 1 }}>
              <TextField
                label="Search"
                labelHidden
                autoComplete="off"
                placeholder="Search option values, labels, or swatch names"
                value={search}
                onChange={setSearch}
                prefix={<span style={{ color: "#6d7175" }}>⌕</span>}
              />
            </div>
            <div style={{ minWidth: 160 }}>
              <Select
                label="Status"
                options={[
                  { label: "All statuses", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                value={status}
                onChange={setStatus}
              />
            </div>
          </InlineStack>

          <div style={{ marginTop: 16 }} className={styles.actionsRow}>
            {typeFilters.map((filter) => (
              <Button
                key={filter}
                variant={type === filter ? "primary" : "secondary"}
                onClick={() => setType(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Banner tone="info" title="Bulk import available">
        Need to create many swatches? Import swatches with CSV and review the
        mapping before publishing.
      </Banner>

      <Card>
        <div className={styles.cardInset}>
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h2" variant="headingMd">
              Swatches
            </Text>
            <Badge tone="info">{rows.length} results</Badge>
          </InlineStack>
          <div style={{ marginTop: 16 }}>
            {rows.length ? (
              <div className={styles.inlineTable}>
                <div
                  className={styles.tableHeader}
                  style={{
                    gridTemplateColumns:
                      "minmax(0,1.1fr) minmax(0,1.1fr) 100px 110px 120px 110px 94px 100px 88px",
                  }}
                >
                  <span>Swatch</span>
                  <span>Option value</span>
                  <span>Type</span>
                  <span>Preview</span>
                  <span>Label</span>
                  <span>Products</span>
                  <span>Status</span>
                  <span>Updated</span>
                  <span>Actions</span>
                </div>
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className={styles.tableRow}
                    style={{
                      gridTemplateColumns:
                        "minmax(0,1.1fr) minmax(0,1.1fr) 100px 110px 120px 110px 94px 100px 88px",
                    }}
                  >
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {row.name}
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {row.optionValue}
                    </Text>
                    <Badge>{row.type}</Badge>
                    <AvisSwatchPreview preview={row.preview} />
                    <Text as="p" variant="bodySm">
                      {row.label}
                    </Text>
                    <Text as="p" variant="bodySm">
                      {row.usedInProducts} products
                    </Text>
                    <Badge tone={row.status === "Active" ? "success" : undefined}>
                      {row.status}
                    </Badge>
                    <Text as="p" variant="bodySm" tone="subdued">
                      {row.updated}
                    </Text>
                    <ButtonGroup>
                      <Button icon={EditIcon} accessibilityLabel={`Edit ${row.name}`} />
                      <Button
                        icon={DeleteIcon}
                        accessibilityLabel={`Delete ${row.name}`}
                      />
                    </ButtonGroup>
                  </div>
                ))}
              </div>
            ) : (
              <AvisEmptyState
                title="No swatches match your filters"
                description="Try a broader search or switch back to All types to see the full library."
                actionLabel="Reset filters"
                onAction={() => {
                  setSearch("");
                  setType("All");
                  setStatus("all");
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
