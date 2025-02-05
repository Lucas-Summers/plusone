import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // default data will be set in AboutYou component
    const newUser = await prisma.user.create({
      data: {
        phone: phone,
        password: password,
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        age: 0,
        bio: "",
        sex: false,
        joinDate: new Date(),
        premium: false, // Default to non-premium
        banned: false, // Default to not banned
        eventsAtt: 0, // Default to 0 events attended
        eventsCan: 0, // Default to 0 events canceled
        rating: 0.0, // Default rating
        socialMed: null, // Optional field
      },
    });

    return NextResponse.json({ newUser }) // Return the newly created user
  } catch (error) {
    console.error('Error signing up:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}