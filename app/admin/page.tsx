"use client";
import * as React from "react";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/csv";
type Candidate = { id: string; name: string; email: string; createdAt: string };
export default function AdminPage() {
  const [rows, setRows] = React.useState<Candidate[]>([]);
  const [q, setQ] = React.useState("");
  React.useEffect(() => { fetch("/api/admin/candidates").then((r) => r.json()).then(setRows).catch(() => setRows([])); }, []);
  const filtered = rows.filter((r) => !q || Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Candidatures</h1>
        <div className="flex gap-2">
          <input aria-label="Recherche" placeholder="Recherche" className="h-10 rounded-xl border border-gray-300 px-3 text-sm" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline" onClick={() => exportToCSV("candidatures.csv", filtered.map((r) => ({ id: r.id, name: r.name, email: r.email, createdAt: r.createdAt })))}>Exporter CSV</Button>
        </div>
      </div>
      <Table>
        <THead><tr><TH>ID</TH><TH>Nom</TH><TH>Email</TH><TH>Reçu le</TH></tr></THead>
        <TBody>{filtered.map((r) => (<TR key={r.id}><TD>{r.id}</TD><TD>{r.name}</TD><TD><a href={`mailto:${r.email}`} className="text-brand-700 underline">{r.email}</a></TD><TD><time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleString("fr-CH")}</time></TD></TR>))}</TBody>
      </Table>
    </div>
  );
}