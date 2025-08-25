import { formatCHF } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("formatCHF", () => {
  it("formate en CHF", () => { expect(formatCHF(5000)).toContain("CHF"); });
});
