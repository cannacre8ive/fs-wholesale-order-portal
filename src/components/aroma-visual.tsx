import type { Strain } from "@/lib/types";

export function AromaVisual({ strain, compact = false }: { strain: Strain; compact?: boolean }) {
  return (
    <div className={`aroma-visual ${compact ? "compact" : ""}`} style={{ "--strain": strain.color } as React.CSSProperties} aria-hidden="true">
      <div className="orb orb-one" /><div className="orb orb-two" /><div className="orb orb-three" />
      <span className="visual-code">FS—{strain.id.slice(0, 3).toUpperCase()}—26</span>
    </div>
  );
}
