"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/site/section-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { push } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { push({ title: "Champs requis", description: "Email et mot de passe" }); return; }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        push({ title: "Connexion réussie" });
        router.push("/admin");
      } else {
        const data = await res.json().catch(() => ({}));
        push({ title: "Échec de connexion", description: data?.error || "Identifiants invalides" });
      }
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-md">
      <SectionTitle title="Se connecter" subtitle="Accès réservé à l''équipe Helios Work" />
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</Button>
      </form>
      <p className="mt-3 text-xs text-gray-600">Démo: cette page utilise une route API stub côté Next.</p>
    </div>
  );
}