"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link href={href} className={cn("rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100", pathname === href && "bg-gray-100 text-gray-900")}>
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Accueil Helios Work">
          <Image src="/logo.svg" alt="Helios Work" width={160} height={44} priority />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {link("/offres", "Offres")}
          {link("/candidature", "Candidature")}
          {link("/rendez-vous", "Prise de rendez-vous")}
          {link("/a-propos", "À propos")}
          {link("/contact", "Contact")}
          {link("/admin", "Admin")}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline"><Link href="/login">Se connecter</Link></Button>
          <Button asChild className="hidden md:inline-flex"><Link href="/candidature">Déposer mon CV</Link></Button>
        </div>
      </div>
    </header>
  );
}