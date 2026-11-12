const gameTitles = [
  "Neon Slipstream", "Pixel Prowler", "Starline Sprint", "Thunder Tunnel", "Lunar Loop",
  "Glitch Galaxy", "Spark Samurai", "Moonlight Maze", "Echo Engine", "Turbo Tortoise",
  "Meteor Mender", "Crystal Cart", "Comet Collector", "Frost Flip", "Orbit Outbreak",
  "Crimson Circuit", "Puzzle Pulse", "Rapid Raccoon", "Nova Nudge", "Velvet Vault",
  "Arcade Aurora", "Speedy Silo", "Lava Ladder", "Starlit Swing", "Hex Hop",
  "Quantum Quiver", "Rocket Relay", "Pixel Plunge", "Signal Swoop", "Cobalt Clash",
  "Hyper Hiker", "Prism Puzzler", "Nightfall Nudge", "Drift Dynamo", "Cosmic Clicker",
  "Loop Lantern", "Sunset Sniper", "Bloom Bot", "Circuit Chase", "Stingray Shift",
  "Magnet Mirage", "Rush Runner", "Fizzy Forge", "Aster Arc", "Jolt Jungle",
  "Turbo Ticker", "Fable Flip", "Zen Zoom", "Bubble Bounce", "Skyline Slicer",
  "Drizzle Dash", "Luma Lancer", "River Rumble", "Orbit Owl", "Holo Hiker",
  "Dune Driver", "Laser Loop", "Pixel Piston", "Moon Rift", "Checkered Chase",
  "Neon Niblet", "Retro Rover", "Breeze Blaster", "Jungle Jumper", "Panic Pipe",
  "Comet Courier", "Forest Flicker", "Cloud Clash", "Bloom Brawler", "Mint Motion",
  "Zoom Zapper", "Cosmic Cursor", "Dust Dancer", "Golden Gopher", "Volt Vault",
  "Wisp Warden", "Turbo Tangle", "Mango Maze", "Orbit Oracle", "Plasma Popper",
  "Sonic Stash", "Flare Flick", "Jumbo Jump", "Horizon Hopper", "Nova Net",
  "Key Kicker", "Pepper Pulse", "Pine Pop", "Fury Fizz", "Glow Grit",
  "Quasar Quest", "Cinnamon Circuit", "Jet Jumble", "Blip Bouncer", "Echo Ember",
  "Elemental Escape", "Time Tumble", "Bloom Breaker", "Ripple Rusher", "Photon Path",
  "Slate Sprint", "Forge Flyer", "Echo Echo", "Violet Vortex", "Pixel Parachute",
  "Kite Keeper", "Trail Tinker", "Rogue River", "Fin Flicker", "Mosaic Motion",
  "Float Flip", "Cinder Circuit", "Dark Drift", "Lattice Lift", "Shadow Shifter",
  "Sapphire Spin", "Twilight Twist", "Sunburst Sail", "Rusty Rocket", "Metro Mover",
  "Glimmer Grid", "Signal Skimmer", "Basil Blast", "Magma Mover", "Orbit Orbit",
  "Zen Zebra", "Quake Quest", "Snow Sprint", "Canyon Comet", "Crystal Cyclone",
  "Pixel Piper", "Velvet Velocity", "Heist Harbor", "Soda Sprint", "Clockwork Caper",
  "Radar Raccoon", "Mimic Match", "Rapid Ribbon", "Storm Sprint", "Photon Prowl",
  "Mango Meteor", "Pillar Pounce", "Fresh Flip", "Dawn Drift", "Yonder Yoyo",
  "Nexus Nimble", "Night Runner", "Silver Swerve", "Pebble Pulse", "Grit Glide",
  "Sunbeam Switch", "Mosaic Mayhem", "Galaxy Gator", "Tidal Twist", "Crayon Clash",
  "Echo Engine 2", "Meteor Marker", "Retro Reel", "Glint Gopher", "Hobby Hurdle",
  "Nova Needle", "Cherry Circuit", "Lime Lift", "Moon Mission", "Bridge Breaker",
  "Glacier Glider", "Pixel Pelican", "Violet Volley", "Skyline Sash", "Bunny Bash",
  "Prime Pilot", "Night Noodle", "Moonlit Match", "Petal Path", "Ryde Runner",
  "Dazzle Dancer", "Storm Scooter", "Cherry Chase", "Turbo Tiki", "Bubble Boost",
  "Nimble Nixie", "Comet Click", "Bright Bolt", "Volcano Volley", "Mellow Mover",
  "Signal Sway", "Tropical Tumble", "Haze Hurdler", "Quest Quill", "Boreal Bounce",
  "Twist Ticker", "Lunar Lunge", "Frost Fang", "Circuit Cart", "Dawn Dash",
  "Amber Aerial", "Xenon Xylophone", "Quiver Quick", "Crown Cascade", "Skylight Sprint",
  "Turbo Trident", "Wave Wisp", "Cherry Circuit 2", "Pioneer Pulse", "Shadow Sprint",
  "Pixel Pogo", "Rocket Row", "Blazer Bounce", "Glacier Glide", "Gadget Gorge",
  "Spark Sprint", "Moon Mash", "Float Fleet", "Sprout Surge", "Boreal Brisk",
  "Rift Racer", "Cloud Caper", "Gleam Gauntlet", "Echo Expedition", "Zen Zephyr",
  "Crate Crush", "Prism Pounce", "Sunset Shuffle", "Radar Rush", "Silver Shift",
  "Nova Nudge 2", "Drizzle Drift", "Rapid River", "Orbit Orb", "Night Nibbler",
  "Blue Blaster", "Red Rift", "Token Turbo", "Flicker Flight", "Breeze Burst",
  "Rumble Rover", "Golden Gavel", "Vivid Vector", "Loop Lizard", "Dust Drift",
  "Hyper Harbor", "Starlight Stack", "Bloom Bounce", "Jolly Jet", "Nova Nook",
  "Arcade Alley", "Crystal Cargo", "Cipher Circuit", "Sonic Slide", "Tide Tower",
  "Gravity Glide", "Mint Mambo", "Luna Loop 2", "Pine Punch", "Chrome Chase",
  "Orbit Omen", "Fable Fleet", "Solar Slice", "Lattice Lift 2", "Bubble Bop",
  "Velvet Vault 2", "Wonder Wisp", "Glide Glint", "Fusion Fizz", "Echo Escape",
  "Nova Nest", "Drift Dice", "Coast Caper", "Dusk Dancer", "Holo Hop",
  "Blink Bounce", "Pogo Pulse", "Mint Mirage", "Frost Flight", "Comet Cascade",
  "Spark Signal", "Turbo Trifle", "Cobalt Circuit", "Quartz Quest", "Arcade Aero",
  "Jolt Jockey", "Moonlight Mover", "Rally Rush", "Berry Bounce", "Prism Pop"
];

