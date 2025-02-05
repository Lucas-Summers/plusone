import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { inviteId, data } = await request.json();

    if (!inviteId || !data) {
      return NextResponse.json(
        { error: 'Invite ID and update data are required' },
        { status: 400 }
      );
    }

    const updatedInvite = await prisma.invite.update({
      where: { id: inviteId },
      data,
    });

    return NextResponse.json({ invite: updatedInvite }, { status: 200 });
  } catch (error) {
    console.error('Error updating invite:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Invite not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
