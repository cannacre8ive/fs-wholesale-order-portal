import Link from "next/link";
import { ArrowRight, BarChart3, Beaker, CheckCircle2, FileCheck2, Images, PackageOpen, ShieldCheck, Sparkles, Store, UploadCloud } from "lucide-react";
import { LandingHeader } from "@/components/landing-header";

const profiles = [
  { name: "Gas / Fuel", color: "#c9a84c", value: "34%" },
  { name: "Earthy / Dank", color: "#6b8e5a", value: "21%" },
  { name: "Citrus / Bright", color: "#d4a843", value: "18%" },
  { name: "Fruity / Sweet", color: "#b75f4a", value: "12%" },
];

export function LandingPage() {
  return (
    <div className="landing-page">
      <LandingHeader />
      <main>
        <section className="landing-hero landing-shell">
          <div className="landing-hero-copy">
            <p className="micro teal">The wholesale intelligence layer for cannabis</p>
            <h1>Sell the flower.<br /><em>Explain the chemistry.</em></h1>
            <p className="landing-lede">A shared marketplace where farms publish complete lots and retail buyers source by aroma, lineage, verified inventory, and commercial fit.</p>
            <div className="hero-actions"><Link href="/sign-up" className="button primary large">List your first lot <ArrowRight size={16} /></Link><Link href="/portal" className="button large">Explore the portal</Link></div>
            <div className="trust-row"><span><ShieldCheck size={15} /> Qualified buyers</span><span><FileCheck2 size={15} /> COA-aware records</span><span><Sparkles size={15} /> Promo-ready assets</span></div>
          </div>
          <div className="landing-product-card" aria-label="Example Flower Spectrum product intelligence card">
            <div className="product-card-head"><span>Live lot · FS—KUS—26</span><span className="status-pill paid">COA verified</span></div>
            <div className="product-orbit"><i className="p-orb p-one" /><i className="p-orb p-two" /><i className="p-orb p-three" /><div className="fingerprint"><span /><span /><span /><span /><span /><span /><span /><span /></div></div>
            <div className="product-name"><div><p>Ideal Cannabis</p><h2>Kush Mints</h2><span>Bubba Kush × Animal Mints</span></div><strong>34.6<small>% THC</small></strong></div>
            <div className="profile-stack">{profiles.map((profile) => <div key={profile.name}><span style={{ background: profile.color, width: profile.value }} /><label>{profile.name}<b>{profile.value}</b></label></div>)}</div>
            <div className="product-card-foot"><span>14 lb available</span><span>$1,450 / lb</span><b>View lot <ArrowRight size={13} /></b></div>
          </div>
        </section>

        <section className="market-strip"><div className="landing-shell"><span>One product record</span><i /><span>Every buyer touchpoint</span><i /><span>From COA to sell-through</span></div></section>

        <section className="landing-section landing-shell" id="platform">
          <div className="landing-section-head"><div><p className="micro teal">One source of product truth</p><h2>Built for the full life of a wholesale lot.</h2></div><p>Stop rebuilding the same product story across spreadsheets, texts, menus, and social assets.</p></div>
          <div className="feature-grid">
            <article><div className="feature-number">01</div><PackageOpen /><h3>Publish complete inventory</h3><p>Upload lots, tier pricing, harvest dates, availability, photography, and lab documents in one guided flow.</p><span>Inventory workspace <ArrowRight size={13} /></span></article>
            <article><div className="feature-number">02</div><Beaker /><h3>Make chemistry legible</h3><p>Structure test results now, then connect the Chemovar Classifier when it is ready—without rebuilding your catalog.</p><span>Classifier-ready schema <ArrowRight size={13} /></span></article>
            <article><div className="feature-number">03</div><BarChart3 /><h3>Move product with context</h3><p>Buyers get clear pricing and product fit; farms get schedulable orders and consistent retail-facing assets.</p><span>Commercial intelligence <ArrowRight size={13} /></span></article>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works"><div className="landing-shell workflow-grid"><div className="workflow-copy"><p className="micro teal">From harvest to wholesale in minutes</p><h2>A calmer way to bring inventory to market.</h2><p>Onboarding captures the information buyers need and preserves the source documents your team will use later.</p><Link href="/sign-up" className="button primary large">Start onboarding <ArrowRight size={16} /></Link></div><ol><li><span><Store /></span><div><b>Set up the business</b><p>Business identity, license, service area, and wholesale role.</p></div><em>01</em></li><li><span><UploadCloud /></span><div><b>Add inventory</b><p>Import a spreadsheet or enter the first available lot manually.</p></div><em>02</em></li><li><span><Images /></span><div><b>Attach the proof</b><p>Stage product images and test results against the right product record.</p></div><em>03</em></li><li><span><CheckCircle2 /></span><div><b>Review and publish</b><p>Confirm data quality, then enter the wholesale workspace.</p></div><em>04</em></li></ol></div></section>

        <section className="audience-section landing-shell" id="for-whom"><div className="audience-card farm"><p className="micro">For cultivators & brands</p><h2>Your flower, represented correctly.</h2><ul><li>Qualified buyer access</li><li>Transparent tier pricing</li><li>Inventory and media in one record</li></ul><Link href="/sign-up">Create a seller account <ArrowRight size={14} /></Link></div><div className="audience-card buyer"><p className="micro">For retail buyers</p><h2>Source beyond the strain name.</h2><ul><li>Comparable product data</li><li>Lineage and lab documentation</li><li>Ready-to-use retail assets</li></ul><Link href="/sign-up">Join as a buyer <ArrowRight size={14} /></Link></div></section>

        <section className="landing-cta landing-shell"><p className="micro teal">Ready when your next lot is</p><h2>Bring your inventory.<br /><em>We&apos;ll organize the story.</em></h2><Link href="/sign-up" className="button primary large">Create your account <ArrowRight size={16} /></Link></section>
      </main>
      <footer className="landing-footer"><div className="landing-shell"><span>Flower Spectrum · A CannaCre8ive system</span><span>Wholesale intelligence · Oregon</span></div></footer>
    </div>
  );
}
