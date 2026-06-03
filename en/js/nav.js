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
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initDemos();
  if (window._startAnimForLesson) window._startAnimForLesson(n);
}

document.querySelectorAll('.nav-pill').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    goLesson(i);
    // Auto-collapse after picking a lesson on small screens
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

let navCollapsed = false;

// Collapse immediately on mobile
const isMobile = window.innerWidth < 700;
if (isMobile) {
  document.getElementById('lessonNav').classList.add('nav-collapsed');
  navCollapsed = true;
  const btn = document.getElementById('navToggleBtn');
  if (btn) btn.textContent = '☰';
}

function collapseNav(force) {
  navCollapsed = (force !== undefined) ? force : !navCollapsed;
  const nav = document.getElementById('lessonNav');
  const btn = document.getElementById('navToggleBtn');
  const ind = document.getElementById('lessonIndicator');
  const lbl = document.getElementById('lessonCountLabel');
  nav.classList.toggle('nav-collapsed', navCollapsed);
  if (btn) btn.textContent = navCollapsed ? '☰' : '✕';
  if (ind) ind.style.opacity = navCollapsed ? '1' : '0';
  if (lbl) lbl.style.opacity = navCollapsed ? '0' : '1';
}

function updateIndicator() {
  const ind = document.getElementById('lessonIndicator');
  if (ind) ind.textContent = NAV_LESSON_NAMES[current] || '';
}

window.toggleNav = function() { collapseNav(); };

// Scroll-driven collapse with hysteresis + rAF debounce.
// Accumulates scroll direction so a single jitter pixel can't flip it,
// and ignores scroll events fired during the collapse animation.
let lastScrollY = window.scrollY;
let scrollAccum = 0;
let ticking = false;
let ignoreScrollUntil = 0;
const COLLAPSE_THRESHOLD = 36;  // px of sustained down-scroll before hiding
const EXPAND_THRESHOLD   = 48;  // px of sustained up-scroll before showing
const TOP_ZONE = 30;            // always show near top

function handleScroll() {
  const y = window.scrollY;
  const now = performance.now();

  // Skip events that fire while the nav is animating (prevents feedback loop)
  if (now < ignoreScrollUntil) { lastScrollY = y; ticking = false; return; }

  const delta = y - lastScrollY;
  lastScrollY = y;

  // Near the very top: always reveal
  if (y <= TOP_ZONE) {
    if (navCollapsed) { collapseNav(false); ignoreScrollUntil = now + 320; }
    scrollAccum = 0; ticking = false; return;
  }

  // Reset accumulator when direction flips
  if ((delta > 0 && scrollAccum < 0) || (delta < 0 && scrollAccum > 0)) scrollAccum = 0;
  scrollAccum += delta;

  if (scrollAccum > COLLAPSE_THRESHOLD && !navCollapsed) {
    collapseNav(true);
    ignoreScrollUntil = now + 320;
    scrollAccum = 0;
  } else if (scrollAccum < -EXPAND_THRESHOLD && navCollapsed) {
    collapseNav(false);
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

// Keyboard navigation (left/right arrows)
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  if (e.key === 'ArrowRight' && current < TOTAL - 1) goLesson(current + 1);
  if (e.key === 'ArrowLeft' && current > 0) goLesson(current - 1);
});
