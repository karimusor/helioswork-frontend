"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCHF } from "@/lib/utils";
import type { Job } from "@/lib/jobs";
export function JobCard({ job }: { job: Job }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
      <Card className="h-full">
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
            </div>
            <Badge>{job.contract}</Badge>
          </div>
          <p className="mt-3 text-sm text-gray-700 line-clamp-3">{job.description}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gray-100">{job.sector}</Badge>
              {job.salaryFrom && (<Badge className="bg-gray-100">{formatCHF(job.salaryFrom)}{job.salaryTo ? ` – ${formatCHF(job.salaryTo)}` : "+"}</Badge>)}
            </div>
            <time className="text-gray-500" dateTime={job.publishedAt}>Publiée le {new Date(job.publishedAt).toLocaleDateString("fr-CH")}</time>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}