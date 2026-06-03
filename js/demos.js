// ── DEMO 1: Fiber recruitment ──
function initDemo1() {
  const sl = document.getElementById('s1');
  function update() {
    const v = parseInt(sl.value);
    const labels = ['Lengvas bėgimas', 'Vidutinis tempas', 'Slenkstinis tempas', 'Labai sunkus', 'Sprintas'];
    const fib1 = [100, 90, 70, 45, 20];
    const fib2 = [0, 10, 30, 55, 80];
    const fuels = ['Riebalai', 'Riebalai + glikogenas', 'Glikogenas', 'Glikogenas', 'Glikogenas'];
    const descs = [
      'Beveik vien I tipo (lėtos) skaidulos dirba. Jos deguonies pagalba efektyviai degina riebalus. Galite bėgti valandas.',
      'Dauguma I tipo skaidulų, kelios IIa. Mišrus kuras. Tinkama intensyvumo riba daugumai treniruočių.',
      'IIa tipo skaidulos aktyviai įsijungia. Glikogenas tampa pagrindiniu kuru. Tempas tvarus, bet reikalauja pastangų.',
      'Visos IIa ir dalis IIx skaidulų aktyvios. Glikogenas degamas sparčiai. Laktatas kaupiasi.',
      'Maksimali visų skaidulų aktyvacija. Glikogenas eikvojamas labai sparčiai. Tvarus tik sekundes–minutes.'
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

// ── DEMO 2: HR zones ──
function initDemo2() {
  const ageS = document.getElementById('s2-age-sl');
  const intS = document.getElementById('s2-int');
  function update() {
    const age = parseInt(ageS.value);
    const pct = parseInt(intS.value);
    const maxHr = 220 - age;
    const hr = Math.round(maxHr * pct / 100);
    document.getElementById('s2-age').textContent = age + ' metų';
    document.getElementById('s2-maxhr').textContent = maxHr;
    document.getElementById('s2-curhr').textContent = hr;
    document.getElementById('s2-pct').textContent = pct + '%';

    let zone, color, desc;
    if (pct < 60) { zone = 'Z1 — Aktyvus poilsis'; color = '#94a3b8';
      desc = 'Labai lengvas tempas. Tinkamas atsigavimo dienoms. Raumeniui beveik nereikia glikogeno.'; }
    else if (pct < 70) { zone = 'Z2 — Aerobinis pagrindas'; color = 'var(--z2)';
      desc = '80% visų treniruočių turėtų būti čia. Galite kalbėtis. Formuoja aerobinį pagrindą, moko raumenis deginti riebalus.'; }
    else if (pct < 80) { zone = 'Z3 — Aerobinis tempas'; color = '#84cc16';
      desc = '„Pilkoji zona". Per sunki lengvam atsigavimui, per lengva tikram greičio augimui. Naudinga saikingai.'; }
    else if (pct < 90) { zone = 'Z4 — Laktatinis slenkstis'; color = 'var(--z3)';
      desc = 'Diskomforto zona. Tempas, kurį galima išlaikyti tik 20–40 min. Labai efektyvu slenkščiui kelti. Tik trumpai.'; }
    else { zone = 'Z5 — VO₂ Max zona'; color = 'var(--z4)';
      desc = 'Maksimalus intensyvumas. Tvarus tik 30 s – 3 min. Naudojamas intervaliuose. Greitai sekina.'; }

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
  const intLabels = ['Lengvas (Z2)', 'Vidutinis (Z3)', 'Sunkus (Z4)', 'Labai sunkus', 'Sprintas'];
  const fatPcts = [80, 55, 25, 8, 0];
  // depletion per min at each level (% of glycogen store)
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
    document.getElementById('s3-gly-label').textContent = glyLeft <= 0 ? 'IŠSEKĘS' : glyLeft < 20 ? 'Kritiška' : glyLeft < 50 ? 'Mažai' : 'Pakankamai';
    document.getElementById('s3-fat-fill').style.width = (fat > 0 ? 100 : 15) + '%';
    document.getElementById('s3-fat-label').textContent = fat > 50 ? 'Aktyvus (pagrindinis)' : fat > 0 ? 'Aktyvus (pagalbinis)' : 'Minimalus';
    document.getElementById('s3-wall').textContent = depletionPerMin[iv] > 0 ? wallMin + ' min' : '—';
    document.getElementById('s3-wall').style.color = wallMin < dur ? '#ef4444' : 'var(--text)';
    const descs = [
      `Lengvas tempas: ${fat}% kuro iš riebalų, ${carb}% iš glikogeno. Glikogenas eikvojamas lėtai — galite bėgti ilgai nerizikuodami „siena".`,
      `Vidutinis tempas: glikogenas tampa svarbiu kuro šaltiniu. Po ~${wallMin} min be papildomo maitinimosi atsargos išseks.`,
      `Sunkus tempas: glikogenas degamas sparčiai. Jei nevalgysite angliavandenių kas 30–45 min, „siena" ateis po ~${wallMin} min.`,
      `Labai sunkus tempas: beveik vien glikogenas. Atsargos baigsis per ~${wallMin} min. Tokio tempo ilgoje distancijoje neišlaikysite.`,
      `Sprintas: 100% glikogenas. Tai yra tvaru tik sekundes. Tokio intensyvumo metu riebalai energiją tiekia per lėtai.`,
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
    // fitLevel 1=beginner thr~65%, 2=mid thr~75%, 3=trained thr~85%
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
    ctx.fillText('Laktatas (mmol/L)', 10, h / 2);
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
    ctx.fillText('Slenkstis', thrX, pad.t + 9);

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
    const fitLabels = ['Pradedantysis', 'Vidutinis', 'Treniruotas'];
    document.getElementById('s4-pct').textContent = pct + '%';
    document.getElementById('s4-fit-label').textContent = fitLabels[fit - 1];
    const lac = getLactate(pct, fit);
    document.getElementById('s4-lac').textContent = Math.max(0, lac).toFixed(1);
    document.getElementById('s4-lac').style.color = lac > 4 ? '#ef4444' : lac > 2.5 ? '#f59e0b' : '#22c55e';
    const lvl = lac < 2 ? 'Žemas (normalus)' : lac < 4 ? 'Vidutinis (slenkstis)' : 'Aukštas (kaupiasi)';
    document.getElementById('s4-thr-label').textContent = lvl;
    document.getElementById('s4-thr-label').style.color = lac < 2 ? '#22c55e' : lac < 4 ? '#f59e0b' : '#ef4444';
    document.getElementById('s4-thr-pct').textContent = thr + '%';
    const thrExplain = document.getElementById('s4-thr-explain');
    const thrBpm = document.getElementById('s4-thr-bpm');
    if (thrExplain) thrExplain.textContent = thr + '%';
    if (thrBpm) thrBpm.textContent = '~' + Math.round(190 * thr / 100) + ' BPM';
    const descs = {
      low: 'Laktatas gaminamas, bet perdirbamas tokiu pat tempu. Galite bėgti ilgai. Čia kuriamas aerobinis pagrindas.',
      mid: 'Artėjate prie slenksčio arba jį pasiekėte. Tempas tvarus, bet reikalauja pastangų. Geriausia zona slenkščiui kelti.',
      high: `Laktatas kaupiasi greičiau nei perdirbamas. Raumeniuose kaupiasi rūgštumas. Galima išlaikyti tik ${fit === 3 ? '10–20' : fit === 2 ? '5–15' : '2–8'} min.`
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
    const labels = ['Lengvas bėgimas', 'Vidutinis tempas', 'Sunkus tempas', 'Labai sunkus', 'Sprintas'];
    const rrs   = [14, 22, 32, 44, 55];
    const tvs   = ['0.5 L', '1.2 L', '2.2 L', '3.2 L', '3.8 L'];
    const tvNum = [0.5, 1.2, 2.2, 3.2, 3.8];
    const routes= ['Nosis', 'Nosis + burna', 'Burna', 'Burna', 'Burna'];
    const rColors=['var(--z2)','#84cc16','var(--z3)','var(--z4)','var(--z5)'];
    const descs = [
      'Nosinis kvėpavimas idealus. Nosis šildo orą, gamina azoto oksidą, skatina diafragminį kvėpavimą. Lengvų treniruočių metu verta kvėpuoti per nosį.',
      'Pirmas ventiliacijos slenkstis (VT1). Pradedate kvėpuoti giliau. Galite derinti nosies ir burnos kvėpavimą.',
      'Antrasis ventiliacijos slenkstis (VT2). Reikia greito CO₂ šalinimo — burna būtina. Kvėpavimo raumenys pradeda pavargti.',
      'Kvėpavimas tampa rimta problema pats savaime. Diafragma ir tarpšonkauliniai raumenys sunaudoja dalį deguonies.',
      'Maksimalus ventiliavimas. Kvėpavimo raumenys gali sunaudoti iki 12% viso deguonies. Gali atsirasti dusulys.'
    ];
    document.getElementById('s5-label').textContent = labels[v - 1];
    document.getElementById('s5-rr').textContent = rrs[v - 1];
    document.getElementById('s5-tv').textContent = tvs[v - 1];
    document.getElementById('s5-route').textContent = routes[v - 1];
    document.getElementById('s5-route').style.color = rColors[v - 1];
    document.getElementById('s5-desc').textContent = descs[v - 1];
    document.getElementById('lung-vol-label').textContent = '~' + tvs[v-1] + ' / įkvėpimas';
    // Scale lungs
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
      temp + '°C — ' + (temp <= 10 ? 'Šalta' : temp <= 18 ? 'Vėsu' : temp <= 25 ? 'Šilta' : temp <= 32 ? 'Karšta' : 'Labai karšta');
    document.getElementById('s6-dur-label').textContent = dur + ' min';

    const sweatBase = 0.4 + (temp - 5) * 0.03;
    const coreRise = 0.8 + (temp > 20 ? (temp - 20) * 0.05 : 0) + dur * 0.004;
    const core = Math.min(40.5, 37.0 + coreRise).toFixed(1);
    const pacePenalty = temp <= 15 ? 0 : Math.round((temp - 15) * 0.012 * 100);
    const per15 = Math.round(sweatBase * 1000 / 4 * 0.8);

    document.getElementById('s6-core').textContent = core + '°C';
    document.getElementById('s6-core').style.color = parseFloat(core) > 39.5 ? '#ef4444' : parseFloat(core) > 38.5 ? '#f59e0b' : '#3b82f6';
    document.getElementById('s6-sweat').textContent = sweatBase.toFixed(1) + ' L';
    document.getElementById('s6-pace-hit').textContent = (pacePenalty > 0 ? '–' : '') + pacePenalty + '%';
    document.getElementById('s6-pace-hit').style.color = pacePenalty > 8 ? '#ef4444' : pacePenalty > 3 ? '#f59e0b' : '#22c55e';
    document.getElementById('s6-drink').textContent = per15 + ' ml';

    let desc;
    if (temp <= 10) desc = 'Šaltas oras — idealios sąlygos. Kūnui lengva palaikyti temperatūrą. Hidratacijos poreikis mažas, bet neverta pamiršti gerti.';
    else if (temp <= 18) desc = 'Vėsios sąlygos — optimalios bėgimui. Prakaitas aušina efektyviai. Gerkite ~150 ml kas 15 min.';
    else if (temp <= 25) desc = `Šiltos sąlygos. Širdis dirba sunkiau aušindama kūną. Sulėtinkite tempą ~${pacePenalty}% ir gerkite ${per15} ml kas 15 min.`;
    else if (temp <= 32) desc = `Karšta! Karščio poveikis: greitis krenta ~${pacePenalty}%. Kūno temperatūra po ${dur} min pasiekia ${core}°C. Gerkite ${per15} ml kas 15 min, pridėkite elektrolitų.`;
    else desc = `Pavojingai karšta. Greitis krenta ~${pacePenalty}%. Dehidratacijos ir karščio smūgio rizika reali. Bėkite tik labai anksti ryte, kai oras atvėsta.`;
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
    // Impact force: peaks around cadence 155, optimal 170-180
    const forceBase = 3.2 - (cad - 150) * 0.03;
    const force = Math.max(1.5, Math.min(3.5, forceBase));
    const contactMs = Math.round(320 - (cad - 150) * 3.2);
    document.getElementById('s7-force').textContent = force.toFixed(1) + '×';
    document.getElementById('s7-force').style.color = force > 2.8 ? '#ef4444' : force > 2.2 ? '#f59e0b' : '#22c55e';
    document.getElementById('s7-contact').textContent = Math.max(150, contactMs) + ' ms';
    let rating, rColor, desc;
    if (cad < 160) {
      rating = 'Aukšta rizika'; rColor = '#ef4444';
      desc = `${cad} SPM — per mažas. Žingsnis tikriausiai per ilgas, koja nusileisdama per toli priešais kūną. Smūgio jėga ${force.toFixed(1)}× kūno svorio kelia didelę kelio ir blauzdos traumų riziką.`;
    } else if (cad < 168) {
      rating = 'Vidutinė rizika'; rColor = '#f59e0b';
      desc = `${cad} SPM — priimtina, bet dar yra kur tobulėti. Pamėginkite didinti 5 SPM per savaitę iki 170–180 diapazono.`;
    } else if (cad <= 182) {
      rating = 'Optimalus'; rColor = '#22c55e';
      desc = `${cad} SPM — puiku. Šiame diapazone bėga daugelis patyrusių bėgikų. Kontakto laikas trumpas, smūgio jėga minimali.`;
    } else {
      rating = 'Labai aukštas'; rColor = '#94a3b8';
      desc = `${cad} SPM — labai aukšta kadencija. Tai pasiekiama daugiausia sprintuojant. Ilgo bėgimo metu toks ritmas greitai išsekina.`;
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
    '5k-low':      { name:'Danielso formulė', color:'#8b5cf6', why:'Riboto laiko sąlygomis Danielso VDOT sistema yra efektyviausia — kiekviena treniruotė turi aiškų tikslą ir tikslų tempą. Nereikia didelių apimčių: 3 struktūruotos treniruotės per savaitę duoda gerų rezultatų.', borrow:'Pasiskolinkite: apskaičiuokite savo VDOT iš paskutinio 5K laiko (vdoto.com) ir naudokite gautas zonas bent lengvoms treniruotėms.' },
    '5k-mid':      { name:'Poliarizuotas modelis', color:'#22c55e', why:'80/20 metodas puikiai tinka 5K distancijai su vidutine apimtimi. 2–3 lengvos treniruotės per savaitę + 1 tikrai sunki (intervalai) duoda aiškų progresą nenuvargstant.', borrow:'Pasiskolinkite: atidžiai saugokite Z3 — jei jaučiate, kad bėgate „patogiai sunkiai", greičiausiai tai pilkoji zona. Bėkite arba lėčiau, arba greičiau.' },
    '5k-high':     { name:'Norvegiška treniruočių sistema', color:'#3b82f6', why:'Su 8+ val./sav. galima pradėti eksperimentuoti su dvigubomis treniruotėmis. Dėmesys slenkstiniam tempui — dvi laktatinės treniruotės per savaitę (ne per dieną, kaip elitui) duoda puikius rezultatus.', borrow:'Pasiskolinkite: vieną kartą per savaitę bėkite du kartus — ryte lengvai 30–40 min, vakare slenkstinį tempą 20–30 min.' },
    'half-low':    { name:'Danielso formulė', color:'#8b5cf6', why:'Pusmaratonui su ribotu laiku Danielso sistema siūlo aiškią struktūrą: ilgas bėgimas savaitgalį + viena kokybinė sesija + lengvos dienos. Nedaug, bet tikslinga.', borrow:'Pasiskolinkite: savaitgalio ilgas bėgimas visada turi būti tikrai lengvas (galite kalbėtis) — tai Danielso E tempas, ne maratoninis.' },
    'half-mid':    { name:'Lydiardo treniruočių sistema', color:'#f59e0b', why:'Pusmaratonui su vidutine apimtimi Lydiardo principas veikia puikiai: 8–10 sav. aerobinio pagrindo kūrimas (ilgi, lėti bėgimai), tada 3–4 sav. slenkstinio darbo. Finišui stiprūs liks kojos.', borrow:'Pasiskolinkite: prieš pradėdami greičio darbus, 8 savaites bėgkite tik lengvai. Tai nuobodu, bet aerobinis pagrindas apsimoka.' },
    'half-high':   { name:'Poliarizuotas modelis', color:'#22c55e', why:'Su didelėmis apimtimis poliarizuotas modelis leidžia bėgti daug ir nesusirgti. 80% lengvų treniruočių + 1–2 tikrai sunkios per savaitę yra idealus santykis pusmaratonui.', borrow:'Pasiskolinkite: vienas ilgas bėgimas per savaitę (16–22 km) tikrai lengvu tempu yra pusmaratonio treniruočių kertinis akmuo.' },
    'marathon-low':{ name:'Lydiardo treniruočių sistema', color:'#f59e0b', why:'Maratonui net su ribotu laiku Lydiardo principas yra svarbiausias: ilgi, lėti savaitgalio bėgimai kuria riebalų efektyvumą ir sausgyslių atsparumą. Geriau 3 treniruotės per savaitę su ilgu savaitgaliu nei 5 vidutinės.', borrow:'Pasiskolinkite: kiekvieną savaitę — vienas bėgimas ilgesnis nei visa kita. Palaipsniui didinkite iki 28–30 km prieš maratoną.' },
    'marathon-mid':{ name:'Poliarizuotas modelis', color:'#22c55e', why:'Maratonui su vidutine apimtimi 80/20 metodas leidžia bėgti pakankamai daug be pervargimo. Ilgi savaitgalio bėgimai (lengvi!) + 1 slenkstinė sesija per savaitę yra klasikinis receptas.', borrow:'Pasiskolinkite: maratoninis tempas = Z2/Z3 riba. Treniruotės „maratoniniu tempu" yra labai veiksmingos, bet jas reikia subalansuoti su daug lengvesnio bėgimo.' },
    'marathon-high':{ name:'Keniečių / Etiopų modelis', color:'#ef4444', why:'Su didelėmis apimtimis keniečių logika veikia: kuo daugiau lengvo bėgimo, tuo geresnis riebalų metabolizmas ir aerobinė bazė. 80–90% visų kilometrų turi būti tikrai lengvi — net jei tai jaučiasi per lengva.', borrow:'Pasiskolinkite: jei bėgate 60+ km/sav., patikrinkite — ar tikrai 80% yra lengva? Daugelis bėga per greitai lengvomis dienomis ir per lėtai sunkiomis.' },
    'health-low':  { name:'Poliarizuotas modelis', color:'#22c55e', why:'Sveikatai ir ilgaamžiškumui poliarizuotas modelis yra idealus: mažiausiai traumų, didelis malonumas, tvarumas dešimtmečius. Net 3 treniruotės per savaitę (2 lengvos + 1 sunkesnė) duoda reikšmingos naudos sveikatai.', borrow:'Pasiskolinkite: 30 min lengvo bėgimo 3× per savaitę yra pakankamai. Svarbiausia — reguliarumas, ne intensyvumas.' },
    'health-mid':  { name:'Poliarizuotas modelis', color:'#22c55e', why:'Su vidutine apimtimi poliarizuotas modelis leidžia mėgautis bėgimu be pervargimo. 80% treniruočių turi būti malonios — jei bėgimas nuolat sunkus, ilgainiui tai nesveika.', borrow:'Pasiskolinkite: sekmadienio ilgas bėgimas tikrai lengvu tempu yra vienas sveikiausių įpročių. Net 60–90 min Z1/Z2 daro stebuklus sirdies ir metabolinei sveikatai.' },
    'health-high': { name:'Lydiardo treniruočių sistema', color:'#f59e0b', why:'Su dideliu laiku Lydiardo aerobinio pagrindo principas yra tvariausias ilguoju laikotarpiu. Didelės lengvo bėgimo apimtys be pervargimo kuria kapiliarų tinklą, gerina metabolinę sveikatą ir ilgina aktyvų gyvenimą.', borrow:'Pasiskolinkite: jei mėgstate bėgti daug — bėkite daug, bet lėtai. Greitis ateina pats, kai aerobinis pagrindas stiprus.' }
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
      why: 'Kelio skausmas dažniausiai kyla dėl silpnų klubų pagrobėjų (gluteus medius) ir keturgalvių. Kai klubas nenukrenta į šoną bėgimo metu, kelio apkrova mažėja drastiškai.',
      items: [
        { name: 'Vienos kojos pritūpimas', tag: 'Keturgalviai · Gluteus medius', sets: '3 × 8 k.k.', desc: 'Stovėkite ant vienos kojos, lėtai lenkite kelį iki 60–70°. Kelias negali krypti į vidų. Pradėkite prie sienos palaikymui.' },
        { name: 'Klamster / Clamshell', tag: 'Klubų pagrobėjai', sets: '3 × 15 k.k.', desc: 'Atsigulkite ant šono, kojos sulenktos 90°. Atidarykite viršutinę koją kaip kriaušę — negalima sukioti dubens. Pasipriešinimui naudokite gumelę.' },
        { name: 'Stepping-down (ekscentrinis)', tag: 'Keturgalviai ekscentriškai', sets: '3 × 10 k.k.', desc: 'Stovėkite ant laiptelio. Lėtai (3–4 sek.) nuleiskite kitą koją žemyn. Koncentruokitės į lėtą nusileidimą, ne kilimą.' },
        { name: 'Sėdmenų tiltelis', tag: 'Gluteus maximus · Stuburo tiesiamieji', sets: '3 × 15', desc: 'Atsigulkite ant nugaros, kojos sulenktos. Pakelkite dubenį iki tiesios linijos. Vienos kojos versija — pažengusiems.' }
      ]
    },
    shin: {
      why: 'Blauzdiniai skausmai dažniausiai signalizuoja apie per greitą apimties augimą ir silpną tibialis anterior bei blauzdos raumenį. Ekscentrinis stiprinimas yra svarbiausias.',
      items: [
        { name: 'Kulno kėlimas (vienos kojos)', tag: 'Gastrocnemius · Soleus', sets: '3 × 15 k.k.', desc: 'Stovėkite ant laiptelio krašto. Pakelkite kulną kuo aukščiau, tada leiskite žemiau laiptelio lygio (3 sek.). Tai ekscentrinis pratimas — svarbiausia dalis yra leidimasis.' },
        { name: 'Tibialis anterior stiprinimas', tag: 'Blauzda (priekinė dalis)', sets: '3 × 20', desc: 'Sėdėkite ir kaitaliojamais judesiais traukite pirštus link savęs. Su pasipriešinimu (guma) — dar efektyviau.' },
        { name: 'Pėdos lanko pratimai', tag: 'Pėdos raumeniukai', sets: '2 × 20', desc: 'Stovėdami bandykite „suraukti" pėdą nesulenkdami pirštų. Stiprina vidinį pėdos lanką.' },
        { name: 'Vienos kojos pusiausvyra', tag: 'Čiurnos stabilizatoriai', sets: '3 × 30 sek. k.k.', desc: 'Stovėkite ant vienos kojos. Pradėkite akimis atvirtomis, tada užmerkite. Laikykite čiurnos stabilumą.' }
      ]
    },
    achilles: {
      why: 'Achilo sausgyslė reikalauja ekscentrino stiprinimo. Dydgaard protokolas — nuolaidžiai pripažintas efektyviausiu Achilo reabilitacijos būdu — grindžiamas būtent ekscentriniu kulno leidimu.',
      items: [
        { name: 'Alfredson protokolas (ekscentrinis)', tag: 'Achilo sausgyslė · Soleus · Gastrocnemius', sets: '3 × 15 k.k. × 2/d.', desc: 'Ant laiptelio pakėlę abi kojas, pereikite ant vienos ir lėtai (3 sek.) leiskite kulną žemiau laiptelio. Pradedant bus nepatogu — tai normalu. Sustokite jei aštrus skausmas.' },
        { name: 'Tiesios kojos kulno leidimas', tag: 'Gastrocnemius ekscentriškai', sets: '3 × 15 k.k.', desc: 'Tas pats kaip Alfredson, bet koja tiesi (ne sulenkta). Apkrauna aukštesnę Achilo dalį.' },
        { name: 'Soleus stiprinimas', tag: 'Soleus (giliasis)', sets: '3 × 15 k.k.', desc: 'Kulno kėlimas sulenkta kelio — apkrauna soleus, kuris prisideda prie Achilo apačios.' },
        { name: 'Čiurnos mobilumas', tag: 'Dorsifleksija', sets: '2 × 20', desc: 'Stovėkite prie sienos, lenkite kelį link sienos nekeliando kulno. Gerina dorsifleksiją, kuri dažnai sutrikusi Achilo sindrome.' }
      ]
    },
    hip: {
      why: 'Klubų silpnumas — viena dažniausių netiesiogiai su bėgimu susijusių problemų. Silpnas gluteus medius sukelia kelių krypimą, blauzdinį sindromą ir net nugaros skausmą.',
      items: [
        { name: 'Lateral band walk', tag: 'Gluteus medius', sets: '3 × 15 žingsnių/k.', desc: 'Su guma aplink kelius ar kulkšnis eikite į šoną laikydami kūną stabilų. Kelio neleiskite krypti į vidų.' },
        { name: 'Vienos kojos RDL', tag: 'Gluteus maximus · Hamstring', sets: '3 × 10 k.k.', desc: 'Stovėkite ant vienos kojos, lenkitės į priekį laikydami nugarą tiesią ir kilnodami laisvą koją atgal. Kontroliuoja visas užpakalinės grandinės raumenys.' },
        { name: 'Hip thrust', tag: 'Gluteus maximus', sets: '3 × 12', desc: 'Nugaros viršutinė dalis ant suolo, pečiai aukštai. Pakelkite dubenį iki tiesios linijos. Pridėkite svorį, kai 15 kartojimų tampa lengva.' },
        { name: 'Laipteliai (step-up)', tag: 'Gluteal · Keturgalviai', sets: '3 × 12 k.k.', desc: 'Viena koja ant paaukštinimo (~30–40 cm), lipkite aukštyn valdydami judesį. Nusileiskite lėtai. Paprastas, bet labai efektyvus pratimas.' }
      ]
    },
    core: {
      why: 'Šerdis bėgant veikia kaip jėgos perdavimo centras — sieja kojų ir rankų judesius. Silpna šerdis leidžia energijai ,,išsibarstyti" per liemenį ir didina juosmens apkrovą.',
      items: [
        { name: 'Planka (dead bug variacija)', tag: 'Transversus abdominis · Šerdis', sets: '3 × 30–45 sek.', desc: 'Atsigulkite ant nugaros, kojos 90° kampą. Lėtai tiesinkite kaitaliodami priešingą ranką ir koją, neleisdami juosmeniui kilti nuo grindų.' },
        { name: 'Šoninis tiltelis', tag: 'Šoniniai stabilizatoriai', sets: '3 × 20–30 sek. k.k.', desc: 'Atsirėmę ant alkūnės ir kojos briaunos, laikykite kūną tiesų. Pakelkite ir nuleiskite dubenį. Stiprina oblique ir šoninę grandinę.' },
        { name: 'Bird-dog', tag: 'Nugaros tiesiamieji · Šerdis', sets: '3 × 10 k.k.', desc: 'Stovėkite ant keturių. Lėtai tiesinkite priešingą ranką ir koją išlaikydami stuburą neutralioje padėtyje.' },
        { name: 'Pallof press', tag: 'Anti-rotacinė šerdis', sets: '3 × 10 k.k.', desc: 'Su guma ar bloku spausdami abi rankas tiesiai priešais save neleiskite kūnui sukiotis į šoną. Imituoja šerdies darbą bėgant.' }
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
    { name: 'Kojinės (vilnonės / sintetinės)', dot:'#6366f1', always: true },
    { name: 'Bėgimo batai su geresnėmis trakcijomis', dot:'#64748b', always: true },
    { name: 'Tamprės (lengvos arba šiltos)', dot:'#0284c7', threshold: 15 },
    { name: 'Lengvas sintetinis marškinėlis (moisture-wicking)', dot:'#0369a1', threshold: 15 },
    { name: 'Ilgomis rankovėmis palaidinė', dot:'#1d4ed8', threshold: 10 },
    { name: 'Šiltos tamprės / thermoaktyvios', dot:'#4338ca', threshold: 5 },
    { name: 'Lengva fliso striukė arba bėgimo džemperis', dot:'#7c3aed', threshold: 0 },
    { name: 'Kepurė / ausų apsauga', dot:'#9333ea', threshold: 3 },
    { name: 'Pirštinės', dot:'#c026d3', threshold: 5 },
    { name: 'Vėjo / lietaus atspari striukė (virštinis sluoksnis)', dot:'#db2777', threshold: -5 },
    { name: 'Balaklava arba kaklo šalikas', dot:'#e11d48', threshold: -10 },
    { name: 'Dvigubos pirštinės arba mitenos', dot:'#be123c', threshold: -15 },
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
    if (t >= 5) advice = 'Vėsios sąlygos — lengvai apsirenginėkite. Šalčio jausmas bėgant praeis per 5–10 min.';
    else if (t >= 0) advice = 'Žiemos sąlygos. Ypač apsaugokite rankas ir ausis. Pradžioje jaučiasi šalta — tai normalu, kūnas šils.';
    else if (t >= -10) advice = 'Šalta. Ant ledo — trumpesni žingsniai, žemesnis masės centras. Venkite prakaituoto audinio prie odos.';
    else if (t >= -20) advice = 'Labai šalta. Balaklava ir dvigubos pirštinės — ne priedas, o būtinybė. Sutrumpinkite bėgimo trukmę arba bėkite viduje.';
    else advice = 'Ekstremalus šaltis. Apgalvokite, ar būtina bėgti lauke. Jei taip — stebėkite nušalimo ženklus pirštų, ausų ir nosies srityje.';
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
      { time: 'Iš vakaro', cls: '', title: 'Įprasta vakarienė', body: 'Nereikia specialiai krauti angliavandenių — 5K neišeikvos glikogeno atsargų. Paprasta, gerai žinoma mityba. Miegokite 7–8 val.' },
      { time: 'Ryte (−2 val.)', cls: '', title: 'Lengvi pusryčiai', body: 'Bananas, avižos arba skrudinta duona su uogiene. Ne daugiau nei už 2 val. iki starto. Vengti kiaušinių, riebalų, pieno produktų.' },
      { time: 'Prieš startą (−30 min)', cls: 'warn', title: 'Apšilimas', body: '5–10 min lengvo bėgimo + dinaminis tempimas. 5 km distancijoje svarbus greitas startas — todėl nepakanka apšilti tik minimaliai.' },
      { time: 'Pirmas km', cls: 'alert', title: 'Pradėkite lėčiau', body: 'Adrenalinas ir minia verčia bėgti per greitai. Pirmą kilometrą sąmoningai sulėtinkite 10–15%. Galėsite pagreitėti vėliau.' },
      { time: 'Km 2–4', cls: '', title: 'Ritmas', body: 'Suraskite planuotą tempą ir palaikykite. Kvėpuokite ritmingai.' },
      { time: 'Paskutinis km', cls: 'warn', title: 'Finišo spurtas', body: 'Jei turi jėgų — dabar galima viską išduoti. Jei ne — tolygus finišas geriau nei žlugimas prieš finišo liniją.' },
      { time: 'Po finišo', cls: '', title: 'Atsistatymas', body: '5 min ėjimas, skysčiai, angliavandeniai. 5K — 1–2 poilsio dienos. Rytoj galima lengvai bėgti.' }
    ],
    '10k': [
      { time: 'Iš vakaro', cls: '', title: 'Daugiau angliavandenių turinti vakarienė', body: 'Ryžiai, pasta, duona. 10 km bėgimas jau reikšmingai eikvoja glikogeno atsargas — verta turėti pilnas glikogeno atsargas. Miegokite 7–8 val.' },
      { time: 'Ryte (−2.5 val.)', cls: '', title: 'Pusryčiai su angliavandeniais', body: 'Avižos, bananas, duona. Šiek tiek daugiau nei 5K pasiruošimui.' },
      { time: 'Prieš startą (−40 min)', cls: 'warn', title: 'Apšilimas', body: '10 min lengvo bėgimo + keli greitesni pagreitėjimai. 10K bėgama greitu tempu — apšilimas labai svarbus.' },
      { time: 'Km 1–2', cls: 'alert', title: 'Kontroliuotas startas', body: 'Pirmieji kilometrai turi būti lėtesni nei planuotas tempas. Pulsas dar kyla. Būkite kantrūs.' },
      { time: 'Km 3–8', cls: '', title: 'Tikslo tempas', body: 'Suraskite ritmą ir išlaikykite. Maitinimosi nereikia — tik vanduo starto/finišo zonoje.' },
      { time: 'Km 9–10', cls: 'warn', title: 'Atiduokite visas jėgas', body: 'Paskutiniai 2 km — galima duoti viską. Iki čia turėjote taupyti energiją.' },
      { time: 'Po finišo', cls: '', title: 'Atsistatymas', body: 'Skysčiai, angliavandeniai per 30–60 min. 2–3 poilsio dienos. Lengvas bėgimas galimas po 2 dienų.' }
    ],
    'half': [
      { time: '2 dienos prieš', cls: '', title: 'Daugiau angliavandenių', body: 'Šiek tiek daugiau angliavandenių nei įprastai. Sumažinkite treniruočių intensyvumą (tapering pradžia).' },
      { time: 'Iš vakaro', cls: '', title: 'Angliavandenių krovimas', body: 'Didelė porcija ryžių ar pastos. Ankstyva vakarienė (18–19 val.) — miegas be pilno skrandžio. 8 val. miego.' },
      { time: 'Ryte (−2.5 val.)', cls: '', title: 'Tiksliniai pusryčiai', body: '60–80g angliavandenių: avižos + bananas + medus. Kava — jei įpratę. Jokio naujo maisto.' },
      { time: 'Prieš startą (−30 min)', cls: 'warn', title: 'Apšilimas + geliukas', body: 'Lengvas 5 min bėgimas. Vienas geliukas su vandeniu jei planuojate naudoti bėgant.' },
      { time: 'Km 1–5', cls: 'alert', title: 'Taupymas', body: 'Per greitas startas čia yra klaidinga — 16 km dar liko. Laikykitės planuoto tempo.' },
      { time: 'Km 7–8', cls: 'warn', title: 'Pirmas geliukas', body: '1 geliukas su 200 ml vandens. Neskauda pradėti anksti — geriau per anksti nei per vėlai.' },
      { time: 'Km 14', cls: 'warn', title: 'Antras geliukas', body: 'Dar vienas geliukas. Dabar raumenys ims jausti nuovargį — glikogeno palaikymas svarbus.' },
      { time: 'Paskutiniai 3 km', cls: '', title: 'Viską atiduoti', body: 'Jei taupėte energiją — dabar galima pagreitėti. Jei ne — tolygiai iki finišo.' },
      { time: 'Po finišo', cls: '', title: 'Atsistatymas', body: 'Angliavandeniai + baltymai per 30 min. 4–5 lengvos dienos. Intensyvios treniruotės — po 1–2 savaičių.' }
    ],
    'full': [
      { time: '3 dienos prieš', cls: '', title: 'Angliavandenių krovimas', body: 'Angliavandenių kaupimo pradžia: 8–10g angliavandenių per kg kūno svorio per dieną. Sumažinkite riebalus ir skaidulas.' },
      { time: 'Iš vakaro', cls: '', title: 'Paskutinis angliavandenių kaupimas', body: 'Didelė porcija gerai žinomo maisto. Miegoti 20–21 val. jei startas anksti. Pasiruoškite viską vakar.' },
      { time: 'Ryte (−3 val.)', cls: '', title: 'Pusryčiai', body: '80–100g angliavandenių. Laikas labai svarbus — 3 val. prieš startą, kad virškinimas baigtųsi.' },
      { time: 'Prieš startą (−30 min)', cls: 'warn', title: 'Paskutinis geliukas', body: 'Vienas geliukas su vandeniu. Lengvas apšilimas — 5 min ėjimas, ne bėgimas.' },
      { time: 'Km 1–10', cls: 'alert', title: 'LABAI svarbu: lėtas startas', body: 'Maratonas pralaimimas pirmais km — ne laimimas. 10–15% lėčiau nei planuojamas tempas. Atrodo per lengva — taip ir turi būti.' },
      { time: 'Kas 5 km', cls: 'warn', title: 'Maitinimosi protokolas', body: '1 geliukas kas 5–7 km nuo 35 km (t.y. nuo ~30 min). 200 ml vandens su kiekvienu geliuku. Iš viso 5–7 geliukai.' },
      { time: 'Km 30–35', cls: 'alert', title: '"Sienos" zona', body: 'Čia daugelis patiria glikogeno išeikvojimą. Jei tinkamai maitinomės — praeiname. Sutelkite dėmesį į formą ir ritmą.' },
      { time: 'Km 40–42.2', cls: '', title: 'Finišas', body: 'Jei dar turite ką atiduoti — dabar. Jei ne — laikykitės ritmo iki finišo.' },
      { time: 'Po finišo', cls: '', title: 'Atsistatymas', body: 'Neskubėkite grįžti į treniruotes. 2 sav. tik lengvas judėjimas. 3–4 sav. iki normalių treniruočių. Maratonas reikalauja pagarbos.' }
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
    { label:'Pradedantysis', vo2: 42, eco:'Prasta', gain:0, time:'1:02:00', insight:'Pradedantysis turi žemesnį VO₂max ir prastą ekonomiją. Pirmieji metai treniruočių abu šiuos rodiklius kelia sparčiausiai.' },
    { label:'Vidutinis', vo2: 52, eco:'Vidutinė', gain:8, time:'52:00', insight:'Po 2–3 metų treniruočių ekonomija pagerėjo ~12%. Net be didelio VO₂max augimo šis pagerėjimas duoda kelias minutes 10K bėgime.' },
    { label:'Treniruotas', vo2: 60, eco:'Gera', gain:18, time:'43:30', insight:'Treniruotas bėgikas: aukštas VO₂max ir gera ekonomija kartu. Ekonomija gali kompensuoti net 5–8 ml/kg/min VO₂max skirtumą tarp dviejų bėgikų.' }
  ];
  function update() {
    const d = data[parseInt(sl.value)-1];
    document.getElementById('s12-fit-label').textContent = d.label;
    document.getElementById('s12-vo2a').textContent = d.vo2;
    document.getElementById('s12-eco').textContent = d.eco;
    document.getElementById('s12-eco').style.color = ['#ef4444','#f59e0b','#22c55e'][parseInt(sl.value)-1];
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
    ctx.fillText('Metai bėgant', pad.left+cw/2, H-1);
    ctx.save(); ctx.translate(10, pad.top+ch/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('Ekonomijos pagerėjimas', 0, 0); ctx.restore();

    // ── Shaded gap between curves ──
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px(1), py(econs(1)));
    for (let i=1; i<=maxX; i++) ctx.lineTo(px(i), py(econs(i)));
    for (let i=maxX; i>=1; i--) ctx.lineTo(px(i), py(espor(i)));
    ctx.closePath();
    ctx.fillStyle='rgba(34,197,94,0.08)';
    ctx.fill(); ctx.restore();

    // ── Phase labels on chart ──
    ctx.font='7.5px Inter,sans-serif'; ctx.fillStyle='#b6bdc7'; ctx.textAlign='center';
    ctx.fillText('Sparčiausias augimas', px(2), pad.top+9);
    ctx.fillText('Lėtėja, bet tęsiasi', px(7.5), pad.top+9);
    ctx.fillText('Ilgametė investicija', px(16), pad.top+9);

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
    ctx.strokeStyle='#22c55e'; ctx.lineWidth=2.5; ctx.stroke();

    // ── Legend ──
    ctx.font='700 8.5px Inter,sans-serif'; ctx.textAlign='left';
    ctx.fillStyle='#22c55e'; ctx.fillRect(pad.left+4, pad.top+14, 14, 2.5);
    ctx.fillText('Nuoseklus', pad.left+20, pad.top+18);
    ctx.fillStyle='#94a3b8';
    ctx.setLineDash([4,3]);
    ctx.strokeStyle='#94a3b8'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(pad.left+cw*0.42, pad.top+15); ctx.lineTo(pad.left+cw*0.42+14, pad.top+15); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('Nenuoseklus', pad.left+cw*0.42+18, pad.top+18);

    // ── Vertical year marker ──
    const mx = px(y);
    ctx.strokeStyle='#374151'; ctx.lineWidth=1.5; ctx.setLineDash([5,3]);
    ctx.beginPath(); ctx.moveTo(mx, pad.top); ctx.lineTo(mx, pad.top+ch); ctx.stroke();
    ctx.setLineDash([]);

    // ── Dots at marker ──
    const cy1=py(econs(y)), cy2=py(espor(y));
    ctx.beginPath(); ctx.arc(mx, cy1, 5, 0, 2*Math.PI);
    ctx.fillStyle='#22c55e'; ctx.fill();
    ctx.beginPath(); ctx.arc(mx, cy2, 5, 0, 2*Math.PI);
    ctx.fillStyle='#94a3b8'; ctx.fill();

    // ── Year bubble above marker ──
    const bubTxt = y + ' m.';
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
      [1,3,  'Pirmi metai — greičiausias augimas. Kūnas mokosi judėti nauju būdu, kapiliarų tinklas sparčiai plečiasi.'],
      [4,6,  'Augimas lėtėja, bet tęsiasi. Sausgyslių elastingumas gerėja, nervų sistema koordinuoja judesį tiksliau.'],
      [7,11, 'Vidutinio pasirengimo bėgikas. Ekonomija jau reikšmingai geresnė nei pradžioje — tas pats tempas reikalauja daug mažiau pastangų.'],
      [12,16,'Patyręs bėgikas. Tolimesnis augimas reikalauja specializuoto darbo — jėgos treniruočių ir technikos darbo.'],
      [17,20,'Daugiau nei 15 metų — ilgametė investicija. Kreivė niekada visiškai nesustoja, nes kūnas vis dar prisitaiko.']
    ];
    const m = milestones.find(([a,b]) => y>=a && y<=b) || milestones[milestones.length-1];
    const nuosk = `Nuoseklus bėgikas po ${y} metų sutaupo apie ${fmtTime(consSaved)} per 10K lyginant su savo pradžia.`;
    const spor  = ` Nenuoseklus — tik ${fmtTime(sporSaved)}. Skirtumas tarp jų: ${fmtTime(diff)}.`;
    document.getElementById('s13-insight').textContent = m[2] + ' ' + nuosk + spor;
  }

  function update() {
    const y    = parseInt(yearsSl.value);
    const base = parseInt(baseSl.value);
    const yLbl = y + (y===1?' metai':y<20?' metai':' metų');
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
    { id:'f-glycogen', label:'Glikogeno eikvojimas', color:'#3b82f6', base:120, fitMod:1.3 },
    { id:'f-dehydr',   label:'Skysčių netekimas',    color:'#f59e0b', base:90,  fitMod:1.1 },
    { id:'f-heat',     label:'Kūno perkaitimas',     color:'#ef4444', base:80,  fitMod:1.2 },
    { id:'f-central',  label:'Centrinis nuovargis',  color:'#8b5cf6', base:100, fitMod:1.25 }
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
    document.getElementById('s14-fit-label').textContent = ['Pradedantysis','Vidutinis','Treniruotas'][fit-1];
    factors.forEach(f => {
      const threshold = f.base * (fit === 1 ? 1 : fit === 2 ? f.fitMod : f.fitMod * 1.3);
      const pct = Math.min(100, Math.round((dur / threshold) * 100));
      const bar = document.getElementById(f.id+'-bar');
      const pctEl = document.getElementById(f.id+'-pct');
      if (bar) { bar.style.width = pct+'%'; bar.style.transition = 'width .6s'; }
      if (pctEl) pctEl.textContent = pct+'%';
    });
    let insight = '';
    if (dur < 20) insight = 'Trumpas bėgimas: visi nuovargio veiksniai minimalūs. Organizmas tik pradeda „kaisti".';
    else if (dur < 45) insight = 'Vidutinė trukmė: skysčių netekimas ir centrinis nuovargis pradeda kauptis, tačiau dar valdomi.';
    else if (dur < 90) insight = 'Ilgesnis bėgimas: glikogenas jau eikvojamas reikšmingai. Hidratacija ir energija tampa svarbūs veiksniai.';
    else insight = 'Ilgas bėgimas: visi nuovargio mechanizmai aktyvūs. Treniruotas bėgikas juos pasiekia vėliau, tačiau jų neišvengia.';
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
    document.getElementById('s15-dist-label').textContent = {5:'5K',10:'10K',21:'Pusmaratonis',42:'Maratonas'}[dist];
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
    const insight = `${dist > 10 ? 'Ilgesnėse distancijose' : '5K ir 10K'} neigiamas splitas gali sutaupyti apie ${fmt(saved)} lyginant su teigiamu splitu. Skirtumas auga kartu su distancija — maratone jis gali siekti 10–15 minučių.`;
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
    document.getElementById('s16-km-label').textContent = km+' km/sav.';
    document.getElementById('s16-weeks-label').textContent = weeks+(weeks===1?' savaitė':weeks<10?' savaitės':' savaičių');
    const musclePct = Math.min(100, Math.round((weeks / 6) * 100));
    const tendonPct = Math.min(100, Math.round((weeks / 16) * 100));
    const progressionRisk = km > 50 && weeks < 8 ? 'Aukšta' : km > 35 && weeks < 6 ? 'Vidutinė' : 'Žema';
    const riskColor = progressionRisk === 'Aukšta' ? '#ef4444' : progressionRisk === 'Vidutinė' ? '#f59e0b' : '#22c55e';
    document.getElementById('s16-muscle').textContent = musclePct+'%';
    document.getElementById('s16-muscle').style.color = musclePct > 60 ? '#22c55e' : '#f59e0b';
    document.getElementById('s16-tendon').textContent = tendonPct+'%';
    document.getElementById('s16-tendon').style.color = tendonPct > 60 ? '#22c55e' : '#ef4444';
    document.getElementById('s16-risk').textContent = progressionRisk;
    document.getElementById('s16-risk').style.color = riskColor;
    let insight = '';
    if (progressionRisk === 'Aukšta') insight = `Didelė apimtis per trumpą laiką: raumenys gali susidoroti (${musclePct}% adaptacijos), bet sausgyslės dar ne (${tendonPct}%). Būtent šioje situacijoje atsiranda dauguma perkrovos traumų.`;
    else if (progressionRisk === 'Vidutinė') insight = `Vidutinė rizika. Raumenų adaptacija (${musclePct}%) lenkia sausgyslių (${tendonPct}%). Atidžiai stebėkite bet kokius sausgyslių signalus.`;
    else insight = `Saugi zona. ${weeks < 8 ? 'Toliau nuosekliai didinkite — organizmas prisitaikys.' : 'Raumenų ir sausgyslių prisitaikymas vyksta sinchroniškai. Galite tęsti nuoseklų progresą.'}`;
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
      rec = '🔴 SUSTOKITE. Šis skausmo lygis reikalauja poilsio ir konsultacijos su sporto medicinos specialistu. Nebėkite, kol skausmas neišnyks.';
    } else if (when === 'during' || (when === 'start' && intensity >= 4)) {
      bg='#fff7ed'; border='#fdba74'; color='#7c2d12';
      rec = `🟠 SUMAŽINKITE KRŪVĮ. ${where === 'achilles' || where === 'knee' ? 'Sausgyslių skausmas, didėjantis bėgimo metu, yra rimtas ženklas. ' : ''}Bėkite 30–40% mažesne apimtimi ir stebėkite pokyčius savaitę.`;
    } else if (when === 'start' && intensity <= 3) {
      bg='#fefce8'; border='#fde68a'; color='#713f12';
      rec = `🟡 STEBĖKITE. Skausmas pradžioje, išnykstantis per kelias minutes — dažnai sausgyslės perkrovos ženklas. ${where === 'achilles' ? 'Achilo sausgyslės atveju pradėkite ekscentrinius blauzdos pratimus.' : 'Sumažinkite intensyvumą ir pradėkite stiprinimo pratimus.'} Jei kartojasi — kreipkitės į specialistą.`;
    } else if (when === 'after') {
      bg='#f0fdf4'; border='#86efac'; color='#14532d';
      rec = `🟢 NORMALU. ${where === 'muscle' ? 'Raumenų skausmas po treniruotės (DOMS) — normali prisitaikymo proceso dalis. Lengvas judėjimas ir hidratacija pagreitins atsigavimą.' : 'Skausmas tik po bėgimo — stebėkite, ar nemažėja. Jei didėja iš bėgimo į bėgimą — verta konsultuotis.'}`;
    } else {
      rec = 'Pasirinkite skausmo pobūdį, kad gautumėte rekomendaciją.';
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
    document.getElementById('s18-goal-label').textContent = goal+' treniruotė'+(goal===1?'':goal<5?'s':'s')+' / sav.';
    document.getElementById('s18-consist-label').textContent = consist+'%';
    const perfect = goal * 52;
    const real    = Math.round(perfect * consist / 100);
    const pct     = Math.round((real / perfect) * 100);
    document.getElementById('s18-perfect').textContent = perfect;
    document.getElementById('s18-real').textContent = real;
    document.getElementById('s18-diff').textContent = pct+'%';
    document.getElementById('s18-real').style.color = consist >= 80 ? '#22c55e' : consist >= 60 ? '#f59e0b' : '#ef4444';
    let insight = '';
    if (consist >= 85) insight = `${real} treniruotės per metus — puiku! Net ne tobulas, bet labai pastovus bėgikas kuria solidų pagrindą. Šis reguliarumas per 2–3 metus duoda rezultatus, kurių negali pasiekti heroiška, bet nenuosekli programa.`;
    else if (consist >= 65) insight = `${real} treniruotės per metus. Tai vis dar pakankamai, kad matytumėte aiškią pažangą. Pabandykite identifikuoti, kas trukdo praleistoms treniruotėms, ir pašalinkite barjerus iš anksto.`;
    else insight = `${real} treniruotės per metus. Didelis treniruočių skaičius, bet prasta pastovumas — reiškia, kad yra savaičių su daug treniruočių ir ilgų pertraukų. Organizmas geriau reaguoja į nuoseklumą nei į intensyvius, bet nenuoseklius periodus.`;
    document.getElementById('s18-insight').textContent = insight;
  }
  goalSl.addEventListener('input', update);
  consistSl.addEventListener('input', update);
  update();
}

// ── DEMO 19: Watch metrics reliability ──
function initDemo19() {
  const metrics = [
    { name:'GPS atstumas', reliability:'Patikimas', color:'#22c55e', detail:'GPS tikslumas paprastai ±1–3%. Klysta labiau tarp aukštų pastatų ar tankiuose miškuose. Pakankamai tikslus treniruočių stebėjimui.' },
    { name:'Bėgimo laikas', reliability:'Patikimas', color:'#22c55e', detail:'Tiesiogiai matuojamas. Absoliučiai tikslus.' },
    { name:'Kadencija', reliability:'Patikimas', color:'#22c55e', detail:'Akcelerometro duomenys — labai tikslūs. Vienas naudingiausių techninių rodiklių pradedantiesiems.' },
    { name:'Širdies ritmas (krūtinės dirž.)', reliability:'Patikimas', color:'#22c55e', detail:'Elektros signalo matavimas — labai tikslus net intervalinių metu. Jei norite tikslaus HR — naudokite krūtinės diržą.' },
    { name:'Širdies ritmas (riešo jutikl.)', reliability:'Vidutiniškai patikimas', color:'#f59e0b', detail:'Optinis matavimas yra vidutiniškai tikslus lygaus tempo bėgimui. Intervalinių ar kalnų bėgimų metu atsilieka 10–30 sek. ir gali skirtis iki 15 dūžių.' },
    { name:'VO₂max įvertinimas', reliability:'Tik orientacinis', color:'#ef4444', detail:'Algoritmas, pagrįstas HR ir tempo santykiu. Gali skirtis 10–15% nuo tikro VO₂max. Naudinga kaip ilgalaikė tendencija, bet absoliutūs skaičiai nepatikimi.' },
    { name:'Pasirengimo balas / kūno baterija', reliability:'Tik orientacinis', color:'#ef4444', detail:'Statistinis modelis, sukalibruotas vidutiniam vartotojui. Gali rodyti "žemą pasirengimą" po blogos nakties net jei fiziologiškai esate gerai. Naudokite kaip vieną iš signalų, ne kaip tiesą.' },
    { name:'Atsistatymo laikas', reliability:'Tik orientacinis', color:'#ef4444', detail:'Labai apytikslis. Tas pats algoritmas skirtingiems žmonėms duoda skirtingus rezultatus. Naudokite rytinį pulsą ir savijautą kaip tikslesnius atsigavimo rodiklius.' },
    { name:'Savaitinis kilometražas', reliability:'Patikimas', color:'#22c55e', detail:'GPS duomenų suma — patikimas rodiklis. Vienas naudingiausių rodiklių krūvio valdymui. Stebėkite jį kas savaitę.' }
  ];
  const container = document.getElementById('s19-metrics');
  let active = -1;
  function render() {
    container.innerHTML = metrics.map((m, i) =>
      `<div onclick="toggleMetric19(${i})" style="padding:.65rem 1rem;border-radius:8px;border:1px solid ${active===i?m.color:'var(--border)'};background:${active===i?'var(--surface)':'var(--bg)'};cursor:pointer;transition:all .2s">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:.88rem;font-weight:600;color:var(--text)">${m.name}</span>
          <span style="font-size:.7rem;font-weight:700;padding:.2rem .6rem;border-radius:10px;background:${m.color}20;color:${m.color}">${m.reliability}</span>
        </div>
        ${active===i?`<p style="font-size:.82rem;color:var(--muted);margin-top:.5rem;line-height:1.65">${m.detail}</p>`:''}
      </div>`
    ).join('');
  }
  window.toggleMetric19 = function(i) { active = active===i ? -1 : i; render(); };
  render();
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
      if (p < 0.50) return 'ĮKVĖPIMAS';
      return 'IŠKVĖPIMAS';
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
      var hi   = chest ? '#ef4444' : '#22c55e';

      ctx.fillStyle = bg; pill(ctx, px, py, pw, ph, 10); ctx.fill();
      ctx.strokeStyle = bord; ctx.lineWidth = 1.5; pill(ctx, px, py, pw, ph, 10); ctx.stroke();

      label(ctx, chest ? '✕  Krūtininis' : '✓  Diafragminis', px+pw/2, py+18, 11, hi, 'center', true);
      label(ctx, chest ? 'kvėpuoja krūtine' : 'kvėpuoja pilvu', px+pw/2, py+30, 8.5, '#9ca3af');

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
      ctx.strokeStyle = chest ? '#d1d5db' : 'rgba(34,197,94,0.7)'; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(backX+2, diaY); ctx.lineTo(fWaist+4, diaY); ctx.stroke();
      ctx.restore();
      if (!chest) label(ctx,'diafragma ↓', backX-4, diaY+3, 6.5, '#22c55e','right');

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
        label(ctx,'krūtinė kyla', fChest+22, chestY+2, 7.5, hi,'left',true);
        label(ctx,'pilvas nejuda', fBelly+22, bellyY+2, 7, '#9ca3af','left');
      }
      if (!chest && amp > 0.2) {
        ctx.globalAlpha = Math.min(1,(amp-0.2)/0.4);
        arrow(ctx, fBelly+18, bellyY, fBelly+30, bellyY, hi, 2); // belly out
        ctx.globalAlpha = 1;
        label(ctx,'pilvas plečiasi', fBelly+26, bellyY+2, 7.5, hi,'left',true);
        label(ctx,'krūtinė rami', fChest+22, chestY+2, 7, '#9ca3af','left');
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
      var col         = isWrong ? '#ef4444' : '#22c55e';

      // ── Bold vertical body-centre line ──
      ctx.save(); ctx.setLineDash([5,4]);
      ctx.strokeStyle='#94a3b8'; ctx.lineWidth=1.3;
      ctx.beginPath(); ctx.moveTo(cx, hipY-straight*0.7); ctx.lineTo(cx, groundY); ctx.stroke();
      ctx.restore();
      label(ctx,'kūno centras', cx, groundY+13, 7, '#9ca3af');

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
        ctx.fillStyle = isWrong ? 'rgba(239,68,68,0.30)' : 'rgba(34,197,94,0.30)';
        ctx.fill(); ctx.strokeStyle=col; ctx.lineWidth=1.2; ctx.stroke();

        // horizontal gap bracket between centre and foot
        var by = groundY - H*0.10;
        ctx.strokeStyle=col; ctx.lineWidth=1.4;
        ctx.beginPath(); ctx.moveTo(cx, by); ctx.lineTo(front.x, by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, by-4); ctx.lineTo(cx, by+4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(front.x, by-4); ctx.lineTo(front.x, by+4); ctx.stroke();

        // force arrow + label
        if (isWrong) {
          arrow(ctx, front.x, groundY-7, front.x-26, groundY-30, '#ef4444', 2);
          label(ctx,'stabdo!', (cx+front.x)/2, by-7, 8, '#ef4444','center',true);
        } else {
          arrow(ctx, front.x, groundY-6, front.x, groundY-30, '#22c55e', 2);
          label(ctx,'po kūnu', (cx+front.x)/2+6, by-7, 8, '#22c55e','center',true);
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
      label(ctx,'✕  Perkrova per žingsnį', lcx, pad+15, 10, '#dc2626','center',true);
      label(ctx,'✓  Teisingas žingsnis', rcx, pad+15, 10, '#16a34a','center',true);
      label(ctx,'koja krenta toli priekyje', lcx, pad+27, 7.5, '#9ca3af');
      label(ctx,'koja krenta po kūnu', rcx, pad+27, 7.5, '#9ca3af');

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
      ctx.fillStyle='rgba(34,197,94,'+(0.25+amp*0.45)+')'; ctx.fill();
      ctx.strokeStyle='#22c55e'; ctx.lineWidth=1.3; ctx.stroke();
      // dashed vertical guide from knee to foot
      ctx.save(); ctx.setLineDash([3,3]);
      ctx.strokeStyle='rgba(34,197,94,0.45)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(kneeX, kneeY); ctx.lineTo(kneeX, gy); ctx.stroke();
      ctx.restore();

      // depth label changes with movement
      label(ctx, amp > 0.6 ? 'apačia' : amp < 0.25 ? 'viršus' : 'leidžiasi', cx+tw*0.30, hipY, 7, '#9ca3af','center');
      label(ctx,'kelias virš pėdos', cx+tw*0.06, ty+th-1, 6.5, '#22c55e');
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
      ctx.fillStyle='rgba(34,197,94,0.6)'; ctx.fill();
      // alignment line
      if (lift > th*0.05) {
        ctx.strokeStyle='rgba(34,197,94,0.5)'; ctx.lineWidth=1;
        ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(gx1, hipY); ctx.lineTo(gx2, hipY); ctx.stroke();
        ctx.setLineDash([]);
      }
      // feet
      ctx.fillStyle='#e5e7eb';
      ctx.beginPath(); ctx.ellipse(footX, gy, 9,3.5, 0,0,2*Math.PI); ctx.fill();
      ctx.beginPath(); ctx.ellipse(shoulderX, gy, 6,3, 0,0,2*Math.PI); ctx.fill();
      label(ctx,'dubuo aukštyn', cx, ty+th-1, 6.5, '#22c55e');
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
      ctx.strokeStyle = heelHi ? '#22c55e' : '#374151';
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
      ctx.fillStyle = heelHi ? 'rgba(34,197,94,0.5)' : 'rgba(148,163,184,0.4)';
      ctx.fill();
      if (heelHi) {
        ctx.strokeStyle='#22c55e'; ctx.lineWidth=1.3; ctx.stroke();
      }
      // big direction arrow on the heel showing slow downward (eccentric) phase
      if (amp > 0.3 && amp < 0.95) {
        arrow(ctx, heelX+tw*0.10, heelY-th*0.05, heelX+tw*0.10, heelY+th*0.05, '#22c55e', 2);
        label(ctx,'3 sek.', heelX+tw*0.13, heelY, 7.5, '#22c55e','left',true);
      } else if (amp <= 0.3) {
        // rising phase, small up hint
        arrow(ctx, heelX+tw*0.10, heelY+th*0.04, heelX+tw*0.10, heelY-th*0.04, '#9ca3af', 1.6);
      }

      // ── step-edge reference dashed line (heel goes BELOW this) ──
      ctx.save(); ctx.setLineDash([3,3]);
      ctx.strokeStyle='rgba(34,197,94,0.4)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(stepX2, stepTopY); ctx.lineTo(cx+tw*0.30, stepTopY); ctx.stroke();
      ctx.restore();

      label(ctx, amp > 0.55 ? 'kulnas žemiau laiptelio' : 'kulnas viršuje', cx, ty+th-1, 6.5, heelHi ? '#22c55e' : '#9ca3af');
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
      ctx.strokeStyle='#22c55e'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(spineX2, spineY); ctx.lineTo(axEnd, ayEnd); ctx.stroke();
      ctx.beginPath(); ctx.arc(axEnd, ayEnd, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgba(34,197,94,'+(0.2+ext*0.6)+')'; ctx.fill();
      // extended leg (backward)
      var legLen = tw*0.30;
      var lxEnd = spineX1 - Math.cos(armAngle)*legLen;
      var lyEnd = spineY - Math.sin(armAngle)*legLen;
      ctx.strokeStyle='#22c55e'; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(spineX1, spineY); ctx.lineTo(lxEnd, lyEnd); ctx.stroke();
      ctx.beginPath(); ctx.arc(lxEnd, lyEnd, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgba(34,197,94,'+(0.2+ext*0.6)+')'; ctx.fill();
      // alignment dashed line
      if (ext > 0.3) {
        ctx.strokeStyle='rgba(34,197,94,'+(ext*0.5)+')'; ctx.lineWidth=1;
        ctx.setLineDash([4,3]);
        ctx.beginPath(); ctx.moveTo(lxEnd, spineY); ctx.lineTo(axEnd, spineY); ctx.stroke();
        ctx.setLineDash([]);
      }
      label(ctx,'priešinga ranka ir koja', cx, ty+th-1, 6.5, '#22c55e');
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

      drawExCard(ctx, xs[0], ys[0], cw, ch, 'Vienos kojos pritūpimas', 'Keturgalviai · Sėdmenys',
        function(c,cx,ty,tw,th){ drawSquat(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[1], ys[0], cw, ch, 'Sėdmenų tiltelis', 'Sėdmenys · Hamstring',
        function(c,cx,ty,tw,th){ drawBridge(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[0], ys[1], cw, ch, 'Ekscentrinis kulno kėlimas', 'Blauzda · Achilo sausgyslė',
        function(c,cx,ty,tw,th){ drawHeel(c,cx,ty,tw,th,amp); });
      drawExCard(ctx, xs[1], ys[1], cw, ch, 'Bird-dog', 'Šerdis · Nugaros tiesiamieji',
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

// ── DEMO 20: Atsigavimo pasiruošimas ──
function initDemo20() {
  const hoursSl   = document.getElementById('s20-hours');
  const qualitySl = document.getElementById('s20-quality');
  if (!hoursSl || !qualitySl) return;
  const qualityLabels = ['Prasta', 'Vidutinė', 'Gera', 'Labai gera', 'Puiki'];
  function update() {
    const hours   = parseFloat(hoursSl.value);
    const quality = parseInt(qualitySl.value);
    document.getElementById('s20-hours-label').textContent   = hours + ' val.';
    document.getElementById('s20-quality-label').textContent = qualityLabels[quality - 1];

    const hoursScore   = Math.max(0, Math.min(60, (hours - 4) / 5 * 60));
    const qualityScore = (quality - 1) / 4 * 40;
    const adapt = Math.round(hoursScore + qualityScore);

    const statusLabels = adapt >= 85 ? ['Puiki',      '#22c55e'] :
                         adapt >= 65 ? ['Gera',       '#22c55e'] :
                         adapt >= 45 ? ['Vidutinė',   '#f59e0b'] :
                         adapt >= 25 ? ['Maža',       '#ef4444'] :
                                       ['Labai maža', '#ef4444'];
    const sessionRec = adapt >= 80 ? 'Sunkios treniruotės galima' :
                       adapt >= 60 ? 'Lengva ar vidutinė' :
                       adapt >= 40 ? 'Tik lengvas bėgimas' :
                                     'Poilsis ar ėjimas';

    document.getElementById('s20-adapt').textContent   = adapt + '%';
    document.getElementById('s20-adapt').style.color   = statusLabels[1];
    document.getElementById('s20-status').textContent  = statusLabels[0];
    document.getElementById('s20-status').style.color  = statusLabels[1];
    document.getElementById('s20-session').textContent = sessionRec;
    document.getElementById('s20-session').style.color = statusLabels[1];

    let desc;
    if (adapt >= 80) {
      desc = `${hours} val. ${qualityLabels[quality-1].toLowerCase()} miegas suteikia stiprų adaptacijos langą. Augimo hormonas kulminuoja per pirmąjį gilaus miego ciklą — tokios trukmės ir kokybės miegas suteikia 2–3 pilnus ciklus. Sunkios treniruotės šiandien duos pilną treniruočių naudą. Ramybės pulsas tikriausiai ties baze arba žemiau.`;
    } else if (adapt >= 60) {
      desc = `Pakankamai geras atsigavimas, bet ne optimalus. Miegas pakankamas treniruotei, tačiau intensyvūs intervalai gali neduoti pilnos adaptacijos. Lengvas ar vidutinis bėgimas yra geresnis pasirinkimas. Pasirūpinkite miego kokybe šiąnakt, kad nepradėtumėte kaupti deficito.`;
    } else if (adapt >= 40) {
      desc = `Nepakankamas atsigavimas. Gilaus miego ciklai tikriausiai buvo sutrumpinti, ribojant HGH išskyrimą ir baltymų sintezę. Lengvas bėgimas tinkamas — jis gerina kraujo apytaką ir aktyviai padeda atsigauti, nedidindamas streso. Venkite jokio intensyvumo šiandien. Patikrinkite ramybės pulsą — jei pakilęs, tai patvirtina sprendimą bėgti lengvai.`;
    } else {
      desc = `Labai mažas atsigavimas. Esant ${hours} val. ${qualityLabels[quality-1].toLowerCase()} miegui, organizmas nebaigė pakankamų atsistatymo ciklų. Intensyvios treniruotės šiandien tik didina krūvį nesuteikdamos adaptacijos — rytoj atvyksite pavargę, o ne pailsėję. Poilsis, ėjimas arba 20 min labai lengvo judėjimo.`;
    }
    document.getElementById('s20-desc').textContent = desc;
  }
  hoursSl.addEventListener('input', update);
  qualitySl.addEventListener('input', update);
  update();
}

// ── DEMO 21: Kasdienės Mitybos tikslai ──
function initDemo21() {
  const weightSl  = document.getElementById('s21-weight');
  const sessionSl = document.getElementById('s21-session');
  if (!weightSl || !sessionSl) return;
  const sessionLabels = {
    rest:     'Poilsio diena',
    easy:     'Lengvas bėgimas (Z2)',
    moderate: 'Vidutinis tempo bėgimas',
    hard:     'Sunkūs intervalai / varžybų pastangos',
    long:     'Ilgas bėgimas (90+ min)'
  };
  const carbPerKg  = { rest: 3.0, easy: 4.0, moderate: 5.5, hard: 7.0, long: 8.0 };
  const postWindow = { rest: '—', easy: '60 min', moderate: '45 min', hard: '30 min', long: '30 min' };

  function update() {
    const w = parseInt(weightSl.value);
    const s = sessionSl.value;
    document.getElementById('s21-weight-label').textContent  = w + ' kg';
    document.getElementById('s21-session-label').textContent = sessionLabels[s];

    const carbs   = Math.round(w * carbPerKg[s]);
    const protein = Math.round(w * 1.8);
    document.getElementById('s21-carbs').textContent   = carbs + ' g';
    document.getElementById('s21-protein').textContent = protein + ' g';
    document.getElementById('s21-window').textContent  = postWindow[s];

    const descs = {
      rest: `Poilsio dieną angliavandenių poreikis žymiai mažesnis — ${carbs} g pakanka glikogenui palaikyti neslopinant riebalų deginimo adaptacijos. Išlaikykite ${protein} g baltymų sausgyslių atstatymui po vakarykštės treniruotės. Ideali diena magniu turtingiems valgymams (riešutai, tamsios daržovės) ir geležies įsisavinimui (raudona mėsa ar ankštiniai su vitaminu C).`,
      easy: `Lengvi Z2 bėgimai daugiausia naudoja riebalus kurui — prieš treniruotę glikogeno papildymo nereikia. Dienos ${carbs} g angliavandenių yra pakankama. Sutelkite dėmesį į ${protein} g baltymų, paskirstytų per 4 valgius (~30 g per valgymą) — tai kur vyksta sausgyslių kolageno sintezė. Retkarčiais bėgimas nevalgius lengvomis dienomis yra tinkamas ir ugdo riebalų deginimo pajėgumą.`,
      moderate: `Tempo bėgimas reikšmingai naudoja glikogeną. Valgykite angliavandeniais turtingą patiekalą likus 2–3 val. (avižiniai dribsniai, ryžiai ar duona). Dienos tikslas: ${carbs} g. Po treniruotės 45 minučių langas svarbus — siekite 1 g/kg angliavandenių (${w} g) ir ${Math.round(w * 0.4)} g baltymų kuo greičiau.`,
      hard: `Sunkūs intervalai žymiai eikvoja glikogeną. Pradėkite treniruotę su pilnomis atsargomis: valgykite ${Math.round(w * 1.5)} g angliavandenių likus 2–3 val. 30 minučių langas po treniruotės yra kritiškai svarbus — ${Math.round(w)} g angliavandenių + 25–30 g baltymų nedelsiant. Dienos tikslas: ${carbs} g. Hidratacija ir elektrolitai svarbesni sunkiomis dienomis.`,
      long: `Ilgi bėgimai (90+ min) — didžiausias savaitės angliavandenių poreikis. Iš anksto papildykite vakare prieš: ${Math.round(w * 1.5)} g lengvai virškinamų angliavandenių ir dar kartą likus 2–3 val. Bėgimo metu gelius ar angliavandenius vartokite kas 45 min. Po bėgimo: ${Math.round(w)} g angliavandenių + 30 g baltymų per 30 minučių. Dienos iš viso: ${carbs} g.`
    };
    document.getElementById('s21-desc').textContent = descs[s];
  }
  weightSl.addEventListener('input', update);
  sessionSl.addEventListener('change', update);
  update();
}

// ── DEMO 22: Treniruočių modelių analizatorius ──
function initDemo22() {
  const hrSl    = document.getElementById('s22-hr');
  const driftSl = document.getElementById('s22-drift');
  const jumpSl  = document.getElementById('s22-jump');
  if (!hrSl || !driftSl || !jumpSl) return;

  function signal(label, value, color, detail) {
    return `<div style="padding:.6rem 1rem;border-radius:8px;border:1px solid ${color}40;background:${color}08;display:flex;align-items:flex-start;gap:.75rem">
      <span style="font-size:.75rem;font-weight:700;padding:.2rem .55rem;border-radius:10px;background:${color}20;color:${color};white-space:nowrap;margin-top:.1rem">${value}</span>
      <div><div style="font-size:.82rem;font-weight:600;color:var(--text);margin-bottom:.2rem">${label}</div>
      <div style="font-size:.78rem;color:var(--muted);line-height:1.6">${detail}</div></div>
    </div>`;
  }

  function update() {
    const hr    = parseInt(hrSl.value);
    const drift = parseInt(driftSl.value);
    const jump  = parseInt(jumpSl.value);

    document.getElementById('s22-hr-label').textContent    = (hr >= 0 ? '+' : '') + hr + ' k/min';
    document.getElementById('s22-drift-label').textContent = drift + '%';
    document.getElementById('s22-jump-label').textContent  = '+' + jump + '%';

    let hrColor, hrVal, hrDetail;
    if (hr <= 0) {
      hrColor = '#22c55e'; hrVal = 'Normalus';
      hrDetail = 'Ties baze arba žemiau — pilnas atsigavimas po paskutinių treniruočių. Organizmas apdorojo treniruočių stresą. Sunkios treniruotės tinkamos.';
    } else if (hr <= 4) {
      hrColor = '#84cc16'; hrVal = 'Šiek tiek pakilęs';
      hrDetail = 'Mažas padidėjimas — vis dar normalios svyravimo ribose. Gali atspindėti vakarykštę treniruotę. Lengvas bėgimas tinkamas; palaukite su intervalais iki rytojaus.';
    } else if (hr <= 7) {
      hrColor = '#f59e0b'; hrVal = 'Pakilęs';
      hrDetail = 'Aiškiai virš bazės. Organizmas vis dar apdoroja neseną treniruočių krūvį. Šiandien — tik lengvas bėgimas ar poilsis. Jei taip tęsiasi 3+ dienas, mažinkite bendrą apimtį.';
    } else {
      hrColor = '#ef4444'; hrVal = 'Aukštas';
      hrDetail = `${hr} k/min virš bazės — aiškus pervargimo signalas. Kartu su bet kuriuo kitu pakilusiu rodikliu tai yra galutinis poilsio dienos signalas. Pirma atmeskite ligą — pakilęs ramybės pulsas yra ir ankstyvas infekcijos simptomas.`;
    }

    let driftColor, driftVal, driftDetail;
    if (drift <= 5) {
      driftColor = '#22c55e'; driftVal = 'Geras';
      driftDetail = 'Mažas nukrypimas — jūsų lengvas tempas yra tikrai aerobinis. Pulsas stabilus viso bėgimo metu, tai reiškia, kad esate gerai Z2 ribose ir širdies ir kraujagyslių sistema nedirba sunkiai jį palaikydama.';
    } else if (drift <= 10) {
      driftColor = '#f59e0b'; driftVal = 'Vidutinis';
      driftDetail = 'Pastebimas nukrypimas. Jūsų pradinis tempas gali būti šiek tiek per greitas Z2, arba esate lengvai dehidratuoti. Pabandykite pradėti 10–15 sek/km lėčiau ir patikrinkite, ar nukrypimas sumažėja žemiau 5%.';
    } else {
      driftColor = '#ef4444'; driftVal = 'Didelis';
      driftDetail = `${drift}% nukrypimas reiškia, kad jūsų lengvi bėgimai nėra lengvi. Tikriausiai bėgate Z3 riboje — pakankamai, kad kaupiamas nuovargis, bet nepakankamai realiai slenkstinei adaptacijai. Tai pilkoji zona. Lėtinkite, kol nukrypimas sumažės žemiau 8%.`;
    }

    let jumpColor, jumpVal, jumpDetail;
    if (jump <= 10) {
      jumpColor = '#22c55e'; jumpVal = 'Saugus';
      jumpDetail = 'Kilometražo padidėjimas neviršija 10% gairės. Raumenys ir sausgyslės turi pakankamai laiko prisitaikyti prie naujo krūvio. Tęskite šiuo tempu ir kas 3–4 savaites planuokite mažesnio krūvio savaitę.';
    } else if (jump <= 20) {
      jumpColor = '#f59e0b'; jumpVal = 'Atsargiai';
      jumpDetail = `${jump}% šuolis viršija saugią gairę. Raumenys prisitaiko per 1–2 savaites; sausgyslės — per 4–8 savaites. Traumų rizikos langas atviras. Atidžiai stebėkite blauzdinės, Achilo sausgyslės ir kelio signalus šią savaitę.`;
    } else {
      jumpColor = '#ef4444'; jumpVal = 'Didelė rizika';
      jumpDetail = `${jump}% yra reikšmingas krūvio šuolis. Tai vienas iš stipriausių pervargimo traumų prognozuotojų mėgėjų bėgikams. Net jei jaučiatės gerai — kitą savaitę sumažinkite apimtį, kad absorbuotumėte šuolį prieš vėl didindami.`;
    }

    document.getElementById('s22-signals').innerHTML =
      signal('Ramybės pulso tendencija', hrVal, hrColor, hrDetail) +
      signal('Pulso nukrypimas lengvame bėgime', driftVal, driftColor, driftDetail) +
      signal('Savaitinis kilometražo šuolis', jumpVal, jumpColor, jumpDetail);

    const issues = [hrVal, driftVal, jumpVal].filter(v => v === 'Aukštas' || v === 'Didelė rizika' || v === 'Pakilęs').length;
    const cautions = [hrVal, driftVal, jumpVal].filter(v => v === 'Atsargiai' || v === 'Vidutinis' || v === 'Šiek tiek pakilęs').length;
    let summary;
    if (issues >= 2) {
      summary = 'Keli raudoni signalai: šiandien — poilsis ar aktyvus atsistatymas. Du ar daugiau vienu metu ignoruojamų perkrovos signalų — taip vystosi pervargimo traumos. Jos retai praneša apie save vienu aiškiu įspėjimu.';
    } else if (issues === 1) {
      summary = 'Vienas raudonas signalas: reaguokite kol nesikaupia. Vienas perkrovos signalas, į kurį reaguojama laiku, paprastai išsisprendžia per 1–3 dienas. Tas pats signalas, ignoruojamas savaitę, dažnai tampa trauma.';
    } else if (cautions >= 2) {
      summary = 'Du geltoni signalai: veikite atsargiai. Lengva treniruotė tinkama, bet šiandien — jokio intensyvumo. Peržvelkite paskutines 2 savaites — geltonų signalų modelis dažnai reiškia, kad bendras treniruočių krūvis per aukštas be pakankamo atsigavimo.';
    } else {
      summary = 'Signalai atrodo sveiki. Jūsų treniruočių krūvis, atsigavimas ir lengvų bėgimų kokybė yra geroje srityje. Tęskite savaitinį stebėjimą — šie rodikliai naudingiausiai vertinami kaip tendencijos, o ne pavieniai rodmenys.';
    }
    document.getElementById('s22-summary').textContent = summary;
  }

  hrSl.addEventListener('input', update);
  driftSl.addEventListener('input', update);
  jumpSl.addEventListener('input', update);
  update();
}

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
