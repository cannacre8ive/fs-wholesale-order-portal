"use client";

import { PackageOpen } from "lucide-react";
import { usePortal } from "@/context/portal-context";
import { money, shortDate, strains } from "@/lib/data";

export function InventoryView() {
  const { inventory, updateInventory } = usePortal();
  return <main className="shell content"><div className="section-heading"><div><p className="micro teal">Live catalog</p><h2>Inventory & photography</h2><p>Inventory changes update the buyer menu immediately in this demo.</p></div><button className="button primary"><PackageOpen size={15} /> Upload product photos</button></div><section className="table-section"><div className="table-wrap"><table><thead><tr><th>Lot</th><th>Strain</th><th>Harvest</th><th>Base price</th><th>Live stock</th><th>Data</th></tr></thead><tbody>{strains.map((strain) => <tr key={strain.id}><td><span className="lot-swatch" style={{ background: strain.color }} /></td><td><strong>{strain.name}</strong><small>{strain.profileLabel}</small></td><td>{shortDate(strain.harvest)}</td><td>{money(strain.tiers[0].price)}</td><td><label className="stock-input"><input aria-label={`${strain.name} inventory`} type="number" min={0} value={inventory[strain.id] ?? strain.available} onChange={(event) => updateInventory(strain.id, Number(event.target.value))} /> lb</label></td><td><span className={`status-pill ${strain.verified ? "paid" : ""}`}>{strain.verified ? "COA verified" : "Simulated"}</span></td></tr>)}</tbody></table></div></section></main>;
}
