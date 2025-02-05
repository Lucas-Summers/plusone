import React from 'react';

interface ReviewContainerProps {
    cards: React.ReactNode[];
  }
  
const ReviewContainer: React.FC<ReviewContainerProps> = (props) => {
    const { cards } = props

    return (
        <div>
            <div className='mb-1 w-full justify-between items-center flex'>
                <div className='text-center flex-1'>Event</div>
                <div className='text-center flex-1'>User</div>
                <div className='text-center flex-1'>Rating</div>
                <div className='text-center flex-1'>Comment</div>
            </div>
            <div className='w-full'>
                {cards.map((Card, index) => (
                    <div key={index} className='flex'>
                        {Card}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewContainer;