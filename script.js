
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 8 + 'px';
    cursor.style.top = my - 8 + 'px';
  });
  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx - 20 + 'px';
    trail.style.top = ty - 20 + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });

  // Typewriter
  const words = ['Engineer', 'Problem Solver', 'Creator', 'Innovator'];
  let wi = 0, ci = 0, deleting = false;
  const tw = document.getElementById('typewriter');
  function type() {
    const w = words[wi];
    if (!deleting) {
      tw.textContent = w.slice(0, ++ci);
      if (ci === w.length) { deleting = true; setTimeout(type, 1600); return; }
    } else {
      tw.textContent = w.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();

  // Scroll reveal + skill bars
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => obs.observe(r));

  // Particle sparkle on click
  document.addEventListener('click', e => {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:6px;height:6px;border-radius:50%;
        background:hsl(${Math.random()*360},100%,70%);
        pointer-events:none;z-index:9999;
        transition:all 0.6s ease;
      `;
      document.body.appendChild(p);
      const a = Math.random() * Math.PI * 2;
      const d = 40 + Math.random() * 60;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(a)*d}px, ${Math.sin(a)*d}px)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 700);
    }
  });