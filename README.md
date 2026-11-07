# 🎟️ EventHub – Responsive Event Management Website

A modern, responsive event management website built with **HTML5, CSS3 and vanilla JavaScript**. Users can explore events, search and filter them, view details, and register with validated forms.

**Live Demo:** _add your Netlify / Vercel / GitHub Pages link_
**Repository:** _add your GitHub link_

## Features
- Hero section with live countdown to the next event
- Event cards (image/emoji banner, name, date, venue, description, category, featured badge)
- Real-time search and category filters
- Event details modal with registration form
- JavaScript validation (name, email, 10-digit phone, duplicate-registration check)
- Success confirmation with booking ID
- **Bonus:** dark/light mode (remembers preference), countdown timer, animations, Local Storage registrations ("My Registrations" with cancel)
- Fully responsive (mobile, tablet, desktop), hamburger menu, reduced-motion support

## Tech Stack
HTML5 · CSS3 (Grid, Flexbox, CSS variables, animations) · JavaScript (ES6) · Local Storage

## Project Structure
```
EventHub/
├── index.html   # page markup
├── style.css    # styling, themes, responsive rules
├── script.js    # events data, search/filter, validation, storage
└── README.md
```

## Implementation Notes
- **Data:** events live in an `EVENTS` array; cards are rendered dynamically.
- **Filtering:** `render()` combines the search text and the active category.
- **Validation:** regex rules per field, errors shown inline on input and submit.
- **Storage:** registrations saved under `eh_regs`, theme under `eh_theme`.
- **Theming:** CSS custom properties switched via `data-theme`.
- **Security:** user input is escaped before being displayed.

## Run Locally
Open `index.html` in any browser. No build step needed.

## Deploy
- **GitHub Pages:** Settings → Pages → deploy from `main` branch.
- **Netlify/Vercel:** import the repo or drag-and-drop the folder.

## Git Workflow
```bash
git init
git add .
git commit -m "Initial commit: EventHub website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
