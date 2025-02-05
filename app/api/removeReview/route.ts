import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { reviewId } = body;
    
        if (!reviewId) {
          return NextResponse.json({ error: "review ID is required" }, { status: 400 });
        }

        const deletedReview = await prisma.review.delete({
            where: {
                id: reviewId
            }
        });
    
        return NextResponse.json(deletedReview, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
            return NextResponse.json({ error: "review not found" }, { status: 404 });
        }

        console.error("Error deleting review:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
      }
}