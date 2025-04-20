// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { ref, set, runTransaction, get } from 'firebase/database'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, pitchId } = body;

    if (!userId || !pitchId) {
      return NextResponse.json(
        { error: 'Missing userId or pitchId' },
        { status: 400 }
      );
    }

    const userInterestRef = ref(db, `interests/${userId}/${pitchId}`)
    const snapshot = await get(userInterestRef)

    // If already interested, skip adding again
    if (snapshot.exists()) {
      return NextResponse.json({ message: 'Already marked as interested' }, { status: 200 })
    }

    // Save user interest
    await set(userInterestRef, true)

    // Increment interest count atomically
    const interestCountRef = ref(db, `pitches/${pitchId}/interests`)
    await runTransaction(interestCountRef, (current) => (current || 0) + 1)

    return NextResponse.json(
      { message: 'Pitch marked as interested' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error marking interest:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// interests: {
//   "user123": {
//     "pitchA": true,
//     "pitchB": true
//   },
//   "user456": {
//     "pitchC": true
//   }
// }
