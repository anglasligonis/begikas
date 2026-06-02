// ── DEMO 1: Fiber recruitment ──
function initDemo1() {
  const sl = document.getElementById('s1');
  function update() {
    const v = parseInt(sl.value);
    const labels = ['Easy run', 'Moderate pace', 'Threshold pace', 'Very hard', 'Sprint'];
    const fib1 = [100, 90, 70, 45, 20];
    const fib2 = [0, 10, 30, 55, 80];
    const fuels = ['Fat', 'Fat + glycogen', 'Glycogen', 'Glycogen', 'Glycogen'];
    const descs = [
      'Almost exclusively Type I (slow) fibres are working. Using oxygen, they efficiently burn fat. You can run for hours.',
      'Most Type I fibres, a few IIa. Mixed fuel. A good intensity ceiling for most training runs.',
      'Type IIa fibres kick in strongly. Glycogen becomes the primary fuel. Sustainable, but it takes effort.',
      'All IIa and some IIx fibres active. Glycogen burns rapidly. Lactate accumulates.',
      'Maximum activation of all fibres. Glycogen depletes very quickly. Sustainable only for seconds–minutes.'
    ];
    document.getElementById('s1-label').textContent = labels[v - 1];
    document.getElementById('s1-fib1').textContent = fib1[v - 1] + '%';
    document.getElementById('s1-fib2').textContent = fib2[v - 1] + '%';
    document.getElementById('s1-fuel').textContent = fuels[v - 1];
    document.getElementById('s1-fuel').style.color = v <= 2 ? '#f59e0b' : '#3b82f6';
    document.getElementById('s1-desc').textContent = descs[v - 1];
    // SVG bars
    document.getElementById('fib2a-bar').setAttribute('width', (fib2[v-1] * 0.15).toFixed(1));
    document.getElementById('fib2x-bar').setAttribute('width', (Math.max(0, fib2[v-1] - 30) * 0.2).toFixed(1));
    const quadColor = v <= 2 ? '#dbeafe' : v === 3 ? '#fef3c7' : v === 4 ? '#fee2e2' : '#fca5a5';
    document.getElementById('quad-fill').style.fill = quadColor;
    document.getElementById('calf-fill').style.fill = quadColor;
  }
  sl.addEventListener('input', update);
  update();
}

