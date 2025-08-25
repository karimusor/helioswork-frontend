import { NextResponse } from "next/server";
import { isBooked } from "@/lib/appointments-realtime";

export const runtime = "nodejs";

// Petit helper: crée ISO local pour un jour + (h,m)
function isoForLocal(d: Date, h: number, m: number) {
  const x = new Date(d);
  x.setHours(h, m, 0, 0);
  return x.toISOString();
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  const dow = x.getDay(); // 0=dim
  const diff = (dow + 6) % 7; // lun=0
  x.setDate(x.getDate() - diff);
  x.setHours(0,0,0,0);
  return x;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const weekStartStr = url.searchParams.get("weekStart"); // "YYYY-MM-DD"
  const base = weekStartStr ? new Date(weekStartStr+"T00:00:00") : startOfWeek(new Date());

  // Modèle (comme ta capture) : Jeu PM 14:30→16:00, Ven AM 9:00→11:30, Ven PM 13:15→13:45, autres jours vides
  const days: { date: string; am: string[]; pm: string[] }[] = [];
  for (let i=0;i<5;i++) {
    const d = new Date(base); d.setDate(base.getDate()+i);
    const isoDate = d.toISOString().slice(0,10);

    const am: string[] = [];
    const pm: string[] = [];
    const dow = d.getDay(); // 1..5 = lun..ven

    if (dow === 4) { // jeudi => PM only
      const slots = [[14,30],[14,45],[15,0],[15,15],[15,30],[15,45],[16,0]];
      for (const [h,m] of slots) pm.push(isoForLocal(d,h,m));
    }
    if (dow === 5) { // vendredi
      // matin 9:00..11:30
      for (let h=9; h<=11; h++) for (let m=0;m<60;m+=15) {
        if (h===11 && m>30) break;
        am.push(isoForLocal(d,h,m));
      }
      // aprem
      for (const [h,m] of [[13,15],[13,30],[13,45]]) pm.push(isoForLocal(d,h,m));
    }

    // filtre les slots déjà bookés
    const amFree = am.filter(s => !isBooked(s));
    const pmFree = pm.filter(s => !isBooked(s));

    days.push({ date: isoDate, am: amFree, pm: pmFree });
  }

  return NextResponse.json({ days });
}