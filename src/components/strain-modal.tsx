"use client";

import { useEffect, useState } from "react";
import { Check, LockKeyhole, X } from "lucide-react";
import { AromaVisual } from "@/components/aroma-visual";
import { usePortal } from "@/context/portal-context";
import { money, priceFor, shortDate } from "@/lib/data";
import type { Order, Strain } from "@/lib/types";

export function StrainModal({ strain, onClose }: { strain: Strain; onClose: () => void }) {
  const { accountMode, inventory, placeOrder } = usePortal();
  const [pounds, setPounds] = useState(1);
  const [delivery, setDelivery] = useState("");
  const [confirmation, setConfirmation] = useState<Order | null>(null);
  const available = inventory[strain.id] ?? strain.available;
  const tier = priceFor(strain, pounds);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  const submit = () => {
    if (!delivery) return;
    setConfirmation(placeOrder({ strainId: strain.id, pounds, pricePerPound: tier.price, total: pounds * tier.price, delivery }));
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="strain-title">
        <button className="modal-close" onClick={onClose} aria-label="Close strain details"><X /></button>
        <div className="modal-hero"><AromaVisual strain={strain} /><div className="modal-title"><span>{strain.verified ? "COA verified" : "Simulated classification"}</span><h2 id="strain-title">{strain.name}</h2><p>{strain.profileLabel} · {strain.thc}% THC</p></div></div>
        <div className="modal-grid">
          <div className="modal-info">
            <p className="aroma-quote">“{strain.aroma}”</p>
            <dl className="detail-grid">
              <div><dt>Lineage</dt><dd>{strain.cross}</dd></div><div><dt>Breeder</dt><dd>{strain.breeder}</dd></div>
              <div><dt>Harvest</dt><dd>{shortDate(strain.harvest)}</dd></div><div><dt>Available</dt><dd>{available} lb</dd></div>
              <div><dt>Fingerprint ID</dt><dd>FS—{strain.id.slice(0, 3).toUpperCase()}—26</dd></div><div><dt>Data status</dt><dd>{strain.verified ? "Validated panel" : "Demo data"}</dd></div>
            </dl>
            <div className="profile-meter"><span style={{ background: strain.color, width: "52%" }} /><span style={{ background: "#7fa688", width: "28%" }} /><span style={{ background: "#d6b58a", width: "20%" }} /></div>
          </div>
          <aside className="buy-panel">
            {accountMode === "guest" ? (
              <div className="locked-state"><LockKeyhole /><h3>Wholesale access required</h3><p>Pricing and ordering are reserved for verified retail partners.</p><button className="button primary">Request buyer access</button></div>
            ) : confirmation ? (
              <div className="confirmation"><div className="success-icon"><Check /></div><p className="micro">Order received</p><h3>{confirmation.id}</h3><p>{confirmation.pounds} lb of {strain.name} requested for {shortDate(confirmation.delivery)}.</p><div className="order-total"><span>Total</span><strong>{money(confirmation.total)}</strong></div><button className="button" onClick={onClose}>Back to menu</button></div>
            ) : (
              <>
                <p className="micro teal">Wholesale order</p><h3>Tier pricing</h3>
                <div className="tiers">{strain.tiers.map((item) => <div key={item.min} className={tier.min === item.min ? "active" : ""}><span>{item.min}+ lb</span><strong>{money(item.price)} / lb</strong></div>)}</div>
                <div className="field-row"><label>Quantity (lb)<input type="number" min={1} max={available} value={pounds} onChange={(event) => setPounds(Math.min(available, Math.max(1, Number(event.target.value))))} /></label><label>Preferred delivery<input type="date" value={delivery} onChange={(event) => setDelivery(event.target.value)} /></label></div>
                <div className="order-total"><span>Estimated total</span><strong>{money(pounds * tier.price)}</strong></div>
                <button className="button primary full" disabled={!delivery || available === 0} onClick={submit}>Place wholesale order</button>
                <p className="fine-print">Demo checkout · no payment is collected</p>
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
