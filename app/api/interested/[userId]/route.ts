// @ts-nocheck

import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const interestRef = ref(db, `interests/${params.userId}`);
    const interestSnap = await get(interestRef);

    if (!interestSnap.exists()) {
      return NextResponse.json([], { status: 200 }); // No interests yet
    }

    const pitchIds = Object.keys(interestSnap.val());
    const pitchPromises = pitchIds.map(async (pitchId) => {
      const pitchRef = ref(db, `pitches/${pitchId}`);
      const pitchSnap = await get(pitchRef);
      return pitchSnap.exists() ? { id: pitchId, ...pitchSnap.val() } : null;
    });

    const pitches = (await Promise.all(pitchPromises)).filter(Boolean);

    return NextResponse.json(pitches, { status: 200 });
  } catch (error) {
    console.error("Error fetching interested pitches:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
