import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 grid gap-6 py-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">Helios Work</div>
          <p className="mt-2 text-sm text-gray-600">Rue du Pont 10, 1003 Lausanne — +41 21 000 00 00</p>
        </div>
        <div>
          <div className="font-semibold">Liens</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/offres">Offres</Link></li>
            <li><Link href="/candidature">Candidature</Link></li>
            <li><Link href="/a-propos">À propos</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Légal</div>
          <p className="mt-2 text-sm text-gray-600">© {new Date().getFullYear()} Helios Work. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}