# Plus+
A platform designed to match users looking for a +1 with others who are available to accompany them to events.

## Preview
![landing page](assets/landing.png)
![login page](assets/login.png)
![profile setup page](assets/profile_setup.png)
![events page](assets/events.png)
![people page](assets/people.png)
![reviews page](assets/reviews.png)
![inbox page](assets/inbox.png)
![profile page](assets/profile.png)
![my event page](assets/my_event.png)

## Getting Started (development)

Frist, install all packages:
```bash
npm install
```

Setting up prisma and postgres db:
```bash
# running postgres docker container (docker must be installed)
sudo docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
# make sure the container is running on port 5432
sudo docker ps

# needed to connect to db
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=postgres"' > .env
# migrate schema
npx prisma migrate dev --name init
# generate necessary client code
npx prisma generate
# seeding db with test data (might need to install package)
npx ts-node prisma/seed.ts
# run to see the db
npx prisma studio
```

Last, run the development server:
```bash
npm run dev
```

## Test User
To see full functionality, we recommend using this user to log in:

*Phone Number*: 
1111111111

*Password*: 
password
