"use client";

import { Download, PackageCheck, WalletCards } from "lucide-react";
import { strainById, usePortal } from "@/context/portal-context";
import { money, shortDate } from "@/lib/data";

export function AccountView() {
  const { orders, accountMode, setView } = usePortal();
  if (accountMode === "guest") return <main className="shell content"><div className="empty-state"><WalletCards /><h2>Buyer account locked</h2><p>Switch the demo to Approved to view invoices and order history.</p></div></main>;
  const lifetime = orders.reduce((sum, order) => sum + order.total, 0);
  const open = orders.filter((order) => order.status !== "Delivered").length;
  return <main className="shell content">
    <div className="section-heading"><div><p className="micro teal">Approved retailer</p><h2>Willamette Valley Cannabis Co.</h2><p>Sellwood · Portland, OR · OLCC-050-10244B7</p></div><span className="status-pill paid">Net 30 · verified</span></div>
    <div className="stats-grid"><div><span>Lifetime orders</span><strong>{money(lifetime)}</strong></div><div><span>Open orders</span><strong>{open}</strong></div><div><span>Member since</span><strong>Mar 2026</strong></div><div><span>Promo kits</span><strong>{new Set(orders.map((order) => order.strainId)).size}</strong></div></div>
    <section className="table-section"><div className="table-title"><div><h3>Order history</h3><p>Invoices and delivery status</p></div><button className="button"><Download size={15} /> Export CSV</button></div><div className="table-wrap"><table><thead><tr><th>Order</th><th>Product</th><th>Placed</th><th>Delivery</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => { const strain = strainById(order.strainId); return <tr key={order.id}><td className="mono">{order.id}</td><td><strong>{strain.name}</strong><small>{order.pounds} lb @ {money(order.pricePerPound)}</small></td><td>{shortDate(order.placed)}</td><td>{shortDate(order.delivery)}</td><td><strong>{money(order.total)}</strong></td><td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td></tr>; })}</tbody></table></div></section>
    <div className="account-callout"><PackageCheck /><div><h3>Your completed orders have media ready</h3><p>Open the promo kit for product highlights and fingerprint cards.</p></div><button className="button primary" onClick={() => setView("promo")}>Open promo kit</button></div>
  </main>;
}
