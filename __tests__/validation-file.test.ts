import { validateFile, MaxFileSize } from "@/lib/validation";
import { describe, it, expect } from "vitest";

function mockFile(type: string, size: number) {
  return new File([new Array(size).fill("a").join("")], "cv.test", { type });
}

describe("validateFile", () => {
  it("accepte un PDF valide", () => {
    const ok = validateFile(mockFile("application/pdf", 1024));
    expect(ok.ok).toBe(true);
  });
  it("rejette un mauvais type", () => {
    const bad = validateFile(mockFile("image/png", 1024));
    expect(bad.ok).toBe(false);
  });
  it("rejette un fichier trop lourd", () => {
    const bad = validateFile(mockFile("application/pdf", MaxFileSize + 1));
    expect(bad.ok).toBe(false);
  });
});
