import { db } from '@/lib/firebase'
import { ref, remove } from 'firebase/database'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { investorId, pitchId } = body

    if (!investorId || !pitchId) {
      return NextResponse.json({ error: 'Missing investorId or pitchId' }, { status: 400 })
    }

    const watchLaterRef = ref(db, `watchLater/${investorId}/${pitchId}`)
    await remove(watchLaterRef)

    return NextResponse.json({ message: 'Pitch removed from watch later' }, { status: 200 })
  } catch (err) {
    console.error('Error removing from watch later:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// need invester id and pitch id