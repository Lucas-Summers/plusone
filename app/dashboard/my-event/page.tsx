import React from 'react'
import MyEventCard from '../../components/MyEvent';

const MyEventPage: React.FC = () => {
  return (
    <div>
      <MyEventCard 
        title="New Event"
        eventDate= {new Date()}
        time="6:00 PM"
        city=""
        state = ""
        description=""
        image="https://example.com/image.jpg"
        dressCode=""
        lookingFor=""
        />
    </div>
  );
};

export default MyEventPage;
