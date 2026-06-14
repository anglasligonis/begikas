/* Calculator hub — apiebegima.lt (/en/calculators/)
   Heart-rate zones (Karvonen), training paces (Daniels/Gilbert VDOT), race-time prediction (Riegel). */
(function () {
  if (!document.querySelector('.calc-page')) return;

  /* ── localizable strings ── */
  var T = {
    methodOff: 'a percentage of maximum heart rate',
    methodOn: 'heart-rate reserve (Karvonen method, using resting HR)',
    yourResult: ' · your result',
    bpm: 'bpm',
    minkm: 'min/km',
    zones: [
      { k: 1, name: 'Recovery',     desc: 'very easy',           lo: .50, hi: .60, c: '--z1' },
      { k: 2, name: 'Aerobic base', desc: 'conversational pace', lo: .60, hi: .70, c: '--z2' },
      { k: 3, name: 'Aerobic',      desc: 'grey zone',           lo: .70, hi: .80, c: '--z3' },
      { k: 4, name: 'Threshold',    desc: 'genuinely hard',      lo: .80, hi: .90, c: '--z4' },
      { k: 5, name: 'Maximum',      desc: 'intervals',           lo: .90, hi: 1.00, c: '--z5' }
    ],
    paces: [
      { n: 'Easy',       k: 'E', lo: .62, hi: .70, c: '--z2', d: 'aerobic base' },
      { n: 'Marathon',   k: 'M', lo: .79, hi: .79, c: '--z3', d: 'sustained long pace' },
      { n: 'Threshold',  k: 'T', lo: .86, hi: .86, c: '--z3', d: '~20–40 min steady' },
      { n: 'Interval',   k: 'I', lo: .97, hi: .97, c: '--z4', d: 'VO₂max stimulus' },
      { n: 'Repetition', k: 'R', lo: 1.04, hi: 1.04, c: '--z5', d: 'speed, economy' }
    ],
    dists: [
      { n: '5 km', m: 5000 }, { n: '10 km', m: 10000 },
      { n: 'Half marathon', m: 21097.5 }, { n: 'Marathon', m: 42195 }
    ]
  };

  calcInit(T);
})();

