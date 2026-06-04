# 💍 Wedding Invitation — Dones & Wanda

Website undangan pernikahan digital yang elegan dan modern untuk **Dones Deska Purwanto** & **Wanda Putri Cantika, S.Pd**.

> 📅 3 — 4 Juli 2026 · Desa Gandung Baru

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🎬 **Cover Interaktif** | Landing screen dengan nama tamu via query param (`?to=NamaTamu`) |
| 🦸 **Hero Section** | Full-screen hero dengan nama mempelai, tanggal, & kutipan Quran |
| ⏳ **Countdown Timer** | Hitung mundur real-time menuju hari pernikahan |
| 👫 **Profil Mempelai** | Informasi mempelai pria & wanita beserta orang tua |
| 📋 **Detail Acara** | 3 rangkaian acara: Akad Nikah, Jamuan Kutai, Resepsi |
| 🖼️ **Galeri Foto** | Grid masonry dengan lightbox (Unsplash placeholders) |
| 📝 **RSVP Form** | Konfirmasi kehadiran dengan API endpoint |
| 🎁 **Gift Registry** | Kartu ATM interaktif (BCA & BRI) dengan copy-to-clipboard |
| 🎵 **Audio Player** | Floating music player (A Thousand Years — Christina Perri) |
| 📍 **Google Maps** | Link navigasi ke lokasi acara |

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Next.js** | 16.2.6 | App Router, SSR, API Routes |
| **React** | 19.2.4 | UI Framework |
| **TypeScript** | ^5 | Type Safety |
| **Tailwind CSS** | v4 | Styling (CSS-first `@theme` config) |
| **Framer Motion** | ^12.40.0 | Animasi & transisi |
| **Lucide React** | ^1.17.0 | Ikon |
| **Radix UI** | ^1.1.15 | Dialog primitif |
| **date-fns** | ^4.4.0 | Format tanggal |
| **react-intersection-observer** | ^10.0.3 | Scroll-triggered animations |
| **react-hot-toast** | ^2.6.0 | Notifikasi |

---

## 📁 Struktur Proyek

```
wedding-invitation/
├── app/
│   ├── layout.tsx              # Root layout + Google Fonts
│   ├── page.tsx                # Halaman utama (cover + content)
│   ├── globals.css             # Tailwind v4 @theme, keyframes, utilities
│   ├── favicon.ico
│   └── api/
│       └── rsvp/
│           └── route.ts        # API RSVP (POST & GET, in-memory)
├── components/
│   ├── Hero.tsx                # Hero section full-screen
│   ├── Countdown.tsx           # Countdown timer real-time
│   ├── CoupleStory.tsx         # Profil mempelai (pria & wanita)
│   ├── EventDetails.tsx        # Detail 3 acara + link Maps
│   ├── Gallery.tsx             # Galeri foto masonry + lightbox
│   ├── RSVPForm.tsx            # Form konfirmasi kehadiran
│   ├── GiftRegistry.tsx        # Kartu ATM bank + alamat kirim
│   ├── Footer.tsx              # Footer dengan hashtag
│   └── ui/
│       └── AudioPlayer.tsx     # Floating music player
├── lib/
│   └── config.ts               # Konfigurasi data pernikahan
├── public/
│   ├── images/
│   │   ├── gallery/            # (kosong — gunakan foto sendiri)
│   │   └── placeholder/        # (kosong)
│   └── music/                  # (tambahkan wedding-song.mp3)
├── next.config.ts              # Image remote patterns
├── vercel.json                 # Konfigurasi deployment Vercel
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

---

## 🎨 Design System

### Palet Warna

| Token | Hex | Kegunaan |
|-------|-----|----------|
| `cream` | `#FAF5EF` | Background utama |
| `blush` | `#E8C4B0` | Aksen dekoratif |
| `sage` | `#A8B5A0` | Subtitle, label |
| `champagne` | `#C9A96E` | Heading, CTA, aksen emas |
| `charcoal` | `#2C2C2C` | Teks utama, section gelap |
| `ivory` | `#FFFFF0` | Aksen terang |

### Tipografi

| Token | Font | Penggunaan |
|-------|------|------------|
| `font-display` | Cormorant Garamond | Heading formal |
| `font-body` | Jost | Body text, label |
| `font-script` | Great Vibes | Nama mempelai, judul dekoratif |

### Animasi

- `fadeUp` — Elemen muncul dari bawah
- `fadeIn` — Fade opacity
- `float` — Efek melayang
- `petalFall` — Animasi kelopak bunga jatuh

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repository
git clone <repo-url>
cd wedding-invitation

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Dengan nama tamu

```
http://localhost:3000?to=Budi%20Santoso
```

---

## ⚙️ Kustomisasi

### Data Pernikahan

Edit `lib/config.ts` untuk mengubah:

- **Nama mempelai** — `groom` & `bride`
- **Acara** — `events[]` (tanggal, waktu, lokasi, Maps URL)
- **Galeri** — `gallery[]` (path foto)
- **Gift** — `gifts.bankAccounts[]` (bank, nomor rekening)
- **Musik** — `music.src` (path file MP3)
- **Hashtag** — `hashtag`

### Foto

1. Tambahkan foto prewedding ke `public/images/gallery/`
2. Update array `placeholderImages` di `components/Gallery.tsx`
3. Tambahkan foto mempelai ke `public/images/` (groom.jpg, bride.jpg)

### Musik

Tambahkan file MP3 ke `public/music/wedding-song.mp3`

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Atau hubungkan repository ke [Vercel Dashboard](https://vercel.com) untuk auto-deploy.

Konfigurasi sudah tersedia di `vercel.json`.

### Build Produksi

```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### POST `/api/rsvp`

Kirim konfirmasi kehadiran.

```json
{
  "name": "Budi Santoso",
  "attendance": "hadir",
  "guests": "2",
  "message": "Selamat menempuh hidup baru!"
}
```

**Response** `201`:
```json
{
  "success": true,
  "data": {
    "id": "1719993600000",
    "name": "Budi Santoso",
    "attendance": "hadir",
    "guests": 2,
    "message": "Selamat menempuh hidup baru!",
    "createdAt": "2026-07-03T00:00:00.000Z"
  }
}
```

### GET `/api/rsvp`

Ambil semua data RSVP.

> ⚠️ **Catatan**: Saat ini menggunakan in-memory storage. Untuk produksi, integrasikan dengan database (Supabase, PlanetScale, Prisma, dll).

---

## 📝 Catatan Pengembangan


- **Gallery** menggunakan Unsplash placeholder — ganti dengan foto asli
- **Musik** — folder `public/music/` kosong, perlu ditambahkan file MP3
- **RSVP** — in-memory storage, data hilang saat server restart
- **Love Story** — section dihapus dari `CoupleStory.tsx` (hanya profil mempelai)

---

## 📄 Lisensi

Private project — Undangan pernikahan Dones & Wanda.

---

<p align="center">
  Made with ❤️ using Next.js · <strong>#DonesWanda2026</strong>
</p>
