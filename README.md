# A LOTS OF GAME — Arcade 300

A responsive browser arcade with a neon-inspired interface, 300 game catalog entries, search and category filters, saved favorites, shuffle/random play, six playable arcade modes, and two original blocky 3D-style worlds.

## Run it

Open `index.html` in a modern browser. No build tools or dependencies are required. The Google Fonts link is optional; the page falls back to system fonts if offline.

## Features

- 300 catalog entries across speed, memory, logic, focus, and puzzle categories
- Playable reaction test, memory match, number guess, typing sprint, tic-tac-toe vs. bot, and target tap
- Search, category filters, saved games, shuffle, and random play
- Personal best and favorites saved in browser local storage
- Original blocky Obby Rush and Coin Dash perspective arcade worlds
- Responsive layout for desktop and mobile

## Files

- `index.html` — arcade page and game dialogs
- `style.css` — responsive visual design
- `script.js` — first 200 catalog entries and arcade game logic
- `arcade-300.js` — adds catalog entries 201–300
- `worlds-3d.js` — playable blocky 3D-style arcade worlds

For local development, serve this folder with any static file server, for example `python -m http.server 8000`, then open `http://localhost:8000`.
