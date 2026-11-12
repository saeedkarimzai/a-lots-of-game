const STORAGE_KEYS = {
  favorites: 'arcade-favorites',
  best: 'arcade-best'
};

const prefixes = [
  'Neon', 'Pixel', 'Cosmic', 'Turbo', 'Lunar', 'Crystal', 'Velvet', 'Orbit',
  'Jungle', 'Prism', 'Rocket', 'Glitch', 'Nova', 'Thunder', 'Moonlight',
  'Starline', 'Violet', 'Spark', 'Quantum', 'Arcade'
];

const nouns = [
  'Sprint', 'Shuffle', 'Quest', 'Bounce', 'Blitz', 'Maze', 'Rally', 'Rush',
  'Riddle', 'Runner'
];

const categories = ['speed', 'memory', 'logic', 'focus', 'puzzle'];
const colors = {
  speed: '#68e4ed',
  memory: '#ff73c8',
  logic: '#a18aff',
  focus: '#c8f278',
  puzzle: '#ffb96a'
};

const templateOptions = ['reaction', 'memory', 'guess', 'typing', 'tictactoe', 'tap'];

const games = Array.from({ length: 200 }, (_, i) => {
  const id = i + 1;
  const category = categories[i % categories.length];
  const template = templateOptions[i % templateOptions.length];
  const levelOptions = ['CASUAL', 'QUICK', 'CHALLENGE', 'ARCADE'];

  return {
    id,
    title: `${prefixes[Math.floor(i / 10)]} ${nouns[i % 10]}`,
    category,
    template,
    level: levelOptions[i % levelOptions.length],
    difficulty: ['Easy', 'Medium', 'Hard', 'Turbo'][i % 4]
  };
});

const grid = document.querySelector('#grid');
const search = document.querySelector('#search');
const modal = document.querySelector('#modal');
const stage = document.querySelector('#stage');
const filterButtons = [...document.querySelectorAll('.filter')];
const emptyState = document.querySelector('#empty');
const countEl = document.querySelector('#resultCount');
const bestScoreEl = document.querySelector('#bestScore');
const modalTitle = document.querySelector('#modalTitle');

let activeTimeout = null;
let activeInterval = null;
let filter = 'all';
let query = '';
const favorites = new Set(getStoredList(STORAGE_KEYS.favorites));
let best = Number(localStorage.getItem(STORAGE_KEYS.best) || 0);

