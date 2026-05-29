import { Button, InlineStack, Text } from "@shopify/polaris";
import { Link } from "@remix-run/react";
import styles from "./avis-ui.module.css";

interface HeaderAction {
  content: string;
  onAction?: () => void;
  url?: string;
  primary?: boolean;
}

interface AvisPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: HeaderAction[];
}

export function AvisPageHeader({
  title,
  subtitle,
  actions = [],
}: AvisPageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageHeaderText}>
        <Text as="h1" variant="heading2xl">
          <span className={styles.pageTitle}>{title}</span>
        </Text>
        {subtitle ? <p className={styles.pageSubtitle}>{subtitle}</p> : null}
      </div>
      {actions.length ? (
        <InlineStack gap="200" wrap={false} blockAlign="center">
          <div className={styles.actionsRow}>
            {actions.map((action) =>
              action.url ? (
                <Link key={action.content} to={action.url}>
                  <Button variant={action.primary ? "primary" : "secondary"}>
                    {action.content}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={action.content}
                  variant={action.primary ? "primary" : "secondary"}
                  onClick={action.onAction}
                >
                  {action.content}
                </Button>
              ),
            )}
          </div>
        </InlineStack>
      ) : null}
    </div>
  );
}
