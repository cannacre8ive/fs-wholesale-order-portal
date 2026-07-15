import { describe, expect, it } from "vitest";
import { priceFor, strains } from "./data";

describe("wholesale pricing", () => {
  const kushMints = strains.find((strain) => strain.id === "kush-mints")!;

  it("uses the one-pound tier by default", () => {
    expect(priceFor(kushMints, 1).price).toBe(1450);
  });

  it("applies five- and ten-pound breaks", () => {
    expect(priceFor(kushMints, 5).price).toBe(1300);
    expect(priceFor(kushMints, 10).price).toBe(1150);
  });
});
