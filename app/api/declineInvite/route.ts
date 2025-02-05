import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inviteId, userId } = body;

    if (!inviteId || !userId) {
      return NextResponse.json({ error: "Invite ID and User ID are required" }, { status: 400 });
    }

    // Find the invite
    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
    });

    if (!invite) {
      return NextResponse.json({ error: "No matching invite found" }, { status: 404 });
    }

    if (invite.recipientId !== userId) {
      return NextResponse.json({ error: "Unauthorized action" }, { status: 403 });
    }

    if (invite.status === 2) {
      return NextResponse.json({ error: "Invite already Declined" }, { status: 400 });
    }

    // Update the invite's status to 'Decline' 
    const updatedInvite = await prisma.invite.update({
      where: { id: inviteId },
      data: { status: 2 }, 
    });

    return NextResponse.json({ statusLabel: 'Declined', updatedInvite }, { status: 200 });
  } catch (error) {
    console.error('Error declining invite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
