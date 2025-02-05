import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user } = body;

    if (!user) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user w/ profile data
    const profile = await prisma.user.findUnique({
      where: {
        firstName: user.first_name,
        lastName: user.last_name,
        age: user.age,
        city: user.city,
        state: user.state,
        sex: user.sex,
        bio: user.bio,
        phone: user.contact_info,
      },
    });
    console.log(user);
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
