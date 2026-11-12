(() => {
  'use strict';

  // Add 100 more entries to the existing game catalog without duplicating game logic.
  // All entries are playable using the six arcade modes already in script.js.
  const extraPrefixes = ['Mega', 'Cyber', 'Bubbly', 'Solar', 'Funky', 'Electric', 'Mystic', 'Fierce', 'Happy', 'Bouncy'];
  const extraNouns = ['Skater', 'Spinner', 'Diver', 'Dodger', 'Catcher', 'Climber', 'Chaser', 'Jumper', 'Smasher', 'Explorer'];
  const extraCategories = ['speed', 'memory', 'logic', 'focus', 'puzzle'];
  const extraTemplates = ['reaction', 'memory', 'guess', 'typing', 'tictactoe', 'tap'];
  const extraLevels = ['CASUAL', 'QUICK', 'CHALLENGE', 'ARCADE'];
  const extraDifficulties = ['Easy', 'Medium', 'Hard', 'Turbo'];

  for (let index = 0; index < 100; index += 1) {
    const id = 201 + index;
    games.push({
      id,
      title: `${extraPrefixes[Math.floor(index / 10)]} ${extraNouns[index % 10]}`,
      category: extraCategories[id % extraCategories.length],
      template: extraTemplates[id % extraTemplates.length],
      level: extraLevels[id % extraLevels.length],
      difficulty: extraDifficulties[id % extraDifficulties.length]
    });
  }


})();
