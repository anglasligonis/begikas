// ── GLOSSARY ──
const GLOSSARY_TERMS = [
  { term: 'Aerobic', def: 'With oxygen. Aerobic training refers to exercise where energy is produced with the help of oxygen. Easy and moderate running is aerobic.' },
  { term: 'Anaerobic', def: 'Without oxygen. Very intense running where oxygen supply is insufficient — energy is produced anaerobically, with lactate accumulating.' },
  { term: 'DOMS', def: 'Delayed Onset Muscle Soreness — muscle soreness that appears 24–48 hours after training, caused by micro-tears in muscle fibres. Not related to lactate.' },
  { term: 'Eccentric strength', def: 'The muscle\'s ability to control movement while lengthening (e.g. descending stairs or running downhill). Important for injury prevention.' },
  { term: 'FatMax', def: 'The intensity zone at which the body burns the greatest absolute amount of fat. Usually corresponds to Z2 (60–70% MaxHR).' },
  { term: 'Glycogen', def: 'Glucose stores in muscles and the liver. The primary source of fast energy. Limited capacity — approximately 1,500–2,000 kcal, enough for about 90 minutes of intense running.' },
  { term: 'Cadence', def: 'Number of steps per minute (SPM). The optimal range for most runners is 170–180 SPM. Lower cadence means a longer stride and greater impact force.' },
  { term: 'Capillaries', def: 'The smallest blood vessels, delivering oxygen directly to muscle fibres. Endurance training increases capillary density — one of the main mechanisms of aerobic progress.' },
  { term: 'Cardiac drift', def: 'Heart rate creep — heart rate rises while running at the same pace for longer, especially in heat or when dehydrated.' },
  { term: 'Lactate', def: 'A substance produced when glucose is broken down quickly. Not directly responsible for the burning sensation — that is caused by hydrogen ions. Lactate itself can serve as fuel.' },
  { term: 'Lactate threshold', def: 'The intensity level above which lactate in the blood begins to accumulate faster than it is cleared. A trained runner reaches this threshold later (at a higher pace).' },
  { term: 'MaxHR', def: 'Maximum heart rate — the fastest your heart can beat. Approximate formula: 220 minus age. More accurately determined in a laboratory.' },
  { term: 'Mitochondria', def: 'The cell\'s "power station" — the organelle where energy is produced aerobically. Endurance training increases the number and efficiency of mitochondria.' },
  { term: 'Overstriding', def: 'Overloading per step — the foot lands too far in front of the body\'s centre of mass. Increases impact force and the risk of knee injuries.' },
  { term: 'Polarised model', def: 'The 80/20 training principle: 80% very easy, 20% very hard. The middle zone is avoided. A scientifically supported model used by elite athletes.' },
  { term: 'RPE', def: 'Rate of Perceived Exertion — a subjective difficulty scale from 1 to 10. A simple way to measure intensity without a heart rate monitor.' },
  { term: 'Threshold (LT)', def: 'See Lactate threshold.' },
  { term: 'Split', def: 'The time for each individual kilometre or section of the race. Positive split — first half faster than second. Negative split — second half faster. A negative split usually produces the best overall result.' },
  { term: 'Supercompensation', def: 'The body\'s adaptation mechanism: after stress (training) and rest, the body becomes slightly more capable than before the stress. This is the basis of progress.' },
  { term: 'Core', def: 'The trunk stabilising muscles — transverse abdominals, obliques, spinal extensors, diaphragm. Important for transferring force between the legs and arms while running.' },
  { term: 'Pace', def: 'Running speed expressed as time — minutes per kilometre (min/km) or minutes per mile. The higher the number, the slower the running. For example, 6:00 min/km is a slower pace than 5:00 min/km.' },
  { term: 'VT1', def: 'First ventilatory threshold — breathing rate begins to rise more quickly. Roughly corresponds to the Z2/Z3 boundary. Above it, conversation becomes more difficult.' },
  { term: 'VT2', def: 'Second ventilatory threshold — breathing is very intense, conversation becomes impossible. Roughly corresponds to the lactate threshold.' },
  { term: 'VDOT', def: 'A running fitness metric developed by Jack Daniels, calculated from race results. Used to determine precise training zones.' },
  { term: 'VO₂ Max', def: 'The maximum amount of oxygen the body can consume per minute. One of the primary indicators of endurance capacity. Increases with aerobic training.' },
  { term: 'Z1–Z5', def: 'Training zones based on heart rate as a percentage of MaxHR. Z1 (50–60%): very easy. Z2 (60–70%): aerobic base. Z3 (70–80%): grey zone. Z4 (80–90%): threshold. Z5 (90–100%): maximum.' }
];

function buildGlossary() {
  const list = document.getElementById('glossaryList');
  list.innerHTML = GLOSSARY_TERMS.map(t =>
    `<div class="glossary-entry">
      <div class="glossary-term">${t.term}</div>
      <div class="glossary-def">${t.def}</div>
    </div>`
  ).join('');
}

function filterGlossary(q) {
  const lq = q.toLowerCase();
  document.querySelectorAll('.glossary-entry').forEach((el, i) => {
    const term = GLOSSARY_TERMS[i];
    const match = term.term.toLowerCase().includes(lq) || term.def.toLowerCase().includes(lq);
    el.classList.toggle('hidden', !match);
  });
}

function toggleGlossary() {
  const dialog = document.getElementById('glossaryDialog');
  if (dialog.open) {
    dialog.close();
  } else {
    dialog.showModal();
    document.getElementById('glossarySearch').focus();
  }
}

buildGlossary();

// Close on backdrop click (click outside the dialog panel)
document.getElementById('glossaryDialog').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) toggleGlossary();
});
