/* ── LANDING ↔ LESSONS STATE ── */
const landingEl = document.getElementById('landing');
const mainEl    = document.querySelector('main');

function enterLessons(lessonIndex) {
  landingEl.style.display = 'none';
  mainEl.style.display    = 'block';
  goLesson(lessonIndex !== undefined ? lessonIndex : 0);
  window.scrollTo(0, 0);
}

function enterLanding() {
  mainEl.style.display    = 'none';
  landingEl.style.display = 'block';
  window.scrollTo(0, 0);
}

window.startCourse = enterLessons;

/* Brand name → back to landing */
const brand = document.querySelector('.topnav-brand');
if (brand) {
  brand.style.cursor = 'pointer';
  brand.addEventListener('click', enterLanding);
}

/* Lesson cards in strip */
document.querySelectorAll('[data-start-lesson]').forEach(card => {
  card.addEventListener('click', () => enterLessons(+card.dataset.startLesson));
});

/* ── SCROLL REVEAL ── */
const lpIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    if (el.classList.contains('lp-reveal')) {
      el.classList.add('lp-vis');
    }
    if (el.classList.contains('lp-zone-row')) {
      const idx = [...el.parentElement.children].indexOf(el);
      setTimeout(() => el.classList.add('lp-vis'), idx * 110);
    }
    if (el.classList.contains('lp-topic-card')) {
      const idx = [...el.parentElement.children].indexOf(el);
      setTimeout(() => el.classList.add('lp-vis'), idx * 55);
    }
    if (el.classList.contains('lp-how-step')) {
      const idx = [...el.parentElement.children].indexOf(el);
      setTimeout(() => el.classList.add('lp-vis'), idx * 120);
    }
    lpIO.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.lp-reveal, .lp-zone-row, .lp-topic-card, .lp-how-step'
).forEach(el => lpIO.observe(el));

/* ── LESSON STRIP STAGGER ── */
const stripIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.lp-lcard').forEach((c, i) => {
      setTimeout(() => c.classList.add('lp-vis'), i * 35);
    });
    stripIO.unobserve(entry.target);
  });
}, { threshold: 0.04 });

const lpTrack = document.getElementById('lpLessonTrack');
if (lpTrack) stripIO.observe(lpTrack);

/* ── STAT COUNTERS ── */
function countUp(el) {
  const target = +el.dataset.to;
  const sfx    = el.dataset.sfx || '';
  const dur    = 900;
  const t0     = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * e) + sfx;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
setTimeout(() => {
  document.querySelectorAll('[data-to]').forEach(countUp);
}, 1400);
