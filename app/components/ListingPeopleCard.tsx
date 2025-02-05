
"use client"
import React, { useState } from 'react';
import Button from './Button';
import PeopleModal from './PeopleModal';

interface ListingPeopleCardProps {
  id: number;
  firstname: string;
  lastname: string;
  pfp: string;  
  rating: number;
  joined_date: Date;
  age: number;
  sex: boolean;
  bio: string;
  social_med: string;
  events_att: number;
  events_can: number;
  premium: boolean;
  onInvite: () => void; // toggles refresh
}


const ListingPeopleCard: React.FC<ListingPeopleCardProps> = (props) => {
  const { id, firstname, lastname, pfp, rating, sex, age, bio, joined_date, social_med, events_att, events_can, premium, onInvite } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div onClick={openModal} className="border-2 border-gray-300 duration-200 hover:border-indigo-600 bg-white shadow-lg rounded-xl pl-4 pr-4 pt-2 pb-2 m-2 h-full flex flex-col justify-between">
      <div className='flex items-center justify-center mb-4'>
        <img src={pfp} alt={lastname} className="w-10 h-10 rounded-full" />
        <h1 className="text-xl font-bold text-gray-800 ml-2">{firstname} {lastname}</h1>
        {premium && <span className="text-indigo-500 ml-2">&#10003;</span>}
      </div>
      <p className="text-gray-600 text-sm mb-2 font-bold">{(sex ? 'M' : 'F')} / {age}</p>
      <p className="text-gray-600 text-sm mb-2">
        <span className='font-bold'>Rating: </span>
        {(rating == 0 ? "N/A" : rating)}
      </p>
      <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Insta: </span>
          <a className='text-blue-600' href={`https://www.instagram.com/${social_med}/`}>@{social_med}</a>
      </p>
      <p className="text-gray-300 text-xs text-center">joined: {joined_date.toLocaleDateString()}</p>

      {/* Modal */}
      {isModalOpen && (
        <PeopleModal
        id={id}
        firstname={firstname}
        lastname={lastname}
        pfp={pfp}
        rating={rating}
        joined_date={joined_date}
        age={age}
        sex={sex}
        bio={bio}
        social_med={social_med}
        events_att={events_att}
        events_can={events_can}
        premium={premium}
        onClose={closeModal}
        onInvite={onInvite}
        />
      )}
  </div>
  );

};


export default ListingPeopleCard;
