import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventId } = body;
    
        if (!eventId) {
          return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
        }

        const deletedEvent = await prisma.event.delete({
            where: {
                id: eventId
            }
        });
    
        return NextResponse.json(deletedEvent, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}