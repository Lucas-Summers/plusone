import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) { // You need the current User ID, the Event ID, and the Recipient ID in order to make an application
    try {
        const body = await request.json();
        const { userId, eventId, recId, status } = body;
    
        if (!userId || !eventId) {
          return NextResponse.json({ error: "User ID and Event ID are required" }, { status: 400 });
        }


        const newApplication = await prisma.application.create({
            data: {
                sender: {
                  connect: { id: userId }
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
    
        return NextResponse.json(newApplication, { status: 201 });
    } catch (error) {
        console.error("Error creating application:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}