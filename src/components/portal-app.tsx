"use client";

import { AccountView } from "@/components/account-view";
import { InventoryView } from "@/components/inventory-view";
import { OrdersView } from "@/components/orders-view";
import { PortalAppNav } from "@/components/portal-app-nav";
import { PortalHeader } from "@/components/portal-header";
import { PromoView } from "@/components/promo-view";
import { RequestsView } from "@/components/requests-view";
import { WholesaleMenu } from "@/components/wholesale-menu";
import { PortalProvider, usePortal } from "@/context/portal-context";

function PortalContent() {
  const { view } = usePortal();
  return (
    <div className="site">
      <PortalAppNav />
      <PortalHeader />
      {view === "menu" && <WholesaleMenu />}
      {view === "account" && <AccountView />}
      {view === "promo" && <PromoView />}
      {view === "orders" && <OrdersView />}
      {view === "inventory" && <InventoryView />}
      {view === "requests" && <RequestsView />}
      <footer><div className="shell"><span>Flower Spectrum · Wholesale Portal · v1.0</span><span>Demo data · no medical or effects claims</span></div></footer>
    </div>
  );
}

export function PortalApp() {
  return <PortalProvider><PortalContent /></PortalProvider>;
}
