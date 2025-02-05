import { NextResponse } from 'next/server';
import prisma from '../../db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user w/ invite data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        applicationsSent: {
          include: {
            event: {
              include: {
                host: true,
              },
            },
          },
        },
        invitesReceived: {
          include: {
            event: {
              include: {
                host: true,
              },
            },
          },
        },
        invitesSent: {
          include: {
            recipient: true,
          },
        },
        applicationsReceived: {
          include: {
            sender: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // applicationsSent w/ labels
    const appliedEvents = user.applicationsSent.map((application) => {
      let statusLabel;
      switch (application.status) {
        case 0:
          statusLabel = 'Request Sent';
          break;
        case 1:
          statusLabel = 'Accepted';
          break;
        case 2:
          statusLabel = 'Denied';
          break;
        default:
          statusLabel = 'Unknown';
      }

      return {
        applicationId: application.id,
        eventId: application.event.id,
        title: application.event.title,
        name: `${application.event.host.firstName} ${application.event.host.lastName}`,
        pfp: 'https://cdn-icons-png.flaticon.com/512/10061/10061438.png',
        rating: application.event.host.rating,
        status: statusLabel,
        contact: statusLabel === 'Accepted' ? application.event.host.phone : undefined,
      };
    });

    // invitesReceived w/ labels
    const invitedToEvent = user.invitesSent.map((invite) => {
      let statusLabel;
      switch (invite.status) {
        case 0:
          statusLabel = 'Request Sent';
          break;
        case 1:
          statusLabel = 'Accepted';
          break;
        case 2:
          statusLabel = 'Declined';
          break;
        default:
          statusLabel = 'Unknown';
      }
    
      return {
        inviteId: invite.id, // Include inviteId
        name: `${invite.recipient.firstName} ${invite.recipient.lastName}`,
        rating: invite.recipient.rating,
        pfp: 'https://cdn-icons-png.flaticon.com/512/10061/10061438.png',
        status: statusLabel,
        contact: statusLabel === 'Accepted' ? invite.recipient.phone : undefined,
      };
    });

    // invitesSent w/ labels
    const invitedEvents = user.invitesReceived.map((invite) => {
      let statusLabel;
      switch (invite.status) {
        case 0:
          statusLabel = 'Invited';
          break;
        case 1:
          statusLabel = 'Accepted';
          break;
        case 2:
          statusLabel = 'Declined';
          break;
        default:
          statusLabel = 'Unknown';
      }
    
      return {
        inviteId: invite.id, // Include inviteId
        eventId: invite.event.id,
        title: invite.event.title,
        name: `${invite.event.host.firstName} ${invite.event.host.lastName}`,
        pfp: 'https://cdn-icons-png.flaticon.com/512/10061/10061438.png',
        rating: invite.event.host.rating,
        status: statusLabel,
        contact: statusLabel === 'Accepted' ? invite.event.host.phone : undefined,
      };
    });

    // applicationsReceived w/ labels
    const appsToEvent = user.applicationsReceived.map((application) => {
      let statusLabel;
      switch (application.status) {
        case 0:
          statusLabel = 'Applied';
          break;
        case 1:
          statusLabel = 'Accepted';
          break;
        case 2:
          statusLabel = 'Denied';
          break;
        default:
          statusLabel = 'Unknown';
      }

      return {
        applicationId: application.id,
        name: `${application.sender.firstName} ${application.sender.lastName}`,
        rating: application.sender.rating,
        pfp: 'https://cdn-icons-png.flaticon.com/512/10061/10061438.png',
        status: statusLabel,
        contact: statusLabel === 'Accepted' ? application.sender.phone : undefined,
      };
    });

    return NextResponse.json({ appliedEvents, invitedEvents, appsToEvent, invitedToEvent}, { status: 200 });
  } catch (error) {
    console.error('Error fetching user inbox information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
