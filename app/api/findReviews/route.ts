import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { user } = body;
    
        if (!user) {
          return NextResponse.json({ error: "a user is required" }, { status: 400 });
        }

        // fetch all review made by the user or for the user
        const userReviews = await prisma.review.findMany({
            where: {
              OR: [
                { senderId: user.id },
                { recipientId: user.id },
              ],
            },
            include: {
              event: true,
              sender: true,
              recipient: true,
            },
        });

        // fetch all unreviewed events
        const unreviewedEvents = await prisma.event.findMany({
            where: {
              AND: [
                {
                  OR: [
                    {
                      applications: {
                        some: {
                            OR: [
                                { recipientId: user.id },
                                { senderId: user.id }
                            ],
                            status: 1,  // Assuming status 1 means "accepted"
                        },
                      },
                    },
                    {
                      invites: {
                        some: {
                            OR: [
                                { recipientId: user.id },
                                { senderId: user.id }
                            ],
                            status: 1, // Assuming status 1 means "accepted"
                        },
                      },
                    },
                  ],
                },
                {
                  reviews: {
                    none: {
                      senderId: user.id,
                    },
                  },
                },
              ],
            },
            include: {
              reviews: true,
                host: true,
                applications: {
                    where: {
                        status: 1,
                    },
                    include: {
                        sender: true,
                        recipient: true,
                    },
                },
                invites: {
                    where: {
                        status: 1,
                    },
                    include: {
                        sender: true,
                        recipient: true,
                    },
                },
            },
          });
    
        return NextResponse.json({ userReviews, unreviewedEvents },  { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}