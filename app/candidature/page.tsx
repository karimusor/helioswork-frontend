"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateSchema } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormStep from "@/components/forms/form-step";
import FileUploader from "@/components/forms/file-uploader";
import SectionTitle from "@/components/site/section-title";
import { useToast } from "@/components/ui/use-toast";
export default function CandidaturePage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(CandidateSchema) });
  const [step, setStep] = React.useState(1);
  const { push } = useToast();
  function onSubmit(values: any) { push({ title: "Candidature envoyée", description: "Nous vous contacterons rapidement." }); reset(); setStep(1); }
  return (
    <div className="mx-auto max-w-3xl">
      <SectionTitle title="Déposer ma candidature" subtitle="2 étapes simples: informations + CV" />
      {step === 1 && (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} aria-label="Formulaire de candidature">
          <FormStep title="Informations personnelles">
            <div><Label htmlFor="firstName">Prénom</Label><Input id="firstName" {...register("firstName")} aria-invalid={!!errors.firstName} />{errors.firstName && <p className="mt-1 text-sm text-red-600">{String(errors.firstName.message)}</p>}</div>
            <div><Label htmlFor="lastName">Nom</Label><Input id="lastName" {...register("lastName")} aria-invalid={!!errors.lastName} />{errors.lastName && <p className="mt-1 text-sm text-red-600">{String(errors.lastName.message)}</p>}</div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />{errors.email && <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>}</div>
            <div><Label htmlFor="phone">Téléphone</Label><Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />{errors.phone && <p className="mt-1 text-sm text-red-600">{String(errors.phone.message)}</p>}</div>
            <div className="md:col-span-2"><Label htmlFor="message">Message (optionnel)</Label><Textarea id="message" rows={4} placeholder="Quelques mots sur votre profil" {...register("message")} /></div>
          </FormStep>
          <div className="flex justify-between"><Button type="button" variant="outline" onClick={() => history.back()}>Retour</Button><Button type="button" onClick={() => setStep(2)}>Étape suivante</Button></div>
        </form>
      )}
      {step === 2 && (
        <div className="mt-8 space-y-6">
          <FormStep title="Votre CV">
            <div className="md:col-span-2"><FileUploader onUploaded={(res) => { if (res.ok) { setStep(1); } }} /></div>
          </FormStep>
          <div className="flex justify-between"><Button type="button" variant="outline" onClick={() => setStep(1)}>Précédent</Button><Button type="button" onClick={() => { setStep(1); }}>Terminer</Button></div>
        </div>
      )}
    </div>
  );
}