"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface MyEventCardProps {
  title?: string;
  eventDate?: Date;
  time?: string;
  city?: string;
  state?: string;
  description?: string;
  image?: string;
  dressCode?: string;
  lookingFor?: string;
}

export const MyEventCard: React.FC<MyEventCardProps> = ({
  title: initialTitle = "",
  eventDate: initialEventDate,
  time: initialTime = "",
  city: initialCity = "",
  state: initialState = "",
  description: initialDescription = "",
  dressCode: initialDressCode = "",
  lookingFor: initialLookingFor = "",
}) => {
  const { user, setUser } = useAuth() as { user: { id: number } | null };

  // State to manage form fields
  const [title, setTitle] = useState(initialTitle);
  const [eventDate, setEventDate] = useState(
    initialEventDate ? initialEventDate.toISOString().substring(0, 10) : ""
  );
  const [time, setTime] = useState(initialTime);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(initialDescription);
  const [dressCode, setDressCode] = useState(initialDressCode);
  const [lookingFor, setLookingFor] = useState(initialLookingFor);
  const [isSaved, setisSaved] = useState(false)
  const [isCancelled, setisCancelled] = useState(false)
  const [reloadTrigger, setReloadTrigger] = useState(false);

  // Function to populate data if an event exists for the user
  const repopulateData = async () => {
    try {
      if (!user || !user.id) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch("/api/getEventByUserId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostId: user.id }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log("No event found for this user.");
          return; // No event, so leave the card untouched
        }
        alert("Failed to fetch event data");
      }

      const eventData = await response.json();

      // Update state with the fetched event data
      setTitle(eventData.title || "");
      setEventDate(
        eventData.startDate
          ? new Date(eventData.startDate).toLocaleDateString("en-GB").split("/").reverse().join("-")
          : ""
      );
      setTime(
        eventData.startDate
          ? (() => {
        const date = new Date(eventData.startDate);
        // Get the local time in HH:mm format
        const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits for hours
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes
        return `${hours}:${minutes}`;
      })()
          : ""
      );
      setCity(eventData.city || "");
      setState(eventData.state || "");
      setDescription(eventData.description || "");
      setDressCode(eventData.dressCode || "");
      setLookingFor(eventData.lookingFor || "");
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  // Call repopulateData when the component mounts
  useEffect(() => {
    repopulateData();
  }, [user, reloadTrigger]);

  // Handle saving an event
  const handleSave = async () => {
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const startDate = new Date(`${eventDate}T${time}`);
      const postDate = new Date()
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostId: user.id,
          title,
          city,
          state,
          startDate,
          postDate,
          dressCode,
          lookingFor,
          description,
        }),
      });

      if (!response.ok) {
        alert("Failed to save event.");
      } else {
        const event = await response.json();
        const updatedEvent = {
          ...event,
          id: event.id,
          title,
          city,
          state,
          startDate,
          postDate,
          dressCode,
          lookingFor,
          description,
        }
        const updatedUser = { ...user, event: [updatedEvent]};
        setUser(updatedUser); // Update user in context
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setisSaved(true)
        setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event.");
    }
  };

  // Handle canceling an event
const handleCancel = async () => {
    try {
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }
  
      const userId = user.id;
  
      // Fetch the event associated with the userId
      const response = await fetch("/api/getEventByUserId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostId: userId,
        }),
      });
  
      if (!response.ok) {
        alert("Failed to fetch event.");
      } else {
  
        const eventData = await response.json();
        const eventId = eventData.id; // Get the eventId
    
        // Now delete the event using the eventId
        const deleteResponse = await fetch(`/api/removeEvent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId, // Pass the eventId for deletion
          }),
        });
    
        if (!deleteResponse.ok) {
          alert("Failed to delete event.");
        } else {
          const updatedUser = { ...user, event: []};
          setUser(updatedUser); // Update user in context
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setisCancelled(true)
          setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
        }
      }
    } catch (error) {
      console.error("Error canceling event:", error);
      alert("Failed to cancel event.");
    }
  };
  
  return (
    <div className="min-h-screen p-6 grid grid-cols-1 gap-6 max-w-5xl mx-auto">
      {/* Editable Title */}
      <div className="col-span-1 flex justify-center items-center mb-4">
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold border-b-2 border-gray-300 px-6 focus:outline-none focus:border-indigo-500 rounded-lg"
        />
      </div>

      {/* Event Fields */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300 grid grid-cols-2 gap-6 w-full max-w-screen-lg h-full">
        {/* Left side */}
        <div className="flex flex-col space-y-4">
          {[
            { label: "Event Date", value: eventDate, setter: setEventDate, type: "date" },
            { label: "Time", value: time, setter: setTime, type: "time" },
            { label: "City", value: city, setter: setCity, type: "text" },
            { label: "State", value: state, setter: setState, type: "text" },
            { label: "Dress Code", value: dressCode, setter: setDressCode, type: "text" },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-lg font-semibold mb-2">{field.label}</label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex flex-col space-y-4">
          {[
            { label: "Description", value: description, setter: setDescription, type: "textarea" },
            { label: "Looking For", value: lookingFor, setter: setLookingFor, type: "textarea" },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-lg font-semibold mb-2">{field.label}</label>
              <textarea
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                rows={5}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="h-10 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Save Event
        </button>
        <button
          onClick={handleCancel}
          className="h-10 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Cancel Event
        </button>
      </div>
      <p className='text-center font-bold'>{(isSaved ? "Event saved successfully..." : "")}</p>
      <p className='text-center font-bold'>{(isCancelled ? "Event cancelled successfully..." : "")}</p>
    </div>
  );
};

export default MyEventCard;
