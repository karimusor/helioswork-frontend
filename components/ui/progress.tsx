export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-2 rounded-full bg-brand-600" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}