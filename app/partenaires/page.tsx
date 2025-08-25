"use client";
import * as React from "react";
import SectionTitle from "@/components/site/section-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function PartnersPage() {
  const { push } = useToast();
  const [company, setCompany] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!company || !contact || !email) { push({ title: "Champs requis", description: "Société, contact, email" }); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, contact, email, phone, message })
      });
      const data = await res.json().catch(()=>({}));
      if (res.ok) {
        push({ title: "Demande envoyée", description: "Merci, nous revenons vers vous." });
        setCompany(""); setContact(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        push({ title: "Erreur", description: data?.error || "Veuillez réessayer" });
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <SectionTitle title="Devenir Partenaire" subtitle="Confiez-nous vos recrutements à Lausanne" />
      <form className="mt-8 space-y-4" onSubmit={submit}>
        <div>
          <Label htmlFor="pc-company">Société</Label>
          <Input id="pc-company" value={company} onChange={(e)=>setCompany(e.target.value)} required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="pc-contact">Contact</Label>
            <Input id="pc-contact" value={contact} onChange={(e)=>setContact(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="pc-email">Email</Label>
            <Input id="pc-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
        </div>
        <div>
          <Label htmlFor="pc-phone">Téléphone</Label>
          <Input id="pc-phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="pc-msg">Message</Label>
          <Textarea id="pc-msg" rows={4} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Décrivez vos besoins" />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Envoi..." : "Envoyer ma demande"}</Button>
      </form>
    </div>
  );
}