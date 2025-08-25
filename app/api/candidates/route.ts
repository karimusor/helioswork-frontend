import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const backend = process.env.BACKEND_BASE_URL;
  const form = await req.formData();
  const cv = form.get("cv");
  if (!(cv instanceof Blob)) return NextResponse.json({ error: "CV requis" }, { status: 400 });

  const outbound = new FormData();
  // forward du fichier
  const filename = typeof (cv as any).name === "string" ? (cv as any).name : "cv";
  outbound.append("cv", cv, filename);
  // forward des autres champs texte
  for (const [k, v] of form.entries()) {
    if (k === "cv") continue;
    if (typeof v === "string") outbound.append(k, v);
  }

  if (!backend) {
    // mode démo : renvoie OK
    return NextResponse.json({ ok: true, url: "/uploads/demo" }, { status: 200 });
  }

  try {
    const res = await fetch(`${backend}/candidates`, { method: "POST", body: outbound });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Impossible de joindre le backend" }, { status: 502 });
  }
}