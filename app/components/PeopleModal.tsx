import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from "../context/AuthContext";

interface PeopleModalProps {
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
  onClose: () => void; // Callback to close the modal
  onInvite: () => void; // toggles refresh
}

const PeopleModal: React.FC<PeopleModalProps> = (props) => {
    const { id, firstname, lastname, pfp, rating, sex, age, bio, joined_date, social_med, events_att, events_can, premium, onClose, onInvite } = props;
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { user } = useAuth();
    const [hasInvited, sethasInvited] = useState(false);
    

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

    const invite = async () => {
      try {
        const response = await fetch(`/api/createInvite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: user.id,
            recId: id,
            eventId: user.event[0].id,
            status: 0,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Invite created successfully:", data);
        } else {
          const errorData = await response.json();
          console.error("Failed to create invite: ", errorData.error);
        }
        onInvite()
      } catch (error) {
        console.error("Error creating invite:", error);
      } finally {
        sethasInvited(true)
      }
    };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white pt-3 pb-3 pr-6 pl-6 rounded-lg shadow-lg max-w-md w-full">
        <div className='flex items-center justify-center mb-2'>
          <img src={pfp} alt={lastname} className="w-20 h-20 rounded-full" />
        </div>
        <div className='flex items-center justify-center mb-4'>
          <h1 className="text-xl font-bold text-gray-800 ml-2">{firstname} {lastname}</h1>
          {premium && <span className="text-indigo-500 ml-2">&#10003;</span>}
        </div>
        <p className="text-gray-600 text-sm mb-2 font-bold">{(sex ? 'M' : 'F')} / {age}</p>
        <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Rating: </span>
          {rating}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Joined: </span>        
          {joined_date.toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Insta: </span>
          <a className='text-blue-600' href={`https://www.instagram.com/${social_med}/`}>@{social_med}</a>
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Attended: </span>{events_att}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className='font-bold'>Cancelled: </span>{events_can}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className='font-bold'>Bio: </span><br/>
          {bio}
        </p>
        {user.event?.length > 0 ? <Button text={(hasInvited ? "Invited!" : "Invite Now")} dark full onClick={invite} /> : <p className='text-gray-600 text-sm mb-2 font-bold text-center'>Need an event to invite people...</p>}
        <p className="text-gray-300 text-xs text-center mt-2">joined: {joined_date.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PeopleModal;
