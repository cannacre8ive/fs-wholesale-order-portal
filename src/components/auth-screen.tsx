import { SignIn, SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function AuthScreen({ mode }: { mode: "sign-in" | "sign-up" }) {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <main className="auth-page">
      <section className="auth-story"><BrandMark /><div><p className="micro teal">Wholesale, organized</p><h1>{mode === "sign-in" ? "Welcome back to the spectrum." : "Build the record your flower deserves."}</h1><p>One shared workspace for inventory, source documents, wholesale ordering, and retail-ready product context.</p><ul><li><Check /> Qualified buyer and seller workspaces</li><li><Check /> Inventory, images, and COAs connected by lot</li><li><Check /> Ready for the future Chemovar Classifier</li></ul></div><p className="auth-legal">Flower Spectrum · A CannaCre8ive system</p></section>
      <section className="auth-panel"><div className="auth-panel-inner">{configured ? (mode === "sign-in" ? <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/portal" /> : <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" fallbackRedirectUrl="/onboarding" />) : <div className="auth-fallback"><ShieldCheck /><p className="micro teal">Authentication preview</p><h2>{mode === "sign-in" ? "Sign in to your workspace" : "Create your wholesale account"}</h2><p>Google authentication is wired and waiting for the Clerk marketplace connection to finish provisioning.</p><Link href="/onboarding" className="button primary large">Continue in preview mode <ArrowRight size={15} /></Link><small>No account is created in preview mode.</small></div>}<p className="auth-switch">{mode === "sign-in" ? <>New to Flower Spectrum? <Link href="/sign-up">Create an account</Link></> : <>Already have an account? <Link href="/sign-in">Sign in</Link></>}</p></div></section>
    </main>
  );
}
