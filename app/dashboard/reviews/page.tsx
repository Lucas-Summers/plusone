"use client"
import React, { useEffect, useState } from 'react'
import ReviewCard from '../../components/ReviewCard';
import ReviewContainer from '../../components/ReviewContainer';
import { useAuth } from "../../context/AuthContext";
import Loading from '../../components/Loading';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [recieved, setRecieved] = useState([]);
  const [sent, setSent] = useState([]);
  const [unreviewed, setUnreviewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/findReviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      if (response.ok) {
        const { userReviews, unreviewedEvents } = await response.json();
        setRecieved(userReviews.filter((review) => review.recipientId === user.id))
        setSent(userReviews.filter((review) => review.senderId === user.id))
        setUnreviewed(unreviewedEvents)
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchReviews();
  }, [user, reloadTrigger]);

  if (loading) {
    return (
      <Loading size='12' />
    );
  }

  const handleReview = () => {
    setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
  };

  return (
    <div className='flex flex-col flex-1 w-full min-h-screen'>
      {((unreviewed?.length > 0) || (recieved?.length > 0) || (sent?.length > 0)) ? (
      <>
      {unreviewed?.length > 0 && (
      <div className='bg-gray-200 p-4 m-4 rounded-lg'>
        <h1 className='text-lg mb-4 ml-2 text-center'>Leave a Review</h1>
        <ReviewContainer
          cards={unreviewed.map((listing) => (
            <ReviewCard key={listing.id} 
              role={(listing.hostId == user.id ? "Host" : "Plus 1")}
              recipient={(
                  listing.hostId === user.id
                  ? (
                    listing.applications?.length > 0
                      ? (user.id === listing.applications[0].senderId ?
                        `${listing.applications[0].recipient.firstName} ${listing.applications[0].recipient.lastName}`
                        : `${listing.applications[0].sender.firstName} ${listing.applications[0].sender.lastName}`
                        )
                      : (user.id === listing.invites[0].senderId ?
                        `${listing.invites[0].recipient.firstName} ${listing.invites[0].recipient.lastName}`
                        : `${listing.invites[0].sender.firstName} ${listing.invites[0].sender.lastName}`)
                    )
                  : `${listing.host.firstName} ${listing.host.lastName}`)
              }
              recipient_id={(listing.hostId === user.id 
                            ? (listing.applications?.length > 0 
                              ? (user.id === listing.applications[0].recipient.id ?
                                listing.applications[0].sender.id
                                : listing.invites[0].recipient.id)

                              : (user.id === listing.invites[0].recipient.id ?
                                listing.invites[0].sender.id
                                : listing.invites[0].recipient.id))
                            : listing.host.id)}
              event_id={listing.id}
              event={listing.title}
              rating={null}
              comment="..."
              onReview={handleReview} />
          ))}>
        </ReviewContainer>
      </div>)}
      {recieved?.length > 0 && (
      <div className='bg-gray-200 p-4 m-4 rounded-lg'>
        <h1 className='text-lg mb-4 ml-2 text-center'>Reviews Recieved</h1>
        <ReviewContainer
          cards={recieved.map((listing) => (
            <ReviewCard key={listing.id}
            role={(listing.event.hostId == user.id ? "Host" : "Plus 1")}
            recipient={listing.sender.firstName+" "+listing.sender.lastName}
            recipient_id={listing.sender.id}
            event_id={listing.event.id}
            event={listing.event.title}
            rating={listing.rating}
            comment={listing.comment}
            onReview={handleReview} />
          ))}>
        </ReviewContainer>
      </div>)}
      {sent?.length > 0 && (
      <div className='bg-gray-200 p-4 m-4 rounded-lg'>
        <h1 className='text-lg mb-4 ml-2 text-center'>Reviews Sent</h1>
        <ReviewContainer
          cards={sent.map((listing) => (
            <ReviewCard key={listing.id}
            role={(listing.event.hostId == user.id ? "Host" : "Plus 1")}
            recipient={listing.recipient.firstName+" "+listing.recipient.lastName}
            recipient_id={listing.recipient.id}
            event_id={listing.event.id}
            event={listing.event.title}
            rating={listing.rating}
            comment={listing.comment}
            onReview={handleReview} />
          ))}>
        </ReviewContainer>
      </div>)}
      </>
      ) : (
        <h1 className='text-xl text-center'>nothing to do or see...</h1>
      )}
  </div>
  );
}
