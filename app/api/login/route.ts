import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  const { phone, password } = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: { phone },
      include: {
        event: true, // Include the related event data
      },
    });

    if (user && user.password === password) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { error: 'Invalid phone or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};