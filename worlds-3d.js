(() => {
  'use strict';
  const modal = document.createElement('div');
  modal.className = 'world-modal hidden';
  modal.id = 'worldModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = [
    '<section class="world-panel" aria-labelledby="worldGameTitle">',
    '<div class="world-panel-head"><div><div class="kicker">REAL THREE.JS WEBGL ARCADE</div><div class="world-panel-title" id="worldGameTitle">3D World</div><div class="world-panel-sub">Move: ← → or A/D · Jump: Space / ↑ · Touch buttons on mobile</div></div><button class="world-close" aria-label="Close world">×</button></div>',
    '<div class="world-canvas-wrap"><canvas class="world-canvas" aria-label="Interactive 3D arcade game"></canvas><div class="world-hud"><span id="worldScore">SCORE 0</span><span id="worldLives">♥ ♥ ♥</span></div><div class="world-overlay"><div class="world-overlay-box"><h3 id="worldOverlayTitle">Ready?</h3><p id="worldOverlayText">Run, jump, dodge obstacles, and collect items in a real 3D world.</p><button class="world-start">Start game</button></div></div></div>',
    '<div class="world-control-row"><span>Three.js WebGL · Original low-poly worlds · Best scores save on this device</span><div class="world-touch"><button data-control="left" aria-label="Move left">←</button><button data-control="jump" aria-label="Jump">↑</button><button data-control="right" aria-label="Move right">→</button></div></div>',
    '</section>'
  ].join('');
  document.body.append(modal);

  const canvas = modal.querySelector('canvas');
  const scoreLabel = modal.querySelector('#worldScore');
  const livesLabel = modal.querySelector('#worldLives');
  const overlay = modal.querySelector('.world-overlay');
  const overlayTitle = modal.querySelector('#worldOverlayTitle');
  const overlayText = modal.querySelector('#worldOverlayText');
  const startButton = modal.querySelector('.world-start');
  const title = modal.querySelector('#worldGameTitle');
  let THREE = null, renderer = null, scene = null, camera = null, clock = null;
  let player = null, obstacleGroup = null, running = false, raf = 0;
  let worldType = 'obby', score = 0, coins = 0, lives = 3, lane = 1;
  let jumpY = 0, jumpVelocity = 0, distance = 0, spawnClock = 0;
  const laneX = [-2.4, 0, 2.4];
  const bestKey = type => 'a-lots-3d-best-' + type;
  function readBest(type) {
    try {
      const value = Number(localStorage.getItem(bestKey(type)) || 0);
      return Number.isFinite(value) ? value : 0;
    } catch (error) {
      return 0;
    }
  }
  function writeBest(type, value) {
    try {
      localStorage.setItem(bestKey(type), String(value));
    } catch (error) {
      // High scores are optional; the game must remain playable without storage.
    }
  }

  function mat(color, roughness, metalness) {
    return new THREE.MeshStandardMaterial({ color: color, roughness: roughness === undefined ? 0.7 : roughness, metalness: metalness || 0.05 });
  }
  function box(parent, x, y, z, w, h, d, color) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function buildPlayer() {
    player = new THREE.Group();
    box(player, 0, 0.67, 0, 0.76, 0.9, 0.54, '#5ce1e6');
    box(player, 0, 1.36, 0, 0.58, 0.58, 0.58, '#ffd5b8');
    box(player, 0, 1.42, 0.3, 0.38, 0.1, 0.04, '#252b48');
    box(player, -0.48, 0.72, 0, 0.2, 0.66, 0.22, '#9b82ff');
    box(player, 0.48, 0.72, 0, 0.2, 0.66, 0.22, '#9b82ff');
    box(player, -0.19, 0.22, 0, 0.25, 0.44, 0.28, '#30385d');
    box(player, 0.19, 0.22, 0, 0.25, 0.44, 0.28, '#30385d');
    player.position.set(0, 0, 4);
    scene.add(player);
  }
  function buildScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#11152b');
    scene.fog = new THREE.Fog('#11152b', 22, 82);
    camera = new THREE.PerspectiveCamera(64, 1, 0.1, 120);
    camera.position.set(0, 5.2, 12.5);
    camera.lookAt(0, 1, -10);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    scene.add(new THREE.HemisphereLight('#b8d6ff', '#27203f', 2));
    const sun = new THREE.DirectionalLight('#fff0dc', 2.4);
    sun.position.set(-5, 13, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);
    const ground = new THREE.Mesh(new THREE.BoxGeometry(9, 0.4, 110), mat('#171d38'));
    ground.position.set(0, -0.35, -38);
    ground.receiveShadow = true;
    scene.add(ground);
    const grid = new THREE.GridHelper(100, 50, '#69dce9', '#30385b');
    grid.position.set(0, -0.13, -38);
    scene.add(grid);
    for (let i = 0; i < 34; i++) {
      const x = (i % 2 ? 1 : -1) * (6 + Math.random() * 13);
      const z = -Math.random() * 85;
      const h = 2 + Math.random() * 8;
      const tower = box(scene, x, h / 2 - 0.2, z, 1 + Math.random() * 2, h, 1 + Math.random() * 2, ['#22264b','#28375c','#3a2859','#1c4853'][i % 4]);
      tower.material.emissive = new THREE.Color(tower.material.color);
      tower.material.emissiveIntensity = 0.12;
    }
    const orb = new THREE.Mesh(new THREE.SphereGeometry(2.6, 20, 20), new THREE.MeshBasicMaterial({ color: '#8b76ff' }));
    orb.position.set(-10, 12, -48);
    scene.add(orb);
    obstacleGroup = new THREE.Group();
    scene.add(obstacleGroup);
    buildPlayer();
    clock = new THREE.Clock();
    resize();
  }
  function resize() {
    if (!renderer || !camera) return;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width), h = Math.max(1, rect.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  function spawnObject() {
    const x = laneX[Math.floor(Math.random() * 3)];
    const z = -43;
    if (worldType === 'coins' || worldType === 'crystals') {
      if (Math.random() < 0.72) {
        const color = worldType === 'coins' ? '#ffd15c' : '#52f2d2';
        const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.52, 1), mat(color, 0.22, 0.55));
        gem.position.set(x, 1.15, z);
        gem.userData.kind = 'pickup';
        obstacleGroup.add(gem);
      } else {
        const hazard = box(obstacleGroup, x, 0.8, z, 1.15, 1.6, 1.1, '#9a7cff');
        hazard.userData.kind = 'hazard';
      }
    } else if (worldType === 'sky') {
      const platform = box(obstacleGroup, x, -0.05, z, 2.0, 0.32, 2.4, Math.random() < 0.5 ? '#68e4ed' : '#9b82ff');
      platform.userData.kind = 'platform';
      if (Math.random() < 0.55) {
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.42), mat('#ffd15c', 0.25, 0.4));
        crystal.position.set(x, 0.85, z);
        crystal.userData.kind = 'pickup';
        obstacleGroup.add(crystal);
      }
    } else {
      const tall = Math.random() < 0.42;
      const hazard = box(obstacleGroup, x, tall ? 1.1 : 0.65, z, 1.25, tall ? 2.2 : 1.3, 1.25, tall ? '#ff6da9' : '#8b79ff');
      hazard.userData.kind = 'hazard';
    }
  }
  function disposeObject(obj) {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  }
  function clearObjects() {
    if (!obstacleGroup) return;
    while (obstacleGroup.children.length) {
      const obj = obstacleGroup.children[0];
      obstacleGroup.remove(obj);
      disposeObject(obj);
    }
  }
  function setHud() {
    const points = (worldType === 'coins' || worldType === 'crystals' || worldType === 'sky') ? coins * 100 + Math.floor(distance * 3) : score;
    scoreLabel.textContent = 'SCORE ' + points;
    livesLabel.textContent = '♥ '.repeat(Math.max(0, lives)) + '♡ '.repeat(3 - Math.max(0, lives));
  }
  function finish() {
    running = false;
    const points = (worldType === 'coins' || worldType === 'crystals' || worldType === 'sky') ? coins * 100 + Math.floor(distance * 3) : score;
    try {
      const old = readBest(worldType);
      if (points > old) writeBest(worldType, points);
    } catch (e) {}
    overlayTitle.textContent = lives > 0 ? 'Run complete!' : 'Game over!';
    overlayText.textContent = 'You scored ' + points + ' points. Best: ' + Math.max(points, readBest(worldType)) + '. Try another run.';
    startButton.textContent = 'Play again';
    overlay.classList.remove('hidden');
    setHud();
  }
  function update(dt) {
    const speed = 13 + Math.min(distance * 0.018, 9);
    distance += speed * dt;
    spawnClock += dt;
    if (spawnClock > Math.max(0.62, 1.18 - distance * 0.0012)) {
      spawnClock = 0;
      spawnObject();
    }
    if (jumpY > 0 || jumpVelocity > 0) {
      jumpY += jumpVelocity * dt;
      jumpVelocity -= 22 * dt;
      if (jumpY <= 0) { jumpY = 0; jumpVelocity = 0; }
    }
    player.position.x += (laneX[lane] - player.position.x) * Math.min(1, dt * 12);
    player.position.y = jumpY;
    player.rotation.z = (laneX[lane] - player.position.x) * -0.06;
    const children = obstacleGroup.children.slice();
    for (const obj of children) {
      obj.position.z += speed * dt;
      if (obj.position.z > 7) {
        obstacleGroup.remove(obj);
        disposeObject(obj);
        continue;
      }
      const sameLane = Math.abs(obj.position.x - player.position.x) < 0.95;
      const close = obj.position.z > 2.7 && obj.position.z < 5.5 && sameLane;
      if (!close) continue;
      if (obj.userData.kind === 'pickup') {
        coins += 1;
        score += 100;
        obstacleGroup.remove(obj);
        disposeObject(obj);
      } else if (obj.userData.kind === 'hazard') {
        if (jumpY < 1.15) {
          lives -= 1;
          score = Math.max(0, score - 50);
          obstacleGroup.remove(obj);
          disposeObject(obj);
          if (lives <= 0) { setHud(); finish(); return; }
        } else {
          score += 20;
          obstacleGroup.remove(obj);
          disposeObject(obj);
        }
      } else if (obj.userData.kind === 'platform' && jumpY < 0.2) {
        lives -= 1;
        obstacleGroup.remove(obj);
        disposeObject(obj);
        if (lives <= 0) { setHud(); finish(); return; }
      }
    }
    score += Math.floor(dt * 8);
    setHud();
  }
  function loop() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.04);
    update(dt);
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(loop);
  }
  function startRun() {
    if (!THREE || !renderer) return;
    cancelAnimationFrame(raf);
    clearObjects();
    score = 0; coins = 0; lives = 3; lane = 1; jumpY = 0; jumpVelocity = 0; distance = 0; spawnClock = 0;
    player.position.set(0, 0, 4);
    player.rotation.set(0, 0, 0);
    running = true;
    clock.start();
    overlay.classList.add('hidden');
    setHud();
    raf = requestAnimationFrame(loop);
  }
  function move(direction) {
    if (!running) return;
    if (direction === 'left') lane = Math.max(0, lane - 1);
    if (direction === 'right') lane = Math.min(2, lane + 1);
    if (direction === 'jump' && jumpY === 0 && jumpVelocity === 0) jumpVelocity = 9.2;
  }
  function onKeyDown(event) {
    if (modal.classList.contains('hidden')) return;
    const key = event.key.toLowerCase();
    if (['arrowleft','arrowright','arrowup',' ','a','d'].includes(key)) event.preventDefault();
    if (event.repeat && ['arrowleft','arrowright','arrowup',' ','a','d'].includes(key)) return;
    if (key === 'arrowleft' || key === 'a') move('left');
    if (key === 'arrowright' || key === 'd') move('right');
    if (key === 'arrowup' || key === ' ') move('jump');
  }
  async function openWorld(type) {
    worldType = type;
    title.textContent = ({obby:'Blocky Obby Rush',coins:'Blocky Coin Dash',sky:'Sky Steps 3D',crystals:'Crystal Sprint 3D'})[type];
    overlayTitle.textContent = 'Loading 3D world…';
    overlayText.textContent = 'Starting the Three.js WebGL renderer.';
    startButton.disabled = true;
    startButton.textContent = 'Loading…';
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    try {
      if (!THREE) {
        THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
        buildScene();
      } else resize();
      const best = readBest(type);
      overlayTitle.textContent = 'Ready?';
      overlayText.textContent = ({
        obby:'Jump over pink barriers and dodge purple blocks. Three hearts. How far can you go?',
        coins:'Collect gold coins, avoid blocks, and build the biggest score.',
        sky:'Jump over the floating platforms and avoid falling gaps. Keep moving!',
        crystals:'Grab turquoise crystals and weave around purple hazards.'
      })[type] + ' Best: ' + best;
      startButton.textContent = 'Start game';
      startButton.disabled = false;
      resize();
      renderer.render(scene, camera);
    } catch (error) {
      console.error('3D engine failed to load:', error);
      overlayTitle.textContent = '3D could not start';
      overlayText.textContent = 'Three.js could not load. Check internet access and WebGL support, then try again.';
      startButton.textContent = 'Try again';
      startButton.disabled = false;
    }
  }
  function closeWorld() {
    running = false;
    cancelAnimationFrame(raf);
    modal.classList.add('hidden');
  }
  document.querySelectorAll('.launch-world').forEach(button => button.addEventListener('click', () => openWorld(button.dataset.world)));
  startButton.addEventListener('click', startRun);
  modal.querySelector('.world-close').addEventListener('click', closeWorld);
  modal.addEventListener('click', event => { if (event.target === modal) closeWorld(); });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', resize);
  modal.querySelectorAll('[data-control]').forEach(button => button.addEventListener('pointerdown', event => {
    event.preventDefault();
    move(button.dataset.control);
  }));
  new MutationObserver(() => {
    if (modal.classList.contains('hidden')) {
      running = false;
      cancelAnimationFrame(raf);
    }
  }).observe(modal, { attributes: true, attributeFilter: ['class'] });
})();