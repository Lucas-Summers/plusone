import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { phone, data } = await request.json();

    if (!phone || !data) {
      return NextResponse.json(
        { error: 'Phone and update data are required' },
        { status: 400 }
      );
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { phone },
      data,
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
