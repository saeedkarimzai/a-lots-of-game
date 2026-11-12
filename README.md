# A LOTS OF GAME — Arcade 300

A responsive browser arcade with **300 catalog entries**, search and category filters, saved favorites, shuffle/random play, six core arcade game modes, and four original real-time 3D worlds powered by Three.js.

## Run it

Open `index.html` in a modern browser. The arcade and its 2D mini-games run without a build step. The 3D worlds load Three.js from jsDelivr, so they need an internet connection and browser WebGL support.

## Features

- 300 catalog entries across speed, memory, logic, focus, and puzzle categories
- Six playable arcade modes: reaction test, memory match, number guess, typing sprint, tic-tac-toe vs. bot, and target tap
- Search, category filters, saved games, shuffle, and random play
- Personal best and favorites saved in browser local storage
- Four real 3D WebGL worlds: Blocky Obby Rush, Blocky Coin Dash, Sky Steps 3D, and Crystal Sprint 3D
- Three.js perspective camera, lighting, low-poly geometry, jump physics, lane movement, hazards, pickups, and touch controls
- Responsive layout for desktop and mobile

## Controls

- 2D games: follow the instructions shown in each game.
- 3D games: A/D or left/right arrows to switch lanes; Space or Up arrow to jump. Touch buttons are available on mobile.

## Files

- `index.html` — arcade page and game dialogs
- `style.css` — responsive visual design and 3D world UI
- `script.js` — first 200 catalog entries and six arcade game modes
- `arcade-300.js` — adds catalog entries 201–300
- `worlds-3d.js` — Three.js WebGL worlds and gameplay

Scores and favorites are stored locally in the browser on the device where you play.
