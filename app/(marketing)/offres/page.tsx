"use client";
import * as React from "react";
import SectionTitle from "@/components/site/section-title";
import { FilterBar, type Filters } from "@/components/jobs/filter-bar";
import { JobCard } from "@/components/jobs/job-card";
import { JOBS, type Job } from "@/lib/jobs";
import { JobCardSkeleton } from "@/components/shared/skeletons";
export default function OffresPage() {
  const [data, setData] = React.useState<Job[] | null>(null);
  const [filters, setFilters] = React.useState<Filters>({ q: "", sector: "", contract: "" });
  React.useEffect(() => { const t = setTimeout(() => setData(JOBS), 300); return () => clearTimeout(t); }, []);
  const filtered = (data || []).filter((j) =>
    (!filters.q || [j.title, j.company, j.location, j.description].join(" ").toLowerCase().includes(filters.q.toLowerCase())) &&
    (!filters.sector || j.sector === (filters.sector as Job["sector"])) &&
    (!filters.contract || j.contract === (filters.contract as Job["contract"]))
  );
  return (
    <div>
      <SectionTitle title="Toutes les offres" subtitle="Filtrez par secteur, type de contrat et mots-clés" />
      <div className="mt-6"><FilterBar onChange={setFilters} /></div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!data ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />) : filtered.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}