import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user } = body;
    
        if (!user) {
          return NextResponse.json({ error: "a user is required" }, { status: 400 });
        }

        // Fetch people matching current user's city and state
        const users = await prisma.user.findMany({
          where: {
            city: user.city,
            state: user.state,
            banned: false,
            NOT: {
                id: user.id, // Exclude the current user
            },
            invitesReceived: {
                none: {
                    senderId: user.id, // Exclude users the current user has invited
                },
            },
          },
          include: {
            event: true, // Include the related event data
          },
        });
    
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching people:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}
