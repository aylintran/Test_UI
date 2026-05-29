import { Link } from "@remix-run/react";
import {
  Badge,
  Button,
  Card,
  InlineStack,
  Layout,
  ProgressBar,
  Text,
} from "@shopify/polaris";
import { AvisMetricCard } from "../components/avis/AvisMetricCard";
import { AvisPageHeader } from "../components/avis/AvisPageHeader";
import {
  attentionItems,
  dashboardChecklist,
  dashboardMetrics,
  quickActions,
} from "../components/avis/mockData";
import styles from "../components/avis/avis-ui.module.css";

export default function AvisDashboardRoute() {
  const completed = dashboardChecklist.filter((item) => item.status === "completed").length;
  const progress = Math.round((completed / 6) * 100);

  return (
    <div className={styles.pageSection}>
      <AvisPageHeader
        title="Dashboard"
        subtitle="Set up color swatches and product groups for your Shopify store."
        actions={[{ content: "Continue setup", url: "/app/avis/swatch-library", primary: true }]}
      />

      <Card>
        <div className={styles.cardInset}>
          <InlineStack align="space-between" blockAlign="center">
            <div>
              <Text as="h2" variant="headingMd">
                Setup progress
              </Text>
              <div style={{ marginTop: 4 }}>
                <Text as="p" variant="bodySm" tone="subdued">
                  3 of 6 completed
                </Text>
              </div>
            </div>
            <Badge tone="info">Onboarding</Badge>
          </InlineStack>
          <div style={{ marginTop: 16 }}>
            <ProgressBar progress={progress} tone="primary" size="small" />
          </div>
        </div>
      </Card>

      <Layout>
        <Layout.Section>
          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Setup checklist
              </Text>
              <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                {dashboardChecklist.map((item) => {
                  const tone =
                    item.status === "completed"
                      ? "success"
                      : item.status === "needs-action"
                        ? "warning"
                        : item.status === "optional"
                          ? "info"
                          : undefined;

                  return (
                    <div key={item.id} className={styles.tableRow}>
                      <span
                        className={`${styles.pill} ${
                          item.status === "completed"
                            ? styles.pillSuccess
                            : item.status === "needs-action"
                              ? styles.pillWarning
                              : styles.pillInfo
                        }`}
                      >
                        {item.status === "completed"
                          ? "Done"
                          : item.status === "needs-action"
                            ? "Next"
                            : item.status === "optional"
                              ? "Optional"
                              : "Pending"}
                      </span>
                      <div>
                        <Text as="p" variant="bodyMd" fontWeight="semibold">
                          {item.title}
                        </Text>
                        <Text as="p" variant="bodySm" tone="subdued">
                          {item.description}
                        </Text>
                      </div>
                      <div>
                        <Badge tone={tone}>{item.status.replace("-", " ")}</Badge>
                      </div>
                      <div />
                      <div style={{ textAlign: "right" }}>
                        {item.actionLabel && item.href ? (
                          <Link to={item.href}>
                            <Button>{item.actionLabel}</Button>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Needs attention
              </Text>
              <div className={styles.attentionList} style={{ marginTop: 16 }}>
                {attentionItems.map((item) => (
                  <div key={item} className={styles.attentionItem}>
                    <span>!</span>
                    <Text as="p" variant="bodySm">
                      {item}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      <div className={styles.metricGrid}>
        {dashboardMetrics.map((metric) => (
          <AvisMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <Layout>
        <Layout.Section>
          <Card>
            <div className={styles.cardInset}>
              <Text as="h2" variant="headingMd">
                Quick actions
              </Text>
              <div className={styles.actionTileGrid} style={{ marginTop: 16 }}>
                {quickActions.map((item) => (
                  <Link key={item.title} to={item.href} className={styles.actionTile}>
                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      {item.title}
                    </Text>
                    <div style={{ marginTop: 6 }}>
                      <Text as="p" variant="bodySm" tone="subdued">
                        {item.description}
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
}
