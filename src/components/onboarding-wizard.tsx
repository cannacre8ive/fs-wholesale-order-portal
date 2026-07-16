"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Beaker, Building2, Check, Images, PackageOpen, Save } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { FileDropField } from "@/components/file-drop-field";
import { emptyOnboardingDraft, onboardingSchema, type OnboardingDraft } from "@/lib/onboarding";

const steps = [
  { label: "Business", icon: Building2 },
  { label: "Inventory", icon: PackageOpen },
  { label: "Images", icon: Images },
  { label: "Test results", icon: Beaker },
  { label: "Review", icon: Check },
];
const storageKey = "flower-spectrum-onboarding-v1";

export function OnboardingWizard({ userName }: { userName?: string | null }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(emptyOnboardingDraft);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const hydration = window.setTimeout(() => {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        try { setDraft(onboardingSchema.parse(JSON.parse(savedDraft))); } catch { /* Ignore an invalid saved draft. */ }
      } else if (userName) {
        setDraft((current) => ({ ...current, contactName: userName }));
      }
    }, 0);
    return () => window.clearTimeout(hydration);
  }, [userName]);

  const update = <K extends keyof OnboardingDraft>(key: K, value: OnboardingDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const addFiles = (key: "inventoryFiles" | "imageFiles" | "testFiles", files: File[]) => update(key, [...new Set([...draft[key], ...files.map((file) => file.name)])]);
  const removeFile = (key: "inventoryFiles" | "imageFiles" | "testFiles", name: string) => update(key, draft[key].filter((file) => file !== name));

  const validateStep = () => {
    setError("");
    if (step === 0) {
      const result = onboardingSchema.pick({ businessName: true, contactName: true, role: true, license: true, city: true, state: true }).safeParse(draft);
      if (!result.success) { setError(result.error.issues[0]?.message ?? "Complete the required business fields."); return false; }
    }
    if (step === 1 && draft.inventoryFiles.length === 0) { setError("Add an inventory file to continue."); return false; }
    if (step === 2 && draft.imageFiles.length === 0) { setError("Add at least one product image to continue."); return false; }
    if (step === 3 && draft.testFiles.length === 0) { setError("Add at least one lab result to continue."); return false; }
    return true;
  };

  const saveDraft = () => {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const next = () => { if (validateStep()) { saveDraft(); setStep((current) => Math.min(steps.length - 1, current + 1)); } };
  const finish = () => {
    if (!confirmed) { setError("Confirm the data authorization statement to finish setup."); return; }
    const result = onboardingSchema.safeParse(draft);
    if (!result.success) { setError(result.error.issues[0]?.message ?? "Review the onboarding information."); return; }
    localStorage.setItem(storageKey, JSON.stringify({ ...result.data, completedAt: new Date().toISOString() }));
    router.push("/portal?onboarding=complete");
  };

  return (
    <div className="onboarding-page">
      <header className="onboarding-header"><BrandMark /><div><button type="button" className="button" onClick={saveDraft}><Save size={14} /> {saved ? "Saved" : "Save draft"}</button></div></header>
      <div className="onboarding-layout">
        <aside className="onboarding-aside"><p className="micro teal">Account setup</p><h1>Build your wholesale profile.</h1><p>Give buyers the context they need and keep every product source file together.</p><ol>{steps.map(({ label, icon: Icon }, index) => <li key={label} className={index === step ? "active" : index < step ? "complete" : ""}><span>{index < step ? <Check size={15} /> : <Icon size={15} />}</span><div><small>Step {index + 1}</small><b>{label}</b></div></li>)}</ol><div className="onboarding-security"><Check size={15} /><span><b>Your work is private.</b> Only your team and approved buyers can access published records.</span></div></aside>
        <main className="onboarding-main">
          <div className="onboarding-progress"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          {step === 0 && <section className="onboarding-step"><p className="micro teal">Step 1 of 5</p><h2>Tell us about the business.</h2><p className="step-lede">We use this to create your organization and determine the right workspace.</p><div className="role-grid">{(["seller", "buyer", "both"] as const).map((role) => <button type="button" key={role} className={draft.role === role ? "active" : ""} onClick={() => update("role", role)}><span>{role === "seller" ? "Cultivator / brand" : role === "buyer" ? "Retail buyer" : "Both sides"}</span><small>{role === "seller" ? "List and sell inventory" : role === "buyer" ? "Source wholesale flower" : "Buy and sell"}</small></button>)}</div><div className="form-grid"><label>Business name<input value={draft.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Ideal Cannabis" autoComplete="organization" /></label><label>Primary contact<input value={draft.contactName} onChange={(event) => update("contactName", event.target.value)} placeholder="Your name" autoComplete="name" /></label><label>License or application number<input value={draft.license} onChange={(event) => update("license", event.target.value)} placeholder="OLCC-050-…" /></label><label>City<input value={draft.city} onChange={(event) => update("city", event.target.value)} placeholder="Portland" autoComplete="address-level2" /></label><label>State<input value={draft.state} maxLength={2} onChange={(event) => update("state", event.target.value.toUpperCase())} placeholder="OR" autoComplete="address-level1" /></label></div></section>}
          {step === 1 && <section className="onboarding-step"><p className="micro teal">Step 2 of 5</p><h2>Bring in your inventory.</h2><p className="step-lede">Start from the file your team already uses. We&apos;ll map columns before anything is published.</p><FileDropField id="inventory-upload" title="Drop your inventory sheet here" description="CSV or XLSX · up to 10 MB" accept=".csv,.xlsx,.xls" files={draft.inventoryFiles} onFiles={(files) => addFiles("inventoryFiles", files)} onRemove={(name) => removeFile("inventoryFiles", name)} /><div className="mapping-preview"><div><span>We&apos;ll look for</span><strong>Strain · Lot ID · Quantity · Harvest · Pricing</strong></div><div><span>Optional fields</span><strong>Lineage · Breeder · Package size · Notes</strong></div></div></section>}
          {step === 2 && <section className="onboarding-step"><p className="micro teal">Step 3 of 5</p><h2>Add product photography.</h2><p className="step-lede">Clear filenames make automatic matching easier. You can adjust every match before publishing.</p><FileDropField id="image-upload" title="Choose product images" description="JPG, PNG, or WebP · multiple files supported" accept="image/jpeg,image/png,image/webp" files={draft.imageFiles} onFiles={(files) => addFiles("imageFiles", files)} onRemove={(name) => removeFile("imageFiles", name)} /><div className="upload-tip"><Images /><div><b>Filename tip</b><p>Use names like <code>kush-mints_lot-042_hero.jpg</code> to help us connect images to inventory.</p></div></div></section>}
          {step === 3 && <section className="onboarding-step"><p className="micro teal">Step 4 of 5</p><h2>Attach test results.</h2><p className="step-lede">Keep the source COA with its lot now. The Chemovar Classifier will plug into this record later.</p><FileDropField id="test-upload" title="Choose lab documents" description="PDF, JPG, or PNG · one result per lot is ideal" accept="application/pdf,image/jpeg,image/png" files={draft.testFiles} onFiles={(files) => addFiles("testFiles", files)} onRemove={(name) => removeFile("testFiles", name)} /><div className="classifier-note"><Beaker /><div><span>Classifier-ready</span><b>Chemovar analysis comes next.</b><p>This build stores the source-document relationship only. No classification or effect claims are generated yet.</p></div></div></section>}
          {step === 4 && <section className="onboarding-step"><p className="micro teal">Step 5 of 5</p><h2>Review your workspace.</h2><p className="step-lede">You can edit these details and replace source files from the portal later.</p><div className="review-card"><div><span>Organization</span><strong>{draft.businessName}</strong><small>{draft.city}, {draft.state} · {draft.license}</small></div><div><span>Workspace</span><strong>{draft.role === "both" ? "Buyer + seller" : draft.role === "seller" ? "Seller" : "Buyer"}</strong><small>Primary contact · {draft.contactName}</small></div><div><span>Inventory source</span><strong>{draft.inventoryFiles.length} file{draft.inventoryFiles.length === 1 ? "" : "s"}</strong><small>{draft.inventoryFiles.join(", ")}</small></div><div><span>Product assets</span><strong>{draft.imageFiles.length} image{draft.imageFiles.length === 1 ? "" : "s"} · {draft.testFiles.length} lab file{draft.testFiles.length === 1 ? "" : "s"}</strong><small>Ready for matching and review</small></div></div><label className="review-confirm"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /><span>I confirm this is demo or authorized business data and understand nothing is published until reviewed.</span></label></section>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="onboarding-controls"><button type="button" className="button" disabled={step === 0} onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }}><ArrowLeft size={14} /> Back</button>{step < steps.length - 1 ? <button type="button" className="button primary large" onClick={next}>Continue <ArrowRight size={15} /></button> : <button type="button" className="button primary large" onClick={finish}>Finish setup <Check size={15} /></button>}</div>
          <p className="onboarding-storage-note">Files are staged locally in this preview; secure object-storage upload is the next backend integration.</p>
        </main>
      </div>
    </div>
  );
}
