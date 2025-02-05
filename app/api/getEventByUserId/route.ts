import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hostId } = body;

    if (!hostId) {
      return NextResponse.json({ error: "Host ID is required" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { hostId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
