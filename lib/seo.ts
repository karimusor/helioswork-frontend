import type { Metadata } from "next";
export const baseMetadata: Metadata = {
  title: { default: "Helios Work — Agence d''intérim à Lausanne", template: "%s | Helios Work" },
  description: "Helios Work : intérim et recrutement fixe à Lausanne. Candidature en ligne, offres récentes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { type: "website", locale: "fr_CH", siteName: "Helios Work" }
};