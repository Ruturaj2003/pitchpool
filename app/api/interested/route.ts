// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { ref, set, runTransaction } from 'firebase/database';

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

    // Save user interest: /interests/{userId}/{pitchId} = true
    await set(ref(db, `interests/${userId}/${pitchId}`), true);

    // Increment interest count: /pitches/{pitchId}/interests
    const interestCountRef = ref(db, `pitches/${pitchId}/interests`);
    await runTransaction(interestCountRef, (current) => (current || 0) + 1);

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
