import { z } from "zod";

export const onboardingSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name."),
  contactName: z.string().trim().min(2, "Enter a contact name."),
  role: z.enum(["seller", "buyer", "both"]),
  license: z.string().trim().min(5, "Enter a valid license or application number."),
  city: z.string().trim().min(2, "Enter your city."),
  state: z.string().trim().length(2, "Use the two-letter state code."),
  inventoryFiles: z.array(z.string()),
  imageFiles: z.array(z.string()),
  testFiles: z.array(z.string()),
});

export type OnboardingDraft = z.infer<typeof onboardingSchema>;

export const emptyOnboardingDraft: OnboardingDraft = {
  businessName: "",
  contactName: "",
  role: "seller",
  license: "",
  city: "",
  state: "OR",
  inventoryFiles: [],
  imageFiles: [],
  testFiles: [],
};

/** Future Chemovar Classifier integration boundary. */
export interface ClassifierInput {
  lotId: string;
  testResultObjectKey: string;
}

export interface ClassifierResult {
  status: "queued" | "classified" | "needs-review";
  profileIds: string[];
  confidence?: number;
}
