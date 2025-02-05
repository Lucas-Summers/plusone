# Plus+
A platform designed to match users looking for a +1 with others who are available to accompany them to events.

## Preview
<div class="carousel">
  <div class="carousel-images">
    <img src="assets/landing.png" alt="landing page" class="carousel-image">
    <img src="assets/login.png" alt="login page" class="carousel-image">
    <img src="assets/profile_setup.png" alt="profile setup page" class="carousel-image">
    <img src="assets/events.png" alt="events page" class="carousel-image">
    <img src="assets/people.png" alt="people page" class="carousel-image">
    <img src="assets/reviews.png" alt="reviews page" class="carousel-image">
    <img src="assets/inbox.png" alt="inbox page" class="carousel-image">
    <img src="assets/profile.png" alt="profile page" class="carousel-image">
    <img src="assets/my_event.png" alt="my event page" class="carousel-image">
  </div>
  <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
  <button class="next" onclick="moveSlide(1)">&#10095;</button>
</div>

<style>
  .carousel {
    position: relative;
    width: 80%;
    margin: auto;
    overflow: hidden;
  }
  .carousel-images {
    display: flex;
    transition: transform 0.5s ease;
  }
  .carousel-image {
    width: 100%;
    height: auto;
  }
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 24px;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .prev {
    left: 10px;
  }
  .next {
    right: 10px;
  }
</style>

<script>
  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const totalImages = images.length;

  function moveSlide(step) {
    currentIndex += step;
    if (currentIndex < 0) {
      currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
  }
</script>

## Getting Started (devel)

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
