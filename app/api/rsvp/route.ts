import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, attendance, guests, message } = body

    if (!name) {
      return NextResponse.json({ error: 'Nama diperlukan' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        name,
        attendance,
        guests: parseInt(guests) || 1,
        message: message || '',
      })
      .select()
      .single()

    if (error) {
      console.error('[RSVP] Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error, count } = await supabase
    .from('rsvps')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, total: count })
}
