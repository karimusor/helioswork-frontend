export type Job = {
  id: string; title: string; company: string; location: string;
  contract: "Temporaire" | "Fixe" | "Mission";
  sector: "Administration" | "Logistique" | "Industrie" | "IT";
  salaryFrom?: number; salaryTo?: number; publishedAt: string; description: string;
};
export const JOBS: Job[] = [
  { id: "j1", title: "Assistant·e administratif·ve", company: "Clinique du Léman", location: "Lausanne", contract: "Temporaire", sector: "Administration", salaryFrom: 4800, salaryTo: 5200, publishedAt: new Date().toISOString(), description: "Accueil, gestion dossiers, soutien équipe médicale. Français C1, Excel." },
  { id: "j2", title: "Cariste (permis cariste)", company: "LogiRomandie SA", location: "Ecublens", contract: "Mission", sector: "Logistique", publishedAt: new Date(Date.now()-86400000).toISOString(), description: "Réception, préparation de commandes, conduite chariot frontal." },
  { id: "j3", title: "Développeur·se Fullstack (Node/React)", company: "TechLeman", location: "Lausanne / Hybride", contract: "Fixe", sector: "IT", salaryFrom: 95000, salaryTo: 120000, publishedAt: new Date(Date.now()-3*86400000).toISOString(), description: "Produits SaaS, Next.js 14, MongoDB. Français/Anglais." }
];