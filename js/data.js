/* =====================================================================
   RAMAKRISHNA PORTFOLIO — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the website.

   HOW TO ADD THINGS
   • His photos      → put image files in  images/profile/  or  images/gallery/
   • Movie posters   → put image files in  images/movies/
   • Then write the file name in the lists below (exact spelling, incl. .jpg/.png)

   If an image file is missing, the site automatically shows a styled
   placeholder instead, so nothing ever looks broken.
   ===================================================================== */

const SITE = {
  name: "Ramakrishna",
  roles: ["Actor", "Yoga Therapist", "Storyteller", "Wellness Guide"],
  tagline: "Bringing stories to life on screen, and balance to life off it.",

  // Main photo shown in the 3D frame at the top of the page
  // (the colour photo: denim jacket, smiling)
  heroPhoto: "images/profile/hero.jpg",

  // Photo shown in the "About" section, with a cinematic black & white effect
  // (the black & white intense look)
  aboutPhoto: "images/profile/about.jpg",

  // About text: each line becomes a paragraph. Replace with his real story.
  bio: [
    "Ramakrishna is an actor and yoga therapist whose work moves between two worlds: the camera and the mat.",
    "On screen, he brings honesty and presence to every character he plays. Off screen, he guides people toward better health, steadier breath, and a calmer mind through therapeutic yoga.",
    "Both crafts rest on the same foundation: awareness of the body, control of the breath, and the discipline to stay fully present."
  ],

  // Text on the first (3D hero) screen
  hero: {
    badge: "Actor on screen · Healer on the mat",
    line1: "Ramakrishna",
    line2: "Actor & Yoga Therapist",
    sub1Bold: "Actor / Yoga Therapist",
    sub1: "bringing stories to life on screen,",
    sub2: "and breath, balance and calm to life off it.",
    navCta: "Book a session",
    heroCta: "Watch films"
  },

  // Yoga section intro
  yogaIntro:
    "Personalised yoga therapy that meets you where you are, whether you're recovering from strain, managing stress, or simply looking to feel at home in your body again.",

  // Contact details: leave "" for anything you don't want shown
  contact: {
    email: "",          // e.g. "ramakrishna@email.com"
    phone: "",          // e.g. "+91 98765 43210"
    whatsapp: "",       // number with country code, digits only, e.g. "919876543210"
    instagram: "",      // full link, e.g. "https://instagram.com/username"
    youtube: "",        // full link
    facebook: "",       // full link
    imdb: "",           // full link
    location: ""        // e.g. "Hyderabad, India"
  }
};

/* ---------------------------------------------------------------------
   MOVIES
   Copy one { ... } block per movie.
   poster : file inside images/movies/
   link   : where to watch it (YouTube, Prime, Netflix, Aha, Hotstar ...)
            leave "" if there is no link yet
   --------------------------------------------------------------------- */
const MOVIES = [
  {
    title: "Movie Title One",
    year: "2024",
    role: "Character name",
    language: "Telugu",
    poster: "images/movies/movie1.jpg",
    link: "",
    description: "Short description of the film and his role."
  },
  {
    title: "Movie Title Two",
    year: "2023",
    role: "Character name",
    language: "Telugu",
    poster: "images/movies/movie2.jpg",
    link: "",
    description: "Short description of the film and his role."
  },
  {
    title: "Movie Title Three",
    year: "2022",
    role: "Character name",
    language: "Telugu",
    poster: "images/movies/movie3.jpg",
    link: "",
    description: "Short description of the film and his role."
  },
  {
    title: "Movie Title Four",
    year: "2021",
    role: "Character name",
    language: "Telugu",
    poster: "images/movies/movie4.jpg",
    link: "",
    description: "Short description of the film and his role."
  }
];

/* ---------------------------------------------------------------------
   PHOTO GALLERY (shown in the rotating 3D carousel)
   src     : file inside images/gallery/
   caption : optional text
   --------------------------------------------------------------------- */
const GALLERY = [
  { src: "images/profile/hero.jpg", caption: "Portrait" },
  { src: "images/profile/about.jpg", caption: "Character look" },
  { src: "images/gallery/photo1.jpg", caption: "On set" },
  { src: "images/gallery/photo2.jpg", caption: "Yoga session" },
  { src: "images/gallery/photo3.jpg", caption: "Portrait" },
  { src: "images/gallery/photo4.jpg", caption: "Behind the scenes" },
  { src: "images/gallery/photo5.jpg", caption: "Meditation" },
  { src: "images/gallery/photo6.jpg", caption: "Event" },
  { src: "images/gallery/photo7.jpg", caption: "Workshop" },
  { src: "images/gallery/photo8.jpg", caption: "Portrait" }
];

/* ---------------------------------------------------------------------
   3D RING PHOTOS (the rotating wheel of cards on the first screen)
   Add as many of his photos as you like; the cards cycle through them.
   --------------------------------------------------------------------- */
const RING_PHOTOS = [
  "images/profile/hero.jpg",
  "images/profile/about.jpg"
];

/* ---------------------------------------------------------------------
   YOGA THERAPY SERVICES
   --------------------------------------------------------------------- */
const YOGA_SERVICES = [
  {
    icon: "🪷",
    title: "Therapeutic Yoga",
    text: "Gentle, targeted practice for back pain, joint stiffness, posture, and recovery."
  },
  {
    icon: "🌬️",
    title: "Pranayama & Breathwork",
    text: "Breathing techniques to calm the nervous system, improve focus, and support better sleep."
  },
  {
    icon: "🧘",
    title: "Meditation",
    text: "Guided practices for stress relief, emotional balance, and a quieter mind."
  },
  {
    icon: "🤝",
    title: "Private & Group Sessions",
    text: "One-to-one therapy plans or group classes, in person or online."
  }
];
