"use client";
import * as React from "react";
type Toast = { id: number; title?: string; description?: string };
const ToastContext = React.createContext<{ toasts: Toast[]; push: (t: Omit<Toast,"id">) => void; remove: (id: number) => void } | null>(null);
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const push = (t: Omit<Toast,"id">) => setToasts((s) => [...s, { ...t, id: Date.now() }]);
  const remove = (id: number) => setToasts((s) => s.filter((x) => x.id !== id));
  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <div aria-live="polite" aria-atomic className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow" role="status">
            <div className="font-medium">{t.title}</div>
            {t.description && <p className="text-sm text-gray-700">{t.description}</p>}
            <button onClick={() => remove(t.id)} className="mt-2 text-sm text-brand-700 underline">Fermer</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export function useToast(){ const ctx = React.useContext(ToastContext); if(!ctx) throw new Error("useToast must be used within ToastProvider"); return ctx; }