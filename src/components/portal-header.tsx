"use client";

import { RotateCcw } from "lucide-react";
import { usePortal } from "@/context/portal-context";

const buyerTabs = [{ id: "menu", label: "Wholesale menu" }, { id: "account", label: "My account" }, { id: "promo", label: "Promo kit" }] as const;
const sellerTabs = [{ id: "orders", label: "Orders" }, { id: "inventory", label: "Inventory" }, { id: "requests", label: "Access requests" }] as const;

export function PortalHeader() {
  const { perspective, accountMode, view, orders, requests, setPerspective, setAccountMode, setView, resetDemo } = usePortal();
  const tabs = perspective === "buyer" ? buyerTabs : sellerTabs;
  const openOrders = orders.filter((order) => order.status !== "Delivered").length;
  const pendingRequests = requests.filter((request) => request.status === "pending").length;

  return (
    <>
      <header className="hero shell">
        <div className="eyebrow">CannaCre8ive <span>/</span> Flower Spectrum <span>/</span> Ideal Cannabis</div>
        <h1>Wholesale flower,<br /><em>sold by its aroma.</em></h1>
        <p className="hero-copy">A chemistry-first marketplace where qualified retailers discover flower by lineage, aroma profile, and verified inventory—not rumor.</p>
        <div className="spectrum" aria-hidden="true">
          {["#c9a84c", "#6b8e5a", "#d4a843", "#b75f4a", "#b98bbe", "#d6b58a", "#9e6b4a", "#4f7a5b", "#7fa688", "#d28b49"].map((color) => <span key={color} style={{ background: color }} />)}
        </div>
        <div className="demo-controls">
          <div className="segmented" aria-label="Portal perspective">
            <button className={perspective === "buyer" ? "active" : ""} onClick={() => setPerspective("buyer")}>Buyer view</button>
            <button className={perspective === "seller" ? "active" : ""} onClick={() => setPerspective("seller")}>Seller view</button>
          </div>
          <div className="account-demo">
            <span>Demo access</span>
            <div className="segmented small" aria-label="Demo account access">
              <button className={accountMode === "guest" ? "active" : ""} onClick={() => setAccountMode("guest")}>Guest</button>
              <button className={accountMode === "approved" ? "active" : ""} onClick={() => setAccountMode("approved")}>Approved</button>
            </div>
            <button className="icon-button" onClick={resetDemo} title="Reset demo data" aria-label="Reset demo data"><RotateCcw size={15} /></button>
          </div>
        </div>
      </header>
      <nav className="tabs" aria-label={`${perspective} navigation`}>
        <div className="shell tab-inner">
          {tabs.map((tab) => (
            <button key={tab.id} className={view === tab.id ? "active" : ""} onClick={() => setView(tab.id)}>
              {tab.label}
              {tab.id === "orders" && openOrders > 0 && <span className="nav-badge">{openOrders}</span>}
              {tab.id === "requests" && pendingRequests > 0 && <span className="nav-badge">{pendingRequests}</span>}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
