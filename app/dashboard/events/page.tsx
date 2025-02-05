"use client"
import React,{ useEffect, useState } from 'react'
import ListingEventCard from '../../components/ListingEventCard'; 
import ListingContainer from "../../components/ListingContainer";
import { useAuth } from "../../context/AuthContext";
import Loading from '../../components/Loading';

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/findEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchEvents();
  }, [user, reloadTrigger]);

  if (loading) {
    return (
      <Loading size='12' />
    );
  }
  
  let heading: String = ""
  if (events.length > 0) {
    heading = "showing " + events.length + " event(s) near you..."
  } else {
    heading = "no events found near you..."
  }

  const handleApply = () => {
    setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
  };

  return (
    <div className='flex flex-col flex-1 w-full min-h-screen'>
      <h1 className='text-xl text-center'>{heading}</h1>
      <ListingContainer
        cards={events.map((listing) => (
          <ListingEventCard key={listing.id} 
            id={listing.id}
            title={listing.title} 
            dress_code={listing.dressCode}
            looking_for={listing.lookingFor}
            description={listing.description}
            host_id={listing.hostId}
            post_date={new Date(listing.postDate)}
            host_name={listing.host.firstName + " " + listing.host.lastName} 
            host_pfp='https://cdn-icons-png.flaticon.com/512/10061/10061438.png' 
            host_rating={listing.host.rating} 
            start_date={new Date(listing.startDate)} 
            onApply={handleApply}  />
        ))}>
      </ListingContainer>

    </div>
  );
}
