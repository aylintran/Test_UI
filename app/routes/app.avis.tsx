import { Outlet, NavLink, useLocation, useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button, Text } from "@shopify/polaris";
import shellStyles from "../components/avis/avis-shell.module.css";
import { avisNavItems } from "../components/avis/mockData";

type AvisShellContext = {
  showToast: (message: string) => void;
};

export function useAvisShell() {
  return useOutletContext<AvisShellContext>();
}

export default function AvisLayout() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className={shellStyles.shell}>
      <aside className={shellStyles.sidebar}>
        <div className={shellStyles.sidebarCard}>
          <div className={shellStyles.brandBlock}>
            <span className={shellStyles.eyebrow}>Prototype</span>
            <div className={shellStyles.brandTitle}>Avis Color Swatch</div>
            <p className={shellStyles.brandText}>
              Embedded-app MVP with polished mock flows for setup, mapping, and
              storefront preview behavior.
            </p>
          </div>

          <nav className={shellStyles.navList}>
            {avisNavItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`${shellStyles.navItem} ${active ? shellStyles.navItemActive : ""}`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className={shellStyles.sidebarFooter}>
            <Text as="p" variant="bodyMd" fontWeight="medium">
              Documentation and rollout
            </Text>
            <div style={{ marginTop: 6, marginBottom: 12 }}>
              <Text as="p" variant="bodySm" tone="subdued">
                Use this prototype to demo navigation, settings hierarchy, and
                realistic storefront previews before API work starts.
              </Text>
            </div>
            <Button fullWidth onClick={() => setToastMessage("Documentation opened")}>
              View documentation
            </Button>
          </div>
        </div>
      </aside>
      <main className={shellStyles.contentArea}>
        <div className={shellStyles.contentInner}>
          <Outlet context={{ showToast: setToastMessage }} />
        </div>
      </main>
      {toastMessage ? (
        <div className={shellStyles.toast}>
          <div className={shellStyles.toastTitle}>Saved for demo</div>
          <div className={shellStyles.toastText}>{toastMessage}</div>
        </div>
      ) : null}
    </div>
  );
}
