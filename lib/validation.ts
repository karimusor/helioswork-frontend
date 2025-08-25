import { z } from "zod";
export const CandidateSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  message: z.string().max(1000).optional(),
});
export const AllowedMime = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const MaxFileSize = 5 * 1024 * 1024;
export function validateFile(file: File) {
  if (!AllowedMime.includes(file.type)) return { ok: false, error: "Format accepté: PDF, DOC, DOCX" } as const;
  if (file.size > MaxFileSize) return { ok: false, error: "Taille max 5MB" } as const;
  return { ok: true } as const;
}