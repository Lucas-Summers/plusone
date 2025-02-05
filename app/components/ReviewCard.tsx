import React, { useState } from 'react';
import ReviewModal from './ReviewModal'

interface ReviewCardProps {
    event: string;
    recipient: string;
    recipient_id: number;
    event_id: number;
    role: string; 
    comment: string;  
    rating: number | null;
    onReview: () => void; // toggles refresh
}

const ReviewCard: React.FC<ReviewCardProps> = (props) => {
    const { event_id, recipient, recipient_id, event, rating, comment, role, onReview } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
        <div onClick={openModal} className='mb-2 w-full justify-between items-center flex rounded-xl border-2 border-gray-300 duration-200 hover:border-indigo-600 bg-white shadow-lg'>
            <div className='text-center flex-1'>
                {event.length > 30 ? event.slice(0, 30) + '...' : event}
            </div>
            <div className='text-center flex-1'>
                {recipient.length > 30 ? recipient.slice(0, 30) + '...' : recipient}
            </div>
            <div className='text-center flex-1'>{(rating ? rating+" / 5" : "N/A")}</div>
            <div className='text-center flex-1'>
                {comment.length > 30 ? comment.slice(0, 30) + '...' : comment}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ReviewModal
                event_id={event_id}
                recipient={recipient}
                recipient_id={recipient_id}
                event={event}
                rating={rating}
                comment={comment}
                role={role}
                onClose={closeModal}
                onReview={onReview}
                />
            )}
        </div>
    );
};

export default ReviewCard;