const categoryMap = {
  speed: ['speed', 'reaction'],
  memory: ['memory'],
  logic: ['logic', 'quiz'],
  reaction: ['reaction', 'speed'],
  puzzle: ['puzzle', 'memory', 'logic']
};

function makeGames() {
  return gameTitles.map((title, index) => {
    const categories = ['speed', 'memory', 'logic', 'reaction', 'puzzle'];
    const category = categories[index % categories.length];
    const template = [
      'memory', 'reaction', 'number', 'typing', 'quiz', 'pattern', 'tictactoe', 'memory'
    ][index % 8];

    return {
      id: index + 1,
      title,
      category,
      description: `Fast ${category} challenge with arcade flavor and score chasing.`,
      template,
      score: 100 + (index * 37) % 2100,
      difficulty: ['Easy', 'Medium', 'Hard', 'Epic'][index % 4],
      accent: ['cyan', 'pink', 'purple', 'green', 'yellow'][index % 5]
    };
  });
}

const games = makeGames();
let currentFilter = 'all';
let currentSearch = '';
let currentGame = null;
let bestCombo = Number(localStorage.getItem('bestCombo') || 4200);

const gameGrid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = [...document.querySelectorAll('.filter')];
const comboScore = document.getElementById('comboScore');
const modal = document.getElementById('gameModal');
const modalTitle = document.getElementById('modalTitle');
const gameStage = document.getElementById('gameStage');

