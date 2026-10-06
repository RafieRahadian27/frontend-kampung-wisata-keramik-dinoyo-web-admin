# Frontend — Dinoyo Craft Admin (Next.js 16)

Antarmuka panel admin Kampung Wisata Keramik Dinoyo. Dokumentasi lengkap (cara menjalankan, struktur, library, screenshot) ada di
[README utama](../README.md).

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000/api
npm run dev                  # http://localhost:3000
npm run lint                 # ESLint
npm run build                # build produksi
```

Pastikan backend Express di folder [`../backend`](../backend) sudah berjalan, karena semua halaman admin mengambil data dari API tersebut.
