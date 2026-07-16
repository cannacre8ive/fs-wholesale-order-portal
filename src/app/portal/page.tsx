import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { PortalApp } from "@/components/portal-app";

export const metadata: Metadata = { title: "Wholesale portal" };

export default async function PortalPage() {
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) await auth.protect();
  return <PortalApp />;
}
