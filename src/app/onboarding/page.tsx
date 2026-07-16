import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding-wizard";

export const metadata: Metadata = { title: "Set up your account" };

export default async function OnboardingPage() {
  let name: string | null = null;
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in?redirect_url=/onboarding");
    name = (await currentUser())?.fullName ?? null;
  }
  return <OnboardingWizard userName={name} />;
}
