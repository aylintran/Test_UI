import type { LoaderFunctionArgs } from "@remix-run/node";
import { BlockStack, Card, Layout, Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function AppHome() {
  return (
    <Page
      title="Order Tracking App"
      subtitle="Minimal Shopify app shell kept for future deployment and API work."
    >
      <TitleBar title="Order Tracking App" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                App shell is ready
              </Text>
              <Text as="p" tone="subdued">
                Authentication, embedded app setup, session storage, and webhook
                endpoints are still in place.
              </Text>
              <Text as="p" tone="subdued">
                Feature-specific tracking UI and mock flows were removed so this
                project can stay as a clean deployable API/app base.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
