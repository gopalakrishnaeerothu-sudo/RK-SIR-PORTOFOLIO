# RamaRaju: Actor & Yoga Therapist Portfolio

A 3D portfolio website. Open `index.html` in a browser to view it. It needs no install or build step.

## How to update the site

Everything is controlled from **`js/data.js`**.

| What to add | Where to put the file | What to edit in `js/data.js` |
|---|---|---|
| Main photo (top of page) | `images/profile/hero.jpg` | `heroPhoto` |
| About photo | `images/profile/about.jpg` | `aboutPhoto` |
| Movie posters | `images/movies/` | `poster` in each movie of `MOVIES` |
| Gallery photos | `images/gallery/` | `src` in `GALLERY` |
| Games / Sports logos | `images/sports/` | `GAMES_SPECIALIZATION` in `js/data.js` |

### Adding a movie
Copy one block inside `MOVIES` and fill it in:

```js
{
  title: "Movie Name",
  year: "2024",
  role: "Character name",
  language: "Telugu",
  poster: "images/movies/movie-name.jpg",
  link: "https://www.youtube.com/watch?v=...",   // where to watch it, or ""
  description: "One or two lines about the film."
},
```

File names must match exactly, including `.jpg` / `.png`. If an image is missing,
the site shows a gold placeholder card instead of a broken image.

## Structure
```
index.html        page layout
css/hero.css      first screen: scaled design canvas, glow buttons, 3D ring, browser mock
css/style.css     sections below the hero
js/data.js        ALL content (edit this), incl. hero text and RING_PHOTOS
js/hero.js        type fitter, 3D perspective ring, entrance timeline, menu
js/main.js        particles, films, gallery carousel, film strips, modals
images/           photos and posters
```

## Publishing
Upload the whole folder to any static host (Netlify Drop, GitHub Pages, Vercel).
