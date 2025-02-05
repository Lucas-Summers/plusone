import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const { reviewId, data } = await request.json();

    if (!reviewId || !data) {
      return NextResponse.json(
        { error: 'Review ID and update data are required' },
        { status: 400 }
      );
    }

    if (data.rating && (data.rating < 1 || data.rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data,
    });

    return NextResponse.json({ review: updatedReview }, { status: 200 });
  } catch (error) {
    console.error('Error updating review:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
