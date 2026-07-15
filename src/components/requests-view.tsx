"use client";

import { Check, ShieldCheck, X } from "lucide-react";
import { usePortal } from "@/context/portal-context";

export function RequestsView() {
  const { requests, updateRequest } = usePortal();
  return <main className="shell content"><div className="section-heading"><div><p className="micro teal">Wholesale controls</p><h2>Access requests</h2><p>Pricing stays hidden until a retailer&apos;s license is approved.</p></div></div><div className="request-list">{requests.map((request) => <article key={request.id}><div className="request-icon"><ShieldCheck /></div><div><p className="micro">{request.license}</p><h3>{request.shop}</h3><p>{request.city}</p></div><div className="request-actions">{request.status === "pending" ? <><button className="button primary" onClick={() => updateRequest(request.id, "approved")}><Check size={15} /> Approve</button><button className="button" onClick={() => updateRequest(request.id, "declined")}><X size={15} /> Decline</button></> : <span className={`status-pill ${request.status === "approved" ? "paid" : "declined"}`}>{request.status}</span>}</div></article>)}</div></main>;
}