// ── DEMOS 2–19: stubs (translated per lesson) ──
// ── DEMO 2: HR zones ──
function initDemo2() {
  const ageS = document.getElementById('s2-age-sl');
  const intS = document.getElementById('s2-int');
  function update() {
    const age = parseInt(ageS.value);
    const pct = parseInt(intS.value);
    const maxHr = 220 - age;
    const hr = Math.round(maxHr * pct / 100);
    document.getElementById('s2-age').textContent = age + ' years';
    document.getElementById('s2-maxhr').textContent = maxHr;
    document.getElementById('s2-curhr').textContent = hr;
    document.getElementById('s2-pct').textContent = pct + '%';

    let zone, color, desc;
    if (pct < 60) { zone = 'Z1 — Active recovery'; color = '#94a3b8';
      desc = 'Very easy pace. Good for recovery days. Muscles barely need glycogen.'; }
    else if (pct < 70) { zone = 'Z2 — Aerobic base'; color = 'var(--z2)';
      desc = '80% of all training should be here. You can hold a conversation. Builds your aerobic base and trains muscles to burn fat.'; }
    else if (pct < 80) { zone = 'Z3 — Aerobic tempo'; color = '#84cc16';
      desc = '"Grey zone." Too hard for easy recovery, too easy for real speed gains. Useful in moderation.'; }
    else if (pct < 90) { zone = 'Z4 — Lactate threshold'; color = 'var(--z3)';
      desc = 'Discomfort zone. A pace you can sustain for only 20–40 min. Very effective for raising your threshold. Use sparingly.'; }
    else { zone = 'Z5 — VO₂ Max zone'; color = 'var(--z4)';
      desc = 'Maximum intensity. Sustainable for only 30 s – 3 min. Used in intervals. Drains you quickly.'; }

    document.getElementById('s2-zone-label').textContent = zone;
    document.getElementById('s2-zone-label').style.color = color;
    document.getElementById('s2-curhr').style.color = color;
    document.getElementById('s2-desc').textContent = desc;

    // marker position: 50% maps to left:0, 100% maps to left:100%
    const markerPct = ((pct - 50) / 50) * 100;
    document.getElementById('s2-marker').style.left = Math.min(97, Math.max(1, markerPct)) + '%';
  }
  ageS.addEventListener('input', update);
  intS.addEventListener('input', update);
  update();
}
// ── DEMO 3: Fuel tank ──
function initDemo3() {
  const intS = document.getElementById('s3-int');
  const durS = document.getElementById('s3-dur');
  const intLabels = ['Easy (Z2)', 'Moderate (Z3)', 'Hard (Z4)', 'Very hard', 'Sprint'];
  const fatPcts = [80, 55, 25, 8, 0];
  const depletionPerMin = [0.25, 0.55, 1.1, 1.8, 3.0];
  function update() {
    const iv = parseInt(intS.value) - 1;
    const dur = parseInt(durS.value);
    document.getElementById('s3-int-label').textContent = intLabels[iv];
    document.getElementById('s3-dur-label').textContent = dur + ' min';
    const fat = fatPcts[iv];
    const carb = 100 - fat;
    const glyUsed = depletionPerMin[iv] * dur;
    const glyLeft = Math.max(0, 100 - glyUsed);
    const wallMin = glyLeft <= 0 ? dur : Math.round(100 / depletionPerMin[iv]);
    document.getElementById('s3-fatpct').textContent = fat + '%';
    document.getElementById('s3-carpct').textContent = carb + '%';
    document.getElementById('s3-gly-pct').textContent = Math.round(glyLeft) + '%';
    const fillEl = document.getElementById('s3-gly-fill');
    fillEl.style.width = glyLeft + '%';
    fillEl.style.background = glyLeft > 50 ? '#3b82f6' : glyLeft > 20 ? '#f59e0b' : '#ef4444';
    document.getElementById('s3-gly-label').textContent = glyLeft <= 0 ? 'DEPLETED' : glyLeft < 20 ? 'Critical' : glyLeft < 50 ? 'Low' : 'Sufficient';
    document.getElementById('s3-fat-fill').style.width = (fat > 0 ? 100 : 15) + '%';
    document.getElementById('s3-fat-label').textContent = fat > 50 ? 'Active (primary)' : fat > 0 ? 'Active (secondary)' : 'Minimal';
    document.getElementById('s3-wall').textContent = depletionPerMin[iv] > 0 ? wallMin + ' min' : '—';
    document.getElementById('s3-wall').style.color = wallMin < dur ? '#ef4444' : 'var(--text)';
    const descs = [
      `Easy pace: ${fat}% of fuel from fat, ${carb}% from glycogen. Glycogen depletes slowly — you can run for a long time without risking the wall.`,
      `Moderate pace: glycogen becomes a key fuel source. After ~${wallMin} min without extra nutrition, stores will run out.`,
      `Hard pace: glycogen burns quickly. Without carbohydrate intake every 30–45 min, the wall will hit around ${wallMin} min.`,
      `Very hard pace: almost entirely glycogen. Stores will last ~${wallMin} min. You won't sustain this pace over a long distance.`,
      `Sprint: 100% glycogen. Sustainable only for seconds. At this intensity, fat delivers energy far too slowly.`,
    ];
    document.getElementById('s3-desc').textContent = descs[iv];
  }
  intS.addEventListener('input', update);
  durS.addEventListener('input', update);
  update();
}
// ── DEMO 4: Lactate curve ──
function initDemo4() {
  const intS = document.getElementById('s4-int');
  const fitS = document.getElementById('s4-fit');
  const canvas = document.getElementById('lactate-canvas');
  const ctx = canvas.getContext('2d');

  function getLactate(pct, fitLevel) {
    const thr = fitLevel === 1 ? 65 : fitLevel === 2 ? 75 : 85;
    if (pct < thr - 10) return 0.8 + (pct - 50) * 0.02;
    if (pct < thr) return 1.5 + (pct - (thr - 10)) * 0.08;
    return 2.5 + Math.pow((pct - thr) / 5, 1.8);
  }

  function draw(currentPct, fitLevel) {
    const W = canvas.offsetWidth * window.devicePixelRatio;
    const H = 160 * window.devicePixelRatio;
    canvas.width = W; canvas.height = H;
    const scale = window.devicePixelRatio;
    ctx.scale(scale, scale);
    const w = W / scale, h = H / scale;
    const pad = { t: 15, r: 15, b: 30, l: 40 };
    const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;

    ctx.clearRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = '#f3f4f6'; ctx.lineWidth = 1;
    [2, 4, 6, 8, 10].forEach(v => {
      const y = pad.t + ch - (v / 12) * ch;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
      ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter,sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(v, pad.l - 4, y + 3);
    });
    // axes labels
    ctx.fillStyle = '#6b7280'; ctx.font = '8px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Lactate (mmol/L)', 10, h / 2);
    [50, 60, 70, 80, 90, 100].forEach(v => {
      const x = pad.l + ((v - 50) / 50) * cw;
      ctx.fillText(v + '%', x, h - 2);
    });

    // threshold line
    const thr = fitLevel === 1 ? 65 : fitLevel === 2 ? 75 : 85;
    const thrX = pad.l + ((thr - 50) / 50) * cw;
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(thrX, pad.t); ctx.lineTo(thrX, pad.t + ch); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#9ca3af'; ctx.font = '8px Inter,sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Threshold', thrX, pad.t + 9);

    // curve
    ctx.beginPath();
    for (let p = 50; p <= 100; p++) {
      const x = pad.l + ((p - 50) / 50) * cw;
      const lac = getLactate(p, fitLevel);
      const y = pad.t + ch - Math.min(ch, (lac / 12) * ch);
      p === 50 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.stroke();

    // current point
    const cx_ = pad.l + ((currentPct - 50) / 50) * cw;
    const lac = getLactate(currentPct, fitLevel);
    const cy_ = pad.t + ch - Math.min(ch, (lac / 12) * ch);
    ctx.beginPath(); ctx.arc(cx_, cy_, 6, 0, Math.PI * 2);
    ctx.fillStyle = lac > 4 ? '#ef4444' : lac > 2 ? '#f59e0b' : '#22c55e';
    ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
  }

  function update() {
    const pct = parseInt(intS.value);
    const fit = parseInt(fitS.value);
    const thr = fit === 1 ? 65 : fit === 2 ? 75 : 85;
    const fitLabels = ['Beginner', 'Intermediate', 'Trained'];
    document.getElementById('s4-pct').textContent = pct + '%';
    document.getElementById('s4-fit-label').textContent = fitLabels[fit - 1];
    const lac = getLactate(pct, fit);
    document.getElementById('s4-lac').textContent = Math.max(0, lac).toFixed(1);
    document.getElementById('s4-lac').style.color = lac > 4 ? '#ef4444' : lac > 2.5 ? '#f59e0b' : '#22c55e';
    const lvl = lac < 2 ? 'Low (normal)' : lac < 4 ? 'Moderate (threshold)' : 'High (accumulating)';
    document.getElementById('s4-thr-label').textContent = lvl;
    document.getElementById('s4-thr-label').style.color = lac < 2 ? '#22c55e' : lac < 4 ? '#f59e0b' : '#ef4444';
    document.getElementById('s4-thr-pct').textContent = thr + '%';
    const thrExplain = document.getElementById('s4-thr-explain');
    const thrBpm = document.getElementById('s4-thr-bpm');
    if (thrExplain) thrExplain.textContent = thr + '%';
    if (thrBpm) thrBpm.textContent = '~' + Math.round(190 * thr / 100) + ' BPM';
    const descs = {
      low: 'Lactate is being produced but cleared at the same rate. You can run for a long time. This is where your aerobic base is built.',
      mid: 'You are approaching or have reached your threshold. The pace is sustainable but requires effort. The best zone for raising your threshold.',
      high: `Lactate is accumulating faster than it's cleared. Acidity is building in the muscles. Sustainable for only ${fit === 3 ? '10–20' : fit === 2 ? '5–15' : '2–8'} min.`
    };
    document.getElementById('s4-desc').textContent = lac < 2 ? descs.low : lac < 4 ? descs.mid : descs.high;
    draw(pct, fit);
  }
  intS.addEventListener('input', update);
  fitS.addEventListener('input', update);
  update();
  window.addEventListener('resize', () => draw(parseInt(intS.value), parseInt(fitS.value)));
}
// ── DEMO 5: Breathing ──
function initDemo5() {
  const sl = document.getElementById('s5-int');
  function update() {
    const v = parseInt(sl.value);
    const labels = ['Easy run', 'Moderate pace', 'Hard pace', 'Very hard', 'Sprint'];
    const rrs    = [14, 22, 32, 44, 55];
    const tvs    = ['0.5 L', '1.2 L', '2.2 L', '3.2 L', '3.8 L'];
    const tvNum  = [0.5, 1.2, 2.2, 3.2, 3.8];
    const routes = ['Nose', 'Nose + mouth', 'Mouth', 'Mouth', 'Mouth'];
    const rColors= ['var(--z2)','#84cc16','var(--z3)','var(--z4)','var(--z5)'];
    const descs  = [
      'Nasal breathing is ideal. The nose warms the air, produces nitric oxide, and encourages diaphragmatic breathing. Worth breathing through your nose during easy sessions.',
      'First ventilatory threshold (VT1). You start breathing deeper. You can combine nasal and mouth breathing.',
      'Second ventilatory threshold (VT2). Rapid CO₂ removal is needed — mouth breathing is essential. Breathing muscles begin to fatigue.',
      'Breathing itself becomes a significant burden. The diaphragm and intercostal muscles consume a share of the oxygen.',
      'Maximum ventilation. Breathing muscles can consume up to 12% of total oxygen. Breathlessness may occur.'
    ];
    document.getElementById('s5-label').textContent = labels[v - 1];
    document.getElementById('s5-rr').textContent = rrs[v - 1];
    document.getElementById('s5-tv').textContent = tvs[v - 1];
    document.getElementById('s5-route').textContent = routes[v - 1];
    document.getElementById('s5-route').style.color = rColors[v - 1];
    document.getElementById('s5-desc').textContent = descs[v - 1];
    document.getElementById('lung-vol-label').textContent = '~' + tvs[v - 1] + ' / breath';
    const scale = 0.7 + tvNum[v - 1] / 3.8 * 0.6;
    document.getElementById('lung-l').setAttribute('ry', (20 * scale).toFixed(1));
    document.getElementById('lung-r').setAttribute('ry', (20 * scale).toFixed(1));
  }
  sl.addEventListener('input', update);
  update();
}
// ── DEMO 6: Heat ──
function initDemo6() {
  const tempS = document.getElementById('s6-temp');
  const durS  = document.getElementById('s6-dur');
  function update() {
    const temp = parseInt(tempS.value);
    const dur  = parseInt(durS.value);
    document.getElementById('s6-temp-label').textContent =
      temp + '°C — ' + (temp <= 10 ? 'Cold' : temp <= 18 ? 'Cool' : temp <= 25 ? 'Warm' : temp <= 32 ? 'Hot' : 'Very hot');
    document.getElementById('s6-dur-label').textContent = dur + ' min';

    const sweatBase   = 0.4 + (temp - 5) * 0.03;
    const coreRise    = 0.8 + (temp > 20 ? (temp - 20) * 0.05 : 0) + dur * 0.004;
    const core        = Math.min(40.5, 37.0 + coreRise).toFixed(1);
    const pacePenalty = temp <= 15 ? 0 : Math.round((temp - 15) * 0.012 * 100);
    const per15       = Math.round(sweatBase * 1000 / 4 * 0.8);

    document.getElementById('s6-core').textContent = core + '°C';
    document.getElementById('s6-core').style.color = parseFloat(core) > 39.5 ? '#ef4444' : parseFloat(core) > 38.5 ? '#f59e0b' : '#3b82f6';
    document.getElementById('s6-sweat').textContent = sweatBase.toFixed(1) + ' L';
    document.getElementById('s6-pace-hit').textContent = (pacePenalty > 0 ? '–' : '') + pacePenalty + '%';
    document.getElementById('s6-pace-hit').style.color = pacePenalty > 8 ? '#ef4444' : pacePenalty > 3 ? '#f59e0b' : '#22c55e';
    document.getElementById('s6-drink').textContent = per15 + ' ml';

    let desc;
    if (temp <= 10) desc = 'Cold air — ideal conditions. The body maintains temperature easily. Hydration needs are low, but don\'t forget to drink.';
    else if (temp <= 18) desc = 'Cool conditions — optimal for running. Sweat cools effectively. Drink ~150 ml every 15 min.';
    else if (temp <= 25) desc = `Warm conditions. The heart works harder to cool the body. Slow down ~${pacePenalty}% and drink ${per15} ml every 15 min.`;
    else if (temp <= 32) desc = `Hot! Heat impact: pace drops ~${pacePenalty}%. After ${dur} min body temperature reaches ${core}°C. Drink ${per15} ml every 15 min and add electrolytes.`;
    else desc = `Dangerously hot. Pace drops ~${pacePenalty}%. Risk of dehydration and heat stroke is real. Run only very early in the morning when the air is cooler.`;
    document.getElementById('s6-desc').textContent = desc;
  }
  tempS.addEventListener('input', update);
  durS.addEventListener('input', update);
  update();
}
// ── DEMO 7: Running form / cadence ──
function initDemo7() {
  const cadS = document.getElementById('s7-cad');
  function update() {
    const cad = parseInt(cadS.value);
    document.getElementById('s7-cad-label').textContent = cad + ' SPM';
    const forceBase = 3.2 - (cad - 150) * 0.03;
    const force = Math.max(1.5, Math.min(3.5, forceBase));
    const contactMs = Math.round(320 - (cad - 150) * 3.2);
    document.getElementById('s7-force').textContent = force.toFixed(1) + '×';
    document.getElementById('s7-force').style.color = force > 2.8 ? '#ef4444' : force > 2.2 ? '#f59e0b' : '#22c55e';
    document.getElementById('s7-contact').textContent = Math.max(150, contactMs) + ' ms';
    let rating, rColor, desc;
    if (cad < 160) {
      rating = 'High risk'; rColor = '#ef4444';
      desc = `${cad} SPM — too low. Your stride is probably too long, with the foot landing too far in front of the body. An impact force of ${force.toFixed(1)}× body weight poses a high risk of knee and shin injuries.`;
    } else if (cad < 168) {
      rating = 'Moderate risk'; rColor = '#f59e0b';
      desc = `${cad} SPM — acceptable, but there's room to improve. Try increasing by 5 SPM per week towards the 170–180 range.`;
    } else if (cad <= 182) {
      rating = 'Optimal'; rColor = '#22c55e';
      desc = `${cad} SPM — excellent. This is the range most experienced runners work in. Ground contact time is short and impact force is minimal.`;
    } else {
      rating = 'Very high'; rColor = '#94a3b8';
      desc = `${cad} SPM — very high cadence. This is mostly seen in sprinting. At this rhythm over a long run, you'll fatigue quickly.`;
    }
    document.getElementById('s7-rating').textContent = rating;
    document.getElementById('s7-rating').style.color = rColor;
    document.getElementById('s7-desc').textContent = desc;
  }
  cadS.addEventListener('input', update);
  update();
}
// ── DEMO 8: Methodology matcher ──
function initDemo8() {
  const goalS = document.getElementById('s8-goal');
  const timeS = document.getElementById('s8-time');
  const recs = {
    '5k-low':       { name:"Daniels' formula",         color:'#8b5cf6', why:"With limited time, Daniels' VDOT system is the most efficient — every session has a clear purpose and precise pace. You don't need high volume: 3 structured sessions per week deliver solid results.", borrow:"Borrow this: calculate your VDOT from your last 5K time (vdoto.com) and use the resulting zones at least for your easy runs." },
    '5k-mid':       { name:'Polarised model',           color:'#22c55e', why:'The 80/20 method works great for 5K with moderate volume. 2–3 easy sessions per week + 1 truly hard one (intervals) gives clear progress without fatigue.', borrow:'Borrow this: guard your Z3 carefully — if a run feels "comfortably hard", that\'s probably the grey zone. Run either slower or faster.' },
    '5k-high':      { name:'Norwegian training system', color:'#3b82f6', why:'With 8+ hrs/week you can start experimenting with double sessions. Focus on threshold pace — two lactate-threshold sessions per week (not per day) delivers excellent results.', borrow:'Borrow this: once a week, run twice — an easy 30–40 min in the morning, then a 20–30 min threshold run in the evening.' },
    'half-low':     { name:"Daniels' formula",          color:'#8b5cf6', why:"For a half marathon with limited time, Daniels' system offers a clear structure: long run at the weekend + one quality session + easy days. Not much, but purposeful.", borrow:"Borrow this: the weekend long run should always be truly easy (you can talk) — that's Daniels' E pace, not marathon pace." },
    'half-mid':     { name:'Lydiard system',            color:'#f59e0b', why:"For a half marathon with moderate volume, Lydiard's principle works beautifully: 8–10 weeks of aerobic base building (long, slow runs), then 3–4 weeks of threshold work. Your legs will be strong at the finish.", borrow:"Borrow this: before starting speed work, run only easily for 8 weeks. It's boring, but the aerobic base pays off." },
    'half-high':    { name:'Polarised model',           color:'#22c55e', why:'With high volume, the polarised model lets you run a lot without overtraining. 80% easy sessions + 1–2 truly hard ones per week is the ideal ratio for a half marathon.', borrow:'Borrow this: one long run per week (16–22 km) at a truly easy pace is the cornerstone of half-marathon training.' },
    'marathon-low': { name:'Lydiard system',            color:'#f59e0b', why:"For a marathon even with limited time, Lydiard's principle is paramount: long, easy weekend runs build fat efficiency and tendon resilience. Better 3 sessions per week with a long weekend run than 5 average ones.", borrow:'Borrow this: every week — one run longer than all the rest. Gradually build to 28–30 km before the marathon.' },
    'marathon-mid': { name:'Polarised model',           color:'#22c55e', why:'For a marathon with moderate volume, the 80/20 method lets you run enough without overtraining. Long easy weekend runs + 1 threshold session per week is the classic recipe.', borrow:'Borrow this: marathon pace = the Z2/Z3 boundary. "Marathon pace" sessions are very effective, but must be balanced with a lot of easier running.' },
    'marathon-high':{ name:'Kenyan / Ethiopian model',  color:'#ef4444', why:"With high volume, Kenyan logic holds: the more easy running, the better the fat metabolism and aerobic base. 80–90% of all kilometres must be truly easy — even if it feels too easy.", borrow:"Borrow this: if you're running 60+ km/week, check — is 80% of it really easy? Many runners go too fast on easy days and too slow on hard ones." },
    'health-low':   { name:'Polarised model',           color:'#22c55e', why:'For health and longevity, the polarised model is ideal: fewest injuries, great enjoyment, sustainable for decades. Even 3 sessions per week (2 easy + 1 harder) delivers significant health benefits.', borrow:'Borrow this: 30 min of easy running 3× per week is enough. The key is consistency, not intensity.' },
    'health-mid':   { name:'Polarised model',           color:'#22c55e', why:"With moderate volume, the polarised model lets you enjoy running without overtraining. 80% of sessions should be enjoyable — if running is always hard, that's not healthy long-term.", borrow:'Borrow this: a Sunday long run at a truly easy pace is one of the healthiest habits you can build. Even 60–90 min in Z1/Z2 does wonders for heart and metabolic health.' },
    'health-high':  { name:'Lydiard system',            color:'#f59e0b', why:"With plenty of time, Lydiard's aerobic base principle is the most sustainable over the long term. Large volumes of easy running without overtraining build the capillary network, improve metabolic health and extend an active life.", borrow:"Borrow this: if you love running a lot — run a lot, but slowly. Speed comes naturally once the aerobic base is strong." }
  };
  function update() {
    const key = goalS.value + '-' + timeS.value;
    const r = recs[key] || recs['health-mid'];
    const rec = document.getElementById('s8-rec');
    document.getElementById('s8-rec-dot').style.background = r.color;
    document.getElementById('s8-rec-name').textContent = r.name;
    document.getElementById('s8-rec-why').textContent = r.why;
    document.getElementById('s8-rec-borrow').innerHTML = r.borrow;
    rec.style.borderColor = r.color;
  }
  goalS.addEventListener('change', update);
  timeS.addEventListener('change', update);
  update();
}

