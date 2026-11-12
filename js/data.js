/* =====================================================================
   RAMARAJU PORTFOLIO — CONTENT FILE
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
  name: "Ramakrishna Raju Oruganti",
  shortName: "RamaRaju",
  roles: ["Actor", "Writer", "Yoga Therapist"],
  tagline: "Emotion in every look, every line, every breath.",

  // Main photo shown in the 3D frame at the top of the page
  // (colour photo: black jacket, garden)
  heroPhoto: "images/profile/hero.jpg",

  // Photo shown in the "About" section, with a cinematic black & white effect
  // (black & white portrait with glasses)
  aboutPhoto: "images/profile/about.jpg",

  // About text: each line becomes a paragraph. Replace with his real story.
  bio: [
    "Ramakrishna Raju Oruganti is an actor, writer and yoga therapist whose work spans Telugu, Tamil and Kannada cinema, from Pelli Choopulu and Killing Veerappan to Dear Comrade, Gaddalakonda Ganesh and Dasara.",
    "As an actor, he is drawn to the scenes that carry the weight of a story. He does not perform emotion; he lives it. His strongest instrument is his eyes: a single look can hold grief, longing, anger or hope before a word is spoken, which is why he is trusted with the moments that have to land.",
    "As a writer, he writes dialogue the way people actually feel: honest, emotional lines that stay with an audience long after the scene ends.",
    "Away from the camera, he is a yoga therapist with a Bachelor of Physical Education. The same awareness of breath and body that guides his students also grounds every role he plays."
  ],

  // Text on the first (3D hero) screen
  hero: {
    hello: "Hi, I'm RamaRaju",                    // giant heading on the first screen
    cutout: "images/profile/hero-cutout.webp",     // cut-out portrait standing over the 3D wheel
    tagline1: "Actor · Writer · Yoga therapist",
    tagline2: "emotion in every look, line & breath",
    navCta: "Book a session",
    heroCta: "Watch films"
  },

  // Yoga section intro
  yogaIntro:
    "Personalised yoga therapy grounded in a Bachelor of Physical Education: sessions that meet you where you are, whether you are recovering from strain, managing stress, or simply looking to feel at home in your body again.",

  // Contact details: leave "" for anything you don't want shown
  contact: {
    email: "ramoruganti@gmail.com",
    // Both numbers are on WhatsApp: each gets a Call button and a WhatsApp button.
    // Write them with the country code, e.g. "+91 98765 43210".
    // (A plain 10-digit number is treated as Indian and gets +91 added for WhatsApp.)
    phones: ["+91 98666 78844", "+91 94416 88434"],
    instagram: "",      // full link, e.g. "https://instagram.com/username"
    youtube: "",        // full link
    facebook: "",       // full link
    imdb: "",           // full link
    location: ""        // e.g. "Hyderabad, India"
  }
};

/* ---------------------------------------------------------------------
   MOVIES (newest first)
   poster  : file inside images/movies/
   watchOn : where it streams (shown in the movie details)
   link    : exact watch URL; leave "" to show only "watchOn"
   --------------------------------------------------------------------- */
const MOVIES = [
  {
    title: "Dasara",
    year: "2023",
    language: "Telugu",
    genre: "Period Action Drama",
    role: "",            // his character name
    cast: "Nani, Keerthy Suresh, Dheekshith Shetty",
    watchOn: "Netflix",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/dasara.jpg",
    description: "Telugu period action drama starring Nani, Keerthy Suresh, Dheekshith Shetty."
  },
  {
    title: "Dear Comrade",
    year: "2019",
    language: "Telugu",
    genre: "Romantic Action Drama",
    role: "",            // his character name
    cast: "Vijay Deverakonda, Rashmika Mandanna",
    watchOn: "JioHotstar, Amazon Prime Video",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/dear-comrade.jpg",
    description: "Telugu romantic action drama starring Vijay Deverakonda, Rashmika Mandanna."
  },
  {
    title: "Kousalya Krishnamurthy",
    year: "2019",
    language: "Telugu",
    genre: "Sports Drama",
    role: "",            // his character name
    cast: "Aishwarya Rajesh, Rajendra Prasad",
    watchOn: "Sun NXT",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/kousalya-krishnamurthy.jpg",
    description: "Telugu sports drama starring Aishwarya Rajesh, Rajendra Prasad."
  },
  {
    title: "Gaddalakonda Ganesh",
    year: "2019",
    language: "Telugu",
    genre: "Action Comedy",
    role: "",            // his character name
    cast: "Varun Tej, Atharvaa, Pooja Hegde",
    watchOn: "JioHotstar",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/gaddalakonda-ganesh.jpg",
    description: "Telugu action comedy starring Varun Tej, Atharvaa, Pooja Hegde."
  },
  {
    title: "Ruler",
    year: "2019",
    language: "Telugu",
    genre: "Action Drama",
    role: "",            // his character name
    cast: "Nandamuri Balakrishna, Vedhika, Sonal Chauhan",
    watchOn: "Sun NXT, Amazon Prime Video",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/ruler.jpg",
    description: "Telugu action drama starring Nandamuri Balakrishna, Vedhika, Sonal Chauhan."
  },
  {
    title: "Devadas",
    year: "2018",
    language: "Telugu",
    genre: "Action Comedy",
    role: "",            // his character name
    cast: "Nagarjuna, Nani, Rashmika Mandanna",
    watchOn: "JioHotstar, Amazon Prime Video, ZEE5",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/devadas.jpg",
    description: "Telugu action comedy starring Nagarjuna, Nani, Rashmika Mandanna."
  },
  {
    title: "Lovers Club",
    year: "2017",
    language: "Telugu",
    genre: "Romance",
    role: "",            // his character name
    cast: "Anish Chandra, Pavani",
    watchOn: "Amazon Prime Video",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/lovers-club.jpg",
    description: "Telugu romance starring Anish Chandra, Pavani."
  },
  {
    title: "Pelli Choopulu",
    year: "2016",
    language: "Telugu",
    genre: "Romantic Comedy",
    role: "",            // his character name
    cast: "Vijay Deverakonda, Ritu Varma",
    watchOn: "Sun NXT",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/pelli-choopulu.jpg",
    description: "Telugu romantic comedy starring Vijay Deverakonda, Ritu Varma."
  },
  {
    title: "Arddhanaari",
    year: "2016",
    language: "Telugu",
    genre: "Vigilante Thriller",
    role: "Police officer",
    cast: "Arjun Yajath, Mouryaani",
    watchOn: "YouTube (free)",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/arddhanaari.jpg",
    description: "Telugu vigilante thriller starring Arjun Yajath, Mouryaani."
  },
  {
    title: "Killing Veerappan",
    year: "2016",
    language: "Kannada",
    genre: "Biographical Crime",
    role: "",            // his character name
    cast: "Shiva Rajkumar, Sandeep Bharadwaj",
    watchOn: "Amazon Prime Video, Sun NXT, YouTube",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/killing-veerappan.jpg",
    description: "Kannada biographical crime starring Shiva Rajkumar, Sandeep Bharadwaj."
  },
  {
    title: "Thirumanam Ennum Nikkah",
    year: "2014",
    language: "Tamil",
    genre: "Romantic Comedy",
    role: "",            // his character name
    cast: "Jai, Nazriya Nazim",
    watchOn: "Amazon Prime Video",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/thirumanam-ennum-nikkah.jpg",
    description: "Tamil romantic comedy starring Jai, Nazriya Nazim."
  },
  {
    title: "Anandhini",
    year: "",
    language: "",
    genre: "",
    role: "",            // his character name
    cast: "",
    watchOn: "",
    link: "",            // paste the exact watch URL here to show a Watch button
    poster: "images/movies/anandhini.jpg",
    description: "Add the year, language and a short description of the film."
  }
];

