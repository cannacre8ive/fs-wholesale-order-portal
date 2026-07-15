"use client";

import { ChevronRight } from "lucide-react";
import { strainById, usePortal } from "@/context/portal-context";
import { money, shortDate } from "@/lib/data";

export function OrdersView() {
  const { orders, advanceOrder } = usePortal();
  const open = orders.filter((order) => order.status !== "Delivered");
  return <main className="shell content"><div className="section-heading"><div><p className="micro teal">Seller workspace</p><h2>Incoming orders</h2><p>Schedule every drop around harvest, cure, and the buyer&apos;s requested date.</p></div></div><div className="stats-grid"><div><span>Open orders</span><strong>{open.length}</strong></div><div><span>Committed flower</span><strong>{open.reduce((sum, order) => sum + order.pounds, 0)} lb</strong></div><div><span>Open revenue</span><strong>{money(open.reduce((sum, order) => sum + order.total, 0))}</strong></div><div><span>On-time target</span><strong>98%</strong></div></div><section className="table-section"><div className="table-title"><div><h3>Order queue</h3><p>Newest first</p></div></div><div className="table-wrap"><table><thead><tr><th>Order</th><th>Buyer / product</th><th>Requested</th><th>Value</th><th>Status</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td className="mono">{order.id}</td><td><strong>{strainById(order.strainId).name}</strong><small>Willamette Valley Cannabis Co. · {order.pounds} lb</small></td><td>{shortDate(order.delivery)}</td><td><strong>{money(order.total)}</strong></td><td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td><td>{order.status !== "Delivered" && <button className="table-action" onClick={() => advanceOrder(order.id)}>Advance <ChevronRight size={14} /></button>}</td></tr>)}</tbody></table></div></section></main>;
}
