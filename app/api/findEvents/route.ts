import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { user } = body;
    
        if (!user) {
          return NextResponse.json({ error: "a user is required" }, { status: 400 });
        }

        // Fetch events matching current user's city and state
        const events = await prisma.event.findMany({
          where: {
            city: user.city,
            state: user.state,
            startDate: {
                gt: new Date(), // Only include events with startDate later than now
            },
            NOT: {
                hostId: user.id, // Exclude events hosted by the current user
            },
            applications: {
                none: {
                  senderId: user.id, // Exclude events the user has applied to
                },
            },
          },
          include: {
            host: {
              select: {
                firstName: true,
                lastName: true,
                rating: true,
              },
            }, 
          },
        });
    
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}