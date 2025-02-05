import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { userId, data } = await request.json();

    if (!userId || !data) {
      return NextResponse.json(
        { error: 'User ID and update data are required' },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
