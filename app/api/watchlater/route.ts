import { db } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { NextRequest, NextResponse } from 'next/server';

// POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { investorId, pitchId } = body;

    if (!investorId || !pitchId) {
      return NextResponse.json(
        { error: 'Missing investorId or pitchId' },
        { status: 400 }
      );
    }

    const watchLaterRef = ref(db, `watchLater/${investorId}/${pitchId}`)
    const snapshot = await get(watchLaterRef)

    // If already added, skip
    if (snapshot.exists()) {
      return NextResponse.json({ message: 'Pitch already in watch later list' }, { status: 200 })
    }

    // Otherwise, add to watch later
    await set(watchLaterRef, true)

    return NextResponse.json(
      { message: 'Pitch added to watch later' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error saving watch later:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const investorId = searchParams.get('investorId');

  if (!investorId) {
    return NextResponse.json({ error: 'Missing investorId' }, { status: 400 });
  }

  try {
    const snapshot = await get(ref(db, `watchLater/${investorId}`));

    if (!snapshot.exists()) {
      return NextResponse.json({ pitchIds: [] }, { status: 200 });
    }

    const pitchIds = Object.keys(snapshot.val());
    return NextResponse.json({ pitchIds }, { status: 200 });
  } catch (err) {
    console.error('Error fetching watch later list:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// watchLater: {
//     investorId1: {
//       pitchId1: true,
//       pitchId2: true,
//     },
//     investorId2: {
//       pitchId3: true,
//       pitchId1: true
//     }
//   }
