// ── GLOSSARY ──
const GLOSSARY_TERMS = [
  { term: 'Aerobic', def: 'With oxygen. Aerobic training uses oxygen to generate energy. Easy and moderate running is aerobic.' },
  { term: 'Anaerobic', def: 'Without oxygen. Very intense running where oxygen is insufficient, so energy is produced anaerobically, with lactate accumulating.' },
  { term: 'Cadence', def: 'Steps per minute (SPM). The optimal range for most runners is 170–180 SPM. Lower cadence means a longer stride and greater impact force.' },
  { term: 'Capillaries', def: 'The smallest blood vessels, delivering oxygen directly to muscle fibres. Endurance training increases capillary density, one of the key mechanisms of aerobic progress.' },
  { term: 'Cardiac drift', def: 'Heart rate creep: heart rate rises while maintaining the same pace over time, especially in heat or when dehydrated.' },
  { term: 'Core', def: 'The stabilising muscles of the trunk, transverse abdominals, obliques, spinal extensors, diaphragm. Important for transferring force between the legs and arms while running.' },
  { term: 'DOMS', def: 'Delayed Onset Muscle Soreness, muscle soreness 24–48 hours after training, caused by micro-tears in muscle fibres. Not related to lactate.' },
  { term: 'Eccentric strength', def: 'A muscle\'s ability to control movement while lengthening (e.g. descending stairs or running downhill). Important for injury prevention.' },
  { term: 'FatMax', def: 'The intensity zone at which the body burns the most fat in absolute terms. Typically corresponds to Z2 (60–70% MaxHR).' },
  { term: 'Glycogen', def: 'Glucose stores in muscles and the liver. The main source of fast energy. Limited capacity, ~1,500–2,000 kcal, enough for ~90 min of intense running.' },
  { term: 'Lactate', def: 'A compound produced when glucose is broken down quickly. Not directly responsible for the burning sensation. That\'s caused by hydrogen ions. Lactate itself can be used as fuel.' },
  { term: 'Lactate threshold', def: 'The intensity level beyond which lactate in the blood accumulates faster than it is cleared. A trained runner reaches this threshold later (at a higher pace).' },
  { term: 'MaxHR', def: 'Maximum heart rate, the fastest your heart can beat. Rough formula: 220 − age. More accurately measured in a lab.' },
  { term: 'Mitochondria', def: 'The cell\'s "power plant", the organelle where energy is produced aerobically. Endurance training increases both the number and efficiency of mitochondria.' },
  { term: 'Overstriding', def: 'A stride in which the foot lands too far in front of the body\'s centre of mass. Increases impact force and the risk of knee injuries.' },
  { term: 'Pace', def: 'Running speed expressed as time, minutes per kilometre (min/km) or minutes per mile. The larger the number, the slower the pace. For example, 6:00 min/km is slower than 5:00 min/km.' },
  { term: 'Polarised model', def: 'The 80/20 training principle: 80% very easy, 20% very hard. The middle zone is avoided. A scientifically backed model used by elite athletes.' },
  { term: 'RPE', def: 'Rate of Perceived Exertion, a subjective effort scale from 1 to 10. A simple way to measure intensity without a heart-rate monitor.' },
  { term: 'Split', def: 'The time for an individual kilometre or segment of a race. A positive split means the first half was faster than the second. A negative split means the second half was faster, and usually produces the best finish time.' },
  { term: 'Supercompensation', def: 'The body\'s adaptation mechanism: after stress (training) and rest, the body becomes slightly more capable than before. This is the foundation of progress.' },
  { term: 'Threshold (LT)', def: 'See Lactate threshold.' },
  { term: 'VDOT', def: 'A running fitness metric developed by Jack Daniels, calculated from race results. Used to set precise training zones.' },
  { term: 'VO₂ Max', def: 'The maximum amount of oxygen the body can consume per minute. One of the key indicators of endurance capacity. Rises with aerobic training.' },
  { term: 'VT1', def: 'First ventilatory threshold: breathing rate starts to rise more quickly. Roughly corresponds to the Z2/Z3 boundary. Above it, conversation becomes harder.' },
  { term: 'VT2', def: 'Second ventilatory threshold: breathing is very intense, speech impossible. Roughly corresponds to the lactate threshold.' },
  { term: 'Z1–Z5', def: 'Training zones based on percentage of MaxHR. Z1 (50–60%): very easy. Z2 (60–70%): aerobic base. Z3 (70–80%): grey zone. Z4 (80–90%): threshold. Z5 (90–100%): maximum.' }
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
