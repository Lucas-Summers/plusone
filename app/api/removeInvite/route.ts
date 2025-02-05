import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inviteId, userId } = body;

    if (!inviteId || !userId) {
      return NextResponse.json({ error: 'Invite ID and User ID are required' }, { status: 400 });
    }

    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
    });

    if (!invite) {
      return NextResponse.json({ error: 'Invite not found' }, { status: 404 });
    }

    await prisma.invite.delete({
      where: { id: inviteId },
    });

    return NextResponse.json({ message: 'Invite canceled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error canceling invite:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
