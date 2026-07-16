import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function LandingHeader() {
  const authConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <header className="landing-nav">
      <div className="landing-shell landing-nav-inner">
        <BrandMark />
        <nav aria-label="Primary navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#platform">Platform</a>
          <a href="#for-whom">For buyers & farms</a>
        </nav>
        <div className="landing-actions">
          {authConfigured ? (
            <>
              <Show when="signed-out"><Link href="/sign-in" className="text-link">Sign in</Link><Link href="/sign-up" className="button primary">Create account <ArrowRight size={14} /></Link></Show>
              <Show when="signed-in"><Link href="/portal" className="button primary">Open portal <ArrowRight size={14} /></Link><UserButton /></Show>
            </>
          ) : (
            <><Link href="/sign-in" className="text-link">Sign in</Link><Link href="/sign-up" className="button primary">Create account <ArrowRight size={14} /></Link></>
          )}
        </div>
      </div>
    </header>
  );
}