function getStoredList(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function updateBestScore() {
  bestScoreEl.textContent = String(best);
}

function setBestScore(value) {
  if (value > best) {
    best = value;
    localStorage.setItem(STORAGE_KEYS.best, String(best));
    updateBestScore();
  }
}

function visibleGames() {
  return games.filter((game) => {
    const matchesCategory = filter === 'all'
      ? true
      : filter === 'favorites'
        ? favorites.has(game.id)
        : game.category === filter;

    const haystack = `${game.title} ${game.category} ${game.level}`.toLowerCase();
    const matchesSearch = haystack.includes(query);

    return matchesCategory && matchesSearch;
  });
}

function renderGames() {
  const shown = visibleGames();
  countEl.textContent = `${shown.length} GAME${shown.length === 1 ? '' : 'S'}`;
  emptyState.classList.toggle('hidden', shown.length !== 0);

  grid.innerHTML = shown.map((game) => `
    <article class="game-card" style="--accent:${colors[game.category]}">
      <div class="card-top">
        <span class="category">${game.category}</span>
        <button class="save ${favorites.has(game.id) ? 'saved' : ''}" data-save="${game.id}" aria-label="${favorites.has(game.id) ? 'Remove from' : 'Add to'} saved games">♥</button>
      </div>
      <h3>${game.title}</h3>
      <p>${game.level} · ${game.difficulty} · GAME ${String(game.id).padStart(3, '0')}</p>
      <div class="card-bottom">
        <span>✦ ARCADE 300</span>
        <button class="play" data-play="${game.id}">PLAY ↗</button>
      </div>
    </article>
  `).join('');
}

function openGame(game) {
  if (!game) return;

  modalTitle.textContent = game.title;
  modal.classList.remove('hidden');
  stage.innerHTML = '';

  const startMarkup = `
    <div class="game-content">
      <p class="game-instruction">${game.category.toUpperCase()} MODE · GAME ${game.id} OF 300</p>
  `;

  const endMarkup = `</div>`;

  switch (game.template) {
    case 'reaction':
      renderReactionGame(startMarkup, endMarkup);
      break;
    case 'memory':
      renderMemoryGame(startMarkup, endMarkup);
      break;
    case 'guess':
      renderGuessGame(startMarkup, endMarkup);
      break;
    case 'typing':
      renderTypingGame(startMarkup, endMarkup);
      break;
    case 'tictactoe':
      renderTicTacToeGame(startMarkup, endMarkup);
      break;
    case 'tap':
      renderTargetTapGame(startMarkup, endMarkup);
      break;
    default:
      renderReactionGame(startMarkup, endMarkup);
  }
}

function closeGame() {
  clearTimeout(activeTimeout);
  clearInterval(activeInterval);
  activeTimeout = null;
  activeInterval = null;
  modal.classList.add('hidden');
  stage.innerHTML = '';
}

function renderReactionGame(startMarkup, endMarkup) {
  const html = \`
    \${startMarkup}
    <p class="game-instruction">Press start, wait for green, then hit the same button as fast as possible.</p>
    <button class="action" id="reactionStart">Start reaction test</button>
    <div class="game-message" id="reactionMessage">Ready?</div>
    \${endMarkup}
  \`;
  stage.innerHTML = html;
  const message = document.getElementById('reactionMessage');
  const button = document.getElementById('reactionStart');
  let startedAt = 0;
  let state = 'idle';
  button.addEventListener('click', () => {
    if (state === 'ready') {
      const ms = Math.round(performance.now() - startedAt);
      message.textContent = ms + ' ms — ' + (ms < 250 ? 'Lightning fast!' : ms < 500 ? 'Nice reflexes!' : 'Good effort!');
      button.textContent = 'Try again';
      state = 'done';
      setBestScore(Math.max(100, 1000 - ms));
      return;
    }
    if (state === 'waiting') {
      clearTimeout(activeTimeout);
      activeTimeout = null;
      state = 'idle';
      message.textContent = 'Too soon! Wait for green next time.';
      button.textContent = 'Try again';
      return;
    }
    state = 'waiting';
    button.disabled = true;
    button.textContent = 'Wait for green…';
    message.textContent = 'Watch the button…';
    activeTimeout = setTimeout(() => {
      state = 'ready';
      startedAt = performance.now();
      button.disabled = false;
      button.textContent = 'TAP NOW!';
      message.textContent = 'GO GO GO!';
      button.style.background = '#67e69a';
    }, 1000 + Math.random() * 2500);
  });
  const resetButton = () => {
    button.style.background = '';
    button.disabled = false;
  };
  button.addEventListener('click', () => {
    if (state === 'done' || state === 'idle') resetButton();
  });
}

function renderMemoryGame(startMarkup, endMarkup) {
  const symbols = ['✦', '☾', '♢', '⚡', '✿', '◉', '❋', '⬡'];
  const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  let openCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let lockBoard = false;

  const html = `
    ${startMarkup}
    <p class="game-instruction">Find all eight matching pairs.</p>
    <div class="tile-grid">
      ${deck.map((symbol, index) => `<button class="tile" data-index="${index}" aria-label="Memory card ${index + 1}">?</button>`).join('')}
    </div>
    <div class="game-message" id="memoryMessage">Moves: 0 · Pairs: 0/8</div>
    ${endMarkup}
  `;

  stage.innerHTML = html;
  const memoryMessage = document.getElementById('memoryMessage');
  const tiles = [...stage.querySelectorAll('.tile')];

  const revealTile = (button, value) => {
    button.textContent = value;
    button.classList.add('open');
  };

  const hideTile = (button) => {
    button.textContent = '?';
    button.classList.remove('open');
  };

  tiles.forEach((button) => {
    button.addEventListener('click', () => {
      if (lockBoard || button.classList.contains('open') || button.classList.contains('matched')) return;

      const index = Number(button.dataset.index);
      revealTile(button, deck[index]);
      openCards.push({ button, value: deck[index] });
      moves += 1;

      if (openCards.length === 2) {
        const [first, second] = openCards;
        if (first.value === second.value) {
          first.button.classList.add('matched');
          second.button.classList.add('matched');
          matchedPairs += 1;
          openCards = [];
        } else {
          lockBoard = true;
          activeTimeout = setTimeout(() => {
            hideTile(first.button);
            hideTile(second.button);
            openCards = [];
            lockBoard = false;
          }, 650);
        }
      }

      memoryMessage.textContent = `Moves: ${moves} · Pairs: ${matchedPairs}/8`;

      if (matchedPairs === 8) {
        memoryMessage.textContent = `All pairs found in ${moves} moves!`;
        setBestScore(Math.max(120, 1800 - moves * 55));
      }
    });
  });
}

function renderGuessGame(startMarkup, endMarkup) {
  let target = Math.floor(Math.random() * 100) + 1;
  let triesLeft = 7;

  const html = `
    ${startMarkup}
    <p class="game-instruction">Guess the secret number from 1 to 100. You get 7 tries.</p>
    <div class="big-number" id="guessValue">?</div>
    <div class="game-actions">
      <input class="game-input" id="guessInput" type="number" min="1" max="100" placeholder="Your guess">
      <button class="action" id="submitGuess">Guess</button>
    </div>
    <div class="game-message" id="guessMessage">7 tries remaining</div>
    ${endMarkup}
  `;

  stage.innerHTML = html;

  const guessValue = document.getElementById('guessValue');
  const guessInput = document.getElementById('guessInput');
  const guessMessage = document.getElementById('guessMessage');

  const updateGuessState = () => {
    guessMessage.textContent = `${triesLeft} tries remaining`;
  };

  document.getElementById('submitGuess').addEventListener('click', () => {
    const entered = Number(guessInput.value);
    if (!Number.isFinite(entered) || entered < 1 || entered > 100) {
      guessMessage.textContent = 'Enter a valid number from 1 to 100.';
      return;
    }

    triesLeft -= 1;

    if (entered === target) {
      guessValue.textContent = '✓';
      guessMessage.textContent = `Perfect! You got it in ${7 - triesLeft} tries.`;
      setBestScore(Math.max(100, 900 - (7 - triesLeft) * 110));
      return;
    }

    guessValue.textContent = entered < target ? '↑' : '↓';
    if (triesLeft <= 0) {
      guessMessage.textContent = `Out of tries — the answer was ${target}.`;
      guessValue.textContent = String(target);
      return;
    }

    guessMessage.textContent = `${entered < target ? 'Too low' : 'Too high'} · ${triesLeft} tries left`;
    guessInput.value = '';
  });

  guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.getElementById('submitGuess').click();
    }
  });

  updateGuessState();
}

function renderTypingGame(startMarkup, endMarkup) {
  const words = ['galaxy', 'pixel', 'rocket', 'arcade', 'spark', 'cosmic', 'neon', 'orbit', 'prism', 'turbo', 'glitch', 'comet'];
  const word = words[Math.floor(Math.random() * words.length)];
  const startedAt = performance.now();

  const html = `
    ${startMarkup}
    <p class="game-instruction">Type this word as quickly as you can.</p>
    <div class="word">${word}</div>
    <input class="game-input" id="typingInput" autocomplete="off" placeholder="Type here">
    <div class="game-message" id="typingMessage">Clock starts now!</div>
    ${endMarkup}
  `;

  stage.innerHTML = html;
  const typingInput = document.getElementById('typingInput');
  const typingMessage = document.getElementById('typingMessage');

  typingInput.focus();
  typingInput.addEventListener('input', () => {
    if (typingInput.value.trim().toLowerCase() !== word) return;

    const seconds = ((performance.now() - startedAt) / 1000).toFixed(2);
    typingMessage.textContent = `Clean run — ${seconds} seconds!`;
    setBestScore(Math.max(100, Math.round(1500 - Number(seconds) * 100)));
    typingInput.disabled = true;
  });
}

function renderTicTacToeGame(startMarkup, endMarkup) {
  let board = Array(9).fill('');
  let currentPlayer = 'X';
  let done = false;

  const html = `
    ${startMarkup}
    <p class="game-instruction">Get three in a row. You are X; the arcade bot is O.</p>
    <div class="ttt">
      ${board.map((_, index) => `<button data-cell="${index}"></button>`).join('')}
    </div>
    <div class="game-message" id="tttMessage">Your turn</div>
    ${endMarkup}
  `;

  stage.innerHTML = html;
  const cells = [...stage.querySelectorAll('[data-cell]')];
  const tttMessage = document.getElementById('tttMessage');

  const winner = () => {
    const combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of combos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.every(Boolean) ? 'draw' : null;
  };

  const finish = (result) => {
    done = true;
    tttMessage.textContent = result === 'draw' ? 'Draw game!' : result === 'X' ? 'You win!' : 'Bot wins this round.';
    if (result === 'X') setBestScore(1000);
    cells.forEach((cell) => {
      const index = Number(cell.dataset.cell);
      cell.textContent = board[index];
      cell.disabled = true;
    });
  };

  const renderBoard = () => {
    cells.forEach((cell) => {
      const index = Number(cell.dataset.cell);
      cell.textContent = board[index];
      cell.disabled = !!board[index] || done;
    });
  };

  const botMove = () => {
    const emptyIndexes = board
      .map((value, index) => (value === '' ? index : null))
      .filter((value) => value !== null);

    if (!emptyIndexes.length) return;

    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    board[move] = 'O';
    currentPlayer = 'X';
    renderBoard();

    const result = winner();
    if (result) finish(result);
    else tttMessage.textContent = 'Your turn';
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      if (done) return;
      const index = Number(cell.dataset.cell);
      if (board[index]) return;

      board[index] = 'X';
      renderBoard();

      const result = winner();
      if (result) {
        finish(result);
        return;
      }

      currentPlayer = 'O';
      tttMessage.textContent = 'Bot is thinking...';
      activeTimeout = setTimeout(botMove, 420);
    });
  });

  renderBoard();
}

function renderTargetTapGame(startMarkup, endMarkup) {
  let score = 0;
  let timeLeft = 15;
  let timerId = null;

  const html = `
    ${startMarkup}
    <p class="game-instruction">Tap the glowing target as many times as you can in 15 seconds.</p>
    <div class="game-message" id="tapMessage">Score: 0 · Time: 15s</div>
    <button class="tap-target" id="tapTarget" aria-label="Tap the target"> </button>
    <button class="action" id="tapBegin">Start 15-second round</button>
    ${endMarkup}
  `;

  stage.innerHTML = html;
  const tapMessage = document.getElementById('tapMessage');
  const tapTarget = document.getElementById('tapTarget');
  const tapBegin = document.getElementById('tapBegin');

  const setMessage = () => {
    tapMessage.textContent = `Score: ${score} · Time: ${timeLeft}s`;
  };

  const stopRound = () => {
    clearInterval(timerId);
    activeInterval = null;
    tapTarget.disabled = true;
    tapBegin.disabled = false;
    setBestScore(score * 10);
    tapMessage.textContent = `Time! Final score: ${score}`;
  };

  tapTarget.addEventListener('click', () => {
    if (tapTarget.disabled) return;
    score += 1;
    setMessage();
  });

  tapBegin.addEventListener('click', () => {
    score = 0;
    timeLeft = 15;
    tapTarget.disabled = false;
    tapBegin.disabled = true;
    setMessage();

    clearInterval(timerId);
    timerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        stopRound();
        return;
      }
      setMessage();
    }, 1000);
    activeInterval = timerId;
  });
}

search.addEventListener('input', (event) => {
  query = event.target.value.trim().toLowerCase();
  renderGames();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderGames();
  });
});

document.querySelector('#shuffle').addEventListener('click', () => {
  games.sort(() => Math.random() - 0.5);
  renderGames();
});

document.querySelector('#random').addEventListener('click', () => {
  const available = visibleGames();
  if (!available.length) return;
  openGame(available[Math.floor(Math.random() * available.length)]);
});

document.querySelector('#browse').addEventListener('click', () => {
  document.querySelector('#games').scrollIntoView({ behavior: 'smooth' });
});

grid.addEventListener('click', (event) => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...favorites]));
    renderGames();
    return;
  }

  const playButton = event.target.closest('[data-play]');
  if (playButton) {
    const game = games.find((item) => item.id === Number(playButton.dataset.play));
    openGame(game);
  }
});

document.querySelector('#close').addEventListener('click', closeGame);
modal.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-dismiss')) {
    closeGame();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeGame();
});

updateBestScore();
renderGames();
