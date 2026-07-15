"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, LayoutGrid, List, Search, ShieldCheck, Sparkles, Tags } from "lucide-react";
import { AromaVisual } from "@/components/aroma-visual";
import { StrainModal } from "@/components/strain-modal";
import { usePortal } from "@/context/portal-context";
import { money, strains } from "@/lib/data";
import type { Strain } from "@/lib/types";

const benefits = [
  { icon: ShieldCheck, title: "Know what lands", copy: "Lineage, breeder, harvest, and fingerprint data on every lot." },
  { icon: Tags, title: "Transparent pricing", copy: "Clear per-pound breaks at 5 and 10 lb for approved buyers." },
  { icon: Sparkles, title: "Ready-to-post assets", copy: "Every completed order unlocks a coordinated retail promo kit." },
];

export function WholesaleMenu() {
  const { accountMode, inventory } = usePortal();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Strain | null>(null);
  const visible = useMemo(() => strains.filter((strain) => `${strain.name} ${strain.cross} ${strain.profileLabel}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    if (sort === "price") return a.tiers[0].price - b.tiers[0].price;
    if (sort === "thc") return b.thc - a.thc;
    if (sort === "stock") return (inventory[b.id] ?? b.available) - (inventory[a.id] ?? a.available);
    return a.name.localeCompare(b.name);
  }), [inventory, query, sort]);

  return (
    <main className="shell content">
      <div className="section-heading"><div><p className="micro teal">Available now · Oregon</p><h2>The wholesale menu</h2><p>Browse the shelf by aroma, chemistry, and commercial fit.</p></div><div className="live-note"><span /> Live inventory · demo</div></div>
      <div className="benefit-grid">{benefits.map(({ icon: Icon, title, copy }) => <article key={title}><Icon size={19} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      <div className="toolbar">
        <label className="search"><Search size={17} /><input type="search" placeholder="Search strain, lineage, or aroma" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="select-label"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Name A–Z</option><option value="price">Price low–high</option><option value="thc">THC high–low</option><option value="stock">Availability</option></select></label>
        <div className="layout-toggle" aria-label="Menu layout"><button className={layout === "grid" ? "active" : ""} onClick={() => setLayout("grid")} aria-label="Grid view"><LayoutGrid size={17} /></button><button className={layout === "list" ? "active" : ""} onClick={() => setLayout("list")} aria-label="List view"><List size={17} /></button></div>
      </div>
      <div className={`strain-grid ${layout === "list" ? "list" : ""}`}>
        {visible.map((strain) => {
          const available = inventory[strain.id] ?? strain.available;
          return <button key={strain.id} className="strain-card" onClick={() => setSelected(strain)}>
            <div className="card-visual"><AromaVisual strain={strain} /><span className={`data-badge ${strain.verified ? "verified" : ""}`}>{strain.verified ? "COA verified" : "Simulated"}</span></div>
            <div className="card-body"><div className="card-top"><div><p className="profile" style={{ color: strain.color }}>{strain.profileLabel}</p><h3>{strain.name}</h3><p className="lineage">{strain.cross}</p></div><ArrowUpRight size={20} /></div><p className="aroma">{strain.aroma}</p><div className="card-meta"><span><strong>{strain.thc}%</strong> THC</span><span className={available <= 5 ? "low" : ""}><strong>{available}</strong> lb available</span></div><div className="price-row"><span>{accountMode === "approved" ? <><strong>{money(strain.tiers[0].price)}</strong> / lb</> : "Pricing locked"}</span><span>View lot</span></div></div>
          </button>;
        })}
      </div>
      {visible.length === 0 && <div className="empty-state"><Search /><h3>No matching flower</h3><p>Try a strain name, lineage, or aroma profile.</p></div>}
      {selected && <StrainModal strain={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
