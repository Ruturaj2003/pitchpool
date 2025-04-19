// @ts-nocheck

import { db } from "@/lib/firebase";
import { ref, runTransaction } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pitchId } = body;

    if (!pitchId) {
      return NextResponse.json({ error: "Missing pitchId" }, { status: 400 });
    }

    const pitchViewsRef = ref(db, `pitches/${pitchId}/views`);

    await runTransaction(pitchViewsRef, (currentViews) => {
      return (currentViews || 0) + 1;
    });

    return NextResponse.json(
      { message: "View count incremented" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error incrementing views:", err);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}
