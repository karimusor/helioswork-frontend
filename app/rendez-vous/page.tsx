"use client";
import * as React from "react";
import Stepper from "@/components/booking/stepper";
import SlotsGrid from "@/components/booking/slots-grid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/site/section-title";
import { useToast } from "@/components/ui/use-toast";

type Kind = "candidat" | "entreprise";

export default function BookingPage() {
  const { push } = useToast();
  const [step, setStep] = React.useState<1|2|3|4>(1);
  const [kind, setKind] = React.useState<Kind>("candidat");
  const [slot, setSlot] = React.useState<Date | null>(null);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) { push({ title: "Choisissez une date/heure" }); setStep(2); return; }
    if (!fullName || !email || !phone) { push({ title: "Champs requis", description: "Nom, email, téléphone" }); setStep(3); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, datetime: slot.toISOString(), fullName, email, phone, message })
      });
      const data = await res.json().catch(()=>({}));
      if (res.ok) {
        setConfirmId(data?.id || "rdv-demo");
        setStep(4);
        push({ title: "Rendez-vous confirmé" });
      } else {
        push({ title: "Erreur", description: data?.error || "Veuillez réessayer" });
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <SectionTitle title="Prise de rendez-vous" subtitle="Sélectionnez un créneau et confirmez vos coordonnées" />
      <Stepper step={step} />

      {/* Étape 1 : Sélection */}
      {step===1 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="text-sm font-medium text-gray-700">Type de rendez-vous</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button onClick={()=>setKind("candidat")}
              className={["rounded-xl border px-4 py-3 text-left", kind==="candidat" ? "border-rose-600 ring-2 ring-rose-200" : "border-gray-300 hover:bg-gray-50"].join(" ")}>
              <div className="font-semibold">Candidat</div>
              <div className="text-sm text-gray-600">Entretien, dépôt de dossier, conseils</div>
            </button>
            <button onClick={()=>setKind("entreprise")}
              className={["rounded-xl border px-4 py-3 text-left", kind==="entreprise" ? "border-rose-600 ring-2 ring-rose-200" : "border-gray-300 hover:bg-gray-50"].join(" ")}>
              <div className="font-semibold">Entreprise</div>
              <div className="text-sm text-gray-600">Besoin en recrutement, partenariat</div>
            </button>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={()=>setStep(2)}>Continuer</Button>
          </div>
        </div>
      )}

      {/* Étape 2 : Date/Heure */}
      {step===2 && (
        <div className="space-y-4">
          <SlotsGrid value={slot} onChange={(dt)=>setSlot(dt)} />
          <div className="flex justify-between">
            <Button variant="outline" onClick={()=>setStep(1)}>Retour</Button>
            <Button onClick={()=>setStep(3)} disabled={!slot}>Continuer</Button>
          </div>
        </div>
      )}

      {/* Étape 3 : Coordonnées */}
      {step===3 && (
        <form className="space-y-4" onSubmit={submit}>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label htmlFor="fn">Nom complet</Label><Input id="fn" value={fullName} onChange={(e)=>setFullName(e.target.value)} required /></div>
              <div><Label htmlFor="em">Email</Label><Input id="em" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div>
              <div><Label htmlFor="ph">Téléphone</Label><Input id="ph" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} required /></div>
              <div className="md:col-span-2"><Label htmlFor="msg">Message (optionnel)</Label><Textarea id="msg" rows={4} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Précisez votre besoin" /></div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={()=>setStep(2)}>Retour</Button>
            <Button type="submit" disabled={loading || !slot}>{loading ? "Envoi..." : "Confirmer"}</Button>
          </div>
        </form>
      )}

      {/* Étape 4 : Confirmation */}
      {step===4 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="text-2xl font-bold">Merci !</div>
          <p className="mt-2 text-gray-700">Votre rendez-vous est confirmé.</p>
          <div className="mt-4 text-sm text-gray-700">
            <div><span className="font-semibold">Type :</span> {kind==="candidat"?"Candidat":"Entreprise"}</div>
            {slot && <div><span className="font-semibold">Quand :</span> {slot.toLocaleString("fr-CH",{weekday:"long", day:"2-digit", month:"long", hour:"2-digit", minute:"2-digit"})}</div>}
            {confirmId && <div><span className="font-semibold">Réf :</span> {confirmId}</div>}
          </div>
          <div className="mt-6"><Button onClick={()=>location.assign("/")}>Retour à l’accueil</Button></div>
        </div>
      )}
    </div>
  );
}