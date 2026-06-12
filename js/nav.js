const TOTAL = 22;
let current = 0;
const visited = new Set([0]);
const completed = new Set();

const LESSON_SLUGS = [
  'kodel-begti-letai',
  'sirdis-pulsas-zonos',
  'energija-ir-kuras',
  'laktatas',
  'kvepavimas-begant',
  'karstis-ir-hidratacija',
  'begimo-technika',
  'kaip-tobuleti',
  'treniruociu-sistemos',
  'jegos-treniruotes',
  'ziemos-begimas',
  'pirmos-varzybos',
  'vo2max',
  'begimo-ekonomija',
  'nuovargis',
  'tempo-paskirstymas',
  'kruvio-valdymas',
  'skausmas-ar-trauma',
  'motyvacija-ir-pastovumas',
  'begimo-laikrodziai',
  'miegas-ir-atsigavimas',
  'ka-valgyti-begikui'
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
  document.title = lessonTitle + ' — Bėgimo fiziologija | Begikas';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const lesson = document.getElementById('lesson-' + n);
    const intro = lesson && lesson.querySelector('.lesson-intro');
    metaDesc.content = intro ? intro.textContent.trim().slice(0, 160) : '';
  }
  if (typeof gtag === 'function') {
    /* virtual path: GA4 strips #fragments, so hash URLs all report as "/" */
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: location.origin + '/pamoka/' + LESSON_SLUGS[n]
    });
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
    history.pushState({ lesson: n }, '', '#pamoka/' + LESSON_SLUGS[n]);
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
  '1. Kodėl bėgame lėtai?','2. Širdis ir pulsas','3. Energija ir kuras',
  '4. Laktatas','5. Kvėpavimas','6. Karštis ir hidratacija',
  '7. Bėgimo technika','8. Kaip tobulėti?','9. Treniruočių sistemos',
  '10. Jėgos treniruotės','11. Žiemos bėgimas','12. Pirmos varžybos',
  '13. VO₂max','14. Bėgimo ekonomija','15. Nuovargis',
  '16. Tempo paskirstymas','17. Krūvio valdymas','18. Skausmas ar trauma',
  '19. Motyvacija','20. Bėgimo laikrodžiai',
  '21. Miegas ir atsigavimas','22. Kasdienė mityba'
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
  if (btn) btn.textContent = navCollapsed ? '☰ Pamokos' : '✕ Uždaryti';
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

// ── MOBILE BOTTOM ACTION BAR ──
(function () {
  const prev  = document.getElementById('mbPrev');
  const next  = document.getElementById('mbNext');
  const label = document.getElementById('mbLabel');
  const labelBtn = document.getElementById('mbLabelBtn');
  if (!prev || !next || !label || !labelBtn) return;

  function updateMobileBar() {
    label.textContent = (current + 1) + ' / ' + TOTAL;
    prev.disabled = current === 0;
    next.disabled = current === TOTAL - 1;
  }

  prev.addEventListener('click', () => { if (current > 0) goLesson(current - 1); });
  next.addEventListener('click', () => { if (current < TOTAL - 1) goLesson(current + 1); });
  labelBtn.addEventListener('click', () => collapseNav());

  const _goLesson = goLesson;
  goLesson = function (n, pushHistory) {
    _goLesson(n, pushHistory);
    updateMobileBar();
  };

  updateMobileBar();
})();
