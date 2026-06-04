import { NextRequest, NextResponse } from 'next/server'

// Catatan: Untuk produksi, ganti dengan database (Supabase/PlanetScale/Prisma)
// Saat ini menggunakan in-memory storage sebagai placeholder

const rsvpData: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, attendance, guests, message } = body

    if (!name) {
      return NextResponse.json({ error: 'Nama diperlukan' }, { status: 400 })
    }

    const entry = {
      id: Date.now().toString(),
      name,
      attendance,
      guests: parseInt(guests) || 1,
      message: message || '',
      createdAt: new Date().toISOString(),
    }

    rsvpData.push(entry)
    console.log('[RSVP] New entry:', entry)

    return NextResponse.json({ success: true, data: entry }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ data: rsvpData, total: rsvpData.length })
}
