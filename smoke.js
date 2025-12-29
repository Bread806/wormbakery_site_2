// Lightweight canvas-based colorful smoke (particle-based)
(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'smokeCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0;
  function resize() {
    const ratio = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // Pre-render a white blurred circle sprite to an offscreen canvas
  const SPRITE = document.createElement('canvas');
  const SPR_SIZE = 256;
  SPRITE.width = SPR_SIZE;
  SPRITE.height = SPR_SIZE;
  const sctx = SPRITE.getContext('2d');
  // radial gradient white -> transparent
  const g = sctx.createRadialGradient(SPR_SIZE/2, SPR_SIZE/2, 0, SPR_SIZE/2, SPR_SIZE/2, SPR_SIZE/2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  sctx.fillStyle = g;
  sctx.fillRect(0,0,SPR_SIZE,SPR_SIZE);

  // Particle system
  const particles = [];
  const MAX_PARTICLES = 320; // cap for performance
  const spawnPerFrame = 2; // tune for density

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function spawn() {
    for (let i=0;i<spawnPerFrame && particles.length < MAX_PARTICLES;i++){
      const p = {
        x: W - rand(0, 140),
        y: H - rand(0, 120),
        vx: -rand(0.15, 1.2) * (0.6 + Math.random()),
        vy: -rand(0.1, 1.0) * (0.6 + Math.random()),
        size: rand(80, 240),
        life: rand(4.5, 12.5),
        age: 0,
        hue: rand(0, 360),
        blur: rand(10, 36),
        drift: rand(-0.15, 0.15)
      };
      particles.push(p);
    }
  }

  let last = performance.now();
  function step(now){
    const dt = (now - last) / 1000;
    last = now;
    // clear with low alpha to create trailing effect
    ctx.clearRect(0,0,W,H);

    spawn();

    // draw particles
    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length -1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      if (p.age >= p.life) { particles.splice(i,1); continue; }

      // update
      p.x += p.vx + p.drift * dt * 60;
      p.y += p.vy + (-0.02 + Math.sin(p.age*0.6)*0.2);
      p.vx *= 0.998; p.vy *= 0.998;
      p.size *= 1 + dt*0.02;

      const t = p.age / p.life;
      const alpha = Math.max(0, 1 - t);

      // draw tinted blurred sprite using ctx.filter
      ctx.save();
      ctx.globalAlpha = alpha * 0.9;
      ctx.filter = `hue-rotate(${Math.round(p.hue + t*180)}deg) blur(${p.blur}px) saturate(1.4)`;
      const drawSize = p.size;
      ctx.drawImage(SPRITE, p.x - drawSize/2, p.y - drawSize/2, drawSize, drawSize);
      ctx.restore();
    }

    requestAnimationFrame(step);
  }

  // reduce work on mobile
  function isMobile(){ return /Mobi|Android/i.test(navigator.userAgent); }
  if (isMobile()){
    // make lighter for mobile
    spawnPerFrame = 1;
  }

  requestAnimationFrame(step);
})();
