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
    document.getElementById('s1-fuel').style.color = v <= 2 ? '#D97706' : '#3b82f6';
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
    fillEl.style.background = glyLeft > 50 ? '#3b82f6' : glyLeft > 20 ? '#D97706' : '#DC2626';
    document.getElementById('s3-gly-label').textContent = glyLeft <= 0 ? 'DEPLETED' : glyLeft < 20 ? 'Critical' : glyLeft < 50 ? 'Low' : 'Sufficient';
    document.getElementById('s3-fat-fill').style.width = (fat > 0 ? 100 : 15) + '%';
    document.getElementById('s3-fat-label').textContent = fat > 50 ? 'Active (primary)' : fat > 0 ? 'Active (secondary)' : 'Minimal';
    document.getElementById('s3-wall').textContent = depletionPerMin[iv] > 0 ? wallMin + ' min' : '—';
    document.getElementById('s3-wall').style.color = wallMin < dur ? '#DC2626' : 'var(--text)';
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
    ctx.fillStyle = lac > 4 ? '#DC2626' : lac > 2 ? '#D97706' : '#10B981';
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
    document.getElementById('s4-lac').style.color = lac > 4 ? '#DC2626' : lac > 2.5 ? '#D97706' : '#10B981';
    const lvl = lac < 2 ? 'Low (normal)' : lac < 4 ? 'Moderate (threshold)' : 'High (accumulating)';
    document.getElementById('s4-thr-label').textContent = lvl;
    document.getElementById('s4-thr-label').style.color = lac < 2 ? '#10B981' : lac < 4 ? '#D97706' : '#DC2626';
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
    document.getElementById('s6-core').style.color = parseFloat(core) > 39.5 ? '#DC2626' : parseFloat(core) > 38.5 ? '#D97706' : '#3b82f6';
    document.getElementById('s6-sweat').textContent = sweatBase.toFixed(1) + ' L';
    document.getElementById('s6-pace-hit').textContent = (pacePenalty > 0 ? '–' : '') + pacePenalty + '%';
    document.getElementById('s6-pace-hit').style.color = pacePenalty > 8 ? '#DC2626' : pacePenalty > 3 ? '#D97706' : '#10B981';
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
    document.getElementById('s7-force').style.color = force > 2.8 ? '#DC2626' : force > 2.2 ? '#D97706' : '#10B981';
    document.getElementById('s7-contact').textContent = Math.max(150, contactMs) + ' ms';
    let rating, rColor, desc;
    if (cad < 160) {
      rating = 'High risk'; rColor = '#DC2626';
      desc = `${cad} SPM — too low. Your stride is probably too long, with the foot landing too far in front of the body. An impact force of ${force.toFixed(1)}× body weight poses a high risk of knee and shin injuries.`;
    } else if (cad < 168) {
      rating = 'Moderate risk'; rColor = '#D97706';
      desc = `${cad} SPM — acceptable, but there's room to improve. Try increasing by 5 SPM per week towards the 170–180 range.`;
    } else if (cad <= 182) {
      rating = 'Optimal'; rColor = '#10B981';
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
    '5k-mid':       { name:'Polarised model',           color:'#10B981', why:'The 80/20 method works great for 5K with moderate volume. 2–3 easy sessions per week + 1 truly hard one (intervals) gives clear progress without fatigue.', borrow:'Borrow this: guard your Z3 carefully — if a run feels "comfortably hard", that\'s probably the grey zone. Run either slower or faster.' },
    '5k-high':      { name:'Norwegian training system', color:'#3b82f6', why:'With 8+ hrs/week you can start experimenting with double sessions. Focus on threshold pace — two lactate-threshold sessions per week (not per day) delivers excellent results.', borrow:'Borrow this: once a week, run twice — an easy 30–40 min in the morning, then a 20–30 min threshold run in the evening.' },
    'half-low':     { name:"Daniels' formula",          color:'#8b5cf6', why:"For a half marathon with limited time, Daniels' system offers a clear structure: long run at the weekend + one quality session + easy days. Not much, but purposeful.", borrow:"Borrow this: the weekend long run should always be truly easy (you can talk) — that's Daniels' E pace, not marathon pace." },
    'half-mid':     { name:'Lydiard system',            color:'#D97706', why:"For a half marathon with moderate volume, Lydiard's principle works beautifully: 8–10 weeks of aerobic base building (long, slow runs), then 3–4 weeks of threshold work. Your legs will be strong at the finish.", borrow:"Borrow this: before starting speed work, run only easily for 8 weeks. It's boring, but the aerobic base pays off." },
    'half-high':    { name:'Polarised model',           color:'#10B981', why:'With high volume, the polarised model lets you run a lot without overtraining. 80% easy sessions + 1–2 truly hard ones per week is the ideal ratio for a half marathon.', borrow:'Borrow this: one long run per week (16–22 km) at a truly easy pace is the cornerstone of half-marathon training.' },
    'marathon-low': { name:'Lydiard system',            color:'#D97706', why:"For a marathon even with limited time, Lydiard's principle is paramount: long, easy weekend runs build fat efficiency and tendon resilience. Better 3 sessions per week with a long weekend run than 5 average ones.", borrow:'Borrow this: every week — one run longer than all the rest. Gradually build to 28–30 km before the marathon.' },
    'marathon-mid': { name:'Polarised model',           color:'#10B981', why:'For a marathon with moderate volume, the 80/20 method lets you run enough without overtraining. Long easy weekend runs + 1 threshold session per week is the classic recipe.', borrow:'Borrow this: marathon pace = the Z2/Z3 boundary. "Marathon pace" sessions are very effective, but must be balanced with a lot of easier running.' },
    'marathon-high':{ name:'Kenyan / Ethiopian model',  color:'#DC2626', why:"With high volume, Kenyan logic holds: the more easy running, the better the fat metabolism and aerobic base. 80–90% of all kilometres must be truly easy — even if it feels too easy.", borrow:"Borrow this: if you're running 60+ km/week, check — is 80% of it really easy? Many runners go too fast on easy days and too slow on hard ones." },
    'health-low':   { name:'Polarised model',           color:'#10B981', why:'For health and longevity, the polarised model is ideal: fewest injuries, great enjoyment, sustainable for decades. Even 3 sessions per week (2 easy + 1 harder) delivers significant health benefits.', borrow:'Borrow this: 30 min of easy running 3× per week is enough. The key is consistency, not intensity.' },
    'health-mid':   { name:'Polarised model',           color:'#10B981', why:"With moderate volume, the polarised model lets you enjoy running without overtraining. 80% of sessions should be enjoyable — if running is always hard, that's not healthy long-term.", borrow:'Borrow this: a Sunday long run at a truly easy pace is one of the healthiest habits you can build. Even 60–90 min in Z1/Z2 does wonders for heart and metabolic health.' },
    'health-high':  { name:'Lydiard system',            color:'#D97706', why:"With plenty of time, Lydiard's aerobic base principle is the most sustainable over the long term. Large volumes of easy running without overtraining build the capillary network, improve metabolic health and extend an active life.", borrow:"Borrow this: if you love running a lot — run a lot, but slowly. Speed comes naturally once the aerobic base is strong." }
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
// ── DEMO 10: Winter clothing layers ──
function initDemo10() {
  const sl = document.getElementById('s10-temp');
  const layers = [
    { name: 'Socks (wool / synthetic)', dot:'#6366f1', always: true },
    { name: 'Running shoes with better traction', dot:'#64748b', always: true },
    { name: 'Tights (light or warm)', dot:'#0284c7', threshold: 15 },
    { name: 'Light synthetic shirt (moisture-wicking)', dot:'#0369a1', threshold: 15 },
    { name: 'Long-sleeve top', dot:'#1d4ed8', threshold: 10 },
    { name: 'Warm / thermoactive tights', dot:'#4338ca', threshold: 5 },
    { name: 'Light fleece jacket or running sweater', dot:'#7c3aed', threshold: 0 },
    { name: 'Hat / ear protection', dot:'#9333ea', threshold: 3 },
    { name: 'Gloves', dot:'#c026d3', threshold: 5 },
    { name: 'Wind / rain resistant jacket (outer layer)', dot:'#db2777', threshold: -5 },
    { name: 'Balaclava or neck gaiter', dot:'#e11d48', threshold: -10 },
    { name: 'Double gloves or mittens', dot:'#be123c', threshold: -15 },
  ];
  function update() {
    const t = parseInt(sl.value);
    document.getElementById('s10-temp-label').textContent = (t > 0 ? '+' : '') + t + '°C';
    const active = layers.filter(l => l.always || t <= l.threshold);
    document.getElementById('s10-layers').innerHTML = active.map(l =>
      `<div class="layer-item active">
        <div class="layer-dot" style="background:${l.dot}"></div>
        <span class="layer-name">${l.name}</span>
      </div>`
    ).join('');
    let advice = '';
    if (t >= 5) advice = 'Cool conditions — dress light. The cold feeling will pass within 5–10 min of running.';
    else if (t >= 0) advice = 'Winter conditions. Protect your hands and ears especially. It feels cold at first — that\'s normal, your body will warm up.';
    else if (t >= -10) advice = 'Cold. On ice — shorter strides, lower centre of mass. Avoid sweat-soaked fabric against your skin.';
    else if (t >= -20) advice = 'Very cold. A balaclava and double gloves are a necessity, not an accessory. Shorten your run or run indoors.';
    else advice = 'Extreme cold. Consider whether running outdoors is necessary. If so — watch for frostbite signs on your fingers, ears and nose.';
    document.getElementById('s10-advice').textContent = advice;
  }
  sl.addEventListener('input', update);
  update();
}

// ── DEMO 11: Race day timeline ──
function initDemo11() {
  const sel = document.getElementById('s11-dist');
  const plans = {
    '5k': [
      { time: 'The night before', cls: '', title: 'Normal dinner', body: 'No need to carb-load — a 5K won\'t deplete your glycogen stores. Simple, familiar food. Sleep 7–8 hours.' },
      { time: 'Morning (−2 hrs)', cls: '', title: 'Light breakfast', body: 'Banana, oats or toast with jam. No later than 2 hrs before the start. Avoid eggs, fats and dairy.' },
      { time: 'Before the start (−30 min)', cls: 'warn', title: 'Warm-up', body: '5–10 min of easy running + dynamic stretching. A 5K needs a fast start — so a minimal warm-up isn\'t enough.' },
      { time: 'First km', cls: 'alert', title: 'Start slower', body: 'Adrenaline and the crowd push you to go out too fast. Consciously slow the first kilometre by 10–15%. You can speed up later.' },
      { time: 'Km 2–4', cls: '', title: 'Rhythm', body: 'Find your planned pace and hold it. Breathe rhythmically.' },
      { time: 'Last km', cls: 'warn', title: 'Finishing kick', body: 'If you have energy left — now is the time to give it all. If not — an even finish beats falling apart before the line.' },
      { time: 'After the finish', cls: '', title: 'Recovery', body: '5 min walk, fluids, carbohydrates. After a 5K — 1–2 rest days. You can run easy tomorrow.' }
    ],
    '10k': [
      { time: 'The night before', cls: '', title: 'A more carb-rich dinner', body: 'Rice, pasta, bread. A 10K already depletes glycogen stores significantly — it\'s worth starting with them full. Sleep 7–8 hours.' },
      { time: 'Morning (−2.5 hrs)', cls: '', title: 'Carbohydrate breakfast', body: 'Oats, banana, bread. A bit more than for a 5K.' },
      { time: 'Before the start (−40 min)', cls: 'warn', title: 'Warm-up', body: '10 min of easy running + a few faster strides. A 10K is run at a fast pace — the warm-up is very important.' },
      { time: 'Km 1–2', cls: 'alert', title: 'Controlled start', body: 'The first kilometres should be slower than your planned pace. Your heart rate is still rising. Be patient.' },
      { time: 'Km 3–8', cls: '', title: 'Goal pace', body: 'Find your rhythm and hold it. No fuelling needed — just water in the start/finish area.' },
      { time: 'Km 9–10', cls: 'warn', title: 'Give it everything', body: 'The last 2 km — you can give it all. Until here you should have conserved energy.' },
      { time: 'After the finish', cls: '', title: 'Recovery', body: 'Fluids and carbohydrates within 30–60 min. 2–3 rest days. Easy running is possible after 2 days.' }
    ],
    'half': [
      { time: '2 days before', cls: '', title: 'More carbohydrates', body: 'Slightly more carbohydrates than usual. Reduce training intensity (start of the taper).' },
      { time: 'The night before', cls: '', title: 'Carb-loading', body: 'A large portion of rice or pasta. Early dinner (6–7 pm) — sleep without a full stomach. 8 hours of sleep.' },
      { time: 'Morning (−2.5 hrs)', cls: '', title: 'Targeted breakfast', body: '60–80 g of carbohydrates: oats + banana + honey. Coffee — if you\'re used to it. No new foods.' },
      { time: 'Before the start (−30 min)', cls: 'warn', title: 'Warm-up + gel', body: 'An easy 5 min run. One gel with water if you plan to use them during the race.' },
      { time: 'Km 1–5', cls: 'alert', title: 'Conserve', body: 'Starting too fast here is a mistake — 16 km still remain. Stick to your planned pace.' },
      { time: 'Km 7–8', cls: 'warn', title: 'First gel', body: '1 gel with 200 ml of water. No harm in starting early — better too early than too late.' },
      { time: 'Km 14', cls: 'warn', title: 'Second gel', body: 'Another gel. Your muscles will start to feel fatigue now — maintaining glycogen matters.' },
      { time: 'Last 3 km', cls: '', title: 'Give it all', body: 'If you conserved energy — now you can speed up. If not — stay even to the finish.' },
      { time: 'After the finish', cls: '', title: 'Recovery', body: 'Carbohydrates + protein within 30 min. 4–5 easy days. Intense training — after 1–2 weeks.' }
    ],
    'full': [
      { time: '3 days before', cls: '', title: 'Carb-loading', body: 'Start of carb-loading: 8–10 g of carbohydrates per kg of body weight per day. Cut back on fats and fibre.' },
      { time: 'The night before', cls: '', title: 'Final carb top-up', body: 'A large portion of familiar food. Sleep at 8–9 pm if the start is early. Prepare everything the night before.' },
      { time: 'Morning (−3 hrs)', cls: '', title: 'Breakfast', body: '80–100 g of carbohydrates. Timing is crucial — 3 hrs before the start so digestion is complete.' },
      { time: 'Before the start (−30 min)', cls: 'warn', title: 'Final gel', body: 'One gel with water. Light warm-up — a 5 min walk, not a run.' },
      { time: 'Km 1–10', cls: 'alert', title: 'VERY important: slow start', body: 'A marathon is lost in the first km — not won. 10–15% slower than your planned pace. It feels too easy — that\'s exactly how it should be.' },
      { time: 'Every 5 km', cls: 'warn', title: 'Fuelling protocol', body: '1 gel every 5–7 km, starting from ~30 min in. 200 ml of water with each gel. 5–7 gels in total.' },
      { time: 'Km 30–35', cls: 'alert', title: 'The "wall" zone', body: 'This is where many hit glycogen depletion. If you fuelled properly — you get through it. Focus on form and rhythm.' },
      { time: 'Km 40–42.2', cls: '', title: 'Finish', body: 'If you have anything left to give — now. If not — hold your rhythm to the line.' },
      { time: 'After the finish', cls: '', title: 'Recovery', body: 'Don\'t rush back into training. 2 weeks of only easy movement. 3–4 weeks until normal training. The marathon demands respect.' }
    ]
  };

  function render() {
    const p = plans[sel.value];
    document.getElementById('s11-dist-label').textContent = sel.options[sel.selectedIndex].text;
    document.getElementById('s11-timeline').innerHTML = p.map(s =>
      `<div class="timeline-step${s.cls?' '+s.cls:''}">
        <div class="timeline-time">${s.time}</div>
        <div class="timeline-body"><h4>${s.title}</h4><p>${s.body}</p></div>
      </div>`
    ).join('');
  }
  sel.addEventListener('change', render);
  render();
}

// ── DEMO 12: VO₂max and economy ──
function initDemo12() {
  const sl = document.getElementById('s12-fit');
  const data = [
    { label:'Beginner', vo2: 42, eco:'Poor', gain:0, time:'1:02:00', insight:'A beginner has a lower VO₂max and poor economy. The first years of training raise both of these the fastest.' },
    { label:'Intermediate', vo2: 52, eco:'Moderate', gain:8, time:'52:00', insight:'After 2–3 years of training, economy has improved ~12%. Even without much VO₂max growth, this improvement saves several minutes in a 10K.' },
    { label:'Trained', vo2: 60, eco:'Good', gain:18, time:'43:30', insight:'A trained runner: high VO₂max and good economy together. Economy can offset even a 5–8 ml/kg/min VO₂max difference between two runners.' }
  ];
  function update() {
    const d = data[parseInt(sl.value)-1];
    document.getElementById('s12-fit-label').textContent = d.label;
    document.getElementById('s12-vo2a').textContent = d.vo2;
    document.getElementById('s12-eco').textContent = d.eco;
    document.getElementById('s12-eco').style.color = ['#DC2626','#D97706','#10B981'][parseInt(sl.value)-1];
    document.getElementById('s12-10k').textContent = d.time;
    document.getElementById('s12-insight').textContent = d.insight;
  }
  sl.addEventListener('input', update); update();
}

// ── DEMO 13: Running economy over years ──
function initDemo13() {
  const yearsSl = document.getElementById('s13-years');
  const baseSl  = document.getElementById('s13-base');
  const canvas  = document.getElementById('ecoCanvas');
  if (!canvas) return;

  // Economy improvement model: logarithmic, never stops
  // Consistent:   E(y) = 28 * ln(1 + y * 0.55)
  // Sporadic:     E(y) = 28 * ln(1 + y * 0.22)
  function econs(y) { return 28 * Math.log(1 + y * 0.55); }
  function espor(y)  { return 28 * Math.log(1 + y * 0.22); }

  function fmtTime(totalSec) {
    const m = Math.floor(totalSec / 60), s = Math.round(totalSec % 60);
    return m + ':' + String(s).padStart(2,'0');
  }

  function drawChart(y) {
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.offsetWidth || 400;
    const H   = Math.round(W * 0.48);
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const pad = { top:28, right:18, bottom:32, left:44 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top  - pad.bottom;
    const maxY = 30, maxX = 20;

    function px(yr) { return pad.left + (yr-1)/(maxX-1) * cw; }
    function py(pct) { return pad.top + ch - (pct/maxY)*ch; }

    // ── Background ──
    ctx.fillStyle = '#fafaf8'; ctx.fillRect(0,0,W,H);

    // ── Grid lines ──
    ctx.strokeStyle='#e5e7eb'; ctx.lineWidth=1;
    [5,10,15,20,25,30].forEach(g=>{
      ctx.beginPath(); ctx.moveTo(pad.left,py(g)); ctx.lineTo(pad.left+cw,py(g)); ctx.stroke();
    });
    [1,5,10,15,20].forEach(g=>{
      ctx.beginPath(); ctx.moveTo(px(g),pad.top); ctx.lineTo(px(g),pad.top+ch); ctx.stroke();
    });

    // ── Axis labels ──
    ctx.font='10px Inter,sans-serif'; ctx.fillStyle='#9ca3af'; ctx.textAlign='right';
    [0,10,20,30].forEach(g=>{
      ctx.fillText(g+'%', pad.left-5, py(g)+3);
    });
    ctx.textAlign='center';
    [1,5,10,15,20].forEach(g=>{
      ctx.fillText(g, px(g), H-8);
    });
    ctx.fillText('Years of running', pad.left+cw/2, H-1);
    ctx.save(); ctx.translate(10, pad.top+ch/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('Economy improvement', 0, 0); ctx.restore();

    // ── Shaded gap between curves ──
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px(1), py(econs(1)));
    for (let i=1; i<=maxX; i++) ctx.lineTo(px(i), py(econs(i)));
    for (let i=maxX; i>=1; i--) ctx.lineTo(px(i), py(espor(i)));
    ctx.closePath();
    ctx.fillStyle='rgba(16,185,129,0.08)';
    ctx.fill(); ctx.restore();

    // ── Phase labels on chart ──
    ctx.font='7.5px Inter,sans-serif'; ctx.fillStyle='#b6bdc7'; ctx.textAlign='center';
    ctx.fillText('Fastest gains', px(2), pad.top+9);
    ctx.fillText('Slowing, but ongoing', px(7.5), pad.top+9);
    ctx.fillText('Long-term investment', px(16), pad.top+9);

    // ── Sporadic curve (gray) ──
    ctx.beginPath();
    for (let i=1; i<=maxX; i++) {
      const fx=px(i), fy=py(espor(i));
      i===1 ? ctx.moveTo(fx,fy) : ctx.lineTo(fx,fy);
    }
    ctx.strokeStyle='#94a3b8'; ctx.lineWidth=2; ctx.setLineDash([4,3]); ctx.stroke();
    ctx.setLineDash([]);

    // ── Consistent curve (green) ──
    ctx.beginPath();
    for (let i=1; i<=maxX; i++) {
      const fx=px(i), fy=py(econs(i));
      i===1 ? ctx.moveTo(fx,fy) : ctx.lineTo(fx,fy);
    }
    ctx.strokeStyle='#10B981'; ctx.lineWidth=2.5; ctx.stroke();

    // ── Legend ──
    ctx.font='700 8.5px Inter,sans-serif'; ctx.textAlign='left';
    ctx.fillStyle='#10B981'; ctx.fillRect(pad.left+4, pad.top+14, 14, 2.5);
    ctx.fillText('Consistent', pad.left+20, pad.top+18);
    ctx.fillStyle='#94a3b8';
    ctx.setLineDash([4,3]);
    ctx.strokeStyle='#94a3b8'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(pad.left+cw*0.42, pad.top+15); ctx.lineTo(pad.left+cw*0.42+14, pad.top+15); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('Inconsistent', pad.left+cw*0.42+18, pad.top+18);

    // ── Vertical year marker ──
    const mx = px(y);
    ctx.strokeStyle='#374151'; ctx.lineWidth=1.5; ctx.setLineDash([5,3]);
    ctx.beginPath(); ctx.moveTo(mx, pad.top); ctx.lineTo(mx, pad.top+ch); ctx.stroke();
    ctx.setLineDash([]);

    // ── Dots at marker ──
    const cy1=py(econs(y)), cy2=py(espor(y));
    ctx.beginPath(); ctx.arc(mx, cy1, 5, 0, 2*Math.PI);
    ctx.fillStyle='#10B981'; ctx.fill();
    ctx.beginPath(); ctx.arc(mx, cy2, 5, 0, 2*Math.PI);
    ctx.fillStyle='#94a3b8'; ctx.fill();

    // ── Year bubble above marker ──
    const bubTxt = y + (y === 1 ? ' yr' : ' yrs');
    ctx.font='700 9px Inter,sans-serif'; ctx.textAlign='center';
    const bw = ctx.measureText(bubTxt).width + 10;
    const bx = Math.min(Math.max(mx, pad.left+bw/2), W-pad.right-bw/2);
    ctx.fillStyle='#374151'; ctx.beginPath();
    ctx.roundRect(bx-bw/2, pad.top-18, bw, 14, 4); ctx.fill();
    ctx.fillStyle='#fff'; ctx.fillText(bubTxt, bx, pad.top-7);
  }

  function updateMetrics(y, base10k) {
    const consEco = econs(y);
    const sporEco = espor(y);
    const base10kSec = base10k * 60;
    // Time saved = basetime * (eco / (100-eco))  approximately
    const consSaved = Math.round(base10kSec * consEco/100);
    const sporSaved = Math.round(base10kSec * sporEco/100);
    const diff      = consSaved - sporSaved;

    document.getElementById('s13-cons').textContent = '−' + consEco.toFixed(1) + '%';
    document.getElementById('s13-spor').textContent = '−' + sporEco.toFixed(1) + '%';
    document.getElementById('s13-diff').textContent = '−' + fmtTime(diff) + ' / 10K';

    const milestones = [
      [1,3,  'The first years — the fastest gains. The body learns to move in a new way and the capillary network expands rapidly.'],
      [4,6,  'Growth slows but continues. Tendon elasticity improves and the nervous system coordinates movement more precisely.'],
      [7,11, 'A moderately trained runner. Economy is already significantly better than at the start — the same pace requires far less effort.'],
      [12,16,'An experienced runner. Further gains require specialised work — strength training and technique work.'],
      [17,20,'More than 15 years — a long-term investment. The curve never fully flattens, because the body still keeps adapting.']
    ];
    const m = milestones.find(([a,b]) => y>=a && y<=b) || milestones[milestones.length-1];
    const cons = `A consistent runner saves about ${fmtTime(consSaved)} per 10K after ${y} years compared to their starting point.`;
    const spor = ` An inconsistent one — only ${fmtTime(sporSaved)}. The difference between them: ${fmtTime(diff)}.`;
    document.getElementById('s13-insight').textContent = m[2] + ' ' + cons + spor;
  }

  function update() {
    const y    = parseInt(yearsSl.value);
    const base = parseInt(baseSl.value);
    const yLbl = y + (y===1?' year':' years');
    document.getElementById('s13-years-label').textContent = yLbl;
    document.getElementById('s13-base-label').textContent  = base + ':00';
    drawChart(y);
    updateMetrics(y, base);
  }

  // Click/touch on canvas moves marker
  function canvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const relX = clientX - rect.left;
    const pad  = 44, cw = canvas.offsetWidth - pad - 18;
    const yr   = Math.round(1 + (relX - pad)/cw * 19);
    if (yr >= 1 && yr <= 20) { yearsSl.value = yr; update(); }
  }
  canvas.addEventListener('click', canvasClick);
  canvas.addEventListener('touchstart', canvasClick, {passive:true});

  yearsSl.addEventListener('input', update);
  baseSl.addEventListener('input', update);
  update();

  // Expose for _startAnimForLesson
  window._initEcoCanvas = update;
}

// ── DEMO 14: Fatigue factors ──
function initDemo14() {
  const durSl = document.getElementById('s14-dur');
  const fitSl = document.getElementById('s14-fit');
  const factors = [
    { id:'f-glycogen', label:'Glycogen depletion', color:'#3b82f6', base:120, fitMod:1.3 },
    { id:'f-dehydr',   label:'Fluid loss',         color:'#D97706', base:90,  fitMod:1.1 },
    { id:'f-heat',     label:'Body overheating',   color:'#DC2626', base:80,  fitMod:1.2 },
    { id:'f-central',  label:'Central fatigue',    color:'#8b5cf6', base:100, fitMod:1.25 }
  ];
  const barsEl = document.getElementById('s14-fatigue-bars');
  barsEl.innerHTML = factors.map(f =>
    `<div>
      <div style="display:flex;justify-content:space-between;font-size:.78rem;font-weight:600;color:var(--muted);margin-bottom:.25rem">
        <span>${f.label}</span><span id="${f.id}-pct">0%</span>
      </div>
      <div class="thin-gauge"><div class="thin-gauge-fill" id="${f.id}-bar" style="background:${f.color}"></div></div>
    </div>`
  ).join('');
  function update() {
    const dur = parseInt(durSl.value);
    const fit = parseInt(fitSl.value);
    document.getElementById('s14-dur-label').textContent = dur + ' min';
    document.getElementById('s14-fit-label').textContent = ['Beginner','Intermediate','Trained'][fit-1];
    factors.forEach(f => {
      const threshold = f.base * (fit === 1 ? 1 : fit === 2 ? f.fitMod : f.fitMod * 1.3);
      const pct = Math.min(100, Math.round((dur / threshold) * 100));
      const bar = document.getElementById(f.id+'-bar');
      const pctEl = document.getElementById(f.id+'-pct');
      if (bar) { bar.style.width = pct+'%'; bar.style.transition = 'width .6s'; }
      if (pctEl) pctEl.textContent = pct+'%';
    });
    let insight = '';
    if (dur < 20) insight = 'A short run: all fatigue factors are minimal. The body is only just starting to "warm up".';
    else if (dur < 45) insight = 'Moderate duration: fluid loss and central fatigue start to build, but are still manageable.';
    else if (dur < 90) insight = 'A longer run: glycogen is now being depleted significantly. Hydration and energy become important factors.';
    else insight = 'A long run: all fatigue mechanisms are active. A trained runner reaches them later, but cannot avoid them.';
    document.getElementById('s14-insight').textContent = insight;
  }
  durSl.addEventListener('input', update);
  fitSl.addEventListener('input', update);
  update();
}

// ── DEMO 15: Pacing strategies ──
function initDemo15() {
  const distSl = document.getElementById('s15-dist');
  const paceSl = document.getElementById('s15-pace');
  function fmt(sec) {
    const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
    return h>0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
  }
  function fmtPace(sec) {
    return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')+' min/km';
  }
  function update() {
    const dist = parseFloat(distSl.value);
    const pace = parseInt(paceSl.value);
    document.getElementById('s15-dist-label').textContent = {5:'5K',10:'10K',21:'Half marathon',42:'Marathon'}[dist];
    document.getElementById('s15-pace-label').textContent = fmtPace(pace);
    const evenTime = Math.round(dist * pace);
    const negPenalty = dist > 10 ? 0.97 : 0.99;
    const negTime = Math.round(dist * pace * negPenalty);
    const posPenalty = dist > 21 ? 1.07 : dist > 10 ? 1.05 : 1.02;
    const posTime = Math.round(dist * pace * posPenalty);
    document.getElementById('s15-even').textContent = fmt(evenTime);
    document.getElementById('s15-neg').textContent = fmt(negTime);
    document.getElementById('s15-pos').textContent = fmt(posTime);
    const saved = posTime - negTime;
    const insight = `${dist > 10 ? 'Over longer distances' : 'In a 5K and 10K'} a negative split can save about ${fmt(saved)} compared to a positive split. The difference grows with distance — in a marathon it can reach 10–15 minutes.`;
    document.getElementById('s15-insight').textContent = insight;
  }
  distSl.addEventListener('change', update);
  paceSl.addEventListener('input', update);
  update();
}

// ── DEMO 16: Load management ──
function initDemo16() {
  const kmSl = document.getElementById('s16-km');
  const wkSl = document.getElementById('s16-weeks');
  function update() {
    const km = parseInt(kmSl.value);
    const weeks = parseInt(wkSl.value);
    document.getElementById('s16-km-label').textContent = km+' km/week';
    document.getElementById('s16-weeks-label').textContent = weeks+(weeks===1?' week':' weeks');
    const musclePct = Math.min(100, Math.round((weeks / 6) * 100));
    const tendonPct = Math.min(100, Math.round((weeks / 16) * 100));
    const progressionRisk = km > 50 && weeks < 8 ? 'High' : km > 35 && weeks < 6 ? 'Moderate' : 'Low';
    const riskColor = progressionRisk === 'High' ? '#DC2626' : progressionRisk === 'Moderate' ? '#D97706' : '#10B981';
    document.getElementById('s16-muscle').textContent = musclePct+'%';
    document.getElementById('s16-muscle').style.color = musclePct > 60 ? '#10B981' : '#D97706';
    document.getElementById('s16-tendon').textContent = tendonPct+'%';
    document.getElementById('s16-tendon').style.color = tendonPct > 60 ? '#10B981' : '#DC2626';
    document.getElementById('s16-risk').textContent = progressionRisk;
    document.getElementById('s16-risk').style.color = riskColor;
    let insight = '';
    if (progressionRisk === 'High') insight = `High volume in a short time: the muscles can cope (${musclePct}% adapted), but the tendons can't yet (${tendonPct}%). This is exactly the situation where most overuse injuries occur.`;
    else if (progressionRisk === 'Moderate') insight = `Moderate risk. Muscle adaptation (${musclePct}%) is ahead of tendon adaptation (${tendonPct}%). Watch carefully for any tendon signals.`;
    else insight = `Safe zone. ${weeks < 8 ? 'Keep increasing steadily — the body will adapt.' : 'Muscle and tendon adaptation are happening in sync. You can continue your steady progression.'}`;
    document.getElementById('s16-insight').textContent = insight;
  }
  kmSl.addEventListener('input', update);
  wkSl.addEventListener('input', update);
  update();
}

// ── DEMO 17: Pain checker ──
function initDemo17() {
  const whereSl = document.getElementById('s17-where');
  const whenSl  = document.getElementById('s17-when');
  const intSl   = document.getElementById('s17-intensity');
  function update() {
    const where = whereSl.value, when = whenSl.value, intensity = parseInt(intSl.value);
    document.getElementById('s17-intensity-label').textContent = intensity;
    let bg = '#f0fdf4', border = '#86efac', color = '#14532d', rec = '';
    if (intensity >= 6 || when === 'always') {
      bg='#fef2f2'; border='#fca5a5'; color='#7f1d1d';
      rec = '🔴 STOP. This level of pain requires rest and a consultation with a sports medicine specialist. Don\'t run until the pain is gone.';
    } else if (when === 'during' || (when === 'start' && intensity >= 4)) {
      bg='#fff7ed'; border='#fdba74'; color='#7c2d12';
      rec = `🟠 REDUCE THE LOAD. ${where === 'achilles' || where === 'knee' ? 'Tendon pain that increases during a run is a serious sign. ' : ''}Run 30–40% less volume and monitor changes for a week.`;
    } else if (when === 'start' && intensity <= 3) {
      bg='#fefce8'; border='#fde68a'; color='#713f12';
      rec = `🟡 MONITOR. Pain at the start that fades within a few minutes is often a sign of tendon overload. ${where === 'achilles' ? 'For the Achilles tendon, start eccentric calf exercises.' : 'Reduce intensity and start strengthening exercises.'} If it recurs — see a specialist.`;
    } else if (when === 'after') {
      bg='#f0fdf4'; border='#86efac'; color='#14532d';
      rec = `🟢 NORMAL. ${where === 'muscle' ? 'Muscle soreness after a workout (DOMS) is a normal part of the adaptation process. Light movement and hydration will speed recovery.' : 'Pain only after a run — watch whether it eases off. If it grows from run to run — it\'s worth getting it checked.'}`;
    } else {
      rec = 'Select the nature of the pain to get a recommendation.';
    }
    const resEl = document.getElementById('s17-result');
    resEl.style.background = bg; resEl.style.borderColor = border; resEl.style.color = color;
    resEl.textContent = rec;
  }
  [whereSl, whenSl, intSl].forEach(el => el.addEventListener('change', update));
  intSl.addEventListener('input', update);
  update();
}

// ── DEMO 18: Consistency calculator ──
function initDemo18() {
  const goalSl   = document.getElementById('s18-goal');
  const consistSl = document.getElementById('s18-consist');
  function update() {
    const goal = parseInt(goalSl.value);
    const consist = parseInt(consistSl.value);
    document.getElementById('s18-goal-label').textContent = goal+' session'+(goal===1?'':'s')+' / week';
    document.getElementById('s18-consist-label').textContent = consist+'%';
    const perfect = goal * 52;
    const real    = Math.round(perfect * consist / 100);
    const pct     = Math.round((real / perfect) * 100);
    document.getElementById('s18-perfect').textContent = perfect;
    document.getElementById('s18-real').textContent = real;
    document.getElementById('s18-diff').textContent = pct+'%';
    document.getElementById('s18-real').style.color = consist >= 80 ? '#10B981' : consist >= 60 ? '#D97706' : '#DC2626';
    let insight = '';
    if (consist >= 85) insight = `${real} sessions per year — excellent! Even an imperfect but very consistent runner builds a solid base. This regularity delivers results over 2–3 years that a heroic but inconsistent programme never can.`;
    else if (consist >= 65) insight = `${real} sessions per year. That's still enough to see clear progress. Try to identify what causes missed sessions and remove the barriers in advance.`;
    else insight = `${real} sessions per year. A high session count but poor consistency — meaning there are weeks with many sessions and long breaks. The body responds better to consistency than to intense but inconsistent periods.`;
    document.getElementById('s18-insight').textContent = insight;
  }
  goalSl.addEventListener('input', update);
  consistSl.addEventListener('input', update);
  update();
}

// ── DEMO 19: Watch metrics reliability ──
function initDemo19() {
  const metrics = [
    { name:'GPS distance', reliability:'Reliable', color:'#10B981', detail:'GPS accuracy is typically ±1–3%. It errs more among tall buildings or in dense forest. Accurate enough for tracking training.' },
    { name:'Run time', reliability:'Reliable', color:'#10B981', detail:'Measured directly. Absolutely accurate.' },
    { name:'Cadence', reliability:'Reliable', color:'#10B981', detail:'Accelerometer data — very accurate. One of the most useful technical metrics for beginners.' },
    { name:'Heart rate (chest strap)', reliability:'Reliable', color:'#10B981', detail:'Electrical signal measurement — very accurate even during intervals. If you want accurate HR — use a chest strap.' },
    { name:'Heart rate (wrist sensor)', reliability:'Moderately reliable', color:'#D97706', detail:'Optical measurement is moderately accurate for steady-pace running. During intervals or hill runs it lags 10–30 sec and can differ by up to 15 beats.' },
    { name:'VO₂max estimate', reliability:'Indicative only', color:'#DC2626', detail:'An algorithm based on the HR-to-pace ratio. It can differ 10–15% from your true VO₂max. Useful as a long-term trend, but the absolute numbers are unreliable.' },
    { name:'Readiness score / body battery', reliability:'Indicative only', color:'#DC2626', detail:'A statistical model calibrated for the average user. It may show "low readiness" after a bad night even if you\'re physiologically fine. Use it as one signal, not as the truth.' },
    { name:'Recovery time', reliability:'Indicative only', color:'#DC2626', detail:'Very approximate. The same algorithm gives different results for different people. Use your morning pulse and how you feel as more accurate recovery indicators.' },
    { name:'Weekly mileage', reliability:'Reliable', color:'#10B981', detail:'A sum of GPS data — a reliable metric. One of the most useful metrics for load management. Track it every week.' }
  ];
  const container = document.getElementById('s19-metrics');
  let active = -1;
  function render() {
    container.innerHTML = metrics.map((m, i) =>
      `<div onclick="toggleMetric19(${i})" style="padding:.65rem 1rem;border:1px solid ${active===i?m.color:'var(--border)'};background:${active===i?'var(--surface)':'var(--bg)'};cursor:pointer;transition:all .2s">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:.88rem;font-weight:600;color:var(--text)">${m.name}</span>
          <span style="font-size:.7rem;font-weight:700;padding:.2rem .6rem;background:${m.color}20;color:${m.color}">${m.reliability}</span>
        </div>
        ${active===i?`<p style="font-size:.82rem;color:var(--muted);margin-top:.5rem;line-height:1.65">${m.detail}</p>`:''}
      </div>`
    ).join('');
  }
  window.toggleMetric19 = function(i) { active = active===i ? -1 : i; render(); };
  render();
}

// ── DEMO 20: Sleep & Recovery readiness ──
function initDemo20() {
  const hoursSl   = document.getElementById('s20-hours');
  const qualitySl = document.getElementById('s20-quality');
  if (!hoursSl || !qualitySl) return;
  const qualityLabels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  function update() {
    const hours   = parseFloat(hoursSl.value);
    const quality = parseInt(qualitySl.value);
    document.getElementById('s20-hours-label').textContent   = hours + ' hours';
    document.getElementById('s20-quality-label').textContent = qualityLabels[quality - 1];

    // Adaptation window: hours scored 0-60 (4h=0, 9h=60), quality scored 0-40
    const hoursScore   = Math.max(0, Math.min(60, (hours - 4) / 5 * 60));
    const qualityScore = (quality - 1) / 4 * 40;
    const adapt = Math.round(hoursScore + qualityScore);

    const statusLabels = adapt >= 85 ? ['Excellent', '#10B981'] :
                         adapt >= 65 ? ['Good',      '#10B981'] :
                         adapt >= 45 ? ['Moderate',  '#D97706'] :
                         adapt >= 25 ? ['Low',       '#DC2626'] :
                                       ['Very low',  '#DC2626'];
    const sessionRec = adapt >= 80 ? 'Hard session OK' :
                       adapt >= 60 ? 'Easy or moderate' :
                       adapt >= 40 ? 'Easy run only' :
                                     'Rest or walk';

    document.getElementById('s20-adapt').textContent   = adapt + '%';
    document.getElementById('s20-adapt').style.color   = statusLabels[1];
    document.getElementById('s20-status').textContent  = statusLabels[0];
    document.getElementById('s20-status').style.color  = statusLabels[1];
    document.getElementById('s20-session').textContent = sessionRec;
    document.getElementById('s20-session').style.color = statusLabels[1];

    let desc;
    if (adapt >= 80) {
      desc = `${hours} hours of ${qualityLabels[quality-1].toLowerCase()} sleep gives a strong adaptation window. Growth hormone peaks during your first cycle of deep sleep — with this quality and duration you likely got 2–3 full cycles. A hard session today will produce full training gains. Resting HR is likely at or below your baseline.`;
    } else if (adapt >= 60) {
      desc = `Reasonable recovery, but not optimal. You got enough sleep to benefit from training, but a hard interval session may not produce full adaptation. An easy or moderate run is a better choice. Prioritise sleep tonight to avoid accumulating a deficit.`;
    } else if (adapt >= 40) {
      desc = `Below-threshold recovery. Deep sleep cycles were likely cut short, limiting HGH release and protein synthesis. Easy running is fine — it promotes blood flow and active recovery without adding stress. Avoid any intensity today. Check your resting HR: if it is elevated, confirm your decision to go easy.`;
    } else {
      desc = `Very low recovery. With ${hours} hours of ${qualityLabels[quality-1].toLowerCase()} sleep, your body has not completed adequate repair cycles. Training at intensity today adds load without producing adaptation — you will arrive at tomorrow's session more fatigued, not less. Rest, walk, or do 20 minutes of very easy movement only.`;
    }
    document.getElementById('s20-desc').textContent = desc;
  }
  hoursSl.addEventListener('input', update);
  qualitySl.addEventListener('input', update);
  update();
}

// ── DEMO 21: Daily nutrition targets ──
function initDemo21() {
  const weightSl  = document.getElementById('s21-weight');
  const sessionSl = document.getElementById('s21-session');
  if (!weightSl || !sessionSl) return;
  const sessionLabels = {
    rest:     'Rest day',
    easy:     'Easy run (Z2)',
    moderate: 'Moderate tempo run',
    hard:     'Hard intervals / race effort',
    long:     'Long run (90+ min)'
  };
  // carb g/kg targets by session type
  const carbPerKg = { rest: 3.0, easy: 4.0, moderate: 5.5, hard: 7.0, long: 8.0 };
  const postWindow = { rest: '—', easy: '60 min', moderate: '45 min', hard: '30 min', long: '30 min' };

  function update() {
    const w = parseInt(weightSl.value);
    const s = sessionSl.value;
    document.getElementById('s21-weight-label').textContent  = w + ' kg';
    document.getElementById('s21-session-label').textContent = sessionLabels[s];

    const carbs   = Math.round(w * carbPerKg[s]);
    const protein = Math.round(w * 1.8); // 1.8 g/kg midpoint
    document.getElementById('s21-carbs').textContent   = carbs + ' g';
    document.getElementById('s21-protein').textContent = protein + ' g';
    document.getElementById('s21-window').textContent  = postWindow[s];

    const descs = {
      rest: `On a rest day, carbohydrate needs drop significantly — ${carbs} g total is enough to maintain glycogen without impeding the fat-burning adaptation you are building. Keep protein at ${protein} g to support tendon repair from yesterday's session. This is an ideal day for a magnesium-rich meal (nuts, dark greens) and ensuring iron absorption (red meat or legumes with vitamin C).`,
      easy: `Easy Z2 runs use mostly fat for fuel, so you don't need a glycogen top-up beforehand. ${carbs} g of carbohydrate across the day is sufficient. Prioritise ${protein} g of protein distributed across 4 meals (~30 g per meal) — this is where tendon collagen synthesis happens. If you run fasted occasionally on easy days, that is fine and builds fat-burning capacity.`,
      moderate: `A tempo run draws meaningfully on glycogen. Have a carbohydrate-rich meal 2–3 hours before (oats, rice, or bread). Total daily target: ${carbs} g. After the session, the 45-minute recovery window matters — aim for 1 g/kg carbs (${w} g) plus ${Math.round(w * 0.4)} g protein as quickly as practical.`,
      hard: `Hard intervals deplete glycogen significantly. Start the session with full stores: eat ${Math.round(w * 1.5)} g of carbohydrate 2–3 hours before. The 30-minute post-session window is critical — ${Math.round(w)} g carbs + 25–30 g protein immediately. Total daily target: ${carbs} g. Hydration and electrolytes matter more on hard days.`,
      long: `Long runs (90+ min) are the highest carbohydrate demand of the week. Pre-load with ${Math.round(w * 1.5)} g of easily digestible carbs the evening before and again 2–3 hours before the run. During the run, take gels or carbohydrates every 45 minutes. Post-run: ${Math.round(w)} g carbs + 30 g protein within 30 minutes. Total daily: ${carbs} g.`
    };
    document.getElementById('s21-desc').textContent = descs[s];
  }
  weightSl.addEventListener('input', update);
  sessionSl.addEventListener('change', update);
  update();
}

// ── DEMO 22: Training pattern analyser ──
function initDemo22() {
  const hrSl    = document.getElementById('s22-hr');
  const driftSl = document.getElementById('s22-drift');
  const jumpSl  = document.getElementById('s22-jump');
  if (!hrSl || !driftSl || !jumpSl) return;

  function signal(label, value, color, detail) {
    return `<div style="padding:.6rem 1rem;border:1px solid ${color}40;background:${color}08;display:flex;align-items:flex-start;gap:.75rem">
      <span style="font-size:.75rem;font-weight:700;padding:.2rem .55rem;background:${color}20;color:${color};white-space:nowrap;margin-top:.1rem">${value}</span>
      <div><div style="font-size:.82rem;font-weight:600;color:var(--text);margin-bottom:.2rem">${label}</div>
      <div style="font-size:.78rem;color:var(--muted);line-height:1.6">${detail}</div></div>
    </div>`;
  }

  function update() {
    const hr    = parseInt(hrSl.value);
    const drift = parseInt(driftSl.value);
    const jump  = parseInt(jumpSl.value);

    document.getElementById('s22-hr-label').textContent    = (hr >= 0 ? '+' : '') + hr + ' bpm';
    document.getElementById('s22-drift-label').textContent = drift + '%';
    document.getElementById('s22-jump-label').textContent  = '+' + jump + '%';

    // Signal 1: Resting HR
    let hrColor, hrVal, hrDetail;
    if (hr <= 0) {
      hrColor = '#10B981'; hrVal = 'Normal';
      hrDetail = 'At or below baseline — full recovery from recent sessions. The body has processed training stress. Hard sessions are appropriate.';
    } else if (hr <= 4) {
      hrColor = '#84cc16'; hrVal = 'Slightly elevated';
      hrDetail = 'Minor elevation — still within normal variation. Could reflect yesterday\'s session. An easy run is fine; hold off on intervals until tomorrow.';
    } else if (hr <= 7) {
      hrColor = '#D97706'; hrVal = 'Elevated';
      hrDetail = 'Clearly above baseline. Body is still processing recent training load. Stick to easy running or rest today. If this persists 3+ days, reduce overall volume.';
    } else {
      hrColor = '#DC2626'; hrVal = 'High';
      hrDetail = `${hr} bpm above baseline is a clear overreaching signal. Combined with any other elevated marker, this is a definitive rest day. Rule out illness first — elevated resting HR is also an early symptom of infection.`;
    }

    // Signal 2: HR drift
    let driftColor, driftVal, driftDetail;
    if (drift <= 5) {
      driftColor = '#10B981'; driftVal = 'Good';
      driftDetail = 'Low drift — your easy pace is truly aerobic. Heart rate is stable throughout, meaning you are well inside Z2 and the cardiovascular system is not working hard to maintain it.';
    } else if (drift <= 10) {
      driftColor = '#D97706'; driftVal = 'Moderate';
      driftDetail = 'Some drift detected. Your starting pace may be slightly too fast for Z2, or you are mildly dehydrated. Try starting 10–15 sec/km slower and see if drift reduces below 5%.';
    } else {
      driftColor = '#DC2626'; driftVal = 'High';
      driftDetail = `${drift}% drift means your easy runs are not easy. You are likely running at the Z3 boundary — enough to accumulate fatigue but not enough to produce threshold adaptations. This is the grey zone. Slow down until drift falls below 8%.`;
    }

    // Signal 3: Mileage jump
    let jumpColor, jumpVal, jumpDetail;
    if (jump <= 10) {
      jumpColor = '#10B981'; jumpVal = 'Safe';
      jumpDetail = 'Mileage increase within the 10% guideline. Both muscles and tendons have enough time to adapt to the new load. Continue this rate and add a down-week every 3–4 weeks.';
    } else if (jump <= 20) {
      jumpColor = '#D97706'; jumpVal = 'Caution';
      jumpDetail = `A ${jump}% jump is above the safe guideline. Muscles adapt in 1–2 weeks; tendons take 4–8 weeks. The injury risk window is open. Monitor for shin, Achilles and knee signals closely this week.`;
    } else {
      jumpColor = '#DC2626'; jumpVal = 'High risk';
      jumpDetail = `${jump}% is a significant load spike. This is one of the strongest predictors of overuse injury in recreational runners. If you feel fine, reduce next week's volume to absorb the jump before increasing again.`;
    }

    document.getElementById('s22-signals').innerHTML =
      signal('Resting HR trend', hrVal, hrColor, hrDetail) +
      signal('HR drift during easy run', driftVal, driftColor, driftDetail) +
      signal('Weekly mileage jump', jumpVal, jumpColor, jumpDetail);

    const issues = [hrVal, driftVal, jumpVal].filter(v => v === 'High' || v === 'High risk' || v === 'Elevated').length;
    const cautions = [hrVal, driftVal, jumpVal].filter(v => v === 'Caution' || v === 'Moderate' || v === 'Slightly elevated').length;
    let summary;
    if (issues >= 2) {
      summary = 'Multiple red signals: this is a rest or active-recovery day. Ignoring two or more overload signals simultaneously is how overuse injuries develop — they rarely announce themselves with one clear warning.';
    } else if (issues === 1) {
      summary = 'One red signal: address it before it compounds. A single overload signal responded to early typically resolves in 1–3 days. The same signal ignored for a week often becomes an injury.';
    } else if (cautions >= 2) {
      summary = 'Two amber signals: proceed with caution. An easy session is fine, but no intensity today. Review your past 2 weeks — a pattern of amber signals usually means overall training load has crept too high without adequate recovery.';
    } else {
      summary = 'Signals look healthy. Your training load, recovery and easy-run quality are in a good range. Keep monitoring weekly — these signals are most useful as trends, not single readings.';
    }
    document.getElementById('s22-summary').textContent = summary;
  }

  hrSl.addEventListener('input', update);
  driftSl.addEventListener('input', update);
  jumpSl.addEventListener('input', update);
  update();
}

// ══════════════════════════════════════════════════════════════
// CANVAS ILLUSTRATION ANIMATIONS
// ══════════════════════════════════════════════════════════════

(function(){
  var RAF = {};  // store cancelAnimationFrame handles keyed by canvas id

  // ── Shared drawing helpers ──────────────────────────────────
  function pill(ctx, x, y, w, h, r) {
    r = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.arcTo(x+w, y, x+w, y+r, r);
    ctx.lineTo(x+w, y+h-r);
    ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
    ctx.lineTo(x+r, y+h);
    ctx.arcTo(x, y+h, x, y+h-r, r);
    ctx.lineTo(x, y+r);
    ctx.arcTo(x, y, x+r, y, r);
    ctx.closePath();
  }

  function arrow(ctx, x1,y1, x2,y2, color, w) {
    w = w||2;
    var dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy);
    var ux=dx/len, uy=dy/len;
    var ax=x2-ux*9, ay=y2-uy*9;
    ctx.strokeStyle=color; ctx.lineWidth=w;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(ax,ay); ctx.stroke();
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(ax-uy*4, ay+ux*4);
    ctx.lineTo(ax+uy*4, ay-ux*4);
    ctx.closePath(); ctx.fill();
  }

  function ease(t){ return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

  function label(ctx, text, x, y, size, color, align, bold) {
    ctx.font = (bold?'700 ':'400 ') + (size||11) + 'px Inter,sans-serif';
    ctx.textAlign = align||'center';
    ctx.fillStyle = color||'#374151';
    ctx.fillText(text, x, y);
  }

  function getCanvasWidth(canvas) {
    var w = canvas.offsetWidth;
    if (!w && canvas.parentElement) w = canvas.parentElement.offsetWidth - 32;
    if (!w) w = 400;
    return w;
  }
  function setupCanvas(canvas, w, h) {
    var dpr = window.devicePixelRatio||1;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
  }

  // ══════════════════════════════════════════════════════════
  // BREATHING ANIMATION
  // ══════════════════════════════════════════════════════════
  function startBreathing(canvas) {
    if (!canvas) return;
    var W = getCanvasWidth(canvas);
    var H = Math.round(W * 0.62);
    var ctx = setupCanvas(canvas, W, H);
    var period = 5;
    var t0 = null;

    function breathAmp(t) {
      var p = (t % period) / period;
      if (p < 0.42) return ease(p/0.42);       // inhale
      if (p < 0.54) return 1;                  // hold
      if (p < 0.92) return 1 - ease((p-0.54)/0.38); // exhale
      return 0;                                 // rest
    }
    function phaseLabel(t) {
      var p = (t % period) / period;
      if (p < 0.02 || p > 0.94) return '';
      if (p < 0.50) return 'INHALE';
      return 'EXHALE';
    }

    // Draw a small hand resting on the body at (x,y), opening toward the body (left).
    function drawHand(ctx, x, y, color, active) {
      ctx.strokeStyle = color; ctx.lineWidth = active ? 2.6 : 2;
      ctx.lineCap='round';
      // palm
      ctx.beginPath(); ctx.arc(x, y, 6, -0.5*Math.PI, 0.5*Math.PI); ctx.stroke();
      // fingers (toward body, i.e. left)
      for (var i=-1;i<=1;i++){
        ctx.beginPath();
        ctx.moveTo(x, y+i*4);
        ctx.lineTo(x-7, y+i*4);
        ctx.stroke();
      }
    }

    function drawPanel(ctx, px, py, pw, ph, amp, type) {
      var cx = px + pw*0.42;
      var chest = (type === 'chest');
      var bg   = chest ? '#fff7f7' : '#f0fdf4';
      var bord = chest ? '#fca5a5' : '#86efac';
      var hi   = chest ? '#DC2626' : '#10B981';

      ctx.fillStyle = bg; pill(ctx, px, py, pw, ph, 10); ctx.fill();
      ctx.strokeStyle = bord; ctx.lineWidth = 1.5; pill(ctx, px, py, pw, ph, 10); ctx.stroke();

      label(ctx, chest ? '✕  Chest breathing' : '✓  Diaphragm breathing', px+pw/2, py+18, 11, hi, 'center', true);
      label(ctx, chest ? 'breathes with chest' : 'breathes with belly', px+pw/2, py+30, 8.5, '#9ca3af');

      // ── Expansion amounts ──
      var chestEx = chest ? amp*15 : amp*1.5;   // chest pushes forward
      var bellyEx = chest ? amp*1.5 : amp*17;   // belly pushes forward
      var chestLift = chest ? amp*9 : 0;        // shoulders rise (chest breathing)

      // ── Vertical layout (side profile faces RIGHT) ──
      var topY   = py+46 - chestLift;
      var hipY   = py+ph-26;
      var torsoH = hipY - topY;
      var chestY = topY + torsoH*0.26;
      var waistY = topY + torsoH*0.55;
      var bellyY = topY + torsoH*0.74;
      var backX  = cx - 16;

      // front contour x at each level
      var fNeck  = cx + 10;
      var fChest = cx + 16 + chestEx;
      var fWaist = cx + 7;
      var fBelly = cx + 13 + bellyEx;
      var fHip   = cx + 10;

      // ── TORSO SILHOUETTE ──
      ctx.beginPath();
      ctx.moveTo(backX, topY+4);
      ctx.lineTo(backX, hipY);            // straight back
      ctx.lineTo(fHip, hipY);             // hip bottom
      ctx.quadraticCurveTo(fBelly+4, bellyY+6, fBelly, bellyY);      // belly
      ctx.quadraticCurveTo(fWaist, waistY+4, fWaist, waistY);        // waist tuck
      ctx.quadraticCurveTo(fChest, chestY+10, fChest, chestY);       // chest
      ctx.quadraticCurveTo(fNeck+4, topY+10, fNeck, topY+4);         // up to neck
      ctx.closePath();
      ctx.fillStyle = chest ? 'rgba(252,165,165,0.18)' : 'rgba(134,239,172,0.20)';
      ctx.fill();
      ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 1.8; ctx.stroke();

      // ── NECK + HEAD ──
      var headCx = (backX + fNeck)/2 + 1;
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.8; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(headCx-2, topY+4); ctx.lineTo(headCx-2, topY-6); ctx.stroke();
      ctx.beginPath(); ctx.arc(headCx-2, topY-17, 11, 0, 2*Math.PI); ctx.stroke();

      // ── DIAPHRAGM line (descends on diaphragmatic inhale) ──
      var diaY = waistY + (chest ? 0 : amp*10);
      ctx.save(); ctx.setLineDash([4,3]);
      ctx.strokeStyle = chest ? '#d1d5db' : 'rgba(16,185,129,0.7)'; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(backX+2, diaY); ctx.lineTo(fWaist+4, diaY); ctx.stroke();
      ctx.restore();
      if (!chest) label(ctx,'diaphragm ↓', backX-4, diaY+3, 6.5, '#10B981','right');

      // ── HANDS (the self-test): one on chest, one on belly ──
      // Chest hand
      var chestActive = chest;
      drawHand(ctx, fChest+8, chestY, chestActive ? hi : '#b6bdc7', chestActive);
      // Belly hand
      var bellyActive = !chest;
      drawHand(ctx, fBelly+8, bellyY, bellyActive ? hi : '#b6bdc7', bellyActive);

      // ── Motion arrows + zone labels ──
      if (chest && amp > 0.2) {
        ctx.globalAlpha = Math.min(1,(amp-0.2)/0.4);
        arrow(ctx, fChest+18, chestY+8, fChest+18, chestY-10, hi, 2); // chest up
        ctx.globalAlpha = 1;
        label(ctx,'chest rises', fChest+22, chestY+2, 7.5, hi,'left',true);
        label(ctx,'belly still', fBelly+22, bellyY+2, 7, '#9ca3af','left');
      }
      if (!chest && amp > 0.2) {
        ctx.globalAlpha = Math.min(1,(amp-0.2)/0.4);
        arrow(ctx, fBelly+18, bellyY, fBelly+30, bellyY, hi, 2); // belly out
        ctx.globalAlpha = 1;
        label(ctx,'belly expands', fBelly+26, bellyY+2, 7.5, hi,'left',true);
        label(ctx,'chest relaxed', fChest+22, chestY+2, 7, '#9ca3af','left');
      }
    }

    function frame(ts) {
      if (!t0) t0 = ts;
      var t = (ts - t0)/1000;
      var amp = breathAmp(t);
      var phase = phaseLabel(t);

      ctx.clearRect(0,0,W,H);
      var pad=6, gap=10;
      var pw=(W-pad*2-gap)/2, ph=H-pad*2;
      drawPanel(ctx, pad, pad, pw, ph, amp, 'chest');
      drawPanel(ctx, pad+pw+gap, pad, pw, ph, amp, 'diaphragm');

      if (phase) {
        // phase pill centred at the very bottom
        ctx.font='700 9px Inter,sans-serif';
        var tw = ctx.measureText(phase).width;
        ctx.fillStyle = 'rgba(55,65,81,0.92)';
        pill(ctx, W/2-tw/2-8, H-17, tw+16, 14, 7); ctx.fill();
        label(ctx, phase, W/2, H-7, 9, '#fff','center',true);
      }
      RAF['breathCanvas'] = requestAnimationFrame(frame);
    }
    if (RAF['breathCanvas']) cancelAnimationFrame(RAF['breathCanvas']);
    RAF['breathCanvas'] = requestAnimationFrame(frame);
  }

  // ══════════════════════════════════════════════════════════
  // RUNNING FORM ANIMATION
  // ══════════════════════════════════════════════════════════
  function startRunning(canvas) {
    if (!canvas) return;
    var W = getCanvasWidth(canvas);
    var H = Math.round(W * 0.58);
    var ctx = setupCanvas(canvas, W, H);
    var period = 2.4;   // slower so the strike is easy to follow
    var t0 = null;

    // 2-bar inverse kinematics: knee position given hip + foot, equal segments L.
    // Knee always bends forward (larger x) so it reads as a running knee.
    function kneePos(hx, hy, fx, fy, L) {
      var dx = fx-hx, dy = fy-hy;
      var d = Math.sqrt(dx*dx+dy*dy);
      d = Math.min(d, 2*L - 0.5);
      var a = d/2;
      var h = Math.sqrt(Math.max(0, L*L - a*a));
      var mx = hx + dx*0.5, my = hy + dy*0.5;
      var ux = -dy/d, uy = dx/d;
      var k1x = mx + ux*h, k1y = my + uy*h;
      var k2x = mx - ux*h, k2y = my - uy*h;
      return (k1x > k2x) ? {x:k1x,y:k1y} : {x:k2x,y:k2y};
    }

    // Returns striking-foot position relative to COM cx, for a given phase.
    // Phase 0..0.45 = stance (foot on ground, slides from strike point to behind);
    // Phase 0.45..1 = swing (foot lifts, travels back forward to next strike).
    function footPos(p, cx, groundY, strikeAhead, behind, lift) {
      if (p < 0.45) {
        var s = p/0.45;
        return { x: cx + strikeAhead - s*(strikeAhead+behind), y: groundY, planted:true, strikeProg:s };
      } else {
        var sw = (p-0.45)/0.55;
        return { x: cx - behind + sw*(strikeAhead+behind), y: groundY - Math.sin(sw*Math.PI)*lift, planted:false, strikeProg:1 };
      }
    }

    function drawFigure(ctx, cx, groundY, p, isWrong) {
      var legSeg   = H*0.21;                 // each of thigh/shin
      var straight = legSeg*2;
      var baseHipY = groundY - straight*0.94;
      // gentle vertical bob: lowest at mid-stance, highest at swing
      var bob = Math.sin(p*2*Math.PI)*H*0.015;
      var hipY = baseHipY + bob;
      var hipX = cx;

      var strikeAhead = isWrong ? W*0.115 : W*0.025;   // KEY difference
      var behind      = W*0.075;
      var lift        = H*0.14;
      var col         = isWrong ? '#DC2626' : '#10B981';

      // ── Bold vertical body-centre line ──
      ctx.save(); ctx.setLineDash([5,4]);
      ctx.strokeStyle='#94a3b8'; ctx.lineWidth=1.3;
      ctx.beginPath(); ctx.moveTo(cx, hipY-straight*0.7); ctx.lineTo(cx, groundY); ctx.stroke();
      ctx.restore();
      label(ctx,'body centre', cx, groundY+13, 7, '#9ca3af');

      // ── Striking (front, coloured) foot + back (grey) foot ──
      var front = footPos(p, cx, groundY, strikeAhead, behind, lift);
      var back  = footPos((p+0.5)%1, cx, groundY, strikeAhead, behind, lift);

      // BACK leg (grey)
      var bk = kneePos(hipX, hipY, back.x, back.y, legSeg);
      ctx.strokeStyle='#b6bdc7'; ctx.lineWidth=3; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(bk.x,bk.y); ctx.lineTo(back.x,back.y); ctx.stroke();
      // back foot
      ctx.strokeStyle='#b6bdc7'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(back.x,back.y); ctx.lineTo(back.x+ (back.x<cx?-9:9), back.y); ctx.stroke();

      // ── TORSO ── (slight forward lean for correct, upright for wrong)
      var torsoLen = straight*0.62;
      var lean = isWrong ? -0.04 : 0.12;     // radians; correct leans forward from ankle
      var shX = hipX + Math.sin(lean)*torsoLen;
      var shY = hipY - Math.cos(lean)*torsoLen;
      ctx.strokeStyle='#374151'; ctx.lineWidth=3; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(shX,shY); ctx.stroke();

      // ── HEAD ──
      var headR=H*0.058;
      var hX = shX + Math.sin(lean)*headR*1.4, hY = shY - Math.cos(lean)*headR*1.4;
      ctx.beginPath(); ctx.arc(hX,hY,headR,0,2*Math.PI);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2; ctx.stroke();

      // ── ARMS ── swing opposite to legs
      var armSwing = Math.sin(p*2*Math.PI)*0.5;
      var armLen=straight*0.34;
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.2; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(shX,shY+headR*0.3);
      ctx.lineTo(shX+Math.sin(armSwing+0.3)*armLen, shY+headR*0.3+Math.cos(armSwing+0.3)*armLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(shX,shY+headR*0.3);
      ctx.lineTo(shX-Math.sin(armSwing-0.3)*armLen, shY+headR*0.3+Math.cos(armSwing-0.3)*armLen); ctx.stroke();

      // ── FRONT leg (coloured) ──
      var fk = kneePos(hipX, hipY, front.x, front.y, legSeg);
      ctx.strokeStyle=col; ctx.lineWidth=3.2; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX,hipY); ctx.lineTo(fk.x,fk.y); ctx.lineTo(front.x,front.y); ctx.stroke();
      // front foot pointing forward
      ctx.strokeStyle=col; ctx.lineWidth=3;
      ctx.beginPath(); ctx.moveTo(front.x,front.y); ctx.lineTo(front.x+11, front.y); ctx.stroke();

      // hip marker
      ctx.beginPath(); ctx.arc(hipX,hipY,3.5,0,2*Math.PI); ctx.fillStyle='#374151'; ctx.fill();

      // ── TEACHING MOMENT: at/just-after strike, show the gap foot↔centre ──
      if (front.planted && front.strikeProg < 0.5) {
        var fade = 1 - front.strikeProg/0.5;
        ctx.save(); ctx.globalAlpha = fade;
        // impact ellipse
        ctx.beginPath(); ctx.ellipse(front.x, groundY, isWrong?16:11, 4.5, 0,0,2*Math.PI);
        ctx.fillStyle = isWrong ? 'rgba(220,38,38,0.30)' : 'rgba(16,185,129,0.30)';
        ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=1.2; ctx.stroke();

        // horizontal gap bracket between centre and foot
        var by = groundY - H*0.10;
        ctx.strokeStyle=col; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.moveTo(cx, by); ctx.lineTo(front.x, by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, by-4); ctx.lineTo(cx, by+4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(front.x, by-4); ctx.lineTo(front.x, by+4); ctx.stroke();

        // force arrow + label
        if (isWrong) {
          arrow(ctx, front.x, groundY-7, front.x-26, groundY-30, '#DC2626', 2);
          label(ctx,'braking!', (cx+front.x)/2, by-7, 8, '#DC2626','center',true);
        } else {
          arrow(ctx, front.x, groundY-6, front.x, groundY-30, '#10B981', 2);
          label(ctx,'under body', (cx+front.x)/2+6, by-7, 8, '#10B981','center',true);
        }
        ctx.restore();
      }
    }

    function frame(ts) {
      if (!t0) t0 = ts;
      var t = (ts - t0)/1000;
      var p = (t % period)/period;

      ctx.clearRect(0,0,W,H);
      var pad=8, mid=W/2;
      var groundY = H - 34;

      // panels
      ctx.fillStyle='#fff7f7'; pill(ctx, pad, pad, mid-pad-4, H-pad*2, 10); ctx.fill();
      ctx.strokeStyle='#fca5a5'; ctx.lineWidth=1.5; pill(ctx, pad, pad, mid-pad-4, H-pad*2, 10); ctx.stroke();
      ctx.fillStyle='#f0fdf4'; pill(ctx, mid+4, pad, mid-pad-4, H-pad*2, 10); ctx.fill();
      ctx.strokeStyle='#86efac'; ctx.lineWidth=1.5; pill(ctx, mid+4, pad, mid-pad-4, H-pad*2, 10); ctx.stroke();

      // ground
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1.5; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(pad+10, groundY); ctx.lineTo(mid-pad-12, groundY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mid+14, groundY); ctx.lineTo(W-pad-10, groundY); ctx.stroke();

      // titles
      var lcx = mid/2+pad/2, rcx = mid+4+(mid-pad-4)/2;
      label(ctx,'✕  Overstriding', lcx, pad+15, 10, '#dc2626','center',true);
      label(ctx,'✓  Correct stride', rcx, pad+15, 10, '#16a34a','center',true);
      label(ctx,'foot lands far ahead', lcx, pad+27, 7.5, '#9ca3af');
      label(ctx,'foot lands under body', rcx, pad+27, 7.5, '#9ca3af');

      ctx.save(); ctx.beginPath(); ctx.rect(pad, pad+30, mid-pad-4, H-pad*2-30); ctx.clip();
      drawFigure(ctx, lcx, groundY, p, true);
      ctx.restore();

      ctx.save(); ctx.beginPath(); ctx.rect(mid+4, pad+30, mid-pad-4, H-pad*2-30); ctx.clip();
      drawFigure(ctx, rcx, groundY, p, false);
      ctx.restore();

      RAF['runCanvas'] = requestAnimationFrame(frame);
    }
    if (RAF['runCanvas']) cancelAnimationFrame(RAF['runCanvas']);
    RAF['runCanvas'] = requestAnimationFrame(frame);
  }

  // ══════════════════════════════════════════════════════════
  // EXERCISE ANIMATIONS
  // ══════════════════════════════════════════════════════════
  function startExercises(canvas) {
    if (!canvas) return;
    var W = getCanvasWidth(canvas);
    var H = Math.round(W * 0.70);
    var ctx = setupCanvas(canvas, W, H);
    var period = 3.2;
    var t0 = null;

    function drawExCard(ctx, x, y, w, h, title, muscle, drawFn) {
      ctx.fillStyle='#f8fafc';
      pill(ctx, x, y, w, h, 8); ctx.fill();
      ctx.strokeStyle='#e5e7eb'; ctx.lineWidth=1;
      pill(ctx, x, y, w, h, 8); ctx.stroke();
      label(ctx, title, x+w/2, y+14, 8.5, '#374151','center',true);
      label(ctx, muscle, x+w/2, y+24, 7, '#9ca3af');
      ctx.save();
      ctx.rect(x+2, y+28, w-4, h-32);
      ctx.clip();
      drawFn(ctx, x+w/2, y+28, w-4, h-32);
      ctx.restore();
    }

    // 1. Single leg squat
    function drawSquat(ctx, cx, ty, tw, th, amp) {
      var gy = ty + th - 10;
      // shift figure left so the extended front leg has room on the right
      cx = cx - tw*0.10;
      // ground
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(cx-tw*0.30, gy); ctx.lineTo(cx+tw*0.42, gy); ctx.stroke();

      var headR = th*0.085;
      var standHipY = gy - th*0.52;          // hip height when standing
      var hipDrop   = amp * th*0.24;          // how far hip lowers in squat
      var hipY = standHipY + hipDrop;
      var hipX = cx;

      // ── SUPPORT LEG (the working leg, stays planted) ──
      var footX = cx;                          // foot stays under hip
      var footY = gy;
      // knee pushes forward as hip drops; stays roughly over the foot
      var kneeX = cx + (tw*0.02) + amp*tw*0.10;
      var kneeY = (hipY + footY)/2 + amp*th*0.03;
      ctx.strokeStyle='#374151'; ctx.lineWidth=3; ctx.lineCap='round';
      // thigh
      ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(kneeX, kneeY); ctx.stroke();
      // shin
      ctx.beginPath(); ctx.moveTo(kneeX, kneeY); ctx.lineTo(footX, footY); ctx.stroke();
      // planted foot
      ctx.fillStyle='#e5e7eb'; ctx.strokeStyle='#9ca3af'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.ellipse(footX+3, gy, 11, 4, 0, 0, 2*Math.PI); ctx.fill(); ctx.stroke();

      // ── FLOATING LEG (held out in front, clearly visible) ──
      var fThighEndX = hipX + tw*0.16;
      var fThighEndY = hipY + th*0.05 + amp*th*0.02;
      var fShinEndX  = hipX + tw*0.34;
      var fShinEndY  = fThighEndY - th*0.02 - amp*th*0.06; // lifts slightly as you descend
      ctx.strokeStyle='#9ca3af'; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(fThighEndX, fThighEndY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(fThighEndX, fThighEndY); ctx.lineTo(fShinEndX, fShinEndY); ctx.stroke();
      // small foot on floating leg
      ctx.strokeStyle='#9ca3af'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(fShinEndX, fShinEndY); ctx.lineTo(fShinEndX+tw*0.05, fShinEndY+2); ctx.stroke();

      // ── TORSO (leans forward as hip lowers — natural squat form) ──
      var lean = amp*0.32;                     // radians of forward lean
      var torsoLen = th*0.30;
      var shoulderX = hipX + Math.sin(lean)*torsoLen;
      var shoulderY = hipY - Math.cos(lean)*torsoLen;
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(shoulderX, shoulderY); ctx.stroke();

      // ── HEAD ──
      var neckX = shoulderX + Math.sin(lean)*headR*1.3;
      var neckY = shoulderY - Math.cos(lean)*headR*1.3;
      ctx.beginPath(); ctx.arc(neckX, neckY, headR, 0, 2*Math.PI);
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.8; ctx.stroke();

      // ── ARMS reach forward for balance ──
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.8; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY+headR*0.4);
      ctx.lineTo(shoulderX + tw*0.18, shoulderY + headR*0.4 + amp*th*0.03);
      ctx.stroke();

      // ── HIP JOINT marker ──
      ctx.beginPath(); ctx.arc(hipX, hipY, 3.5, 0, 2*Math.PI);
      ctx.fillStyle='#374151'; ctx.fill();

      // ── KNEE highlight + vertical guide showing knee tracks over foot ──
      ctx.beginPath(); ctx.arc(kneeX, kneeY, 5.5, 0, 2*Math.PI);
      ctx.fillStyle='rgba(16,185,129,'+(0.25+amp*0.45)+')'; ctx.fill();
      ctx.strokeStyle='#10B981'; ctx.lineWidth=1.3; ctx.stroke();
      // dashed vertical guide from knee to foot
      ctx.save(); ctx.setLineDash([3,3]);
      ctx.strokeStyle='rgba(16,185,129,0.45)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(kneeX, kneeY); ctx.lineTo(kneeX, gy); ctx.stroke();
      ctx.restore();

      // depth label changes with movement
      label(ctx, amp > 0.6 ? 'bottom' : amp < 0.25 ? 'top' : 'descending', cx+tw*0.30, hipY, 7, '#9ca3af','center');
      label(ctx,'knee over foot', cx+tw*0.06, ty+th-1, 6.5, '#10B981');
    }

    // 2. Glute bridge
    function drawBridge(ctx, cx, ty, tw, th, amp) {
      var gx1=cx-tw*0.42, gx2=cx+tw*0.42;
      var gy = ty+th*0.82;
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(gx1,gy); ctx.lineTo(gx2,gy); ctx.stroke();
      var lift = amp * th*0.32;
      var shoulderX = cx - tw*0.3;
      var shoulderY = gy - th*0.08;
      var hipX = cx + tw*0.02;
      var hipY = gy - th*0.16 - lift;
      var footX = cx + tw*0.26;
      var footY = gy;
      var kx = (hipX+footX)*0.5 + tw*0.02;
      var ky = Math.min(hipY, footY) - (footY - hipY)*0.1 + lift*0.2;
      // head
      ctx.beginPath(); ctx.arc(shoulderX-th*0.055, shoulderY-th*0.05, th*0.07, 0, 2*Math.PI);
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.6; ctx.stroke();
      // upper back on floor
      ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY); ctx.lineTo(hipX, hipY);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2; ctx.lineCap='round'; ctx.stroke();
      // thigh
      ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(kx, ky);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.stroke();
      // shin
      ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(footX, footY);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2; ctx.stroke();
      // hip joint
      ctx.beginPath(); ctx.arc(hipX, hipY, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgba(16,185,129,0.6)'; ctx.fill();
      // alignment line
      if (lift > th*0.05) {
        ctx.strokeStyle='rgba(16,185,129,0.5)'; ctx.lineWidth=1;
        ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(gx1, hipY); ctx.lineTo(gx2, hipY); ctx.stroke();
        ctx.setLineDash([]);
      }
      // feet
      ctx.fillStyle='#e5e7eb';
      ctx.beginPath(); ctx.ellipse(footX, gy, 9,3.5, 0,0,2*Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(shoulderX, gy, 6,3, 0,0,2*Math.PI); ctx.fill();
      label(ctx,'hips up', cx, ty+th-1, 6.5, '#10B981');
    }

    // 3. Eccentric heel raise
    function drawHeel(ctx, cx, ty, tw, th, amp) {
      // amp: 0 = heel up (top), 1 = heel dropped below step (bottom of eccentric)
      // ── STEP BLOCK ── (left side is the step, forefoot rests on its edge)
      var stepTopY = ty + th*0.66;
      var stepX2   = cx - tw*0.02;        // right edge of the step (where toes are)
      var stepX1   = cx - tw*0.42;
      var stepBotY = ty + th - 6;
      ctx.fillStyle='#eef2f6';
      ctx.fillRect(stepX1, stepTopY, stepX2-stepX1, stepBotY-stepTopY);
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1;
      ctx.strokeRect(stepX1, stepTopY, stepX2-stepX1, stepBotY-stepTopY);
      // floor to the right of the step (lower)
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(stepX2, stepBotY); ctx.lineTo(cx+tw*0.42, stepBotY); ctx.stroke();

      // ── HEEL TRAVEL ── forefoot pivots on step edge; heel + whole body move up/down
      // bodyRise: positive = body lifted (heel raised). amp 0 -> raised, amp 1 -> dropped
      var rise = (1 - amp);                 // 1 at top, 0 at bottom
      var ankleX = stepX2;                  // ankle sits above the step edge
      var forefootY = stepTopY;             // toes stay on the step surface
      var heelTravel = th*0.14;             // vertical range of the heel
      var heelY = stepTopY - rise*heelTravel + (1-rise)*heelTravel*0.6; // up when raised, below edge when dropped
      var ankleY = forefootY - th*0.04 - rise*heelTravel*0.7;

      var legLen = th*0.30;
      var bodyLen = th*0.26;
      var headR  = th*0.075;

      var kneeY = ankleY - legLen*0.5;
      var hipY  = ankleY - legLen;
      var hipX  = ankleX;

      // ── FOOT ── forefoot on edge, heel hanging off to the right
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.lineCap='round';
      var heelX = ankleX + tw*0.14;
      var toeX  = ankleX - tw*0.02;
      // sole line from toe (on step) to heel (hanging)
      var heelHi = (amp > 0.45);
      ctx.strokeStyle = heelHi ? '#10B981' : '#374151';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(toeX, forefootY);
      ctx.lineTo(heelX, heelY);
      ctx.stroke();
      // ankle->heel + ankle->toe (foot wedge)
      ctx.strokeStyle='#374151'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(ankleX, ankleY); ctx.lineTo(toeX, forefootY); ctx.stroke();

      // ── LEG ── (shin + thigh, vertical-ish)
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(ankleX, ankleY); ctx.lineTo(hipX, kneeY); ctx.stroke();   // shin
      ctx.beginPath(); ctx.moveTo(hipX, kneeY); ctx.lineTo(hipX, hipY); ctx.stroke();        // thigh
      // knee marker
      ctx.beginPath(); ctx.arc(hipX, kneeY, 2.5, 0, 2*Math.PI); ctx.fillStyle='#374151'; ctx.fill();

      // ── TORSO + HEAD (upright; whole body rises/falls with the heel) ──
      var shoulderY = hipY - bodyLen;
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(hipX, shoulderY); ctx.stroke();
      ctx.beginPath(); ctx.arc(hipX, shoulderY-headR, headR, 0, 2*Math.PI);
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.8; ctx.stroke();
      // one arm resting on a support (wall) for balance
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.8;
      ctx.beginPath(); ctx.moveTo(hipX, shoulderY+bodyLen*0.25);
      ctx.lineTo(hipX - tw*0.16, shoulderY+bodyLen*0.30); ctx.stroke();

      // ── HEEL HIGHLIGHT + motion arrow ──
      ctx.beginPath(); ctx.arc(heelX, heelY, 5, 0, 2*Math.PI);
      ctx.fillStyle = heelHi ? 'rgba(16,185,129,0.5)' : 'rgba(148,163,184,0.4)';
      ctx.fill();
      if (heelHi) {
        ctx.strokeStyle='#10B981'; ctx.lineWidth=1.3; ctx.stroke();
      }
      // big direction arrow on the heel showing slow downward (eccentric) phase
      if (amp > 0.3 && amp < 0.95) {
        arrow(ctx, heelX+tw*0.10, heelY-th*0.05, heelX+tw*0.10, heelY+th*0.05, '#10B981', 2);
        label(ctx,'3 sec', heelX+tw*0.13, heelY, 7.5, '#10B981','left',true);
      } else if (amp <= 0.3) {
        // rising phase, small up hint
        arrow(ctx, heelX+tw*0.10, heelY+th*0.04, heelX+tw*0.10, heelY-th*0.04, '#9ca3af', 1.6);
      }

      // ── step-edge reference dashed line (heel goes BELOW this) ──
      ctx.save(); ctx.setLineDash([3,3]);
      ctx.strokeStyle='rgba(16,185,129,0.4)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(stepX2, stepTopY); ctx.lineTo(cx+tw*0.30, stepTopY); ctx.stroke();
      ctx.restore();

      label(ctx, amp > 0.55 ? 'heel below step' : 'heel raised', cx, ty+th-1, 6.5, heelHi ? '#10B981' : '#9ca3af');
    }

    // 4. Bird-dog
    function drawBirdDog(ctx, cx, ty, tw, th, amp) {
      var gy = ty+th*0.62;
      // floor
      ctx.strokeStyle='#d1d5db'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(cx-tw*0.42, gy); ctx.lineTo(cx+tw*0.42, gy); ctx.stroke();
      var ext = amp; // 0=neutral, 1=full extension
      // On all fours
      var spineLen = tw*0.30;
      var spineX1 = cx - spineLen/2; // rear hip
      var spineX2 = cx + spineLen/2; // shoulders
      var spineY  = gy - th*0.28;
      // spine
      ctx.beginPath(); ctx.moveTo(spineX1, spineY); ctx.lineTo(spineX2, spineY);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.stroke();
      // head
      ctx.beginPath(); ctx.arc(spineX2+th*0.07, spineY-th*0.06, th*0.07, 0, 2*Math.PI);
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.6; ctx.stroke();
      // support hand
      ctx.beginPath(); ctx.moveTo(spineX2, spineY); ctx.lineTo(spineX2+tw*0.04, gy);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2; ctx.stroke();
      // support knee
      ctx.beginPath(); ctx.moveTo(spineX1, spineY); ctx.lineTo(spineX1-tw*0.04, gy);
      ctx.strokeStyle='#374151'; ctx.lineWidth=2; ctx.stroke();
      // extended arm (forward)
      var armAngle = ext * 0.25; // radians elevation
      var armLen = tw*0.30;
      var axEnd = spineX2 + Math.cos(armAngle)*armLen;
      var ayEnd = spineY - Math.sin(armAngle)*armLen;
      ctx.strokeStyle='#10B981'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(spineX2, spineY); ctx.lineTo(axEnd, ayEnd); ctx.stroke();
      ctx.beginPath(); ctx.arc(axEnd, ayEnd, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgba(16,185,129,'+(0.2+ext*0.6)+')'; ctx.fill();
      // extended leg (backward)
      var legLen = tw*0.30;
      var lxEnd = spineX1 - Math.cos(armAngle)*legLen;
      var lyEnd = spineY - Math.sin(armAngle)*legLen;
      ctx.strokeStyle='#10B981'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(spineX1, spineY); ctx.lineTo(lxEnd, lyEnd); ctx.stroke();
      ctx.beginPath(); ctx.arc(lxEnd, lyEnd, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgba(16,185,129,'+(0.2+ext*0.6)+')'; ctx.fill();
      // alignment dashed line
      if (ext > 0.3) {
        ctx.strokeStyle='rgba(16,185,129,'+(ext*0.5)+')'; ctx.lineWidth=1;
        ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(lxEnd, spineY); ctx.lineTo(axEnd, spineY); ctx.stroke();
        ctx.setLineDash([]);
      }
      label(ctx,'opposite arm and leg', cx, ty+th-1, 6.5, '#10B981');
    }

    function frame(ts) {
      if (!t0) t0 = ts;
      var t = (ts - t0) / 1000;
      // smooth 0-1 oscillation
      var amp = 0.5 - 0.5*Math.cos(t/period * 2*Math.PI);

      ctx.clearRect(0, 0, W, H);
      var pad=6, gap=6;
      var cw = (W-pad*2-gap)/2;
      var ch = (H-pad*2-gap)/2;
      var xs = [pad, pad+cw+gap];
      var ys = [pad, pad+ch+gap];

      drawExCard(ctx, xs[0], ys[0], cw, ch, 'Single-leg squat', 'Quads · Glutes',
        function(c,cx,ty,tw,th){ drawSquat(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[1], ys[0], cw, ch, 'Glute bridge', 'Glutes · Hamstrings',
        function(c,cx,ty,tw,th){ drawBridge(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[0], ys[1], cw, ch, 'Eccentric heel raise', 'Calf · Achilles tendon',
        function(c,cx,ty,tw,th){ drawHeel(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[1], ys[1], cw, ch, 'Bird-dog', 'Core · Spinal extensors',
        function(c,cx,ty,tw,th){ drawBirdDog(c,cx,ty,tw,th,amp); });

      RAF['exCanvas'] = requestAnimationFrame(frame);
    }
    if (RAF['exCanvas']) cancelAnimationFrame(RAF['exCanvas']);
    RAF['exCanvas'] = requestAnimationFrame(frame);
  }

  // ── Boot each animation when its lesson becomes active ──
  window._startAnimForLesson = function(lessonIdx) {
    if (lessonIdx === 4) {
      var cBreath = document.getElementById('breathCanvas');
      if (cBreath) { setTimeout(function(){ startBreathing(cBreath); }, 80); }
    }
    if (lessonIdx === 6) {
      var cRun = document.getElementById('runCanvas');
      if (cRun) { setTimeout(function(){ startRunning(cRun); }, 80); }
    }
    if (lessonIdx === 9) {
      var cEx = document.getElementById('exCanvas');
      if (cEx) { setTimeout(function(){ startExercises(cEx); }, 80); }
    }
    if (lessonIdx === 13) {
      setTimeout(function(){ if(window._initEcoCanvas) window._initEcoCanvas(); }, 80);
    }
  };
})();

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
  if (current === 19) { initDemo19(); initDemo22(); }
  if (current === 20) initDemo20();
  if (current === 21) initDemo21();
}

initDemos();
updateIndicator();
