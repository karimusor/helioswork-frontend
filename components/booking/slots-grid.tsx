"use client";
import * as React from "react";

type Day = { date: string; am: string[]; pm: string[] };
type ApiAvail = { days: Day[] };

function startOfWeek(d: Date) {
  const x = new Date(d);
  const dow = x.getDay();
  const diff = (dow + 6) % 7;
  x.setDate(x.getDate() - diff);
  x.setHours(0,0,0,0);
  return x;
}
function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate()+n); return x; }
function inSameWeek(d: Date, weekStart: Date) {
  const a = startOfWeek(d).getTime();
  return a === startOfWeek(weekStart).getTime();
}

export default function SlotsGrid({ value, onChange }: { value: Date|null; onChange: (dt: Date)=>void }) {
  const [offsetWeeks, setOffsetWeeks] = React.useState(0);
  const base = startOfWeek(new Date());
  const monday = addDays(base, offsetWeeks*7);
  const [days, setDays] = React.useState<Day[]>([]);

  async function load() {
    const weekStart = monday.toISOString().slice(0,10);
    const res = await fetch(`/api/appointments/availability?weekStart=${weekStart}`, { cache: "no-store" });
    const json: ApiAvail = await res.json();
    setDays(json.days);
  }

  React.useEffect(()=>{ load(); /* eslint-disable-next-line*/ }, [offsetWeeks]);

  React.useEffect(() => {
    const es = new EventSource("/api/appointments/events");
    function onBooked(e: MessageEvent) {
      const data = JSON.parse(e.data) as { iso: string };
      const iso = data.iso;
      const dt = new Date(iso);
      // si l'événement concerne la semaine affichée, on retire le slot
      if (!inSameWeek(dt, monday)) return;
      setDays(prev => prev.map(d => {
        if (iso.startsWith(d.date)) {
          return {
            ...d,
            am: d.am.filter(s => s !== iso),
            pm: d.pm.filter(s => s !== iso),
          };
        }
        return d;
      }));
    }
    es.addEventListener("slotBooked", onBooked);
    return () => { es.close(); };
  }, [monday]);

  const fr = (iso: string) => {
    const d = new Date(iso);
    const h = d.getHours().toString().padStart(2,"0");
    const m = d.getMinutes().toString().padStart(2,"0");
    return `${h}h${m}`;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      {/* barre semaine + flèches */}
      <div className="flex items-center justify-center gap-2 border-b bg-gray-50 px-3 py-2">
        <button onClick={()=>setOffsetWeeks(o=>o-1)} className="h-8 w-8 rounded-lg border bg-white text-gray-700 hover:bg-gray-100" aria-label="Semaine précédente">‹</button>
        <div className="rounded-lg border bg-white px-3 py-1 text-sm font-medium">
          {addDays(monday,0).toLocaleDateString("fr-CH",{day:"2-digit",month:"long"})}
          {" — "}
          {addDays(monday,4).toLocaleDateString("fr-CH",{day:"2-digit",month:"long"})}
        </div>
        <button onClick={()=>setOffsetWeeks(o=>o+1)} className="h-8 w-8 rounded-lg border bg-white text-gray-700 hover:bg-gray-100" aria-label="Semaine suivante">›</button>
      </div>

      <div className="grid grid-cols-5 gap-x-4 px-4 py-4">
        {days.map((d) => {
          const dateObj = new Date(d.date+"T00:00:00");
          const dayLabel = dateObj.toLocaleDateString("fr-CH",{weekday:"long"});
          const dateLabel = dateObj.toLocaleDateString("fr-CH",{day:"2-digit", month:"long"});
          const amEmpty = d.am.length===0;
          const pmEmpty = d.pm.length===0;

          return (
            <div key={d.date} className="min-h-[420px]">
              <div className="text-center font-semibold capitalize">
                {dayLabel}<div className="text-sm text-gray-600">{dateLabel}</div>
              </div>

              {/* Matin */}
              <div className="mt-3 rounded bg-gray-100 px-2 py-1 text-center text-sm font-medium">Matin</div>
              {amEmpty ? (
                <div className="py-6 text-center text-sm text-gray-500">Aucune disponibilité</div>
              ) : (
                <div className="mt-2 flex flex-col items-center gap-3">
                  {d.am.map(iso => {
                    const selected = value && new Date(iso).getTime()===(value as Date).getTime();
                    return (
                      <button key={iso} onClick={()=>onChange(new Date(iso))}
                        className={["rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2",
                          selected ? "bg-brand-700 text-white" : "bg-brand-600 text-white hover:bg-brand-700"].join(" ")}
                        aria-pressed={selected}>{fr(iso)}</button>
                    );
                  })}
                </div>
              )}

              {/* Après-midi */}
              <div className="mt-4 rounded bg-gray-100 px-2 py-1 text-center text-sm font-medium">Après-midi</div>
              {pmEmpty ? (
                <div className="py-6 text-center text-sm text-gray-500">Aucune disponibilité</div>
              ) : (
                <div className="mt-2 flex flex-col items-center gap-3">
                  {d.pm.map(iso => {
                    const selected = value && new Date(iso).getTime()===(value as Date).getTime();
                    return (
                      <button key={iso} onClick={()=>onChange(new Date(iso))}
                        className={["rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2",
                          selected ? "bg-brand-700 text-white" : "bg-brand-600 text-white hover:bg-brand-700"].join(" ")}
                        aria-pressed={selected}>{fr(iso)}</button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}