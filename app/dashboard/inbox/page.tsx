"use client"
import React, { useEffect, useState } from 'react';
import InboxEventCard from '../../components/InboxEventCard';
import { useAuth } from "../../context/AuthContext";
import Loading from '../../components/Loading'

interface EventData {
  eventId: number; 
  inviteId?: number; 
  applicationId?: number;
  title: string;
  name: string;
  pfp: string;
  rating: number;
  status?: 'Request Sent' | 'Denied' | 'Accepted' | 'Invited' | 'Applied';
  contact?: string;
  onCancel?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function InboxPage() {
  const [appliedEvents, setAppliedEvents] = useState<EventData[]>([]);
  const [invitedEvents, setInvitedEvents] = useState<EventData[]>([]);
  const [appsToEvent, setAppsToEvent] = useState<EventData[]>([]);
  const [invitesToEvent, setInvitesToEvent] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const userId = user?.id 

    const fetchData = async () => {
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/inbox', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }) 
        });

        if (!res.ok) {
          alert('Failed to fetch events');
        } else {
          const data = await res.json();
          setAppliedEvents(data.appliedEvents || []);
          setInvitedEvents(data.invitedEvents || []);
          setAppsToEvent(data.appsToEvent || [])
          setInvitesToEvent(data.invitedToEvent || [])
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, reloadTrigger]);

  const handleCancelApplication = async (applicationId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleCancelApplication called with:', { applicationId, userId: user.id });
  
    try {
      const res = await fetch('/api/removeApp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, userId: user.id }),
      });
  
      console.log('Response status:', res.status);
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to cancel application: ${errorData.error}`);
        return;
      }
  
      // Remove the application from  state
      setAppliedEvents((prevEvents) =>
        prevEvents.filter((event) => event.applicationId !== applicationId)
      );
  
      alert('Application canceled successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error canceling application:', error);
      alert('An error occurred while canceling the application.');
    }
  };
  
  const handleCancelInvite = async (inviteId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleCancelInvite called with:', { inviteId, userId: user.id });
  
    try {
      const res = await fetch('/api/removeInvite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId, userId: user.id }),
      });
  
      console.log('Response status:', res.status);
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to cancel invite: ${errorData.error}`);
        return;
      }
  
      // Remove invite from state
      setInvitedEvents((prevEvents) =>
        prevEvents.filter((event) => event.inviteId !== inviteId)
      );
  
      alert('Invite canceled successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error canceling invite:', error);
      alert('An error occurred while canceling the invite.');
    }
  };
  
  const handleAcceptInvite = async (inviteId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleAccept called with:', { inviteId, userId: user.id });
  
    try {
      const res = await fetch('/api/acceptInvite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId, userId: user.id }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to accept invitation: ${errorData.error}`);
        return;
      }
  
      const updatedInvite = await res.json();
  
      setInvitedEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.inviteId === inviteId
            ? {
                ...event,
                status: updatedInvite.statusLabel,
                contact: updatedInvite.contact, 
              }
            : event
        )
      );
  
      alert('Invitation accepted successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error accepting invitation:', error);
      alert('An error occurred while accepting the invitation.');
    }
  };
 
  const handleAcceptApp = async (appId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleAccept called with:', { appId, userId: user.id });
  
    try {
      const res = await fetch('/api/acceptApp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, userId: user.id }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to accept application: ${errorData.error}`);
        return;
      }
  
      const updatedApp = await res.json();
  
      alert('Application accepted successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('An error occurred while accepting the application.');
    }
  };

  const handleDeclineApp = async (appId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleDecline called with:', { appId, userId: user.id });
  
    try {
      const res = await fetch('/api/declineApp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, userId: user.id }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to decline application: ${errorData.error}`);
        return;
      }
  
      const updatedApp = await res.json();
  
      alert('Application declined successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error accepting application:', error);
      alert('An error occurred while accepting the application.');
    }
  };

  const handleDeclineInvite = async (inviteId: number) => {
    if (!user?.id) {
      alert('User not authenticated');
      return;
    }
  
    console.log('handleDecline called with:', { inviteId, userId: user.id });
  
    try {
      const res = await fetch('/api/declineInvite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId, userId: user.id }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to decline invitation: ${errorData.error}`);
        return;
      }
  
      const updatedInvite = await res.json();
  
      // Update invitation status
      setInvitedEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.inviteId === inviteId
            ? {
                ...event,
                status: updatedInvite.statusLabe1,
                contact: updatedInvite.contact, 
              }
            : event
        )
      );
  
      alert('Invitation declined successfully');
      setReloadTrigger(prev => !prev); // Toggle to trigger re-fetch
    } catch (error) {
      console.error('Error accepting invitation:', error);
      alert('An error occurred while accepting the invitation.');
    }
  };

  if (loading) return <Loading size='12' />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events you have applied to:</h2>
      {appliedEvents.length > 0 ? (
        appliedEvents.map((host) => (
          <InboxEventCard
            key={host.applicationId}
            title={host.title}
            host={host.name}
            pfp={host.pfp}
            rating={host.rating}
            status={host.status}
            contact={host.contact}
            onCancel={
              host.status === 'Accepted' || host.status === 'Request Sent'
                ? () => handleCancelApplication(host.applicationId!)
                : undefined
            }
          />
        ))
      ) : (
        <p>You have not applied to any events yet.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Events you have been invited to:</h2>
      {invitedEvents.length > 0 ? (
        invitedEvents.map((host) => (
          <InboxEventCard
            key={host.inviteId}
            title={host.title}
            host={host.name}
            pfp={host.pfp}
            rating={host.rating}
            status={host.status}
            contact={host.contact}
            onAccept={() => handleAcceptInvite(host.inviteId!)}
            onDecline={() => handleDeclineInvite(host.inviteId!)}
            onCancel={
              host.status === 'Accepted'
                ? () => handleCancelInvite(host.inviteId!)
                : undefined
            }
          />
        ))
      ) : (
        <p>You have not been invited to any events yet.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">People you have invited to your event:</h2>
      {invitesToEvent.length > 0 ? (
        invitesToEvent.map((invited) => (
          <InboxEventCard
            key={invited.inviteId}
            title={invited.name}
            host=""
            pfp={invited.pfp}
            rating={invited.rating}
            status={invited.status}
            contact={invited.contact}
            onCancel={
              invited.status === 'Accepted' || invited.status === 'Request Sent'
                ? () => handleCancelInvite(invited.inviteId!)
                : undefined
            }
          />
        ))
      ) : (
        <p>You have not invited anyone to your event yet.</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">People who have applied to your event:</h2>
      {appsToEvent.length > 0 ? (
        appsToEvent.map((applied) => (
          <InboxEventCard
            key={applied.applicationId}
            title={applied.name}
            host=""
            pfp={applied.pfp}
            rating={applied.rating}
            status={applied.status}
            contact={applied.contact}
            onAccept={() => handleAcceptApp(applied.applicationId!)}
            onDecline={() => handleDeclineApp(applied.applicationId!)}
            onCancel={
              applied.status === 'Accepted'
                ? () => handleCancelApplication(applied.applicationId!)
                : undefined
            }
          />
        ))
      ) : (
        <p>No one has applied to your event yet.</p>
      )}

    </div>
  );
}
