"use client";

/** Penangkap error terakhir jika root layout ikut gagal (wajib punya <html> & <body> sendiri). */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#fff8f4", color: "#1e1b18", display: "grid", placeItems: "center", minHeight: "100dvh", margin: 0, padding: 16 }}>
        <title>Terjadi Kesalahan • Dinoyo Craft Admin</title>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 style={{ fontSize: 24 }}>Aplikasi mengalami kendala</h1>
          <p style={{ color: "#56423d" }}>Silakan muat ulang panel pengelolaan.</p>
          <button
            type="button"
            onClick={() => retry()}
            style={{ background: "#9a4023", color: "#fff", border: 0, borderRadius: 12, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}
