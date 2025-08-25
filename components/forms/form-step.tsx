export default function FormStep({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-gray-200 p-6">
      <legend className="px-2 text-sm font-medium text-gray-700">{title}</legend>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}