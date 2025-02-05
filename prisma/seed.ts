const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany({})
  await prisma.invite.deleteMany({})
  await prisma.application.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.user.deleteMany({})

  // Create sample Users
  const user1 = await prisma.user.create({
    data: {
      phone: "1234567890",
      firstName: "John",
      lastName: "Doe",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 30,
      bio: "Just a regular guy looking to attend some events.",
      joinDate: new Date(),
      eventsAtt: 2,
      eventsCan: 1,
      socialMed: "john_doe",
      banned: false,
      rating: 4.5,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      phone: "0987654321",
      firstName: "Jane",
      lastName: "Smith",
      password: "password",
      city: "Los Angeles",
      state: "CA",
      premium: true,
      sex: false,
      age: 25,
      bio: "I love attending social events and meeting new people!",
      joinDate: new Date(),
      eventsAtt: 5,
      eventsCan: 0,
      socialMed: "jane_smith",
      banned: false,
      rating: 4.8,
    },
  })

  //  Users in New York 
  const userNY1 = await prisma.user.create({
    data: {
      phone: "1111111111",
      firstName: "Tom",
      lastName: "Brown",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 28,
      bio: "New to the city, looking to socialize.",
      joinDate: new Date(),
      eventsAtt: 0,
      eventsCan: 0,
      socialMed: "tom_brown",
      banned: false,
      rating: 4.0,
    },
  })

  const userNY2 = await prisma.user.create({
    data: {
      phone: "2222222222",
      firstName: "Alice",
      lastName: "Green",
      password: "password",
      city: "New York",
      state: "NY",
      premium: true,
      sex: false,
      age: 32,
      bio: "Avid event-goer who loves fashion shows.",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 1,
      socialMed: "alice_green",
      banned: false,
      rating: 4.2,
    },
  })

  const userNY3 = await prisma.user.create({
    data: {
      phone: "3333333333",
      firstName: "Michael",
      lastName: "Johnson",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 29,
      bio: "Foodie looking for local tasting events.",
      joinDate: new Date(),
      eventsAtt: 1,
      eventsCan: 0,
      socialMed: "michael_j",
      banned: false,
      rating: 3.9,
    },
  })

  const userNY4 = await prisma.user.create({
    data: {
      phone: "0040040004",
      firstName: "Jacob",
      lastName: "Woods",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 21,
      bio: "Jazz enthisiast looking for local shows.",
      joinDate: new Date(),
      eventsAtt: 6,
      eventsCan: 0,
      socialMed: "z.dp8",
      banned: false,
      rating: 3.9,
    },
  })

  const userNY5 = await prisma.user.create({
    data: {
      phone: "0050050005",
      firstName: "Owen",
      lastName: "Summersett",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 33,
      bio: "Looking for local shows to discover new artists",
      joinDate: new Date(),
      eventsAtt: 1,
      eventsCan: 0,
      socialMed: "cheesedunkerman",
      banned: false,
      rating: 3.9,
    },
  })

  const userNY6 = await prisma.user.create({
    data: {
      phone: "3333553333",
      firstName: "Michael",
      lastName: "Butcher",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 29,
      bio: "Foodie looking for local tasting events.",
      joinDate: new Date(),
      eventsAtt: 1,
      eventsCan: 0,
      socialMed: "michael_b",
      banned: false,
      rating: 3.9,
    },
  });
  
  const userNY7 = await prisma.user.create({
    data: {
      phone: "3333333334",
      firstName: "Sophia",
      lastName: "Williams",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 24,
      bio: "Book lover and wine enthusiast. Always up for a cozy night at a book launch or wine tasting.",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 1,
      socialMed: "sophia_w",
      banned: false,
      rating: 4.5,
    },
  });
  
  const userNY8 = await prisma.user.create({
    data: {
      phone: "3333333335",
      firstName: "James",
      lastName: "Martinez",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 33,
      bio: "Music lover and tech geek. Looking for concert buddies or tech meetups.",
      joinDate: new Date(),
      eventsAtt: 5,
      eventsCan: 2,
      socialMed: "james_m",
      banned: false,
      rating: 4.2,
    },
  });
  
  const userNY9 = await prisma.user.create({
    data: {
      phone: "3333333336",
      firstName: "Lily",
      lastName: "Davis",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 28,
      bio: "Outdoor enthusiast and animal lover. Always up for a hike or a weekend camping trip.",
      joinDate: new Date(),
      eventsAtt: 2,
      eventsCan: 1,
      socialMed: "lily_d",
      banned: false,
      rating: 4.0,
    },
  });
  
  const userNY10 = await prisma.user.create({
    data: {
      phone: "3333333337",
      firstName: "Ethan",
      lastName: "Smith",
      password: "password",
      city: "New York",
      state: "NY",
      premium: true,
      sex: true,
      age: 30,
      bio: "Adventure seeker and foodie. Looking for exciting events to try new foods or go on spontaneous trips.",
      joinDate: new Date(),
      eventsAtt: 4,
      eventsCan: 2,
      socialMed: "ethan_smith",
      banned: false,
      rating: 4.8,
    },
  });
  
  const userNY11 = await prisma.user.create({
    data: {
      phone: "3333333338",
      firstName: "Emma",
      lastName: "Taylor",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 27,
      bio: "Board games, coffee shops, and rainy days. Looking for a fellow gamer for fun nights in or board game cafes.",
      joinDate: new Date(),
      eventsAtt: 1,
      eventsCan: 0,
      socialMed: "emma_t",
      banned: false,
      rating: 3.7,
    },
  });
  
  const userNY12 = await prisma.user.create({
    data: {
      phone: "3333333339",
      firstName: "Lucas",
      lastName: "Brown",
      password: "password",
      city: "New York",
      state: "NY",
      premium: true,
      sex: true,
      age: 32,
      bio: "Craft beer enthusiast and tech lover. Join me at local beer tastings or hackathons.",
      joinDate: new Date(),
      eventsAtt: 6,
      eventsCan: 3,
      socialMed: "lucas_brown",
      banned: false,
      rating: 4.3,
    },
  });
  
  const userNY13 = await prisma.user.create({
    data: {
      phone: "3333333340",
      firstName: "Olivia",
      lastName: "White",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 26,
      bio: "Art exhibitions and film screenings are my thing. Looking for someone to join me at cool art events!",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 2,
      socialMed: "olivia_w",
      banned: false,
      rating: 4.4,
    },
  });
  
  const userNY14 = await prisma.user.create({
    data: {
      phone: "3333333341",
      firstName: "Mason",
      lastName: "Clark",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 29,
      bio: "Into hiking, fitness, and charity events. Let’s run a marathon or attend a fitness expo together!",
      joinDate: new Date(),
      eventsAtt: 2,
      eventsCan: 1,
      socialMed: "mason_c",
      banned: false,
      rating: 3.9,
    },
  });
  
  const userNY15 = await prisma.user.create({
    data: {
      phone: "3333333342",
      firstName: "Sophia",
      lastName: "Moore",
      password: "password",
      city: "New York",
      state: "NY",
      premium: true,
      sex: false,
      age: 23,
      bio: "Social butterfly who loves rooftop parties, wine tastings, and art events.",
      joinDate: new Date(),
      eventsAtt: 4,
      eventsCan: 3,
      socialMed: "sophia_moore",
      banned: false,
      rating: 4.6,
    },
  });
  
  const userNY16 = await prisma.user.create({
    data: {
      phone: "3333333343",
      firstName: "Benjamin",
      lastName: "Harris",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 34,
      bio: "Sports fan and foodie. Join me at stadiums or food truck festivals for some fun!",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 2,
      socialMed: "benjamin_h",
      banned: false,
      rating: 4.1,
    },
  });
  
  const userNY17 = await prisma.user.create({
    data: {
      phone: "3333333344",
      firstName: "Harper",
      lastName: "Nelson",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 27,
      bio: "Baking and craft fairs are my thing. Looking for someone to enjoy local artisan markets with!",
      joinDate: new Date(),
      eventsAtt: 2,
      eventsCan: 1,
      socialMed: "harper_nelson",
      banned: false,
      rating: 4.2,
    },
  });
  
  const userNY18 = await prisma.user.create({
    data: {
      phone: "3333333345",
      firstName: "Jackson",
      lastName: "Rodriguez",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: true,
      age: 30,
      bio: "Love road trips, photography, and attending music festivals. Always up for a spontaneous adventure.",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 2,
      socialMed: "jackson_r",
      banned: false,
      rating: 4.5,
    },
  });
  
  const userNY19 = await prisma.user.create({
    data: {
      phone: "3333333346",
      firstName: "Ava",
      lastName: "Lee",
      password: "password",
      city: "New York",
      state: "NY",
      premium: true,
      sex: false,
      age: 26,
      bio: "Yoga and meditation retreats are my vibe. Join me for some peaceful moments.",
      joinDate: new Date(),
      eventsAtt: 1,
      eventsCan: 0,
      socialMed: "ava_lee",
      banned: false,
      rating: 4.7,
    },
  });
  
  const userNY20 = await prisma.user.create({
    data: {
      phone: "3333333347",
      firstName: "Charlotte",
      lastName: "Parker",
      password: "password",
      city: "New York",
      state: "NY",
      premium: false,
      sex: false,
      age: 29,
      bio: "Fitness events and nature walks are my thing. Looking for someone to join me for outdoor adventures.",
      joinDate: new Date(),
      eventsAtt: 3,
      eventsCan: 1,
      socialMed: "charlotte_p",
      banned: false,
      rating: 4.4,
    },
  });
  
  const userLA1 = await prisma.user.create({
    data: {
      phone: "4444444444",
      firstName: "Emily",
      lastName: "Davis",
      password: "password",
      city: "Los Angeles",
      state: "CA",
      premium: true,
      sex: false,
      age: 27,
      bio: "Film enthusiast searching for movie premiere parties.",
      joinDate: new Date(),
      eventsAtt: 2,
      eventsCan: 0,
      socialMed: "emily_davis",
      banned: false,
      rating: 4.3,
    },
  })

  const userLA2 = await prisma.user.create({
    data: {
      phone: "5555555555",
      firstName: "Robert",
      lastName: "Wilson",
      password: "password",
      city: "Los Angeles",
      state: "CA",
      premium: false,
      sex: true,
      age: 34,
      bio: "Musician looking for music events & parties.",
      joinDate: new Date(),
      eventsAtt: 4,
      eventsCan: 2,
      socialMed: "robert_wilson",
      banned: false,
      rating: 4.1,
    },
  })

  const event1 = await prisma.event.create({
    data: {
      title: "End of Year Gala",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-31T20:00:00Z"),
      dressCode: "Black Tie",
      lookingFor: "Partners",
      description: "A grand celebration to end the year with style and fun!",
      postDate: new Date(),
      host: { connect: { id: user1.id } },
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: "LA Tech Conference",
      city: "Los Angeles",
      state: "CA",
      startDate: new Date("2025-03-15T10:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Tech People",
      description: "Exploring the future of technology in the heart of LA.",
      postDate: new Date(),
      host: { connect: { id: user2.id } },
    },
  })

  const event3 = await prisma.event.create({
    data: {
      title: "NY Fashion Week Preview",
      city: "New York",
      state: "NY",
      startDate: new Date("2025-02-10T18:00:00Z"),
      dressCode: "Formal",
      lookingFor: "Models",
      description: "A sneak peek at the upcoming NY Fashion Week.",
      postDate: new Date(),
      host: { connect: { id: userNY1.id } },
    },
  })

  const event4 = await prisma.event.create({
    data: {
      title: "Broadway Musical Evening",
      city: "New York",
      state: "NY",
      startDate: new Date("2025-04-20T19:00:00Z"),
      dressCode: "Semi-Formal",
      lookingFor: "Musicians",
      description: "An exclusive performance and after-party.",
      postDate: new Date(),
      host: { connect: { id: userNY2.id } },
    },
  })

  const event5 = await prisma.event.create({
    data: {
      title: "NY Food Festival",
      city: "New York",
      state: "NY",
      startDate: new Date("2025-06-10T12:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Foodies",
      description: "A day to enjoy unique culinary experiences.",
      postDate: new Date(),
      host: { connect: { id: userNY3.id } },
    },
  })

  const event6 = await prisma.event.create({
    data: {
      title: "LA Film Premiere",
      city: "Los Angeles",
      state: "CA",
      startDate: new Date("2025-07-15T20:00:00Z"),
      dressCode: "Formal",
      lookingFor: "Film enthusiasts",
      description: "Red carpet event featuring new indie films.",
      postDate: new Date(),
      host: { connect: { id: userLA1.id } },
    },
  })

  const event7 = await prisma.event.create({
    data: {
      title: "LA Music Festival",
      city: "Los Angeles",
      state: "CA",
      startDate: new Date("2025-08-05T16:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Casual Music Lovers",
      description: "Live bands, great food, and an unforgettable experience.",
      postDate: new Date(),
      host: { connect: { id: userLA2.id } },
    },
  })

  const event8 = await prisma.event.create({
    data: {
      title: "Tech Talk & Networking",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-22T18:00:00Z"),
      dressCode: "Business Casual",
      lookingFor: "Tech Enthusiasts",
      description: "Join us for discussions and networking in the tech industry.",
      postDate: new Date(),
      host: { connect: { id: userNY11.id } },
    },
  });
  
  const event9 = await prisma.event.create({
    data: {
      title: "Film Screening & Discussion",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-16T19:30:00Z"),
      dressCode: "Casual",
      lookingFor: "Film Buffs",
      description: "Watch an indie film and participate in a lively discussion afterward.",
      postDate: new Date(),
      host: { connect: { id: userNY12.id } },
    },
  });
  
  const event10 = await prisma.event.create({
    data: {
      title: "Cooking Class & Dinner",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-13T17:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Foodies",
      description: "Learn new cooking skills and enjoy a delicious dinner.",
      postDate: new Date(),
      host: { connect: { id: userNY13.id } },
    },
  });
  
  const event11 = await prisma.event.create({
    data: {
      title: "Beer Tasting & Pub Crawl",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-19T18:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Beer Enthusiasts",
      description: "Taste a variety of craft beers and explore New York's best pubs.",
      postDate: new Date(),
      host: { connect: { id: userNY14.id } },
    },
  });
  
  const event12 = await prisma.event.create({
    data: {
      title: "Art Gallery Opening",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-09T18:00:00Z"),
      dressCode: "Cocktail Attire",
      lookingFor: "Art Lovers",
      description: "Experience new art at a local gallery's grand opening.",
      postDate: new Date(),
      host: { connect: { id: userNY15.id } },
    },
  });
  
  const event13 = await prisma.event.create({
    data: {
      title: "Food & Drink Pairing Event",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-17T20:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Foodies",
      description: "An evening of perfect food and drink pairings.",
      postDate: new Date(),
      host: { connect: { id: userNY16.id } },
    },
  });
  
  const event14 = await prisma.event.create({
    data: {
      title: "Pop-Up Market",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-14T11:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Shoppers",
      description: "Check out unique handmade goods at this trendy pop-up market.",
      postDate: new Date(),
      host: { connect: { id: userNY17.id } },
    },
  });
  
  const event15 = await prisma.event.create({
    data: {
      title: "Photography Meetup",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-21T14:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Photographers",
      description: "Explore the city while capturing amazing moments with fellow photographers.",
      postDate: new Date(),
      host: { connect: { id: userNY18.id } },
    },
  });
  
  const event16 = await prisma.event.create({
    data: {
      title: "Cooking Competition",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-08T16:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Foodies",
      description: "Show off your culinary skills in a fun, friendly competition.",
      postDate: new Date(),
      host: { connect: { id: userNY19.id } },
    },
  });
  
  const event17 = await prisma.event.create({
    data: {
      title: "Holiday Karaoke Night",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-20T21:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Karaoke Lovers",
      description: "Sing your heart out at a festive holiday karaoke night.",
      postDate: new Date(),
      host: { connect: { id: userNY20.id } },
    },
  });
  
  const event18 = await prisma.event.create({
    data: {
      title: "Silent Disco Party",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-22T22:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Party Lovers",
      description: "Dance the night away with a unique silent disco experience.",
      postDate: new Date(),
      host: { connect: { id: userNY4.id } },
    },
  });
  
  const event19 = await prisma.event.create({
    data: {
      title: "Holiday Craft Workshop",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-06T11:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Craft Lovers",
      description: "Create your own holiday decorations in this hands-on workshop.",
      postDate: new Date(),
      host: { connect: { id: userNY5.id } },
    },
  });
  
  const event20 = await prisma.event.create({
    data: {
      title: "Christmas Charity Gala",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-25T19:00:00Z"),
      dressCode: "Formal",
      lookingFor: "Charity Supporters",
      description: "Celebrate Christmas by giving back to the community.",
      postDate: new Date(),
      host: { connect: { id: userNY6.id } },
    },
  });
  
  const event21 = await prisma.event.create({
    data: {
      title: "Holiday Ice Skating Event",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-10T15:00:00Z"),
      dressCode: "Winter Wear",
      lookingFor: "Skating Enthusiasts",
      description: "Join us for a fun day of ice skating in the heart of the city.",
      postDate: new Date(),
      host: { connect: { id: userNY7.id } },
    },
  });
  
  const event22 = await prisma.event.create({
    data: {
      title: "Pop Culture Trivia Night",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-18T20:00:00Z"),
      dressCode: "Casual",
      lookingFor: "Trivia Buffs",
      description: "Test your pop culture knowledge at this fun trivia event.",
      postDate: new Date(),
      host: { connect: { id: userNY8.id } },
    },
  });
  
  const event23 = await prisma.event.create({
    data: {
      title: "New Year's Eve Party",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-31T23:00:00Z"),
      dressCode: "Formal",
      lookingFor: "Party People",
      description: "Ring in the new year with a fabulous celebration.",
      postDate: new Date(),
      host: { connect: { id: userNY9.id } },
    },
  });
  
  const event24 = await prisma.event.create({
    data: {
      title: "Winter Fashion Show",
      city: "New York",
      state: "NY",
      startDate: new Date("2024-12-14T16:00:00Z"),
      dressCode: "Fashionable",
      lookingFor: "Fashion Enthusiasts",
      description: "Get inspired by the latest winter fashion trends at this exclusive show.",
      postDate: new Date(),
      host: { connect: { id: userNY10.id } },
    },
  });

  // Create Invites for events
  await prisma.invite.create({
    data: {
      status: 1, 
      event: { connect: { id: event1.id } },
      recipient: { connect: { id: user2.id } },
      sender: { connect: { id: user1.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event2.id } },
      recipient: { connect: { id: userLA1.id } },
      sender: { connect: { id: user2.id } },
    },
  })
  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event2.id } },
      recipient: { connect: { id: userNY3.id } },
      sender: { connect: { id: user2.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: user1.id } },
      sender: { connect: { id: userNY1.id } },
    },
  })
  await prisma.invite.create({
    data: {
      status: 2,
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY2.id } },
      sender: { connect: { id: userNY1.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event4.id } },
      recipient: { connect: { id: userNY3.id } },
      sender: { connect: { id: userNY2.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event5.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY3.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event6.id } },
      recipient: { connect: { id: user2.id } },
      sender: { connect: { id: userLA1.id } },
    },
  })

  await prisma.invite.create({
    data: {
      status: 1,
      event: { connect: { id: event7.id } },
      recipient: { connect: { id: userLA2.id } },
      sender: { connect: { id: userLA1.id } },
    },
  })

