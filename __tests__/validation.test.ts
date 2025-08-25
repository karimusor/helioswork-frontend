import { CandidateSchema } from "@/lib/validation";
import { describe, it, expect } from "vitest";

describe("CandidateSchema", () => {
  it("valide des champs corrects", () => {
    const r = CandidateSchema.safeParse({ firstName: "Jean", lastName: "Dupont", email: "j@d.ch", phone: "0790000000" });
    expect(r.success).toBe(true);
  });
  it("rejette un email invalide", () => {
    const r = CandidateSchema.safeParse({ firstName: "Jean", lastName: "Dupont", email: "nope", phone: "0790000000" });
    expect(r.success).toBe(false);
  });
});
