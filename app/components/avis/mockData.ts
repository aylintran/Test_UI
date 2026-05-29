export type ChecklistStatus =
  | "completed"
  | "needs-action"
  | "not-started"
  | "optional";

export type SwatchType = "Color" | "Image" | "Text" | "Button";

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: ChecklistStatus;
  actionLabel?: string;
  href?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  tone?: "success" | "warning" | "critical" | "info";
  hint: string;
}

export interface SwatchRow {
  id: string;
  name: string;
  optionValue: string;
  type: SwatchType;
  label: string;
  usedInProducts: number;
  status: "Active" | "Inactive";
  updated: string;
  preview:
    | { kind: "color"; value: string }
    | { kind: "image"; value: string }
    | { kind: "text"; value: string }
    | { kind: "button"; value: string };
}

export interface MappingRow {
  optionValue: string;
  swatchLabel: string;
  status: "Mapped" | "Missing";
  preview?:
    | { kind: "color"; value: string }
    | { kind: "text"; value: string };
}

export interface ProductGroupRow {
  id: string;
  name: string;
  optionLabel: string;
  products: number;
  status: "Active" | "Inactive";
  issues: string;
  updated: string;
  preview: string[];
}

export const avisNavItems = [
  { label: "Dashboard", to: "/app/avis/dashboard" },
  { label: "Swatch Library", to: "/app/avis/swatch-library" },
  { label: "Product Page Swatch", to: "/app/avis/product-page-swatch" },
  { label: "Collection Swatch", to: "/app/avis/collection-swatch" },
  { label: "Variant on Collection", to: "/app/avis/variant-on-collection" },
  { label: "Product Groups", to: "/app/avis/product-groups" },
  { label: "Settings", to: "/app/avis/settings" },
] as const;

export const dashboardChecklist: ChecklistItem[] = [
  {
    id: "embed",
    title: "App embed enabled",
    description: "Theme app extension is enabled on the live theme.",
    status: "completed",
  },
  {
    id: "compatibility",
    title: "Theme compatibility",
    description: "No issues were detected in Dawn-based product templates.",
    status: "completed",
  },
  {
    id: "library",
    title: "Create swatch library",
    description: "Add reusable color, image, and text swatches for mapping.",
    status: "needs-action",
    actionLabel: "Create swatch",
    href: "/app/avis/swatch-library",
  },
  {
    id: "product-page",
    title: "Configure product page swatch",
    description: "Display swatches for the Color option on product pages.",
    status: "not-started",
    actionLabel: "Configure",
    href: "/app/avis/product-page-swatch",
  },
  {
    id: "collection",
    title: "Enable collection swatch",
    description: "Show swatches on collection, homepage, and search cards.",
    status: "not-started",
    actionLabel: "Enable",
    href: "/app/avis/collection-swatch",
  },
  {
    id: "groups",
    title: "Create product group",
    description: "Group separate Shopify products into a single swatch listing.",
    status: "optional",
    actionLabel: "Create group",
    href: "/app/avis/product-groups",
  },
];

export const dashboardMetrics: MetricItem[] = [
  {
    label: "Swatches created",
    value: "3",
    tone: "info",
    hint: "2 color swatches, 1 image swatch",
  },
  {
    label: "Products mapped",
    value: "12",
    tone: "success",
    hint: "Across tees, dresses, and jackets",
  },
  {
    label: "Missing mappings",
    value: "2",
    tone: "warning",
    hint: "Green and Yellow still need swatches",
  },
  {
    label: "Active groups",
    value: "2",
    tone: "info",
    hint: "Product families merged for storefront display",
  },
];

export const quickActions = [
  {
    title: "Create swatch",
    description: "Add a color, image, text, or button-style swatch.",
    href: "/app/avis/swatch-library",
  },
  {
    title: "Import CSV",
    description: "Bulk-create swatches with option values and labels.",
    href: "/app/avis/swatch-library",
  },
  {
    title: "Configure product page",
    description: "Enable variant swatches where shoppers make selections.",
    href: "/app/avis/product-page-swatch",
  },
  {
    title: "View documentation",
    description: "Read setup guidance and recommended mapping patterns.",
    href: "/app/avis/settings",
  },
] as const;

