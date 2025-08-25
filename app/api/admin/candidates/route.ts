import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "c1", name: "Marie Durant", email: "marie@example.com", createdAt: new Date(Date.now()-3600_000).toISOString() },
    { id: "c2", name: "Luca Rossi", email: "luca@example.com", createdAt: new Date(Date.now()-7200_000).toISOString() }
  ]);
}