function calcInit(T) {
  var $ = function (s) { return document.querySelector(s); };

  /* ── tabs ── */
  document.querySelectorAll('.calc-tab').forEach(function (t) {
    t.addEventListener('click', function () {
      document.querySelectorAll('.calc-tab').forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      document.querySelectorAll('.calc-card').forEach(function (c) { c.classList.remove('show'); });
      var id = { hr: 'calc-hr', pace: 'calc-pace', pred: 'calc-pred' }[t.dataset.t];
      var el = document.getElementById(id);
      el.style.animation = 'none'; void el.offsetHeight; el.style.animation = '';
      el.classList.add('show');
    });
  });

  /* ── HR zones (Karvonen / %HRmax) ── */
  var age = $('#calcAge'), rest = $('#calcRest'), useRest = $('#calcUseRest');
  function hr() {
    var a = +age.value, hrmax = 220 - a, hrrest = +rest.value, on = useRest.checked;
    $('#calcAgeOut').textContent = a;
    $('#calcRestOut').textContent = hrrest;
    $('#calcHrmaxOut').textContent = hrmax;
    $('#calcMethodOut').textContent = on ? T.methodOn : T.methodOff;
    var bpm = function (p) { return on ? Math.round(p * (hrmax - hrrest) + hrrest) : Math.round(p * hrmax); };
    $('#calcZbar').innerHTML = T.zones.map(function (z) { return '<i style="background:var(' + z.c + ')"></i>'; }).join('');
    $('#calcZones').innerHTML = T.zones.map(function (z) {
      return '<div class="calc-zrow" style="background:var(' + z.c + 'bg)">' +
        '<span class="calc-zdot" style="background:var(' + z.c + ')"></span>' +
        '<span class="calc-zname"><b>Z' + z.k + ' · ' + z.name + '</b><small>' +
        Math.round(z.lo * 100) + '–' + Math.round(z.hi * 100) + '% · ' + z.desc + '</small></span>' +
        '<span class="calc-zval">' + bpm(z.lo) + '–' + bpm(z.hi) + '<em>' + T.bpm + '</em></span></div>';
    }).join('');
  }
  [age, rest].forEach(function (e) { e.addEventListener('input', hr); });
  useRest.addEventListener('change', function () {
    rest.disabled = !useRest.checked;
    $('#calcRestField').style.opacity = useRest.checked ? 1 : .4;
    hr();
  });

  /* ── time helpers ── */
  function parseT(s) {
    var p = String(s).trim().split(':').map(function (x) { return x.trim(); });
    if (p.some(function (x) { return x === '' || isNaN(x); })) return null;
    var sec = 0; for (var i = 0; i < p.length; i++) sec = sec * 60 + +p[i];
    return (p.length >= 2 && sec > 0) ? sec : null;
  }
  function fmt(sec) {
    sec = Math.round(sec);
    var h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return h > 0 ? h + ':' + pad(m) + ':' + pad(s) : m + ':' + pad(s);
  }

  /* ── Daniels / Gilbert VDOT ── */
  function vo2(v) { return -4.60 + 0.182258 * v + 0.000104 * v * v; }
  function pctMax(tmin) { return 0.8 + 0.1894393 * Math.exp(-0.012778 * tmin) + 0.2989558 * Math.exp(-0.1932605 * tmin); }
  function velFor(target) {
    var a = 0.000104, b = 0.182258, c = -(4.60 + target);
    return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  }
  function calcPace() {
    var d = +$('#calcPDist').value, t = parseT($('#calcPTime').value);
    $('#calcPWarn').classList.toggle('show', !t);
    if (!t) return;
    var v = d / (t / 60), VDOT = vo2(v) / pctMax(t / 60);
    $('#calcVdotOut').textContent = VDOT.toFixed(1);
    $('#calcPaces').innerHTML = T.paces.map(function (p) {
      var pl = 1000 / velFor(p.lo * VDOT) * 60, ph = 1000 / velFor(p.hi * VDOT) * 60;
      var val = p.lo === p.hi ? fmt(pl) : fmt(ph) + '–' + fmt(pl);
      return '<div class="calc-prow" style="background:var(' + p.c + 'bg);border-left-color:var(' + p.c + ')">' +
        '<span class="calc-pdot" style="background:var(' + p.c + ')"></span>' +
        '<span class="calc-pname"><b>' + p.n + ' (' + p.k + ')</b><small>' + p.d + '</small></span>' +
        '<span class="calc-pval">' + val + '<em>' + T.minkm + '</em></span></div>';
    }).join('');
  }
  $('#calcPDist').addEventListener('change', calcPace);
  $('#calcPTime').addEventListener('input', calcPace);

  /* ── Riegel predictor ── */
  function calcPred() {
    var d1 = +$('#calcRDist').value, t1 = parseT($('#calcRTime').value);
    $('#calcRWarn').classList.toggle('show', !t1);
    if (!t1) return;
    $('#calcPreds').innerHTML = T.dists.map(function (D) {
      var same = Math.abs(D.m - d1) < 1;
      var t2 = same ? t1 : t1 * Math.pow(D.m / d1, 1.06);
      var pk = t2 / (D.m / 1000);
      return '<div class="calc-prow" style="' + (same ? 'border-left-color:var(--pulse);background:var(--z5bg)' : '') + '">' +
        '<span class="calc-pdot" style="background:' + (same ? 'var(--pulse)' : 'var(--ink)') + '"></span>' +
        '<span class="calc-pname"><b>' + D.n + (same ? T.yourResult : '') + '</b><small>' + fmt(pk) + ' ' + T.minkm + '</small></span>' +
        '<span class="calc-pval">' + fmt(t2) + '</span></div>';
    }).join('');
  }
  $('#calcRDist').addEventListener('change', calcPred);
  $('#calcRTime').addEventListener('input', calcPred);

  hr(); calcPace(); calcPred();

  /* deep-link: /en/calculators/#pace or #pred opens that calculator */
  var openHash = location.hash.replace('#', '');
  if (openHash) {
    var tab = document.querySelector('.calc-tab[data-t="' + openHash + '"]');
    if (tab) tab.click();
  }
}
