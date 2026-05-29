import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  InlineStack,
  Tabs,
  Text,
  TextField,
} from "@shopify/polaris";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import { AvisStickySaveBar } from "../components/avis/AvisStickySaveBar";
import { useAvisShell } from "./app.avis";
import { settingsTabs } from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisSettingsRoute() {
  const { showToast } = useAvisShell();
  const [selectedTab, setSelectedTab] = useState(0);
  const [tooltip, setTooltip] = useState(true);
  const [lazyLoad, setLazyLoad] = useState(true);
  const [customCssEnabled, setCustomCssEnabled] = useState(false);
  const [cssValue, setCssValue] = useState(".avis-swatch { border-radius: 999px; }");
  const [previewMode, setPreviewMode] = useState<"image" | "color">("image");
  const [shape, setShape] = useState("circle");
  const [borderType, setBorderType] = useState("double");
  const [hoverEffect, setHoverEffect] = useState("none");
  const [hoverAnimation, setHoverAnimation] = useState("rotate-right");

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader title="Settings" subtitle="Set global swatch styling and behavior defaults for the prototype." />

      <Tabs
        tabs={settingsTabs.map((tab, index) => ({
          id: `${tab}-${index}`,
          content: tab,
        }))}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />

      <div className={styles.configWithPreview}>
        <div className={styles.pageSection}>
          <Card>
            <div className={styles.cardInset}>
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Appearance
                </Text>
                <span className={styles.pill}>Visual selector styles</span>
              </InlineStack>
              <div className={styles.appearanceGallery} style={{ marginTop: 16 }}>
                {[
                  {
                    title: "Swatch",
                    text: "Display image or color swatches with a more tactile storefront feel.",
                    active: true,
                  },
                  {
                    title: "Button",
                    text: "Use polished option buttons for larger, more explicit variant labels.",
                    active: false,
                  },
                  {
                    title: "Dropdown",
                    text: "Compact variant selector for dense product layouts and narrow columns.",
                    active: false,
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className={`${styles.appearanceCard} ${card.active ? styles.optionCardActive : ""}`}
                  >
                    <div className={styles.thumbCanvas}>
                      <div className={`${styles.ghostLine} ${styles.ghostLineShort}`} />
                      <div className={styles.starRow}>★ ★ ★ ★ ★</div>
                      {card.title === "Swatch" ? (
                        <div className={styles.thumbSwatchRow}>
                          <span className={styles.thumbSwatch} style={{ background: "#eceef1" }} />
                          <span className={styles.thumbSwatch} style={{ background: "#ffffff", boxShadow: "0 0 0 2px #202223" }} />
                          <span className={styles.thumbSwatch} style={{ background: "#eef4ff" }} />
                          <span className={styles.thumbSwatch} style={{ background: "#f5f5f5" }} />
                        </div>
                      ) : card.title === "Button" ? (
                        <div className={styles.thumbSwatchRow}>
                          <span className={`${styles.thumbButton} ${styles.thumbButtonActive}`}>Classic</span>
                          <span className={styles.thumbButton}>Turtleneck</span>
                          <span className={styles.thumbButton}>Pattern</span>
                        </div>
                      ) : (
                        <div className={styles.appearanceLockup}>
                          <div className={styles.miniDropdown}>
                            <span>Classic</span>
                            <span>⌄</span>
                          </div>
                          <div className={styles.ghostLine} />
                          <div className={`${styles.ghostLine} ${styles.ghostLineShort}`} />
                        </div>
                      )}
                    </div>
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {card.title}
                    </Text>
                    <div style={{ marginTop: 6 }}>
                      <Text as="p" variant="bodySm" tone="subdued">
                        {card.text}
                      </Text>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <Button variant={card.active ? "primary" : "secondary"}>
                        Set up
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Shape and layout
              </Text>
              <div className={styles.visualBlock} style={{ marginTop: 16 }}>
                <div className={styles.settingRow}>
                  <Text as="p" variant="bodyMd">Shape</Text>
                  <div className={styles.tokenGroup}>
                    {["circle", "square", "fit-text"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.tokenButton} ${shape === item ? styles.tokenButtonActive : ""}`}
                        onClick={() => setShape(item)}
                      >
                        {item === "fit-text" ? "Fit Text" : item[0].toUpperCase() + item.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {[
                  { label: "Width", value: "35", light: false },
                  { label: "Height", value: "35", light: false },
                  { label: "Spacing", value: "6", light: true },
                ].map((row) => (
                  <div key={row.label} className={styles.settingRow}>
                    <Text as="p" variant="bodyMd">{row.label}</Text>
                    <InlineStack gap="300" wrap={false} blockAlign="center">
                      <span className={styles.metricInput}>
                        <span>{row.value}</span>
                        <span style={{ color: "#6d7175" }}>px</span>
                      </span>
                      <div style={{ flex: 1 }} className={row.light ? `${styles.rangeTrack} ${styles.rangeTrackLight}` : styles.rangeTrack} />
                    </InlineStack>
                  </div>
                ))}
                <div className={styles.settingRow}>
                  <Text as="p" variant="bodyMd">Align content</Text>
                  <div className={styles.tokenGroup}>
                    {["Left", "Center", "Right"].map((item, index) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.tokenButton} ${index === 0 ? styles.tokenButtonActive : ""}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Border
              </Text>
              <div className={styles.visualBlock} style={{ marginTop: 16 }}>
                <div className={styles.settingRow}>
                  <Text as="p" variant="bodyMd">Type</Text>
                  <div className={styles.tokenGroup}>
                    {["none", "single", "double"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.tokenButton} ${borderType === item ? styles.tokenButtonActive : ""}`}
                        onClick={() => setBorderType(item)}
                      >
                        {item[0].toUpperCase() + item.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.settingRow}>
                  <Text as="p" variant="bodyMd">Thickness</Text>
                  <InlineStack gap="300" wrap={false} blockAlign="center">
                    <span className={styles.metricInput}>
                      <span>3</span>
                      <span style={{ color: "#6d7175" }}>px</span>
                    </span>
                    <div style={{ flex: 1 }} className={styles.rangeTrack} />
                  </InlineStack>
                </div>
                {[
                  { label: "Default color", value: "#d7d9dc" },
                  { label: "Hovered color", value: "#202223" },
                  { label: "Selected color", value: "#202223" },
                ].map((row) => (
                  <div key={row.label} className={styles.settingRow}>
                    <Text as="p" variant="bodyMd">{row.label}</Text>
                    <InlineStack gap="200">
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: row.value,
                          border: "1px solid #d8dadd",
                          display: "inline-block",
                        }}
                      />
                    </InlineStack>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Hover effect
              </Text>
              <div className={styles.sectionSplit} style={{ marginTop: 16 }}>
                <div className={styles.visualBlock}>
                  <Text as="p" variant="bodyMd">Shadow</Text>
                  <div className={styles.tokenGroup}>
                    {["none", "one-direction", "both-direction"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.tokenButton} ${hoverEffect === item ? styles.tokenButtonActive : ""}`}
                        onClick={() => setHoverEffect(item)}
                      >
                        {item === "one-direction"
                          ? "One direction"
                          : item === "both-direction"
                            ? "Both direction"
                            : "None"}
                      </button>
                    ))}
                  </div>
                  <div className={styles.settingRow}>
                    <Text as="p" variant="bodyMd">Preview</Text>
                    <span
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: shape === "square" ? 10 : shape === "fit-text" ? 12 : 999,
                        background: "#ffffff",
                        border: "1px solid #d8dadd",
                        boxShadow:
                          hoverEffect === "none"
                            ? "none"
                            : hoverEffect === "one-direction"
                              ? "8px 8px 18px rgba(32,34,35,0.10)"
                              : "0 10px 20px rgba(32,34,35,0.08), 0 0 0 1px rgba(32,34,35,0.10)",
                        display: "inline-block",
                      }}
                    />
                  </div>
                  <Checkbox label="Image zoom in" checked={lazyLoad} onChange={setLazyLoad} />
                </div>

                <div className={styles.visualBlock}>
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="p" variant="bodyMd">Hover animation</Text>
                    <span className={styles.pillInfo + " " + styles.pill}>Preview only</span>
                  </InlineStack>
                  <div className={styles.compactOptionGrid}>
                    {[
                      "none",
                      "scale-up",
                      "scale-down",
                      "float-up",
                      "float-down",
                      "rotate-left",
                      "rotate-right",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`${styles.optionCard} ${hoverAnimation === item ? styles.optionCardActive : ""}`}
                        onClick={() => setHoverAnimation(item)}
                        style={{ textAlign: "left" }}
                      >
                        <div className={styles.thumbCanvas} style={{ height: 72, marginBottom: 8 }}>
                          <div className={styles.thumbSwatchRow}>
                            <span
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: hoverAnimation === item ? "#202223" : "#d8dadd",
                                transform:
                                  item === "rotate-right"
                                    ? "rotate(12deg)"
                                    : item === "rotate-left"
                                      ? "rotate(-12deg)"
                                      : item === "float-up"
                                        ? "translateY(-6px)"
                                        : item === "float-down"
                                          ? "translateY(6px)"
                                          : item === "scale-up"
                                            ? "scale(1.08)"
                                            : item === "scale-down"
                                              ? "scale(0.92)"
                                              : "none",
                              }}
                            />
                            <span style={{ width: 18, height: 30, borderRadius: 4, background: "#d8dadd" }} />
                          </div>
                        </div>
                        <div className={styles.optionCardText}>
                          {item.replace("-", " ")}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Out-of-stock display and tooltip
              </Text>
              <div className={styles.visualBlock} style={{ marginTop: 16 }}>
                <div className={styles.tokenGroup}>
                  {["Gray out", "Strikethrough", "Opacity", "Hide"].map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.tokenButton} ${index === 0 ? styles.tokenButtonActive : ""}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <Checkbox label="Show tooltip on hover" checked={tooltip} onChange={setTooltip} />
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Custom CSS
              </Text>
              <div className={styles.fieldGrid} style={{ marginTop: 16 }}>
                <Checkbox
                  label="Enable custom CSS"
                  checked={customCssEnabled}
                  onChange={setCustomCssEnabled}
                />
                {customCssEnabled ? (
                  <TextField
                    label="CSS"
                    autoComplete="off"
                    multiline={6}
                    value={cssValue}
                    onChange={setCssValue}
                  />
                ) : (
                  <Text as="p" variant="bodySm" tone="subdued">
                    CSS editor is collapsed until custom CSS is enabled.
                  </Text>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.pageSection}>
          <div className={styles.previewPanel}>
            <div className={styles.previewCard}>
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Preview
                </Text>
                <div className={styles.previewTabs}>
                  <button
                    type="button"
                    className={`${styles.previewTab} ${previewMode === "image" ? styles.previewTabActive : ""}`}
                    onClick={() => setPreviewMode("image")}
                  >
                    Image
                  </button>
                  <button
                    type="button"
                    className={`${styles.previewTab} ${previewMode === "color" ? styles.previewTabActive : ""}`}
                    onClick={() => setPreviewMode("color")}
                  >
                    Color
                  </button>
                </div>
              </InlineStack>
              <div style={{ marginTop: 16 }} className={styles.productHero}>
                <div
                  className={styles.productImage}
                  style={{
                    background:
                      previewMode === "image"
                        ? "linear-gradient(135deg, #f3ece3 0%, #d7ccc3 100%)"
                        : "linear-gradient(135deg, #eceef1 0%, #d7dde3 100%)",
                  }}
                />
                <div className={styles.productBody}>
                  <div>
                    <div className={styles.productTitle}>Floral Maxi Dress</div>
                    <div className={styles.productPrice}>$129.00</div>
                    <div className={styles.starRow} style={{ color: "#b9aa7d", fontSize: 14, marginTop: 6 }}>
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <div className={styles.swatchRow}>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                      <span
                        key={item}
                        className={`${styles.swatchSelectable} ${index === 0 ? styles.swatchSelected : ""} ${index === 5 ? styles.swatchSoldOut : ""}`}
                        style={{
                          background:
                            previewMode === "image"
                              ? [
                                  "linear-gradient(135deg,#d59569 0%,#f2d2bc 100%)",
                                  "linear-gradient(135deg,#86a8a6 0%,#dce6dd 100%)",
                                  "linear-gradient(135deg,#3b4147 0%,#9ba3ab 100%)",
                                  "linear-gradient(135deg,#e8c69c 0%,#f6ebdb 100%)",
                                  "linear-gradient(135deg,#f3d8bf 0%,#f8efe3 100%)",
                                  "linear-gradient(135deg,#9db18e 0%,#e6f0df 100%)",
                                ][index]
                              : ["#202223", "#f0f2f4", "#2c6ecb", "#f6f6f7", "#d72c0d", "#108043"][index],
                        }}
                      />
                    ))}
                  </div>
                  <Button fullWidth>Add to cart</Button>
                  <div style={{ display: "grid", gap: 10, color: "#a0a4aa", fontSize: 13 }}>
                    {["SIZE GUIDE", "DESCRIPTION", "FIT", "REVIEW"].map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderTop: "1px solid #eceef1",
                          paddingTop: 10,
                        }}
                      >
                        <span>{item}</span>
                        <span>+</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.promoCard} style={{ marginTop: 14 }}>
              <div className={styles.promoBadge}>S</div>
              <Text as="p" variant="bodySm">
                The app helps to set product labels, badges, and trust badges
                for your products easily.
              </Text>
              <Button>Set up now</Button>
            </div>
          </div>
        </div>
      </div>

      <AvisStickySaveBar
        onDiscard={() => showToast("Changes discarded")}
        onSave={() => showToast("Settings saved")}
      />
    </div>
  );
}
