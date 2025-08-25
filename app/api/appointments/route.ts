import { NextRequest, NextResponse } from "next/server";
import { addBooking, broadcast, rememberReminder } from "@/lib/appointments-realtime";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function transporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass },
  });
}

async function sendMail(to: string, subject: string, html: string) {
  const from = process.env.SMTP_FROM || "no-reply@helios-work.local";
  const t = transporter();
  if (!t) return; // pas configuré => on ignore
  await t.sendMail({ from, to, subject, html });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>null);
  if (!body?.datetime || !body?.fullName || !body?.email || !body?.phone) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const iso: string = body.datetime;

  // Si un backend existe, on le contacte d'abord
  const backend = process.env.BACKEND_BASE_URL;
  if (backend) {
    try {
      const res = await fetch(`${backend}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) return NextResponse.json(data, { status: res.status });
    } catch (e) {
      // on continue en local si backend down
    }
  }

  // Marque comme réservé (local) + broadcast
  addBooking(iso);
  broadcast("slotBooked", { iso });

  // Emails
  const when = new Date(iso);
  const whenStr = when.toLocaleString("fr-CH", { weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });

  await sendMail(
    body.email,
    "Confirmation de rendez-vous — Helios Work",
    `<p>Bonjour ${body.fullName},</p><p>Votre rendez-vous est confirmé le <b>${whenStr}</b>.</p><p>— Helios Work</p>`
  );

  // Rappels 24h et 1h avant (si l'heure est dans le futur)
  const timers: NodeJS.Timeout[] = [];
  const now = Date.now();
  const oneDay = when.getTime() - 24*60*60*1000 - now;
  const oneHour = when.getTime() - 60*60*1000 - now;

  if (oneDay > 0) {
    timers.push(setTimeout(() => {
      sendMail(body.email, "Rappel — Rendez-vous dans 24h", `<p>Rappel: rendez-vous le <b>${whenStr}</b>.</p>`);
    }, oneDay));
  }
  if (oneHour > 0) {
    timers.push(setTimeout(() => {
      sendMail(body.email, "Rappel — Rendez-vous dans 1 heure", `<p>Rappel: rendez-vous à <b>${whenStr}</b> (dans 1h).</p>`);
    }, oneHour));
  }
  rememberReminder(`rdv-${iso}`, timers);

  return NextResponse.json({ ok: true, id: `rdv-${Date.now()}` }, { status: 200 });
}