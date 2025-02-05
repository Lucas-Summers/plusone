import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from "../context/AuthContext"
import StarRating from './StarRating'

interface ReviewModalProps {
    event: string;
    recipient: string;
    recipient_id: number;
    event_id: number;
    role: string; 
    comment: string;  
    rating: number | null;
    onClose: () => void; // Callback to close the modal
    onReview: () => void; // toggles refresh
}

const ReviewModal: React.FC<ReviewModalProps> = (props) => {
    const { event_id, recipient, recipient_id, event, rating, comment, role, onClose, onReview } = props;
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [hasReviewed, sethasReviewed] = useState(false);
    const [userRating, setuserRating] = useState(null)
    const [userComment, setuserComment] = useState("")
    const { user } = useAuth();
    
    // Close the modal when clicking outside of it
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup the event listener when the component is unmounted
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    const review = async () => {
        try {
          const response = await fetch(`/api/createReview`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              eventId: event_id,
              recId: recipient_id,
              rating: userRating,
              comment: userComment
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Review created successfully:", data);
          } else {
            const errorData = await response.json();
            console.error("Failed to create review: ", errorData.error);
          }
          onReview()
        } catch (error) {
          console.error("Error creating review:", error);
        } finally {
          sethasReviewed(true)
        }
      };

      const handleRatingChange = (rating) => {
        setuserRating(rating)
      };

      let render : React.ReactNode = (
        <div>
            <p className="text-gray-600 text-sm mb-2">
                        <span className='font-bold'>Rating: </span>        
                        {rating} / 5
            </p>
            <p className="text-gray-600 text-sm mb-4">
                <span className='font-bold'>Comment: </span><br/>
                {comment}
            </p>
        </div>
      )

      if (rating == null) {
        render = (
            <div>
                <div className='flex justify-center'>
                    <StarRating onRatingChange={handleRatingChange} />
                </div>
                <textarea rows={10} value={userComment} onChange={(e) => {
                    setuserComment(e.target.value)
                }} className='m-4 w-full max-w-[400px] mx-auto px-5 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-300 rounded-2xl outline-none' placeholder='Write a review (max 500 words)' maxLength={500} />
                <Button text={(hasReviewed ? "Reviewed!" : "Review Now")} dark full onClick={review} />
            </div>
        )
      }

      return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white pt-3 pb-3 pr-6 pl-6 rounded-lg shadow-lg max-w-md w-full">
                <p className="text-gray-600 text-lg mb-2 font-bold text-center">{event}</p>
                <p className="text-gray-600 text-m mb-2 text-center">
                    <span className='font-bold'>User: </span>
                    {recipient}
                </p>
                <p className="text-gray-600 text-sm mb-2 text-center">
                    <span className='font-bold'>Your Role: </span>
                    {role}
                </p>
                {render}
            </div>
        </div>

      );

}

export default ReviewModal;
