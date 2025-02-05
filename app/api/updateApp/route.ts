import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { applicationId, data } = await request.json();

    if (!applicationId || !data) {
      return NextResponse.json(
        { error: 'Application ID and update data are required' },
        { status: 400 }
      );
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data,
    });

    return NextResponse.json({ application: updatedApplication }, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
