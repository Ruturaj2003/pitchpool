// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { ref, set, get } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      founderName,
      founderTitle,
      founderPhotoUrl,
      thumbnailUrl,
      tagline,
      sector,
      pitchDetails,
    } = body

    if (!name || !founderName || !pitchDetails || !thumbnailUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const pitchId = uuidv4()

    const newPitch = {
      id: pitchId,
      name,
      founderName,
      founderTitle,
      founderPhotoUrl,
      thumbnailUrl,
      tagline,
      sector,
      createdAt: Date.now(),
      pitchDetails,
    }

    await set(ref(db, `pitches/${pitchId}`), newPitch)

    return NextResponse.json({ message: 'Pitch created', id: pitchId }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const snapshot = await get(ref(db, 'pitches'))
    if (!snapshot.exists()) {
      return NextResponse.json({ pitches: [] }, { status: 200 })
    }

    const data = snapshot.val()
    const pitches = Object.values(data)

    return NextResponse.json({ pitches }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch pitches' }, { status: 500 })
  }
}


// pitches
// 216c0bfc-4932-4d88-b4be-a97fb7923902
// createdAt
// :
// 1745058454447
// description
// :
// "acaca"
// founderName
// :
// "casc"
// founderPhotoUrl
// :
// "ascot"
// founderTitle
// :
// "ascasc"
// name
// :
// "Dotaizz"
// pitchDetails
// askAmount
// :
// "111111"
// businessModel
// :
// "sacsas"
// competition
// :
// "aces"
