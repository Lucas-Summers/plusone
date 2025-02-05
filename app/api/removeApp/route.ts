import { NextResponse } from 'next/server';
import prisma from '../../db';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, userId } = body;

    if (!applicationId || !userId) {
      console.error('Missing applicationId or userId:', { applicationId, userId });
      return NextResponse.json({ error: "Application ID and User ID are required" }, { status: 400 });
    }

    console.log('Received request to delete application:', { applicationId, userId });

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      console.error('Application not found for ID:', applicationId);
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });

    // Increment the eventsCan field for the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { eventsCan: { increment: 1 } },
    });

    console.log('Application deleted successfully:', applicationId);
    return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