// ── DEMO 9: Strength training exercise recommender ──
function initDemo9() {
  const sel = document.getElementById('s9-area');
  const exercises = {
    knee: {
      why: 'Knee pain most often stems from weak hip abductors (gluteus medius) and quads. When the hip doesn\'t drop to the side during the stride, knee load drops dramatically.',
      items: [
        { name: 'Single-leg squat', tag: 'Quads · Gluteus medius', sets: '3 × 8 each', desc: 'Stand on one leg and slowly bend the knee to 60–70°. The knee must not cave inward. Start near a wall for support.' },
        { name: 'Clamshell', tag: 'Hip abductors', sets: '3 × 15 each', desc: 'Lie on your side with knees bent at 90°. Open the top knee like a clamshell — don\'t rotate your pelvis. Use a resistance band for added load.' },
        { name: 'Step-down (eccentric)', tag: 'Quads — eccentrically', sets: '3 × 10 each', desc: 'Stand on a step. Slowly (3–4 sec) lower the other leg down. Focus on the controlled descent, not the lift.' },
        { name: 'Glute bridge', tag: 'Gluteus maximus · Spinal extensors', sets: '3 × 15', desc: 'Lie on your back with knees bent. Lift your pelvis to a straight line. Single-leg version — for advanced.' }
      ]
    },
    shin: {
      why: 'Shin pain usually signals too-rapid mileage increase and a weak tibialis anterior and calf muscle. Eccentric strengthening is the most important intervention.',
      items: [
        { name: 'Single-leg heel raise', tag: 'Gastrocnemius · Soleus', sets: '3 × 15 each', desc: 'Stand on the edge of a step. Raise the heel as high as possible, then lower it below step level (3 sec). This is an eccentric exercise — the lowering phase matters most.' },
        { name: 'Tibialis anterior strengthening', tag: 'Shin (front)', sets: '3 × 20', desc: 'Sit and alternately pull your toes towards you. With a resistance band — even more effective.' },
        { name: 'Foot arch exercises', tag: 'Foot muscles', sets: '2 × 20', desc: 'Standing, try to "scrunch" your foot without curling your toes. Strengthens the inner arch.' },
        { name: 'Single-leg balance', tag: 'Ankle stabilisers', sets: '3 × 30 sec each', desc: 'Stand on one foot. Start with eyes open, then close them. Maintain ankle stability.' }
      ]
    },
    achilles: {
      why: 'The Achilles tendon requires eccentric strengthening. The Alfredson protocol — widely accepted as the most effective approach to Achilles rehabilitation — is based on eccentric heel drop.',
      items: [
        { name: 'Alfredson protocol (eccentric)', tag: 'Achilles tendon · Soleus · Gastrocnemius', sets: '3 × 15 each × 2/day', desc: 'Rise on both feet at the edge of a step, shift to one leg and slowly (3 sec) lower the heel below the step. Some discomfort at first is normal — stop for sharp pain.' },
        { name: 'Straight-leg heel drop', tag: 'Gastrocnemius — eccentrically', sets: '3 × 15 each', desc: 'Same as Alfredson but with a straight knee. Loads the upper Achilles.' },
        { name: 'Soleus strengthening', tag: 'Soleus (deep)', sets: '3 × 15 each', desc: 'Heel raise with a bent knee — loads the soleus, which contributes to the lower Achilles.' },
        { name: 'Ankle mobility', tag: 'Dorsiflexion', sets: '2 × 20', desc: 'Stand near a wall and bend the knee towards it without lifting the heel. Improves dorsiflexion, often restricted in Achilles syndrome.' }
      ]
    },
    hip: {
      why: 'Hip weakness is one of the most common underlying problems in running injuries. A weak gluteus medius causes knee collapse, shin syndrome and even back pain.',
      items: [
        { name: 'Lateral band walk', tag: 'Gluteus medius', sets: '3 × 15 steps each', desc: 'With a band around your knees or ankles, walk sideways keeping your body stable. Don\'t let your knees cave inward.' },
        { name: 'Single-leg RDL', tag: 'Gluteus maximus · Hamstrings', sets: '3 × 10 each', desc: 'Stand on one leg and hinge forward keeping your back straight while lifting the free leg behind you. The entire posterior chain controls this movement.' },
        { name: 'Hip thrust', tag: 'Gluteus maximus', sets: '3 × 12', desc: 'Upper back on a bench, shoulders high. Raise your pelvis to a straight line. Add weight once 15 reps feel easy.' },
        { name: 'Step-up', tag: 'Glutes · Quads', sets: '3 × 12 each', desc: 'One foot on an elevated surface (~30–40 cm), step up controlling the movement. Lower slowly. Simple but very effective.' }
      ]
    },
    core: {
      why: 'The core acts as the force-transfer centre during running — linking leg and arm movements. A weak core lets energy "leak" through the trunk and increases lower back load.',
      items: [
        { name: 'Dead bug', tag: 'Transverse abdominals · Core', sets: '3 × 30–45 sec', desc: 'Lie on your back with legs at 90°. Slowly extend alternating opposite arm and leg, not letting your lower back lift from the floor.' },
        { name: 'Side plank with hip dip', tag: 'Lateral stabilisers', sets: '3 × 20–30 sec each', desc: 'Resting on your forearm and the side of your foot, keep your body straight. Dip and raise the hip. Strengthens the obliques and lateral chain.' },
        { name: 'Bird-dog', tag: 'Spinal extensors · Core', sets: '3 × 10 each', desc: 'On all fours, slowly extend the opposite arm and leg keeping the spine in a neutral position.' },
        { name: 'Pallof press', tag: 'Anti-rotation core', sets: '3 × 10 each', desc: 'With a band or cable, press both hands straight out in front of you and resist your body rotating to the side. Mimics core function during running.' }
      ]
    }
  };
  function render() {
    const a = sel.value;
    const d = exercises[a];
    document.getElementById('s9-why').textContent = d.why;
    document.getElementById('s9-exercises').innerHTML = d.items.map(e =>
      `<div class="exercise-card">
        <div class="exercise-name">${e.name}</div>
        <span class="exercise-tag">${e.tag}</span>
        <div class="exercise-desc">${e.desc}</div>
        <span class="exercise-sets">${e.sets}</span>
      </div>`
    ).join('');
  }
  sel.addEventListener('change', render);
  render();
}
function initDemo10() {}
function initDemo11() {}
function initDemo12() {}
function initDemo13() {}
function initDemo14() {}
function initDemo15() {}
function initDemo16() {}
function initDemo17() {}
function initDemo18() {}
function initDemo19() {}

function initDemos() {
  if (current === 0)  initDemo1();
  if (current === 1)  initDemo2();
  if (current === 2)  initDemo3();
  if (current === 3)  initDemo4();
  if (current === 4)  initDemo5();
  if (current === 5)  initDemo6();
  if (current === 6)  initDemo7();
  if (current === 8)  initDemo8();
  if (current === 9)  initDemo9();
  if (current === 10) initDemo10();
  if (current === 11) initDemo11();
  if (current === 12) initDemo12();
  if (current === 13) { initDemo13(); if(window._initEcoCanvas) window._initEcoCanvas(); }
  if (current === 14) initDemo14();
  if (current === 15) initDemo15();
  if (current === 16) initDemo16();
  if (current === 17) initDemo17();
  if (current === 18) initDemo18();
  if (current === 19) initDemo19();
}
