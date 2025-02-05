import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from "../context/AuthContext";

interface EventModalProps {
  id: number;
  title: string;
  host_name: string;
  host_pfp: string;
  host_rating: number;
  host_id: number;
  looking_for: string;
  description: string;
  dress_code: string;
  start_date: Date;
  post_date: Date;
  onClose: () => void; // Callback to close the modal
  onApply: () => void; // triggers refresh
}

const EventModal: React.FC<EventModalProps> = (props) => {
    const { id, title, host_id, host_name, host_pfp, host_rating, start_date, post_date, description, dress_code, looking_for, onClose, onApply } = props;
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { user } = useAuth();
    const [hasApplied, sethasApplied] = useState(false);

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

    const apply = async () => {
      try {
        const response = await fetch(`/api/createApp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            eventId: id,
            recId: host_id,
            status: 0,
  
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Application created successfully:", data);
        } else {
          const errorData = await response.json();
          console.error("Failed to create application: ", errorData.error);
        }
        onApply()
      } catch (error) {
        console.error("Error creating application:", error);
      } finally {
        sethasApplied(true)
      }
    };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white pt-3 pb-3 pr-6 pl-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h1>
        <div className="flex items-center mb-4">
          <img src={host_pfp} alt={host_name} className="w-10 h-10 rounded-full mr-2" />
          <div className='flex flex-col ml-1'>
            <span className="text-gray-700 text-sm font-bold">{host_name}</span>
            <span className="text-gray-600 text-sm">Rating: {(host_rating == 0 ? "N/A" : host_rating)}</span>
          </div>
        </div>
        <div className='mb-2'>
          <p className='text-gray-600 text-sm font-bold'>Occurring on:</p>
          <p className="text-gray-600 text-sm">{start_date.toLocaleDateString()}</p>
          <p className='text-gray-600 text-sm'>@ {start_date.toLocaleTimeString()}</p>
        </div>
        <div className='mb-2'>
          <p className='text-gray-600 text-sm'>
            <span className='font-bold'>Looking for: </span> 
            {looking_for}</p>
        </div>
        <p className='text-gray-600 text-sm mb-2'>
          <span className='font-bold'>Dress Code: </span>
          {dress_code}
        </p>
        <div className='mb-2'>
          <p className='text-gray-600 text-sm font-bold'>Description:</p>
          <p className='text-gray-600 text-sm'>{description}</p>
        </div>
        <Button text={(hasApplied ? "Applied!" : "Apply Now")} dark full onClick={apply} />
        <p className='text-gray-300 text-xs text-center mt-4'>posted: {post_date.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EventModal;
