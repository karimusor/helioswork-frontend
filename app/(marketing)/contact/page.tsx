import SectionTitle from "@/components/site/section-title";
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <SectionTitle title="Contact" subtitle="Rue du Pont 10, 1003 Lausanne — +41 21 000 00 00" />
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-700">Email: contact@interim-lausanne.ch</p>
        <p className="text-sm text-gray-700">Horaires: Lun–Ven 08:00–18:00</p>
      </div>
    </div>
  );
}