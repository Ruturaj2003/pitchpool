// @ts-nocheck
import { db } from '@/lib/firebase'
import { ref, push, get } from 'firebase/database'
import { NextRequest, NextResponse } from 'next/server'

// POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { investorId, investorName, investorPhotoUrl, pitchId, message } = body

    if (!investorId || !investorName || !investorPhotoUrl || !pitchId || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-GB')
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const feedbackData = {
      investorId,
      investorName,
      investorPhotoUrl,
      pitchId,
      message,
      timestamp: Date.now(),
      date: formattedDate,
      time: formattedTime
    }

    // Push to feedbackFrom (based on investorId)
    const fromRef = ref(db, `feedbackFrom/${investorId}`)
    const fromPushRef = await push(fromRef, feedbackData)

    // Push to feedbackTo (based on pitchId)
    const toRef = ref(db, `feedbackTo/${pitchId}`)
    await push(toRef, feedbackData)

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error submitting feedback:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


// feedbackFrom/
//   {investorId}/
//     {feedbackId}/
//       pitchId
//       message
//       timestamp
//       date
//       time
//       investorName
//       investorPhotoUrl

// feedbackTo/
//   {pitchId}/
//     {feedbackId}/
//       investorId
//       message
//       timestamp
//       date
//       time
//       investorName
//       investorPhotoUrl
