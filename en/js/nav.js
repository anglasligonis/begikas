const TOTAL = 22;
const LESSON_BASE = '/en/lesson/';
const LS_KEY = 'begikas-completed-en';
/* Set by an inline script on lesson pages; -1 on the landing page */
const current = (typeof window.LESSON === 'number') ? window.LESSON : -1;

const LESSON_SLUGS = [
  'why-run-slowly',
  'heart-and-pulse',
  'energy-and-fuel',
  'lactate',
  'breathing',
  'heat-and-hydration',
  'running-technique',
  'how-to-improve',
  'training-systems',
  'strength-training',
  'winter-running',
  'first-race',
  'vo2max',
  'running-economy',
  'fatigue',
  'pace-distribution',
  'load-management',
  'pain-or-injury',
  'motivation',
  'running-watches',
  'sleep-and-recovery',
  'daily-nutrition'
];

let completed = new Set();
try { completed = new Set(JSON.parse(localStorage.getItem(LS_KEY) || '[]')); } catch (e) {}

function goLesson(n) {
  if (n >= 0 && n < TOTAL) location.href = LESSON_BASE + LESSON_SLUGS[n] + '/';
}

function refreshPills() {
  try { localStorage.setItem(LS_KEY, JSON.stringify([...completed])); } catch (e) {}
  const pills = document.querySelectorAll('.nav-pill');
  pills.forEach((p, i) => {
    p.classList.remove('active', 'done');
    if (completed.has(i) && i !== current) p.classList.add('done');
  });
  if (current >= 0 && pills[current]) pills[current].classList.add('active');
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = ((completed.size / TOTAL) * 100) + '%';
}

// ── NAV COLLAPSE ──
const NAV_LESSON_NAMES = [
  '1. Why run slowly?', '2. Heart & pulse', '3. Energy & fuel',
  '4. Lactate', '5. Breathing', '6. Heat & hydration',
  '7. Running technique', '8. How to improve?', '9. Training systems',
  '10. Strength training', '11. Winter running', '12. First race',
  '13. VO₂max', '14. Running economy', '15. Fatigue',
  '16. Pace distribution', '17. Load management', '18. Pain or injury',
  '19. Motivation', '20. Running watches',
  '21. Sleep & recovery', '22. Daily nutrition'
];

/* Pill titles — shown when the nav is docked as a sidebar on wide screens */
document.querySelectorAll('.nav-pill').forEach((p, i) => {
  const title = (NAV_LESSON_NAMES[i] || '').replace(/^\d+\. /, '');
  p.innerHTML = '<span class="pill-num">' + p.textContent + '</span><span class="pill-title">' + title + '</span>';
});

let navCollapsed = true;
updateIndicator();
refreshPills();

function collapseNav(force) {
  navCollapsed = (force !== undefined) ? force : !navCollapsed;
  const nav = document.getElementById('lessonNav');
  const btn = document.getElementById('navToggleBtn');
  nav.classList.toggle('nav-collapsed', navCollapsed);
  if (btn) btn.textContent = navCollapsed ? '☰ Lessons' : '✕ Close';
}

function updateIndicator() {
  const ind = document.getElementById('lessonIndicator');
  if (ind) ind.textContent = current >= 0 ? (NAV_LESSON_NAMES[current] || '') : '';
}

window.toggleNav = function() { collapseNav(); };

// ── SCROLL COLLAPSE ──
let lastScrollY = window.scrollY;
let scrollAccum = 0;
let ticking = false;
let ignoreScrollUntil = 0;
const COLLAPSE_THRESHOLD = 36;

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
  if (!ticking) { ticking = true; requestAnimationFrame(handleScroll); }
}, { passive: true });

// ── KEYBOARD NAVIGATION ──
document.addEventListener('keydown', (e) => {
  if (current < 0) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  if (e.key === 'ArrowRight' && current < TOTAL - 1) goLesson(current + 1);
  if (e.key === 'ArrowLeft' && current > 0) goLesson(current - 1);
});

// ── MOBILE BOTTOM ACTION BAR ──
(function () {
  const prev  = document.getElementById('mbPrev');
  const next  = document.getElementById('mbNext');
  const label = document.getElementById('mbLabel');
  const labelBtn = document.getElementById('mbLabelBtn');
  if (!prev || !next || !label || !labelBtn || current < 0) return;

  label.textContent = (current + 1) + ' / ' + TOTAL;
  prev.disabled = current === 0;
  next.disabled = current === TOTAL - 1;

  prev.addEventListener('click', () => { if (current > 0) goLesson(current - 1); });
  next.addEventListener('click', () => { if (current < TOTAL - 1) goLesson(current + 1); });
  labelBtn.addEventListener('click', () => collapseNav());
})();
