"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AllowedMime, MaxFileSize } from "@/lib/validation";

export default function QuickApplyCard() {
  const { push } = useToast();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const onDrop = React.useCallback((accepted: File[]) => {
    const f = accepted[0]; if (!f) return;
    if (!AllowedMime.includes(f.type)) { push({ title: "Fichier invalide", description: "PDF, DOC, DOCX uniquement" }); return; }
    if (f.size > MaxFileSize) { push({ title: "Fichier trop volumineux", description: "5MB maximum" }); return; }
    setFile(f);
  }, [push]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
    }
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email || !phone) { push({ title: "Champs requis", description: "Nom, email et téléphone" }); return; }
    if (!file) { push({ title: "CV requis", description: "Ajoutez votre fichier" }); return; }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("fullName", fullName);
      form.append("email", email);
      form.append("phone", phone);
      if (message) form.append("message", message);
      form.append("cv", file, file.name);
      form.append("source", "quick-apply");
      const res = await fetch("/api/candidates", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        push({ title: "Candidature envoyée", description: "Merci, nous vous recontactons vite." });
        setFullName(""); setEmail(""); setPhone(""); setMessage(""); setFile(null);
      } else {
        push({ title: "Erreur", description: data?.error || "Veuillez réessayer" });
      }
    } finally { setUploading(false); }
  }

  return (
    <Card className="h-full">
      <CardContent>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Postulez Maintenant</h3>
          <p className="mt-1 text-sm text-gray-600">Déposez votre CV et vos infos en 1 minute.</p>
        </div>
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <Label htmlFor="qa-name">Nom complet</Label>
            <Input id="qa-name" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="qa-email">Email</Label>
              <Input id="qa-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="qa-phone">Téléphone</Label>
              <Input id="qa-phone" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
            </div>
          </div>
          <div>
            <Label htmlFor="qa-msg">Message (optionnel)</Label>
            <Textarea id="qa-msg" rows={3} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Quelques mots sur votre profil" />
          </div>
          <div
            {...getRootProps({ className: "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-center transition hover:bg-gray-100 focus:outline-none" })}
            aria-label="Zone de dépôt du CV" role="group" tabIndex={0}
          >
            <input {...getInputProps()} aria-label="Sélectionner un fichier" />
            <p className="text-sm text-gray-700">
              {isDragActive ? "Déposez le fichier ici…" : (file ? `Sélectionné: ${file.name}` : "Déposez votre CV (PDF, DOC, DOCX — 5MB max)")}
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={uploading}>{uploading ? "Envoi..." : "Envoyer ma candidature"}</Button>
          <p className="text-xs text-gray-500">Formats acceptés: PDF, DOC, DOCX — 5MB max.</p>
        </form>
      </CardContent>
    </Card>
  );
}