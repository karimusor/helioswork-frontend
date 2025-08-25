import { registerClient } from "@/lib/appointments-realtime";

export const runtime = "nodejs";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const client = registerClient(controller);

      // ping keep-alive
      const enc = new TextEncoder();
      const keep = setInterval(() => {
        try { controller.enqueue(enc.encode(": keep-alive\n\n")); } catch {}
      }, 15000);

      // cleanup quand la connexion ferme
      // @ts-ignore
      controller.signal?.addEventListener?.("abort", () => {
        clearInterval(keep);
        client.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}