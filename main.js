// Minimal starfield canvas & theme toggle
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStarfield();
  initDynamicYear();
});

// Theme switcher (persisted to localStorage)
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const favicon = document.getElementById('favicon');

  function updateThemeUI() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (toggleBtn) toggleBtn.textContent = isLight ? 'dark' : 'light';
    if (favicon) {
      const moonEmoji = isLight ? '🌒' : '🌘';
      favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${moonEmoji}</text></svg>`;
    }
  }

  updateThemeUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      updateThemeUI();
    });
  }
}

// Background starfield
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let stars = [];
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const STAR_COUNT = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 9000));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -2;
      this.size = Math.random() * 1.1 + 0.3;
      this.speed = Math.random() * 0.1 + 0.02;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.twinkle = Math.random() * 0.01 + 0.003;
      this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      if (!prefersReducedMotion) {
        this.y += this.speed;
        if (this.y > height + 5) {
          this.reset(false);
        }

        this.alpha += this.twinkle * this.twinkleDir;
        if (this.alpha > 0.8 || this.alpha < 0.15) {
          this.twinkleDir *= -1;
        }
      }
    }

    draw() {
      const px = this.x + mouseX * 0.015;
      const py = this.y + mouseY * 0.015;

      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(px, py, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    stars = Array.from({ length: STAR_COUNT }, () => new Star());
  }

  function render() {
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => {
    if (prefersReducedMotion) return;
    targetMouseX = (e.clientX - width / 2) * 0.3;
    targetMouseY = (e.clientY - height / 2) * 0.3;
  }, { passive: true });

  resize();
  render();
}

function initDynamicYear() {
  const el = document.getElementById('year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
}
