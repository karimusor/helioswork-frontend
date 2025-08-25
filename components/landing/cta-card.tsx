"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  subtitle?: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
};

export default function CtaCard({ title, subtitle, href, imageUrl, imageAlt }: Props) {
  return (
    <Link href={href} aria-label={`${title} - Aller au formulaire`} className="group block focus:outline-none">
      <div className="relative overflow-hidden rounded-2xl shadow-sm">
        <div className="relative aspect-[16/9]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={false}
          />
          {/* overlay pour contraste AA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" aria-hidden="true" />
          {/* texte SUR l'image */}
          <div className="absolute inset-0 flex items-end">
            <div className="p-6">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                {title}
              </h3>
              {subtitle && (
                <p className="mt-1 text-white/90 text-sm md:text-base drop-shadow">
                  {subtitle}
                </p>
              )}
              <Button className="mt-3" aria-label={`Aller au formulaire ${title}`}>Accéder au formulaire</Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}