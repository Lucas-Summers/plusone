import React, { useState } from 'react';
import MyEventCard from '../components/MyEvent';

const CreateEventPage: React.FC = () => {
  const [eventData, setEventData] = useState({
    title: '',
    eventDate: new Date(),
    time: '',
    city: '',  
    state: '',
    description: '',
    dressCode: '',
    lookingFor: '',
    contactInfo: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setEventData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('app/api/createEvent/route.ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to save event');
      }

      const result = await response.json();
      console.log('Event saved successfully:', result);

      { /* repopulate with the same data */ }
      setEventData({
        title: result.title,
        eventDate: new Date(result.startDate), 
        time: result.time,
        city: result.city,
        state: result.state,
        description: result.description,
        dressCode: result.dressCode,
        lookingFor: result.lookingFor,
        contactInfo: result.contactInfo,
      });

      alert('Event saved successfully!');
    } catch (error) {
      console.error('Error saving event:', error);
      alert(error);
    }
  };

  const handleCancel = () => {
    console.log('Event creation canceled');
    // delete from db? 
  };

  return (
    <div>
      <h1>Create New Event</h1>
      <MyEventCard
        title={eventData.title}
        eventDate={eventData.eventDate}
        time={eventData.time}
        city={eventData.city}
        state={eventData.state}
        description={eventData.description}
        dressCode={eventData.dressCode}
        lookingFor={eventData.lookingFor}
        contactInfo={eventData.contactInfo}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreateEventPage;