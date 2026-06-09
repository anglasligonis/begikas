const TOTAL = 22;
let current = 0;
const visited = new Set([0]);
const completed = new Set();

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

function refreshPills() {
  const pills = document.querySelectorAll('.nav-pill');
  pills.forEach((p, i) => {
    p.classList.remove('active', 'done');
    if (completed.has(i) && i !== current) p.classList.add('done');
  });
  pills[current].classList.add('active');
  document.getElementById('progressFill').style.width = ((completed.size / TOTAL) * 100) + '%';
}

function _updateMeta(n) {
  const lessonTitle = NAV_LESSON_NAMES[n].replace(/^\d+\. /, '');
  document.title = lessonTitle + ' — Running Physiology | Begikas';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const lesson = document.getElementById('lesson-' + n);
    const intro = lesson && lesson.querySelector('.lesson-intro');
    metaDesc.content = intro ? intro.textContent.trim().slice(0, 160) : '';
  }
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
  }
}

function goLesson(n, pushHistory) {
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

  if (pushHistory !== false) {
    history.pushState({ lesson: n }, '', '#lesson/' + LESSON_SLUGS[n]);
  }
  _updateMeta(n);
}

document.querySelectorAll('.nav-pill').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const main = document.querySelector('main');
    if (main && main.style.display === 'none' && typeof enterLessons === 'function') {
      enterLessons(i);
    } else {
      goLesson(i);
    }
    if (window.innerWidth < 700) collapseNav(true);
  });
});

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

// ── POPSTATE (browser back/forward) ──
window.addEventListener('popstate', e => {
  const s = e.state;
  if (s && typeof s.lesson === 'number') {
    const landingEl = document.getElementById('landing');
    const mainEl = document.querySelector('main');
    if (landingEl && landingEl.style.display !== 'none') {
      landingEl.style.display = 'none';
      if (mainEl) mainEl.style.display = 'block';
    }
    document.body.classList.add('lessons-on');
    goLesson(s.lesson, false);
  } else if (s && s.landing) {
    if (typeof enterLanding === 'function') enterLanding(false);
  }
});

// ── SCROLL COLLAPSE ──
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
  if (!ticking) { ticking = true; requestAnimationFrame(handleScroll); }
}, { passive: true });

// ── KEYBOARD NAVIGATION ──
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
  if (e.key === 'ArrowRight' && current < TOTAL - 1) goLesson(current + 1);
  if (e.key === 'ArrowLeft' && current > 0) goLesson(current - 1);
});
