import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) { 
    try {
        const body = await request.json();
        const { 
            hostId, 
            title, 
            city, 
            state, 
            startDate, 
            dressCode, 
            lookingFor, 
            description 
        } = body;
    

        if (!hostId || !title || !city || !state || !startDate || !dressCode || !lookingFor || !description) {
          return NextResponse.json({ error: "All event fields are required" }, { status: 400 });
        }

        const parsedStartDate = new Date(startDate);
        if (parsedStartDate <= new Date()) {
          return NextResponse.json({ error: "Event start date must be in the future" }, { status: 400 });
        }

        const newEvent = await prisma.event.upsert({
          where: { hostId: hostId }, // Unique identifier for the event
          update: { // Fields to update if the event already exists
            title,
            city,
            state,
            startDate: parsedStartDate,
            dressCode,
            lookingFor,
            description,
            postDate: new Date(), // You may also want to update the postDate, or leave it as is
          },
          create: { // Fields to create a new event if one doesn't exist
            host: { connect: { id: hostId } },
            title,
            city,
            state,
            startDate: parsedStartDate,
            dressCode,
            lookingFor,
            description,
            postDate: new Date(),
          }

        });
    
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error("Error creating or updating event:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}
