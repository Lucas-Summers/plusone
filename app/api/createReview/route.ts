import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, eventId, recId, rating, comment } = body;
    
        if (!userId || !eventId || !rating) {
          return NextResponse.json({ error: "User ID, Event ID, and Rating are required" }, { status: 400 });
        }

        // check rating is nbetween 1 and 5
        if (rating < 1 || rating > 5) {
          return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
        }

        const newReview = await prisma.review.create({
            data: {
              sender: {
                connect: { id: userId }
              },
              recipient: {
                connect: { id: recId }
              },
              event: {
                connect: { id: eventId }
              },
              rating: rating,
              comment: comment || ''
            },
            include: {
              event: true,
              recipient: true,
              sender: true
            }
          });

        // Calculate the new average rating for the recipient
        const recipientReviews = await prisma.review.findMany({
            where: { recipientId: recId },
            select: { rating: true }
        });

        const averageRating = recipientReviews.reduce((sum, review) => sum + review.rating, 0) / recipientReviews.length;

        // Update the recipient's rating
        await prisma.user.update({
            where: { id: recId },
            data: { rating: averageRating }
        });
    
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 });
    }
}