await prisma.invite.create({
  data: {
    status: 1,
    event: { connect: { id: event4.id } },
    recipient: { connect: { id: userNY1.id } }, 
    sender: { connect: { id: userNY2.id } }, 
  },
});

await prisma.invite.create({
  data: {
    status: 2, 
    event: { connect: { id: event5.id } },
    recipient: { connect: { id: userNY1.id } }, 
    sender: { connect: { id: userNY3.id } }, 
  },
});

await prisma.invite.create({
  data: {
    status: 1,
    event: { connect: { id: event5.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY3.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 0,
    event: { connect: { id: event6.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userLA1.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 1,
    event: { connect: { id: event7.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userLA2.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 1,
    event: { connect: { id: event11.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY14.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 2,
    event: { connect: { id: event12.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY15.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 0,
    event: { connect: { id: event13.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY16.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 0,
    event: { connect: { id: event14.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY17.id } },
  },
});

await prisma.invite.create({
  data: {
    status: 0,
    event: { connect: { id: event15.id } },
    recipient: { connect: { id: userNY1.id } },
    sender: { connect: { id: userNY18.id } },
  },
});



  // Applications for events
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event2.id } },
      recipient: { connect: { id: user2.id } }, 
      sender: { connect: { id: userNY1.id } },  
    },
  })
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event2.id } },
      recipient: { connect: { id: user2.id } }, 
      sender: { connect: { id: userNY2.id } },  
    },
  })


  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: user1.id } },
    },
  })

  
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event4.id } },
      recipient: { connect: { id: userNY2.id } },
      sender: { connect: { id: userNY3.id } },
    },
  })

 
  await prisma.application.create({
    data: {
      status: 1,
      event: { connect: { id: event4.id } },
      recipient: { connect: { id: userNY2.id } },
      sender: { connect: { id: userNY1.id } },
    },
  })


  await prisma.application.create({
    data: {
      status: 1, 
      event: { connect: { id: event6.id } },
      recipient: { connect: { id: userLA1.id } }, 
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 1,
      event: { connect: { id: event7.id } },
      recipient: { connect: { id: userLA2.id } }, 
      sender: { connect: { id: userNY1.id } }, 
    },
  });

  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event5.id } },
      recipient: { connect: { id: userNY3.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event10.id } },
      recipient: { connect: { id: userNY13.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event12.id } },
      recipient: { connect: { id: userNY15.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event14.id } },
      recipient: { connect: { id: userNY17.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 2,
      event: { connect: { id: event16.id } },
      recipient: { connect: { id: userNY19.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.application.create({
    data: {
      status: 1,
      event: { connect: { id: event17.id } },
      recipient: { connect: { id: userNY20.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  

  // Reviews
 
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "A fantastic host!",
      event: { connect: { id: event1.id } },
      recipient: { connect: { id: user1.id } },
      sender: { connect: { id: user2.id } },
    },
  })

  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Great conference!",
      event: { connect: { id: event2.id } },
      recipient: { connect: { id: user2.id } },
      sender: { connect: { id: userNY1.id } },
    },
  })

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Amazing!",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: user1.id } },
    },
  })

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Absolutely incredible experience! The event was perfectly organized and the atmosphere was amazing. Highly recommend!",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY2.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Great event! I had a lot of fun, but there were a few minor hiccups. Still, I enjoyed myself and would attend again.",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY3.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 3,
      comment: "The event was okay, but not exactly what I expected. Some parts were disorganized, but it wasn't a total loss.",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY4.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Phenomenal experience! Everything was top-notch and I met so many amazing people. Definitely worth it.",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY5.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Really enjoyable event! Had a great time, though I think some things could be improved for future events.",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY6.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 3,
      comment: "The event was alright. It had potential, but I feel like it missed the mark on a few things. Still, I had some fun.",
      event: { connect: { id: event3.id } },
      recipient: { connect: { id: userNY1.id } },
      sender: { connect: { id: userNY7.id } },
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Fantastic event! Everything was organized perfectly, and I had such a great time. Highly recommend!",
      event: { connect: { id: event5.id } },
      recipient: { connect: { id: userNY3.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 4,
      comment: "The event was great! Had a lot of fun, though there were a few small details that could be improved. Overall, I enjoyed it!",
      event: { connect: { id: event6.id } },
      recipient: { connect: { id: userLA1.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 3,
      comment: "It was an okay event. It had some interesting moments, but it could have been better organized. Still had fun in the end.",
      event: { connect: { id: event7.id } },
      recipient: { connect: { id: userLA2.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "I absolutely loved the event! The atmosphere was perfect, and I met some amazing people. I would definitely go again.",
      event: { connect: { id: event8.id } },
      recipient: { connect: { id: userNY11.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Very enjoyable event! A few things could have been improved, but overall, I had a wonderful experience and would attend again.",
      event: { connect: { id: event9.id } },
      recipient: { connect: { id: userNY12.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });
  
  await prisma.review.create({
    data: {
      rating: 3,
      comment: "The event was fun, but I think it could have been better organized. Some aspects felt rushed, but it was still a decent experience.",
      event: { connect: { id: event10.id } },
      recipient: { connect: { id: userNY13.id } },
      sender: { connect: { id: userNY1.id } },
    },
  });

  console.log("Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
