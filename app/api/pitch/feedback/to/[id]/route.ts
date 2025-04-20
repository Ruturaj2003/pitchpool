import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { pitchId: string } }
) {
  try {
    const { pitchId } = params;
    if (!pitchId) {
      return NextResponse.json(
        { error: 'Pitch ID is required' },
        { status: 400 }
      );
    }

    const toRef = ref(db, `feedbackTo/${pitchId}`);
    const snapshot = await get(toRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ feedbacks: [] }, { status: 200 });
    }

    return NextResponse.json({ feedbacks: snapshot.val() }, { status: 200 });
  } catch (err) {
    console.error('Error fetching feedback for pitch:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
