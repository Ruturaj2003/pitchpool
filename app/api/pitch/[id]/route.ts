// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { ref, get } from 'firebase/database'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pitchRef = ref(db, `pitches/${params.id}`)
    const snapshot = await get(pitchRef)

    if (!snapshot.exists()) {
      return NextResponse.json({ error: 'Pitch not found' }, { status: 404 })
    }

    const pitch = snapshot.val()
    return NextResponse.json(pitch, { status: 200 })
  } catch (error) {
    console.error('Error fetching pitch:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
