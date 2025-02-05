"use client"
import React, { useEffect, useState } from 'react'
import ListingPeopleCard from '../../components/ListingPeopleCard'; 
import ListingContainer from "../../components/ListingContainer";
import { useAuth } from "../../context/AuthContext";
import Loading from '../../components/Loading';

export default function PeoplePage() {
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
    try {
      const response = await fetch(`/api/findPeople`, {
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
        setPeople(data);
      } else {
        console.error("Failed to fetch people");
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    } finally {
      setLoading(false);
    }
  };
    fetchPeople();
  }, [user, reloadTrigger]);

  if (loading) {
    return (
      <Loading size='12' />
    );
  }

  let heading: String = ""
  if (people.length > 0) {
    heading = "showing " + people.length + " person(s) near you..."
  } else {
    heading = "no people found near you..."
  }

  const handleInvite = () => {
    setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
  };

  return (
  <div className='flex flex-col flex-1 w-full min-h-screen'>
    <h1 className='text-xl text-center'>{heading}</h1>
    <ListingContainer
      cards={people.map((listing) => (
        <ListingPeopleCard key={listing.id}
          id={listing.id}
          firstname={listing.firstName} 
          lastname={listing.lastName} 
          pfp='https://cdn-icons-png.flaticon.com/512/10061/10061438.png'
          rating={listing.rating} 
          sex={listing.sex} 
          age={listing.age} 
          bio={listing.bio} 
          joined_date={new Date(listing.joinDate)} 
          social_med={listing.socialMed} 
          events_att={listing.eventsAtt} 
          events_can={listing.eventsCan} 
          premium={listing.premium}
          onInvite={handleInvite} />
      ))}>
    </ListingContainer>

  </div>
  );
}