export const swatchRows: SwatchRow[] = [
  {
    id: "red",
    name: "Red",
    optionValue: "Red",
    type: "Color",
    label: "Ruby Red",
    usedInProducts: 8,
    status: "Active",
    updated: "2 hours ago",
    preview: { kind: "color", value: "#D72C0D" },
  },
  {
    id: "blue",
    name: "Blue",
    optionValue: "Blue",
    type: "Color",
    label: "Ocean Blue",
    usedInProducts: 6,
    status: "Active",
    updated: "Today",
    preview: { kind: "color", value: "#2C6ECB" },
  },
  {
    id: "pattern-floral",
    name: "Pattern-Floral",
    optionValue: "Pattern-Floral",
    type: "Image",
    label: "Floral",
    usedInProducts: 2,
    status: "Active",
    updated: "Yesterday",
    preview: {
      kind: "image",
      value:
        "linear-gradient(135deg, #f8d7e4 0%, #f7b267 45%, #7bc6cc 100%)",
    },
  },
  {
    id: "size-l",
    name: "Size-L",
    optionValue: "L",
    type: "Text",
    label: "Large",
    usedInProducts: 10,
    status: "Active",
    updated: "3 days ago",
    preview: { kind: "text", value: "L" },
  },
];

export const productPageMappings: MappingRow[] = [
  {
    optionValue: "Red",
    swatchLabel: "Ruby Red",
    status: "Mapped",
    preview: { kind: "color", value: "#D72C0D" },
  },
  {
    optionValue: "Blue",
    swatchLabel: "Ocean Blue",
    status: "Mapped",
    preview: { kind: "color", value: "#2C6ECB" },
  },
  {
    optionValue: "Green",
    swatchLabel: "Not mapped",
    status: "Missing",
  },
  {
    optionValue: "Yellow",
    swatchLabel: "Not mapped",
    status: "Missing",
  },
];

export const productGroups: ProductGroupRow[] = [
  {
    id: "summer-dress",
    name: "Summer Dress Collection",
    optionLabel: "Color",
    products: 5,
    preview: ["#D72C0D", "#2C6ECB", "#108043", "#F59E0B", "#202223"],
    status: "Active",
    issues: "—",
    updated: "Today",
  },
  {
    id: "winter-coat",
    name: "Winter Coat Variants",
    optionLabel: "Style",
    products: 3,
    preview: ["Hooded", "Wool", "Classic"],
    status: "Active",
    issues: "—",
    updated: "Yesterday",
  },
  {
    id: "sneaker-colors",
    name: "Sneaker Colors",
    optionLabel: "Color",
    products: 0,
    preview: [],
    status: "Inactive",
    issues: "No products added",
    updated: "1 week ago",
  },
];

export const attentionItems = [
  "2 option values are not mapped to swatches.",
  "Product page swatch is inactive in your default theme preset.",
  "Collection swatch is disabled for search results.",
] as const;

export const collectionPreviewProducts = [
  {
    title: "Classic T-Shirt",
    price: "$29.99",
    colors: ["#D72C0D", "#2C6ECB", "#108043", "#F59E0B", "#B3B7BC"],
    more: 2,
    quickAdd: "Select a swatch",
  },
  {
    title: "Everyday Hoodie",
    price: "$54.00",
    colors: ["#202223", "#6D7175", "#2C6ECB", "#F6F6F7"],
    more: 0,
    quickAdd: "Quick add",
  },
  {
    title: "Weekend Sneakers",
    price: "$72.00",
    colors: ["#F59E0B", "#108043", "#D72C0D", "#2C6ECB"],
    more: 1,
    quickAdd: "Quick add",
  },
] as const;

export const variantCards = [
  { title: "Classic T-Shirt - Red", color: "#D72C0D", status: "In stock" },
  { title: "Classic T-Shirt - Blue", color: "#2C6ECB", status: "In stock" },
  { title: "Classic T-Shirt - Green", color: "#108043", status: "Sold out" },
] as const;

export const settingsTabs = [
  "General",
  "Product Page",
  "Collection Page",
  "Product Groups",
  "Advanced",
];
