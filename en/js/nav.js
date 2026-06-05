const TOTAL = 22;
let current = 0;
const visited = new Set([0]);
const completed = new Set();

function refreshPills() {
  const pills = document.querySelectorAll('.nav-pill');
  pills.forEach((p, i) => {
    p.classList.remove('active', 'done');
    if (completed.has(i) && i !== current) p.classList.add('done');
  });
  pills[current].classList.add('active');
  document.getElementById('progressFill').style.width = ((completed.size / TOTAL) * 100) + '%';
}

function goLesson(n) {
  document.getElementById('lesson-' + current).classList.remove('active');
  current = n;
  visited.add(n);
  document.getElementById('lesson-' + current).classList.add('active');
  refreshPills();
  updateIndicator();
  ignoreScrollUntil = performance.now() + 600;
  lastScrollY = 0;
  scrollAccum = 0;
  window.scrollTo(0, 0);
  initDemos();
  if (window._startAnimForLesson) window._startAnimForLesson(n);
}

document.querySelectorAll('.nav-pill').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    goLesson(i);
    if (window.innerWidth < 700) collapseNav(true);
  });
});

// ── NAV COLLAPSE ──
const NAV_LESSON_NAMES = [
  '1. Why run slowly?', '2. Heart & pulse', '3. Energy & fuel',
  '4. Lactate', '5. Breathing', '6. Heat & hydration',
  '7. Running technique', '8. How to improve?', '9. Methodologies',
  '10. Strength training', '11. Winter running', '12. First race',
  '13. VO₂max', '14. Running economy', '15. Fatigue',
  '16. Pace distribution', '17. Load management', '18. Pain or injury',
  '19. Motivation', '20. Running watches',
  '21. Sleep & recovery', '22. Daily nutrition'
];

// Drawer starts collapsed; always show indicator
let navCollapsed = true;
updateIndicator();

function collapseNav(force) {
  navCollapsed = (force !== undefined) ? force : !navCollapsed;
  const nav = document.getElementById('lessonNav');
  const btn = document.getElementById('navToggleBtn');
  nav.classList.toggle('nav-collapsed', navCollapsed);
  if (btn) btn.textContent = navCollapsed ? '☰ Lessons' : '✕ Close';
}

function updateIndicator() {
  const ind = document.getElementById('lessonIndicator');
  if (ind) ind.textContent = NAV_LESSON_NAMES[current] || '';
}

window.toggleNav = function() { collapseNav(); };

let lastScrollY = window.scrollY;
let scrollAccum = 0;
let ticking = false;
let ignoreScrollUntil = 0;
const COLLAPSE_THRESHOLD = 36;
const EXPAND_THRESHOLD   = 48;
const TOP_ZONE = 30;

function handleScroll() {
  const y = window.scrollY;
  const now = performance.now();

  if (now < ignoreScrollUntil) { lastScrollY = y; ticking = false; return; }

  if (window.innerWidth < 700) { lastScrollY = y; ticking = false; return; }

  const delta = y - lastScrollY;
  lastScrollY = y;

  if ((delta > 0 && scrollAccum < 0) || (delta < 0 && scrollAccum > 0)) scrollAccum = 0;
  scrollAccum += delta;

  if (scrollAccum > COLLAPSE_THRESHOLD && !navCollapsed) {
    collapseNav(true);
    ignoreScrollUntil = now + 320;
    scrollAccum = 0;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(handleScroll);
  }
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  if (e.key === 'ArrowRight' && current < TOTAL - 1) goLesson(current + 1);
  if (e.key === 'ArrowLeft' && current > 0) goLesson(current - 1);
});
