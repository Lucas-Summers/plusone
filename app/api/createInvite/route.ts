import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { senderId, recId, eventId, status} = body;
    
        if (!senderId || !recId || !eventId) {
          return NextResponse.json({ error: "Sender ID, Recipient ID, and Event ID are required" }, { status: 400 });
        }

        const newInvite = await prisma.invite.create({
          data: {
            sender: {
              connect: { id: senderId }
            },
            recipient: {
              connect: { id: recId }
            },
            event: {
              connect: { id: eventId }
            },
            status: status
          },
          include: {
            event: true,
            recipient: true,
            sender: true
          }
        });
    
        return NextResponse.json(newInvite, { status: 201 });
    } catch (error) {
        console.error("Error creating invite:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}