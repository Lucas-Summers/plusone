"use client"
import React, { useState } from 'react';
import Button from './Button';
import EventModal from './EventModal';

interface ListingEventCardProps {
  id: number;
  title: string;
  host_name: string;
  host_pfp: string;
  host_id: number;
  host_rating: number;
  looking_for: string;
  description: string;
  dress_code: string;
  start_date: Date;
  post_date: Date;
  onApply: () => void; // triggers refresh
}

const ListingEventCard: React.FC<ListingEventCardProps> = (props) => {
  const { id, title, host_name, host_pfp, host_id, host_rating, start_date, post_date, description, dress_code, looking_for, onApply } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div onClick={openModal} className="border-2 border-gray-300 duration-200 hover:border-indigo-600 bg-white shadow-lg rounded-xl pt-2 pb-2 pl-4 pr-4 m-2 h-full flex flex-col justify-between">
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
      <p className='text-gray-300 text-xs text-center'>posted: {post_date.toLocaleDateString()}</p>

      {/* Modal */}
      {isModalOpen && (
        <EventModal
          id={id}
          title={title}
          host_name={host_name}
          host_pfp={host_pfp}
          host_rating={host_rating}
          host_id={host_id}
          start_date={start_date}
          post_date={post_date}
          looking_for={looking_for}
          description={description}
          dress_code={dress_code}
          onClose={closeModal}
          onApply={onApply}
        />
      )}
  </div>
  );

};

export default ListingEventCard;
