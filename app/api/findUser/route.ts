import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }


    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        event: true,  
        invitesReceived: true,  
        invitesSent: true,      
        applicationsReceived: true, 
        applicationsSent: true,     
        reviewsReceived: true,      
        reviewsSent: true,          
      }
    });


    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }


    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Error fetching user information:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
