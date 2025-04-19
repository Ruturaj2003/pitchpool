// @ts-nocheck

import { db } from '@/lib/firebase'
import { ref, push, update } from 'firebase/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { chatId, senderId, text } = await req.json()

    if (!chatId || !senderId || !text) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const messageRef = ref(db, `chats/${chatId}/messages`)
    const newMessageRef = push(messageRef)

    const messageData = {
      senderId,
      text,
      timestamp: Date.now()
    }

    await set(newMessageRef, messageData)

    // Update chat metadata
    await update(ref(db, `chats/${chatId}`), {
      lastMessage: text,
      lastSenderId: senderId
    })

    return NextResponse.json({ message: 'Message sent' }, { status: 200 })
  } catch (err) {
    console.error('Error sending message:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
