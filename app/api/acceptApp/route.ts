import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appId, userId } = body;

    if (!appId || !userId) {
      return NextResponse.json({ error: "Application ID and User ID are required" }, { status: 400 });
    }

    // Find  app
    const application = await prisma.application.findUnique({
      where: { id: appId },
    });

    if (!application) {
      return NextResponse.json({ error: "No matching application found" }, { status: 404 });
    }

    if (application.recipientId !== userId) {
      return NextResponse.json({ error: "Unauthorized action" }, { status: 403 });
    }

    if (application.status === 1) {
      return NextResponse.json({ error: "Application already accepted" }, { status: 400 });
    }

    // Update the app's status to 'Accepted' 
    const updatedApp = await prisma.application.update({
      where: { id: appId },
      data: { status: 1 }, 
    });

    // Increment eventsAtt for the recipient
    const updatedRecipient = await prisma.user.update({
      where: { id: updatedApp.recipientId },
      data: { eventsAtt: { increment: 1 } },
    });

    // Increment eventsAtt for the sender
    const updatedSender = await prisma.user.update({
      where: { id: updatedApp.senderId },
      data: { eventsAtt: { increment: 1 } },
    });

    return NextResponse.json({ statusLabel: 'Accepted', updatedApp }, { status: 200 });
  } catch (error) {
    console.error('Error accepting application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