function updateComboDisplay() {
  comboScore.textContent = bestCombo;
}

function getFilteredGames() {
  return games.filter((game) => {
    const matchesFilter = currentFilter === 'all' || categoryMap[currentFilter]?.includes(game.category) || game.category === currentFilter;
    const query = currentSearch.trim().toLowerCase();
    const matchesSearch = !query || game.title.toLowerCase().includes(query) || game.description.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
}

function renderGrid() {
  const filtered = getFilteredGames();
  gameGrid.innerHTML = filtered.map((game) => `
    <article class="game-card" data-id="${game.id}">
      <div class="card-top">
        <span class="card-tag ${game.accent}">${game.category}</span>
        <span class="badge-score">${game.score}</span>
      </div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="card-actions">
        <span>${game.difficulty}</span>
        <button class="card-btn primary play-game" data-id="${game.id}">Play</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.play-game').forEach((button) => {
    button.addEventListener('click', () => {
      const game = games.find((item) => item.id === Number(button.dataset.id));
      openGame(game);
    });
  });

  const count = document.getElementById('statsCount');
  if (count) count.textContent = filtered.length;
}

function openGame(game) {
  currentGame = game;
  modalTitle.textContent = game.title;
  modal.classList.remove('hidden');
  renderGameStage(game);
}

function closeGame() {
  modal.classList.add('hidden');
  currentGame = null;
}

function renderGameStage(game) {
  switch (game.template) {
    case 'memory':
      buildMemoryGame(game);
      break;
    case 'reaction':
      buildReactionGame(game);
      break;
    case 'number':
      buildNumberGame(game);
      break;
    case 'typing':
      buildTypingGame(game);
      break;
    case 'quiz':
      buildQuizGame(game);
      break;
    case 'pattern':
      buildPatternGame(game);
      break;
    case 'tictactoe':
      buildTicTacToeGame(game);
      break;
    default:
      buildNumberGame(game);
  }
}

function buildMemoryGame(game) {
  const symbols = ['⚡', '🎯', '⭐', '🌙', '💎', '🚀', '🔥', '🎲'];
  const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5).map((symbol, index) => ({
    id: `${game.id}-${index}`,
    symbol,
    matched: false,
    revealed: false
  }));

  let first = null;
  let second = null;
  let locked = false;
  let moves = 0;
  let matches = 0;

  const template = `
    <div class="game-shell memory-panel">
      <div class="game-header">
        <div>
          <div class="label">Memory</div>
          <div class="score">Moves: <span id="memoryMoves">0</span></div>
        </div>
        <div class="score">Matches: <span id="memoryMatches">0 / 8</span></div>
      </div>
      <div class="memory-grid" id="memoryGrid"></div>
    </div>
  `;

  gameStage.innerHTML = template;
  const grid = document.getElementById('memoryGrid');

  function renderMemoryBoard() {
    grid.innerHTML = cards.map((card) => `
      <button class="memory-card ${card.revealed || card.matched ? 'revealed' : ''} ${card.matched ? 'correct' : ''}" data-id="${card.id}">
        ${card.revealed || card.matched ? card.symbol : '?'}
      </button>
    `).join('');

    grid.querySelectorAll('.memory-card').forEach((button) => {
      button.addEventListener('click', () => {
        const card = cards.find((item) => item.id === button.dataset.id);
        if (!card || card.revealed || card.matched || locked) return;

        card.revealed = true;
        moves += 1;
        document.getElementById('memoryMoves').textContent = moves;
        renderMemoryBoard();

        if (!first) {
          first = card;
          return;
        }

        second = card;
        if (first.symbol === second.symbol) {
          first.matched = true;
          second.matched = true;
          matches += 1;
          first = null;
          second = null;
          document.getElementById('memoryMatches').textContent = `${matches} / 8`;
          if (matches === 8) {
            bestCombo = Math.max(bestCombo, 500 + moves * 25);
            localStorage.setItem('bestCombo', String(bestCombo));
            updateComboDisplay();
            const win = document.createElement('div');
            win.className = 'game-action';
            win.textContent = 'You matched all cards!';
            grid.appendChild(win);
          }
          renderMemoryBoard();
          return;
        }

        locked = true;
        setTimeout(() => {
          first.revealed = false;
          second.revealed = false;
          first = null;
          second = null;
          locked = false;
          renderMemoryBoard();
        }, 700);
      });
    });
  }

  renderMemoryBoard();
}

function buildReactionGame(game) {
  let started = false;
  let reactionTime = 0;
  let timer = null;

  const template = `
    <div class="game-shell reaction-box">
      <div class="reaction-status" id="reactionStatus">Wait...</div>
      <button class="start-btn" id="reactionStart">Start</button>
      <div class="score" id="reactionResult">Ready</div>
    </div>
  `;

  gameStage.innerHTML = template;
  const reactionStatus = document.getElementById('reactionStatus');
  const reactionResult = document.getElementById('reactionResult');

  function resetToWaiting() {
    started = false;
    reactionStatus.textContent = 'Wait...';
    reactionResult.textContent = 'Ready';
    if (timer) clearTimeout(timer);
  }

  document.getElementById('reactionStart').addEventListener('click', () => {
    resetToWaiting();
    const delay = 1200 + Math.random() * 2200;
    timer = setTimeout(() => {
      started = true;
      reactionStatus.textContent = 'CLICK!';
      reactionStatus.style.color = 'var(--green)';
      reactionTime = performance.now();
    }, delay);
  });

  reactionStatus.addEventListener('click', () => {
    if (!started) return;
    const elapsed = Math.round(performance.now() - reactionTime);
    reactionStatus.textContent = `${elapsed}ms`;
    reactionStatus.style.color = 'var(--yellow)';
    bestCombo = Math.max(bestCombo, 1200 + (500 - Math.max(elapsed - 100, 0)));
    localStorage.setItem('bestCombo', String(bestCombo));
    updateComboDisplay();
    reactionResult.textContent = elapsed < 300 ? 'Amazing!' : elapsed < 500 ? 'Nice!' : 'Good try!';
    started = false;
    clearTimeout(timer);
  });
}

function buildNumberGame(game) {
  let target = 0;
  let score = 0;

  function randomise() {
    target = Math.floor(Math.random() * 90 + 10);
    document.getElementById('challengeNumber').textContent = target;
  }

  const template = `
    <div class="game-shell number-panel">
      <div class="game-header">
        <div>
          <div class="label">Number Rush</div>
        </div>
        <div class="score">Score: <span id="numberScore">0</span></div>
      </div>
      <div class="challenge-text" id="challengeNumber">0</div>
      <div class="inline-input">
        <input id="numberInput" type="number" min="0" placeholder="Type the answer" />
        <button class="game-action" id="submitNumber">Submit</button>
      </div>
    </div>
  `;

  gameStage.innerHTML = template;
  randomise();
  const scoreNode = document.getElementById('numberScore');

  document.getElementById('submitNumber').addEventListener('click', () => {
    const value = Number(document.getElementById('numberInput').value);
    if (value === target || value === target + 1 || value === target - 1) {
      score += 100;
      scoreNode.textContent = score;
      bestCombo = Math.max(bestCombo, score);
      localStorage.setItem('bestCombo', String(bestCombo));
      updateComboDisplay();
    }
    document.getElementById('numberInput').value = '';
    randomise();
  });
}

function buildTypingGame(game) {
  const words = ['pixel', 'orbit', 'rocket', 'arcade', 'spark', 'neon', 'glow', 'signal', 'rush', 'byte', 'quasar', 'cobalt', 'galaxy'];
  let word = '';
  let score = 0;

  function nextWord() {
    word = words[Math.floor(Math.random() * words.length)];
    document.getElementById('wordBox').textContent = word;
  }

  const template = `
    <div class="game-shell typing-block">
      <div class="game-header">
        <div>
          <div class="label">Typing Sprint</div>
        </div>
        <div class="score">Score: <span id="typingScore">0</span></div>
      </div>
      <div class="word-box" id="wordBox"></div>
      <div class="inline-input">
        <input id="typingInput" type="text" placeholder="Type the word" />
        <button class="game-action" id="submitTyping">Check</button>
      </div>
    </div>
  `;

  gameStage.innerHTML = template;
  nextWord();
  const scoreNode = document.getElementById('typingScore');

  document.getElementById('submitTyping').addEventListener('click', () => {
    const value = document.getElementById('typingInput').value.trim().toLowerCase();
    if (value === word) {
      score += 80;
      scoreNode.textContent = score;
      bestCombo = Math.max(bestCombo, score);
      localStorage.setItem('bestCombo', String(bestCombo));
      updateComboDisplay();
    }
    document.getElementById('typingInput').value = '';
    nextWord();
  });
}

function buildQuizGame(game) {
  const questions = [
    { q: 'Which color is usually linked with speed?', a: 'Neon blue', options: ['Neon blue', 'Forest green', 'Sunset orange', 'Dusty brown'] },
    { q: 'What does a game score represent?', a: 'Performance', options: ['Performance', 'The moon phase', 'A random number', 'A texture'] },
    { q: 'Which action helps win a reaction game?', a: 'Click fast', options: ['Click fast', 'Pause time', 'Hide the screen', 'Sleep'] },
    { q: 'What is a common arcade goal?', a: 'Beat the high score', options: ['Beat the high score', 'Avoid all sunlight', 'Read the rules', 'Tap a wall'] }
  ];
  let index = 0;
  let score = 0;

  function renderQuestion() {
    const current = questions[index];
    const html = `
      <div class="game-shell quiz-panel">
        <div class="game-header">
          <div>
            <div class="label">Quiz</div>
          </div>
          <div class="score">Score: <span id="quizScore">${score}</span></div>
        </div>
        <h3>${current.q}</h3>
        <div class="quiz-options">
          ${current.options.map((option) => `<button class="choice-btn" data-answer="${option}">${option}</button>`).join('')}
        </div>
      </div>
    `;
    gameStage.innerHTML = html;

    gameStage.querySelectorAll('.choice-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.answer;
        if (selected === current.a) {
          score += 120;
          document.getElementById('quizScore').textContent = score;
        }
        index += 1;
        if (index < questions.length) {
          renderQuestion();
        } else {
          bestCombo = Math.max(bestCombo, score);
          localStorage.setItem('bestCombo', String(bestCombo));
          updateComboDisplay();
          gameStage.innerHTML = `<div class="game-shell quiz-panel"><h3>Round complete!</h3><p>Your final score: ${score}</p><button class="game-action" id="retryQuiz">Retry</button></div>`;
          document.getElementById('retryQuiz').addEventListener('click', () => buildQuizGame(game));
        }
      });
    });
  }

  renderQuestion();
}

function buildPatternGame(game) {
  const sequence = [];
  const player = [];
  let round = 0;
  let isShowing = true;

  function randomColor() {
    return ['#54e6ff', '#ff5fd2', '#9d7bff', '#63f7b6'][Math.floor(Math.random() * 4)];
  }

  function flashButton(color) {
    const buttons = [...document.querySelectorAll('.pattern-btn')];
    const target = buttons.find((button) => button.dataset.color === color);
    if (!target) return;
    target.style.transform = 'scale(0.96)';
    setTimeout(() => target.style.transform = 'scale(1)', 200);
  }

  function showSequence() {
    isShowing = true;
    const current = randomColor();
    sequence.push(current);
    round = sequence.length;
    let i = 0;
    const interval = setInterval(() => {
      flashButton(sequence[i]);
      i += 1;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => { isShowing = false; }, 550);
      }
    }, 500);
  }

  const template = `
    <div class="game-shell pattern-panel">
      <div class="game-header">
        <div>
          <div class="label">Pattern Tap</div>
        </div>
        <div class="score">Round: <span id="patternRound">0</span></div>
      </div>
      <div class="pattern-grid">
        <button class="pattern-btn" data-color="#54e6ff" style="background:#54e6ff;">A</button>
        <button class="pattern-btn" data-color="#ff5fd2" style="background:#ff5fd2;">B</button>
        <button class="pattern-btn" data-color="#9d7bff" style="background:#9d7bff;">C</button>
        <button class="pattern-btn" data-color="#63f7b6" style="background:#63f7b6;">D</button>
      </div>
      <button class="start-btn" id="startPattern">Start Pattern</button>
    </div>
  `;

  gameStage.innerHTML = template;
  const patternRound = document.getElementById('patternRound');

  document.getElementById('startPattern').addEventListener('click', () => {
    sequence.length = 0;
    player.length = 0;
    showSequence();
    patternRound.textContent = sequence.length;
  });

  gameStage.querySelectorAll('.pattern-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (isShowing) return;
      const color = button.dataset.color;
      player.push(color);
      flashButton(color);
      const expected = sequence[player.length - 1];
      if (color !== expected) {
        bestCombo = Math.max(bestCombo, round * 120);
        localStorage.setItem('bestCombo', String(bestCombo));
        updateComboDisplay();
        gameStage.innerHTML = `<div class="game-shell pattern-panel"><h3>Pattern broken!</h3><p>Final round: ${round}</p><button class="game-action" id="retryPattern">Try again</button></div>`;
        document.getElementById('retryPattern').addEventListener('click', () => buildPatternGame(game));
        return;
      }
      if (player.length === sequence.length) {
        player.length = 0;
        patternRound.textContent = sequence.length + 1;
        setTimeout(showSequence, 500);
      }
    });
  });
}

function buildTicTacToeGame(game) {
  const board = Array(9).fill('');
  let current = 'X';
  let gameOver = false;

  function lines() {
    return [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
  }

  function checkWinner() {
    for (const [a, b, c] of lines()) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(Boolean)) return 'draw';
    return null;
  }

  const template = `
    <div class="game-shell tictactoe-panel">
      <div class="game-header">
        <div>
          <div class="label">Tic-Tac-Toe</div>
        </div>
        <div class="score">Turn: <span id="turnLabel">X</span></div>
      </div>
      <div class="tictactoe-grid" id="tttGrid"></div>
    </div>
  `;

  gameStage.innerHTML = template;
  const grid = document.getElementById('tttGrid');

  function renderBoard() {
    grid.innerHTML = board.map((cell, index) => `
      <button data-index="${index}" ${cell ? 'disabled' : ''}>${cell}</button>
    `).join('');

    grid.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        if (gameOver) return;
        const idx = Number(button.dataset.index);
        if (board[idx]) return;
        board[idx] = current;
        const result = checkWinner();
        if (result) {
          gameOver = true;
          const message = result === 'draw' ? 'Draw!' : `${result} wins!`;
          bestCombo = Math.max(bestCombo, 1800 + board.filter(Boolean).length * 50);
          localStorage.setItem('bestCombo', String(bestCombo));
          updateComboDisplay();
          grid.innerHTML = `<div class="game-shell"><h3>${message}</h3><button class="game-action" id="retryTic">Play again</button></div>`;
          document.getElementById('retryTic').addEventListener('click', () => buildTicTacToeGame(game));
          return;
        }
        current = current === 'X' ? 'O' : 'X';
        document.getElementById('turnLabel').textContent = current;
        renderBoard();
      });
    });
  }

  renderBoard();
}

searchInput.addEventListener('input', (event) => {
  currentSearch = event.target.value;
  renderGrid();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    currentFilter = button.dataset.filter;
    renderGrid();
  });
});

document.getElementById('shuffleGames').addEventListener('click', () => {
  for (let i = games.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [games[i], games[j]] = [games[j], games[i]];
  }
  renderGrid();
});

document.getElementById('randomPlay').addEventListener('click', () => {
  const filtered = getFilteredGames();
  if (!filtered.length) return;
  openGame(filtered[Math.floor(Math.random() * filtered.length)]);
});

document.querySelector('[data-close="true"]').addEventListener('click', closeGame);
document.getElementById('closeModal').addEventListener('click', closeGame);

updateComboDisplay();
renderGrid();
