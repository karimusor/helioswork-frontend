"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{padding:"32px",fontFamily:"system-ui"}}>
        <h2>Erreur globale</h2>
        <pre style={{whiteSpace:"pre-wrap"}}>{error.message}</pre>
        <button onClick={() => reset()} style={{marginTop:12,padding:"8px 12px",border:"1px solid #ddd",borderRadius:8}}>
          Réessayer
        </button>
      </body>
    </html>
  );
}
