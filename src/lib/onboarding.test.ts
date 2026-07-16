import { describe, expect, it } from "vitest";
import { emptyOnboardingDraft, onboardingSchema } from "./onboarding";

describe("onboarding schema", () => {
  it("rejects an incomplete organization", () => {
    expect(onboardingSchema.safeParse(emptyOnboardingDraft).success).toBe(false);
  });

  it("accepts a complete classifier-ready source record", () => {
    const result = onboardingSchema.safeParse({
      businessName: "Ideal Cannabis",
      contactName: "Wholesale Team",
      role: "seller",
      license: "OLCC-050-10244B7",
      city: "Portland",
      state: "OR",
      inventoryFiles: ["inventory.csv"],
      imageFiles: ["kush-mints.jpg"],
      testFiles: ["kush-mints-coa.pdf"],
    });
    expect(result.success).toBe(true);
  });
});
