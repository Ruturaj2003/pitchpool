import { db } from '@/lib/firebase'
import { ref, set, get } from 'firebase/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { investorId, founderId } = await req.json()

    if (!investorId || !founderId) {
      return NextResponse.json({ error: 'Missing investorId or founderId' }, { status: 400 })
    }

    const chatId = `${investorId}_${founderId}`
    const chatRef = ref(db, `chats/${chatId}`)

    const snapshot = await get(chatRef)

    if (!snapshot.exists()) {
      await set(chatRef, {
        participants: {
          [investorId]: true,
          [founderId]: true
        },
        startedAt: Date.now(),
        messages: {}
      })
    }

    return NextResponse.json({ chatId }, { status: 200 })
  } catch (err) {
    console.error('Error creating chat:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


// chats: {
//     "investorId_founderId": {
//       participants: {
//         investorId: true,
//         founderId: true
//       },
//       messages: {
//         messageId1: {
//           senderId: "founderId",
//           text: "Hello!",
//           timestamp: 1745058454451
//         },
//         messageId2: {
//           senderId: "investorId",
//           text: "Hi there!",
//           timestamp: 1745058454457
//         }
//       },
//       startedAt: 1745058454447,
//       lastMessage: "Hi there!",
//       lastSenderId: "investorId"
//     }
//   }
  