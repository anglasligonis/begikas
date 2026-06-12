/* ── SCROLL REVEAL ── */
const lpIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('lp-reveal')) el.classList.add('lp-vis');
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
