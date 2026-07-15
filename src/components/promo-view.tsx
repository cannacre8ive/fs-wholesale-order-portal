"use client";

import { Download } from "lucide-react";
import { AromaVisual } from "@/components/aroma-visual";
import { strainById, usePortal } from "@/context/portal-context";

export function PromoView() {
  const { orders } = usePortal();
  const strains = [...new Set(orders.filter((order) => order.status === "Delivered").map((order) => order.strainId))].map(strainById);
  return <main className="shell content"><div className="section-heading"><div><p className="micro teal">Unlocked by purchase</p><h2>Retail promo kit</h2><p>Brand-consistent assets built from the farm&apos;s product data.</p></div></div><div className="promo-grid">{strains.map((strain) => <article className="promo-card" key={strain.id}><div className="promo-art"><AromaVisual strain={strain} /><div className="promo-copy"><span>Ideal Cannabis × Flower Spectrum</span><h3>{strain.name}</h3><p>{strain.profileLabel}</p></div></div><div className="promo-footer"><div><strong>Product highlight</strong><span>1080 × 1350 · PNG</span></div><button className="button"><Download size={15} /> Export</button></div></article>)}</div><p className="fine-print promo-note">Demo assets are previews. Simulated classifications must be replaced with validated COA data before publication.</p></main>;
}
