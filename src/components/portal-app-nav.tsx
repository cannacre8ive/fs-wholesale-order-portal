"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function PortalAppNav() {
  const authConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <div className="portal-app-nav">
      <div className="shell">
        <BrandMark />
        <div>
          <Link href="/onboarding" className="app-nav-link"><Settings2 size={14} /> Business setup</Link>
          {authConfigured && <Show when="signed-in"><UserButton /></Show>}
        </div>
      </div>
    </div>
  );
}
