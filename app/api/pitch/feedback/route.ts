// @ts-nocheck
import { db } from '@/lib/firebase'
import { ref, push } from 'firebase/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      investorId, investorName, investorPhotoUrl,
      founderId, founderName, founderPhotoUrl,
      pitchId, message
    } = body

    if (
      !investorId || !investorName || !investorPhotoUrl ||
      !founderId || !founderName || !founderPhotoUrl ||
      !pitchId || !message
    ) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-GB')
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const commonFields = {
      pitchId,
      message,
      timestamp: Date.now(),
      date: formattedDate,
      time: formattedTime
    }

    const feedbackFromData = {
      ...commonFields,
      founderId,
      founderName,
      founderPhotoUrl
    }

    const feedbackToData = {
      ...commonFields,
      investorId,
      investorName,
      investorPhotoUrl
    }

    // Store founder info in feedbackFrom
    const fromRef = ref(db, `feedbackFrom/${investorId}`)
    await push(fromRef, feedbackFromData)

    // Store investor info in feedbackTo
    const toRef = ref(db, `feedbackTo/${pitchId}`)
    await push(toRef, feedbackToData)

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error submitting feedback:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


// feedbackFrom/
//   investor_abc123/
//     -KdsfA...
//       founderId: 'founder_xyz'
//       founderName: 'John Doe'
//       founderPhotoUrl: 'url...'
//       pitchId: 'pitch123'
//       message: 'Great idea!'
//       ...

// feedbackTo/
//   pitch123/
//     -LweRt...
//           investorId: 'investor_abc123'
//           investorName: 'Jane Smith'
//           investorPhotoUrl: 'url...'
//           pitchId: 'pitch123'
//           message: 'Great idea!'
//           ...
