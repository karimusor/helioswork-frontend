import { NextRequest, NextResponse } from "next/server";

// Stub de login: si BACKEND_BASE_URL est défini et /auth/login existe côté backend,
// on le contacte. Sinon, on renvoie un succès de démo.
export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });

  const backend = process.env.BACKEND_BASE_URL;
  if (backend) {
    try {
      const res = await fetch(`${backend}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json().catch(() => ({}));
      return NextResponse.json(data, { status: res.status });
    } catch {
      // fallback démo si backend injoignable
    }
  }
  // Démo: toujours OK
  return NextResponse.json({ token: "demo-token", user: { email } }, { status: 200 });
}