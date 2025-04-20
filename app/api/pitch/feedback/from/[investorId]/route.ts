import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { investorId: string } }
) {
  try {
    const { investorId } = params;
    if (!investorId) {
      return NextResponse.json(
        { error: 'Investor ID is required' },
        { status: 400 }
      );
    }

    const fromRef = ref(db, `feedbackFrom/${investorId}`);
    const snapshot = await get(fromRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ feedbacks: [] }, { status: 200 });
    }

    return NextResponse.json({ feedbacks: snapshot.val() }, { status: 200 });
  } catch (err) {
    console.error('Error fetching feedback from investor:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
