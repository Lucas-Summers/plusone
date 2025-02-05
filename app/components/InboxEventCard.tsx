"use client";
import React from 'react';
import Button from './Button';

interface InboxEventCardProps {
  title: string;
  host?: string
  rating: number;
  pfp: string;
  status?: 'Request Sent' | 'Denied' | 'Accepted' | 'Invited' | 'Applied';
  contact?: string; // Contact details for "Accepted" events
  onAccept?: () => void; // Function to handle "Accept" button click
  onDecline?: () => void; // Function to handle "Decline" button click
  onCancel?: () => void; // Function to handle "Cancel" button click
}

const InboxEventCard: React.FC<InboxEventCardProps> = ({
  title,
  host,
  pfp,
  rating,
  status,
  contact,
  onAccept,
  onDecline,
  onCancel,
}) => {
  // status styling
  const statusClass = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600 font-bold';
      case 'Declined':
        return 'text-red-600 font-bold';
      case 'Denied':
        return 'text-red-600 font-bold';
      case 'Request Sent':
        return 'text-yellow-600 font-bold';
      case 'Invited':
        return 'text-blue-600 font-bold';
      case 'Applied':
        return 'text-blue-600 font-bold';
      default:
        return 'text-gray-600';
    }
  };

  function formatPhoneNumber(phoneStr: string): string {
    // Remove any non-digit characters
    const cleanedPhoneStr = phoneStr.replace(/\D/g, '');

    // Check if the phone number has 10 digits
    if (cleanedPhoneStr.length === 10) {
      // Format the phone number as (xxx) xxx-xxxx
      return `(${cleanedPhoneStr.slice(0, 3)}) ${cleanedPhoneStr.slice(3, 6)}-${cleanedPhoneStr.slice(6)}`;
    } else {
      return 'Invalid phone number';
    }
  }

  return (
    <div className="border-2 border-gray-300 duration-200 hover:border-indigo-600 bg-white shadow-lg rounded-xl p-4 m-2 flex flex-col">
     
      <div className="flex items-center mb-2">
        <img src={pfp} alt={host} className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 text-sm">
            {(host ? host+"," : "")} Rating: {rating}
          </p>
        </div>
      </div>

      {status && (
        <p className={`text-sm mb-2 ${statusClass(status)}`}>
          <span className="font-bold">Status: </span>
          {status}
        </p>
      )}

  
      {contact && (
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-bold">Contact: </span>
          {formatPhoneNumber(contact)}
        </p>
      )}

      <div className="flex space-x-2 mt-2">
        {status === 'Request Sent' && (
          <Button text="Cancel Request" onClick={onCancel} full />
        )}
        {status === 'Accepted' && (
          <Button text="Cancel Participation" onClick={onCancel} full />
        )}
        {status === 'Invited' && (
          <>
            <Button text="Accept Invitation" onClick={onAccept} full />
            <Button text="Decline Invitation" onClick={onDecline} full />
          </>
        )}
        {status === 'Applied' && (
          <>
            <Button text="Accept Application" onClick={onAccept} full />
            <Button text="Decline Application" onClick={onDecline} full />
          </>
        )}
      </div>
    </div>
  );
};

export default InboxEventCard;
