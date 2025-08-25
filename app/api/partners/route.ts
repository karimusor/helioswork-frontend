import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>null);
  if (!body?.company || !body?.contact || !body?.email) {
    return NextResponse.json({ error: "Champs requis: company, contact, email" }, { status: 400 });
  }
  const backend = process.env.BACKEND_BASE_URL;
  if (backend) {
    try {
      const res = await fetch(`${backend}/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(()=>({}));
      return NextResponse.json(data, { status: res.status });
    } catch {
      // fallback démo
    }
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}