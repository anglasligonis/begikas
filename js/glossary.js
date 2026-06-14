// ── GLOSSARY ──
const GLOSSARY_TERMS = [
  { term: 'Aerobinis', def: 'Su deguonimi. Aerobinės treniruotės yra tos, kuriose energija gaminama naudojant deguonį. Lengvas ir vidutinis bėgimas yra aerobinis.' },
  { term: 'Anaerobinis', def: 'Be deguonies. Labai intensyvus bėgimas, kai deguonies nepakanka, energija gaminama anaerobiškai, kaupiantis laktatui.' },
  { term: 'DOMS', def: 'Delayed Onset Muscle Soreness, uždelstas raumenų skausmas. Raumenų skausmas 24–48 val. po treniruotės, sukeltas mikro-įplyšimų. Nesusijęs su laktatu.' },
  { term: 'Ekscentrinis stiprumas', def: 'Raumenų gebėjimas valdyti judesį ilgėjant (pvz. nusileidžiant laiptais ar bėgant nuokalne). Svarbus traumų prevencijai.' },
  { term: 'FatMax', def: 'Intensyvumo zona, kurioje kūnas sudegina didžiausią absoliutų riebalų kiekį. Dažniausiai atitinka Z2 (60–70% MaksPP).' },
  { term: 'Glikogenas', def: 'Gliukozės atsargos raumenyse ir kepenyse. Pagrindinis greitos energijos šaltinis. Ribota talpa, ~1500–2000 kcal, užtenka ~90 min intensyvaus bėgimo.' },
  { term: 'Kadencija', def: 'Žingsnių skaičius per minutę (ž./min). Daugumai bėgikų optimalus diapazonas yra 170–180. Mažesnė kadencija reiškia ilgesnį žingsnį ir didesnę smūgio jėgą.' },
  { term: 'Kapiliarai', def: 'Mažiausios kraujagyslės, deguonį pristatančios tiesiai į raumens skaidulas. Ištvermės treniruotės didina kapiliarų tankumą; tai vienas pagrindinių aerobinio progreso mechanizmų.' },
  { term: 'Kardiodriftas (pulso slinkis)', def: 'Širdies ritmo slinkis, pulsas kyla bėgant tuo pačiu tempu ilgiau, ypač karštyje ar esant dehidratacijai.' },
  { term: 'Laktatas', def: 'Medžiaga, susidaranti greitai skaidant gliukozę. Ji nėra tiesioginė deginimo pojūčio priežastis, deginimą sukelia vandenilio jonai. Laktatas pats gali būti kuras.' },
  { term: 'Laktatinis slenkstis', def: 'Intensyvumo riba, po kurios laktatas kraujyje pradeda kauptis greičiau nei perdirbamas. Treniruotas bėgikas pasiekia šią ribą vėliau (didesniu tempu).' },
  { term: 'Liemuo (core)', def: 'Liemens stabilizaciniai raumenys, skersiniai pilvo raumenys, įstrižieji, nugaros tiesiamieji, diafragma. Svarbūs jėgos perdavimui tarp kojų ir rankų bėgant.' },
  { term: 'MaksPP', def: 'Maksimalus pulso dažnis: greičiausias ritmas, kuriuo gali plakti širdis. Apytikslė formulė: 220 − amžius. Tiksliau nustatoma laboratorijoje.' },
  { term: 'Mitochondrijos', def: 'Ląstelės „elektrinė“, organelė, kurioje aerobiškai gaminama energija. Ištvermės treniruotės didina mitochondrijų kiekį ir efektyvumą.' },
  { term: 'Overstriding', def: 'Perkrova per žingsnį: nusileisdama koja atsiduria per toli priešais kūno masės centrą. Didina smūgio jėgą ir kelio traumų riziką.' },
  { term: 'Poliarizuotas modelis', def: '80/20 treniruočių principas: 80% labai lengvos, 20% labai sunkios. Vengiama vidurinės zonos. Moksliniais tyrimais pagrįstas elito sportininkų modelis.' },
  { term: 'RPE', def: 'Rate of Perceived Exertion, subjektyvaus sunkumo skalė nuo 1 iki 10. Paprastas būdas matuoti intensyvumą be pulsometro.' },
  { term: 'Slenkstis (LT)', def: 'Žr. Laktatinis slenkstis.' },
  { term: 'Splitas (tarpinis laikas)', def: 'Atskiro kilometro arba distancijos dalies įveikimo laikas varžybose. Teigiamas splitas yra tada, kai pirmoji pusė greitesnė nei antroji, o neigiamas, kai antroji pusė greitesnė. Neigiamas splitas dažniausiai duoda geriausią galutinį rezultatą.' },
  { term: 'Superkompensacija', def: 'Kūno prisitaikymo mechanizmas: po streso (treniruotės) ir poilsio kūnas tampa šiek tiek pajėgesnis nei prieš stresą. Tai progreso pagrindas.' },
  { term: 'Tempas', def: 'Bėgimo greitis, išreikštas laiku: minutės kilometrui (min/km) arba myliai. Kuo didesnis skaičius, tuo lėtesnis bėgimas. Pavyzdžiui, 6:00 min/km yra lėtesnis tempas nei 5:00 min/km.' },
  { term: 'VT1', def: 'Pirmasis ventiliacijos slenkstis: kvėpavimo dažnis pradeda kilti sparčiau. Maždaug atitinka Z2/Z3 ribą. Virš jo, sunkiau kalbėtis.' },
  { term: 'VT2', def: 'Antrasis ventiliacijos slenkstis: kvėpavimas labai intensyvus, kalbėti nebeįmanoma. Maždaug atitinka laktatinį slenkstį.' },
  { term: 'VDOT', def: 'Jack Danielso sukurtas bėgiko pajėgumo rodiklis, apskaičiuojamas iš varžybų rezultato. Naudojamas nustatyti tikslias treniruočių zonas.' },
  { term: 'VO₂max', def: 'Maksimalus deguonies kiekis, kurį kūnas gali sunaudoti per minutę. Vienas pagrindinių ištvermės pajėgumo rodiklių. Kyla su aerobinėmis treniruotėmis.' },
  { term: 'Z1–Z5', def: 'Treniruočių zonos pagal pulso procentą nuo MaksPP. Z1 (50–60%): labai lengva. Z2 (60–70%): aerobinė bazė. Z3 (70–80%): tarpinė, „pilkoji“ zona. Z4 (80–90%): slenkstis. Z5 (90–100%): maksimumas.' }
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
