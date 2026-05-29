import { useState } from "react";
import {
  Banner,
  Button,
  Card,
  Checkbox,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { AvisPreviewPanel } from "../components/avis/AvisPreviewPanel";
import { AvisStatusPill } from "../components/avis/AvisStatusPill";
import { AvisSwatchPreview } from "../components/avis/AvisSwatchPreview";
import { useAvisShell } from "./app.avis";
import { productPageMappings } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisProductPageSwatchRoute() {
  const { showToast } = useAvisShell();
  const [enabled, setEnabled] = useState(true);
  const [displayType, setDisplayType] = useState("Swatch");
  const [showTooltip, setShowTooltip] = useState(true);
  const [updateImage, setUpdateImage] = useState(true);
  const [autoSelect, setAutoSelect] = useState(false);
  const [soldOutBehavior, setSoldOutBehavior] = useState("Disable and gray out");

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Product Page Swatch"
        subtitle="Display swatches on product pages for variant selection."
        actions={[
          {
            content: enabled ? "Enabled" : "Disabled",
            onAction: () => setEnabled((value) => !value),
            primary: enabled,
          },
        ]}
      />

      <div className={styles.configWithPreview}>
        <div className={styles.pageSection}>
            <Card>
              <div className={styles.cardInset}>
                <InlineStack align="space-between" blockAlign="center">
                  <div>
                    <Text as="h2" variant="headingMd">
                      Status
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Enable product page swatches and preview live behavior.
                    </Text>
                  </div>
                  <Button
                    variant={enabled ? "primary" : "secondary"}
                    onClick={() => setEnabled((value) => !value)}
                  >
                    {enabled ? "Enabled" : "Disabled"}
                  </Button>
                </InlineStack>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Display type
                  </Text>
                  <span className={styles.pillInfo + " " + styles.pill}>Target option: Color</span>
                </InlineStack>
                <div className={styles.optionGrid} style={{ marginTop: 16 }}>
                  {[
                    {
                      title: "Swatch",
                      text: "Best for color and image variants with a visual-first buying experience.",
                    },
                    {
                      title: "Button",
                      text: "Show variant options as clean pills for a more explicit selection pattern.",
                    },
                    {
                      title: "Dropdown",
                      text: "Save space on tighter layouts while keeping selection compact and familiar.",
                    },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      className={`${styles.optionCard} ${displayType === item.title ? styles.optionCardActive : ""}`}
                      onClick={() => setDisplayType(item.title)}
                      style={{ textAlign: "left" }}
                    >
                      <div className={styles.thumbCanvas}>
                        <div className={`${styles.ghostLine} ${styles.ghostLineShort}`} />
                        <div className={styles.starRow}>★ ★ ★ ★ ★</div>
                        {item.title === "Swatch" ? (
                          <div className={styles.thumbSwatchRow}>
                            <span className={styles.thumbSwatch} style={{ background: "#d72c0d" }} />
                            <span className={styles.thumbSwatch} style={{ background: "#2c6ecb" }} />
                            <span className={styles.thumbSwatch} style={{ background: "#108043" }} />
                            <span className={styles.thumbSwatch} style={{ background: "#f59e0b" }} />
                          </div>
                        ) : item.title === "Button" ? (
                          <div className={styles.thumbSwatchRow}>
                            <span className={`${styles.thumbButton} ${styles.thumbButtonActive}`}>Classic</span>
                            <span className={styles.thumbButton}>Chunky</span>
                            <span className={styles.thumbButton}>Pattern</span>
                          </div>
                        ) : (
                          <div className={styles.appearanceLockup}>
                            <div className={styles.miniDropdown}>
                              <span>Classic</span>
                              <span>⌄</span>
                            </div>
                            <div className={styles.ghostLine} />
                          </div>
                        )}
                      </div>
                      <div className={styles.optionCardTitle}>{item.title}</div>
                      <div className={styles.optionCardText} style={{ marginTop: 6 }}>
                        {item.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">Behavior</Text>
                <div className={styles.sectionSplit} style={{ marginTop: 16 }}>
                  <div className={styles.visualBlock}>
                    <Text as="p" variant="bodyMd" fontWeight="medium">
                      Shopper experience
                    </Text>
                    <div className={styles.optionCard}>
                      <div className={styles.thumbCanvas} style={{ height: 88 }}>
                        <div className={styles.thumbSwatchRow}>
                          <span className={styles.thumbSwatch} style={{ background: "#d72c0d", boxShadow: "0 0 0 2px #202223" }} />
                          <span className={styles.thumbSwatch} style={{ background: "#2c6ecb" }} />
                          <span className={styles.thumbSwatch} style={{ background: "#108043", opacity: 0.35 }} />
                        </div>
                        <div className={styles.ghostLine} />
                      </div>
                      <div className={styles.optionCardText}>
                        Use tooltip, image swap, and variant preselection to make the selection area feel richer.
                      </div>
                    </div>
                  </div>
                  <div className={styles.fieldGrid}>
                  <Checkbox
                    label="Show tooltip on hover"
                    checked={showTooltip}
                    onChange={setShowTooltip}
                  />
                  <Checkbox
                    label="Update product image on swatch selection"
                    checked={updateImage}
                    onChange={setUpdateImage}
                  />
                  <Checkbox
                    label="Auto-select first available variant"
                    checked={autoSelect}
                    onChange={setAutoSelect}
                  />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <Text as="h2" variant="headingMd">Inventory display</Text>
                <div className={styles.compactOptionGrid} style={{ marginTop: 16 }}>
                  {[
                    "Disable and gray out",
                    "Show with strikethrough",
                    "Hide sold-out values",
                    "Keep selectable",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.optionCard} ${soldOutBehavior === item ? styles.optionCardActive : ""}`}
                      onClick={() => setSoldOutBehavior(item)}
                      style={{ textAlign: "left" }}
                    >
                      <div className={styles.thumbCanvas} style={{ height: 76, marginBottom: 8 }}>
                        <div className={styles.thumbSwatchRow}>
                          <span className={styles.thumbSwatch} style={{ background: "#d72c0d" }} />
                          <span
                            className={styles.thumbSwatch}
                            style={{
                              background: "#108043",
                              opacity:
                                item === "Disable and gray out" || item === "Keep selectable"
                                  ? 0.35
                                  : 1,
                              outline:
                                item === "Show with strikethrough"
                                  ? "2px solid #202223"
                                  : "none",
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.optionCardText}>{item}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <InlineStack align="space-between" blockAlign="center">
                  <Text as="h2" variant="headingMd">
                    Swatch mapping
                  </Text>
                  <Button onClick={() => showToast("Auto-mapped missing option values")}>
                    Auto-map
                  </Button>
                </InlineStack>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                  <Banner tone="warning" title="2 option values are not mapped to swatches">
                    Map Green and Yellow before enabling the widget on your live theme.
                  </Banner>
                </div>
                <div className={styles.inlineTable}>
                  <div className={styles.tableHeader}>
                    <span>Option value</span>
                    <span>Swatch</span>
                    <span>Preview</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>
                  {productPageMappings.map((row) => (
                    <div key={row.optionValue} className={styles.tableRow}>
                      <Text as="p" variant="bodyMd" fontWeight="semibold">
                        {row.optionValue}
                      </Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        {row.swatchLabel}
                      </Text>
                      <AvisSwatchPreview preview={row.preview} />
                      <AvisStatusPill
                        tone={row.status === "Mapped" ? "success" : "warning"}
                      >
                        {row.status}
                      </AvisStatusPill>
                      <Button onClick={() => showToast(`${row.optionValue} mapping opened`)}>
                        {row.status === "Mapped" ? "Edit" : "Map"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.cardInset}>
                <InlineStack align="space-between" blockAlign="center">
                  <div>
                    <Text as="h2" variant="headingMd">
                      Source and mapping context
                    </Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Swatches are pulled from Swatch Library and applied to the Color option.
                    </Text>
                  </div>
                  <Button onClick={() => showToast("Swatch Library opened")}>Open library</Button>
                </InlineStack>
              </div>
            </Card>
        </div>

        <div>
          <AvisPreviewPanel />
        </div>
      </div>
    </div>
  );
}
