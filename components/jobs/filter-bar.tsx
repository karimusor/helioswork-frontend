"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export type Filters = { q: string; sector: string; contract: string };
export function FilterBar({ onChange, initial }: { onChange: (f: Filters) => void; initial?: Partial<Filters> }) {
  const [filters, setFilters] = React.useState<Filters>({ q: initial?.q || "", sector: initial?.sector || "", contract: initial?.contract || "" });
  function apply() { onChange(filters); }
  function reset() { const f = { q: "", sector: "", contract: "" } as Filters; setFilters(f); onChange(f); }
  return (
    <form className="grid gap-3 md:grid-cols-4" onSubmit={(e) => { e.preventDefault(); apply(); }}>
      <div className="md:col-span-2">
        <label htmlFor="q" className="sr-only">Recherche</label>
        <Input id="q" placeholder="Mot-clé (ex: développeur, logistique)" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
      </div>
      <Select value={filters.sector} onValueChange={(v) => setFilters({ ...filters, sector: v })}>
        <SelectTrigger aria-label="Secteur"><SelectValue placeholder="Secteur" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tous</SelectItem>
          <SelectItem value="Administration">Administration</SelectItem>
          <SelectItem value="Logistique">Logistique</SelectItem>
          <SelectItem value="Industrie">Industrie</SelectItem>
          <SelectItem value="IT">IT</SelectItem>
        </SelectContent>
      </Select>
      <Select value={filters.contract} onValueChange={(v) => setFilters({ ...filters, contract: v })}>
        <SelectTrigger aria-label="Contrat"><SelectValue placeholder="Type de contrat" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tous</SelectItem>
          <SelectItem value="Temporaire">Temporaire</SelectItem>
          <SelectItem value="Fixe">Fixe</SelectItem>
          <SelectItem value="Mission">Mission</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 md:col-span-4">
        <Button type="submit">Appliquer</Button>
        <Button type="button" variant="outline" onClick={reset}>Réinitialiser</Button>
      </div>
    </form>
  );
}