/* ---------------------------------------------------------------------
   PHOTO GALLERY (shown in the rotating 3D carousel)
   src     : file inside images/gallery/
   caption : optional text
   --------------------------------------------------------------------- */
const GALLERY = [
  { src: "images/profile/hero.jpg", caption: "Portrait" },
  { src: "images/gallery/police-field.jpg", caption: "In uniform" },
  { src: "images/gallery/arddhanaari-collage.jpg", caption: "Arddhanaari" },
  { src: "images/gallery/portrait-laugh.jpg", caption: "Candid" },
  { src: "images/gallery/action-scene.jpg", caption: "Action scene" },
  { src: "images/profile/about.jpg", caption: "Character look" },
  { src: "images/gallery/police-hilltop.jpg", caption: "On location" },
  { src: "images/gallery/on-set.jpg", caption: "On set" },
  { src: "images/gallery/portrait-glasses.jpg", caption: "Portrait" },
  { src: "images/gallery/police-role.jpg", caption: "Police role" },
  { src: "images/gallery/character-look.jpg", caption: "Look test" },
  { src: "images/gallery/on-set-2.jpg", caption: "Behind the scenes" }
];

/* ---------------------------------------------------------------------
   PROFILE FACTS (shown in About)
   --------------------------------------------------------------------- */
const FACTS = [
  { label: "Full name", value: "Ramakrishna Raju Oruganti" },
  { label: "Born", value: "22 May 1986" },
  { label: "Education", value: "B.Com (Computers) · Bachelor of Physical Education" },
  { label: "Work", value: "Actor · Writer · Yoga Therapist" }
];

/* ---------------------------------------------------------------------
   THE CRAFT (three cards: what he brings to each role)
   --------------------------------------------------------------------- */
const CRAFT = [
  {
    icon: "🎭",
    title: "Actor",
    text: "An emotional actor at heart. He lives inside a scene instead of performing it.",
    points: ["Emotional and dramatic scenes", "Eye acting: whole feelings in a single look", "Grounded, believable characters"]
  },
  {
    icon: "✍️",
    title: "Writer",
    text: "Writes emotional dialogue that sounds the way people truly feel.",
    points: ["Heart-touching emotional dialogues", "Honest, natural conversations", "Lines written to be felt, not just heard"]
  },
  {
    icon: "🪷",
    title: "Yoga Therapist",
    text: "Brings a Bachelor of Physical Education to therapeutic yoga.",
    points: ["Therapeutic yoga & posture", "Pranayama and breathwork", "Body awareness that feeds his acting"]
  }
];

/* ---------------------------------------------------------------------
   SHORT FILMS (add year / link / poster when available)
   --------------------------------------------------------------------- */
const SHORT_FILMS = [
  { title: "Happy Valentine's Day", year: "", role: "", link: "", poster: "" }
];

/* ---------------------------------------------------------------------
   3D RING PHOTOS (the rotating wheel of cards on the first screen)
   Add as many of his photos as you like; the cards cycle through them.
   --------------------------------------------------------------------- */
const RING_PHOTOS = [
  "images/profile/hero.jpg",
  "images/gallery/police-field.jpg",
  "images/gallery/portrait-laugh.jpg",
  "images/gallery/portrait-glasses.jpg",
  "images/gallery/police-hilltop.jpg",
  "images/profile/about.jpg",
  "images/gallery/police-role.jpg",
  "images/gallery/on-set-2.jpg"
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
