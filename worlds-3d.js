(() => {
  'use strict';

  const css = `
    .worlds-3d{padding:42px 0 58px;border-top:1px solid rgba(255,255,255,.08)}
    .worlds-intro{max-width:620px;margin:-10px 0 22px;color:#9a9bb5;font-size:13px;line-height:1.7}
    .world-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
    .world-card{display:grid;grid-template-columns:.82fr 1.18fr;min-height:220px;overflow:hidden;border:1px solid rgba(195,202,255,.13);border-radius:15px;background:linear-gradient(145deg,#16182cdd,#101221dd)}
    .world-art{position:relative;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 45%,#35336b,#19162d 70%)}
    .world-art:before,.world-art:after{content:'';position:absolute;bottom:15%;width:180px;height:90px;transform:rotateX(58deg) rotateZ(-28deg);border:1px solid #68e4ed66;background:repeating-linear-gradient(90deg,transparent 0 28px,#68e4ed29 29px 30px),repeating-linear-gradient(0deg,transparent 0 28px,#68e4ed29 29px 30px)}
    .world-art:after{bottom:42%;width:55px;height:55px;transform:rotate(45deg);background:linear-gradient(135deg,#ff73c8,#947aff);border:0;box-shadow:0 0 28px #ff73c866}
    .world-art span{position:absolute;z-index:1;top:23%;font-size:38px;color:#c8f278;text-shadow:0 0 25px #c8f27888}
    .world-art i{position:absolute;z-index:1;right:16%;top:32%;font-style:normal;color:#ffcf61;font-size:25px;text-shadow:0 0 20px #ffcf61}
    .world-art b{position:absolute;left:15px;bottom:13px;font:700 10px 'Space Grotesk',sans-serif;letter-spacing:.2em;color:#ffffffb8}
    .coin-art{background:radial-gradient(circle at 50% 45%,#254d5c,#101c2a 72%)}
    .coin-art:before{border-color:#c8f27877;background:repeating-linear-gradient(90deg,transparent 0 28px,#c8f27824 29px 30px),repeating-linear-gradient(0deg,transparent 0 28px,#c8f27824 29px 30px)}
    .coin-art:after{border-radius:50%;background:linear-gradient(135deg,#fff1a1,#ffad41);box-shadow:0 0 30px #ffd76799}
    .world-card-copy{padding:20px;align-self:center}.world-tag{font-size:9px;letter-spacing:.15em;font-weight:800;color:#68e4ed}.world-card-copy h3{margin:8px 0;font:700 20px 'Space Grotesk',sans-serif}.world-card-copy p{margin:0 0 16px;color:#9a9bb5;font-size:11px;line-height:1.6}.launch-world{font-size:11px}
    .world-modal{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:14px;background:#050610dc;backdrop-filter:blur(8px)}
    .world-panel{width:min(900px,100%);background:#101322;border:1px solid #ffffff24;border-radius:17px;padding:17px;box-shadow:0 25px 100px #000b}
    .world-panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.world-panel-title{font:700 20px 'Space Grotesk',sans-serif}.world-panel-sub{margin-top:4px;color:#9a9bb5;font-size:11px}.world-close{border:1px solid #ffffff22;border-radius:9px;background:#ffffff0b;color:white;width:36px;height:36px;font-size:22px;cursor:pointer}
    .world-canvas-wrap{position:relative;overflow:hidden;border:1px solid #ffffff20;border-radius:12px;background:#12142b}.world-canvas{display:block;width:100%;height:min(55vh,460px);min-height:260px;touch-action:none}
    .world-hud{position:absolute;left:12px;right:12px;top:12px;display:flex;justify-content:space-between;pointer-events:none}.world-hud span{padding:7px 10px;border:1px solid #ffffff23;border-radius:8px;background:#101322c9;font-size:11px;font-weight:800;letter-spacing:.06em}
    .world-overlay{position:absolute;inset:0;display:grid;place-items:center;background:#090b18a8;text-align:center;padding:20px}.world-overlay.hidden{display:none}.world-overlay-box{max-width:420px;padding:22px;border:1px solid #ffffff24;border-radius:14px;background:#111426ed}.world-overlay-box h3{margin:0 0 8px;font:700 25px 'Space Grotesk',sans-serif}.world-overlay-box p{color:#c0c1d5;font-size:12px;line-height:1.6}.world-control-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;color:#9a9bb5;font-size:11px}.world-touch{display:flex;gap:7px}.world-touch button{width:44px;height:38px;border:1px solid #ffffff22;border-radius:9px;background:#ffffff0b;color:white;font-size:18px;touch-action:none}.world-start{padding:11px 17px;border:0;border-radius:9px;background:linear-gradient(110deg,#68e4ed,#ff73c8);color:#11121e;font-weight:800;cursor:pointer}
    @media(max-width:680px){.world-card-grid{grid-template-columns:1fr}.world-card{min-height:195px;grid-template-columns:.72fr 1.28fr}.world-card-copy{padding:14px}.world-card-copy h3{font-size:17px}.world-control-row{align-items:flex-start;flex-direction:column}.world-canvas{height:48vh;min-height:250px}}
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);

  const modal = document.createElement('div');
  modal.className = 'world-modal hidden';
  modal.id = 'worldModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <section class="world-panel" aria-labelledby="worldGameTitle">
      <div class="world-panel-head">
        <div><div class="kicker">ORIGINAL BLOCK-STYLE 3D ARCADE</div><div class="world-panel-title" id="worldGameTitle">Blocky World</div><div class="world-panel-sub">Move: ← → or A/D · Jump: Space / ↑ · Mobile: use buttons</div></div>
        <button class="world-close" aria-label="Close world">×</button>
      </div>
      <div class="world-canvas-wrap">
        <canvas class="world-canvas" aria-label="Playable perspective 3D-style arcade game"></canvas>
        <div class="world-hud"><span id="worldScore">SCORE 0</span><span id="worldLives">♥ ♥ ♥</span></div>
        <div class="world-overlay"><div class="world-overlay-box"><h3 id="worldOverlayTitle">Ready?</h3><p id="worldOverlayText">Dodge blocks, jump gaps, and collect shiny coins. The course speeds up as you play.</p><button class="world-start">Start run</button></div></div>
      </div>
      <div class="world-control-row"><span>Original blocky arcade worlds — inspired by the look of user-made platform games, not copied from Roblox.</span><div class="world-touch"><button data-control="left" aria-label="Move left">←</button><button data-control="jump" aria-label="Jump">↑</button><button data-control="right" aria-label="Move right">→</button></div></div>
    </section>`;
  document.body.append(modal);

  const canvas = modal.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const scoreLabel = modal.querySelector('#worldScore');
  const livesLabel = modal.querySelector('#worldLives');
  const overlay = modal.querySelector('.world-overlay');
  const overlayTitle = modal.querySelector('#worldOverlayTitle');
  const overlayText = modal.querySelector('#worldOverlayText');
  const startButton = modal.querySelector('.world-start');
  const title = modal.querySelector('#worldGameTitle');

  let worldType = 'obby';
  let raf = 0;
  let lastTime = 0;
  let spawnClock = 0;
  let score = 0;
  let coins = 0;
  let lives = 3;
  let lane = 0;
  let jumpHeight = 0;
  let jumpVelocity = 0;
  let running = false;
  let ended = false;
  let objects = [];
  let distance = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  const lanes = [-2.4, 0, 2.4];
  const randomLane = () => Math.floor(Math.random() * 3);

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    drawScene();
  }

  function project(x, y, z) {
    const focal = Math.min(width, height) * 0.95;
    const scale = focal / (z + 5.2);
    const horizon = height * 0.40;
    return {
      x: width * 0.5 + x * scale,
      y: horizon + 1.45 * scale - y * scale,
      scale
    };
  }

  function polygon(points, fill, stroke) {
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawCube(x, z, cubeWidth, cubeHeight, color, isPlayer = false) {
    const y = isPlayer ? jumpHeight : 0;
    const base = [
      project(x - cubeWidth / 2, y, z),
      project(x + cubeWidth / 2, y, z),
      project(x + cubeWidth / 2, y, z + cubeWidth * 0.58),
      project(x - cubeWidth / 2, y, z + cubeWidth * 0.58)
    ];
    const top = [
      project(x - cubeWidth / 2, y + cubeHeight, z),
      project(x + cubeWidth / 2, y + cubeHeight, z),
      project(x + cubeWidth / 2, y + cubeHeight, z + cubeWidth * 0.58),
      project(x - cubeWidth / 2, y + cubeHeight, z + cubeWidth * 0.58)
    ];

    polygon([base[1], base[2], top[2], top[1]], shade(color, -28), '#10132266');
    polygon([base[0], base[1], top[1], top[0]], color, '#ffffff28');
    polygon([top[0], top[1], top[2], top[3]], shade(color, 24), '#ffffff44');

    if (isPlayer) {
      const headCenter = project(x, y + cubeHeight + 0.32, z);
      const radius = Math.max(5, headCenter.scale * 0.23);
      ctx.fillStyle = '#ffd8bb';
      ctx.fillRect(headCenter.x - radius, headCenter.y - radius, radius * 2, radius * 2);
      ctx.fillStyle = '#20223a';
      ctx.fillRect(headCenter.x - radius * 0.5, headCenter.y - radius * 0.12, radius * 0.18, radius * 0.16);
      ctx.fillRect(headCenter.x + radius * 0.28, headCenter.y - radius * 0.12, radius * 0.18, radius * 0.16);
    }
  }

  function shade(hex, amount) {
    const value = hex.replace('#', '');
    const number = parseInt(value, 16);
    const r = Math.max(0, Math.min(255, (number >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((number >> 8) & 255) + amount));
    const b = Math.max(0, Math.min(255, (number & 255) + amount));
    return `rgb(${r},${g},${b})`;
  }

  function drawCoin(x, z) {
    const point = project(x, 0.8, z);
    const radius = Math.max(3, point.scale * 0.22);
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.scale(0.72, 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd767';
    ctx.shadowColor = '#ffd767';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fff3b4';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function drawScene() {
    if (!ctx || !width || !height) return;
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#13142e');
    sky.addColorStop(0.52, '#29244a');
    sky.addColorStop(1, '#101629');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 32; i++) {
      const x = (i * 97 + 23) % width;
      const y = (i * 41 + 17) % Math.max(1, height * 0.42);
      ctx.fillStyle = i % 4 === 0 ? '#ff8dd7' : '#c4f6ff';
      ctx.globalAlpha = 0.25 + ((i * 13) % 70) / 100;
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.globalAlpha = 1;

    const floorLeftFar = project(-4.4, 0, 42);
    const floorRightFar = project(4.4, 0, 42);
    const floorLeftNear = project(-4.4, 0, 0);
    const floorRightNear = project(4.4, 0, 0);
    polygon([floorLeftFar, floorRightFar, floorRightNear, floorLeftNear], '#171a32', '#68e4ed44');

    for (let laneLine = -3; laneLine <= 3; laneLine += 1.5) {
      const far = project(laneLine, 0, 42);
      const near = project(laneLine, 0, 0);
      ctx.beginPath();
      ctx.moveTo(far.x, far.y);
      ctx.lineTo(near.x, near.y);
      ctx.strokeStyle = laneLine === 0 ? '#ff73c855' : '#68e4ed30';
      ctx.lineWidth = laneLine === 0 ? 2 : 1;
      ctx.stroke();
    }

    const offset = distance % 4;
    for (let z = 4 - offset; z < 40; z += 4) {
      const left = project(-4.4, 0, z);
      const right = project(4.4, 0, z);
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.strokeStyle = '#ffffff10';
      ctx.stroke();
    }

    objects.slice().sort((a, b) => b.z - a.z).forEach((object) => {
      if (object.kind === 'coin') drawCoin(lanes[object.lane], object.z);
      else drawCube(lanes[object.lane], object.z, object.kind === 'barrier' ? 1.5 : 1.15, object.kind === 'barrier' ? 1.35 : 0.8, object.kind === 'barrier' ? '#fa5d9d' : '#9a7cff');
    });

    drawCube(lanes[lane], 0.5, 0.95, 1.05, '#68e4ed', true);

    const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, width * 0.72);
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, '#05061188');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  function updateHud() {
    const shownScore = worldType === 'coins' ? coins * 100 + Math.floor(distance * 5) : score;
    scoreLabel.textContent = `SCORE ${shownScore}`;
    livesLabel.textContent = `${'♥ '.repeat(Math.max(0, lives))}${'♡ '.repeat(3 - Math.max(0, lives))}`.trim();
  }

  function spawnObject() {
    const laneIndex = randomLane();
    if (worldType === 'coins') {
      if (Math.random() < 0.72) {
        objects.push({ kind: 'coin', lane: laneIndex, z: 35 });
      } else {
        objects.push({ kind: 'block', lane: laneIndex, z: 35 });
      }
      if (Math.random() < 0.42) {
        objects.push({ kind: 'coin', lane: randomLane(), z: 39 });
      }
    } else {
      objects.push({ kind: Math.random() < 0.42 ? 'barrier' : 'block', lane: laneIndex, z: 35 });
      if (Math.random() < 0.18) {
        const otherLane = (laneIndex + 1 + Math.floor(Math.random() * 2)) % 3;
        objects.push({ kind: 'block', lane: otherLane, z: 42 });
      }
    }
  }

  function endRun() {
    running = false;
    ended = true;
    cancelAnimationFrame(raf);
    overlayTitle.textContent = lives ? 'Run complete!' : 'Ouch, game over!';
    overlayText.textContent = worldType === 'coins'
      ? `You collected ${coins} coins and scored ${coins * 100 + Math.floor(distance * 5)}. Try again and beat your best!`
      : `You made it ${Math.floor(distance)} meters with ${score} points. Jump and switch lanes to dodge the blocks.`;
    startButton.textContent = 'Play again';
    overlay.classList.remove('hidden');
  }

  function tick(now) {
    if (!running) return;
    const dt = Math.min(0.04, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;
    const speed = 10 + Math.min(distance * 0.025, 8);
    distance += speed * dt;
    spawnClock += dt;
    const spawnEvery = Math.max(0.62, 1.18 - distance * 0.0015);
    if (spawnClock >= spawnEvery) {
      spawnClock = 0;
      spawnObject();
    }

    if (jumpHeight > 0 || jumpVelocity > 0) {
      jumpHeight += jumpVelocity * dt;
      jumpVelocity -= 18 * dt;
      if (jumpHeight <= 0) {
        jumpHeight = 0;
        jumpVelocity = 0;
      }
    }

    objects.forEach((object) => { object.z -= speed * dt; });
    objects = objects.filter((object) => {
      if (object.z < -1) return false;
      if (object.z <= 1.1 && object.z > -0.5 && object.lane === lane) {
        if (object.kind === 'coin') {
          coins += 1;
          score += 100;
          return false;
        }
        if (jumpHeight < (object.kind === 'barrier' ? 0.8 : 0.65)) {
          lives -= 1;
          score = Math.max(0, score - 50);
          if (lives <= 0) {
            updateHud();
            endRun();
          }
        } else {
          score += 25;
        }
        return false;
      }
      return true;
    });

    score += Math.floor(dt * 8);
    updateHud();
    drawScene();
    raf = requestAnimationFrame(tick);
  }

  function startRun() {
    cancelAnimationFrame(raf);
    score = 0;
    coins = 0;
    lives = 3;
    lane = 1;
    jumpHeight = 0;
    jumpVelocity = 0;
    spawnClock = 0;
    distance = 0;
    objects = [];
    ended = false;
    running = true;
    lastTime = performance.now();
    overlay.classList.add('hidden');
    updateHud();
    raf = requestAnimationFrame(tick);
  }

  function move(direction) {
    if (!running) return;
    if (direction === 'left') lane = Math.max(0, lane - 1);
    if (direction === 'right') lane = Math.min(2, lane + 1);
    if (direction === 'jump' && jumpHeight === 0) jumpVelocity = 8.8;
    drawScene();
  }

  function onKeyDown(event) {
    if (modal.classList.contains('hidden')) return;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'A', 'd', 'D'].includes(event.key)) event.preventDefault();
    if (event.repeat && ['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'A', 'd', 'D'].includes(event.key)) return;
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') move('left');
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') move('right');
    if (event.key === 'ArrowUp' || event.key === ' ') move('jump');
  }

  function closeWorld() {
    running = false;
    cancelAnimationFrame(raf);
    modal.classList.add('hidden');
  }

  function openWorld(type) {
    worldType = type;
    title.textContent = type === 'coins' ? 'Blocky Coin Dash' : 'Blocky Obby Rush';
    overlayTitle.textContent = 'Ready?';
    overlayText.textContent = type === 'coins'
      ? 'Collect the gold coins and avoid purple blocks. Grab as many as you can!'
      : 'Dodge chunky barriers, switch lanes, and jump over blocks. You have three hearts!';
    startButton.textContent = 'Start run';
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    resizeCanvas();
  }

  document.querySelectorAll('.launch-world').forEach((button) => {
    button.addEventListener('click', () => openWorld(button.dataset.world));
  });
  startButton.addEventListener('click', startRun);
  modal.querySelector('.world-close').addEventListener('click', closeWorld);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeWorld();
  });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', () => {
    if (!modal.classList.contains('hidden')) resizeCanvas();
  });
  modal.querySelectorAll('[data-control]').forEach((button) => {
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      move(button.dataset.control);
    });
  });
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWorld();
  });
})();
