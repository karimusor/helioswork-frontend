import Link from "next/link";
import SectionTitle from "@/components/site/section-title";
import { Button } from "@/components/ui/button";
import { JOBS } from "@/lib/jobs";
import { JobCard } from "@/components/jobs/job-card";
import CtaCard from "@/components/landing/cta-card";

export default function HomePage() {
  const recent = JOBS.slice(0, 3);
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Trouvez votre prochain job à Lausanne</h1>
          <p className="mt-3 text-lg text-white/90">Missions temporaires et postes fixes. Candidature en 2 minutes avec votre CV.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-white text-brand-700 hover:bg-gray-100"><Link href="/offres">Voir les offres</Link></Button>
            <Button asChild variant="outline"><Link href="/candidature">Déposer mon CV</Link></Button>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Deux blocs cliquables au-dessus des offres */}
      <section aria-labelledby="actions-rapides">
        <h2 id="actions-rapides" className="sr-only">Actions rapides</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <CtaCard
            title="Postulez maintenant"
            subtitle="Envoyez votre CV en quelques secondes"
            href="/candidature"
            imageUrl="/cta-cv.jpg"
            imageAlt="Candidat déposant un CV"
          />
          <CtaCard
            title="Devenir Partenaire"
            subtitle="Confiez-nous vos recrutements"
            href="/partenaires"
            imageUrl="/cta-partenaire.jpg"
            imageAlt="Homme en costume représentant un partenaire"
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Offres récentes" subtitle="Postulez dès aujourd'hui" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {recent.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
        <div className="mt-6 text-center">
          <Button asChild><Link href="/offres">Toutes les offres</Link></Button>
        </div>
      </section>
    </div>
  );
}