import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appId, userId } = body;

    if (!appId || !userId) {
      return NextResponse.json({ error: "Application ID and User ID are required" }, { status: 400 });
    }

    // Find the app
    const application = await prisma.application.findUnique({
      where: { id: appId },
    });

    if (!application) {
      return NextResponse.json({ error: "No matching application found" }, { status: 404 });
    }

    if (application.recipientId !== userId) {
      return NextResponse.json({ error: "Unauthorized action" }, { status: 403 });
    }

    if (application.status === 2) {
      return NextResponse.json({ error: "Invite already Declined" }, { status: 400 });
    }

    // Update the app's status to 'Decline' 
    const updatedApp = await prisma.application.update({
      where: { id: appId },
      data: { status: 2 }, 
    });

    return NextResponse.json({ statusLabel: 'Declined', updatedApp }, { status: 200 });
  } catch (error) {
    console.error('Error declining Application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
