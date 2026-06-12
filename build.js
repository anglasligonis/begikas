#!/usr/bin/env node
/* Static-page build for apiebegima.lt.
 * Source of truth: src/lt.html and src/en.html (full SPA-style files, edited as before).
 * Output: landing pages + one real page per lesson + sitemap.xml.
 * Run: node build.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SITE = 'https://apiebegima.lt';
const TODAY = new Date().toISOString().slice(0, 10);

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }
function write(p, s) {
  const f = path.join(ROOT, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s);
}
function assert(cond, msg) { if (!cond) { console.error('BUILD FAILED: ' + msg); process.exit(1); } }

/* Slugs live in the per-language nav.js — parse them so there is one source */
function slugsFrom(navPath) {
  const m = read(navPath).match(/const LESSON_SLUGS = \[([\s\S]*?)\];/);
  assert(m, 'LESSON_SLUGS not found in ' + navPath);
  const slugs = [...m[1].matchAll(/'([a-z0-9-]+)'/g)].map(x => x[1]);
  assert(slugs.length === 22, navPath + ': expected 22 slugs, got ' + slugs.length);
  return slugs;
}

/* Glossary terms live in the per-language glossary.js — same single-source idea */
function glossaryTerms(p) {
  const m = read(p).match(/const GLOSSARY_TERMS = (\[[\s\S]*?\]);/);
  assert(m, 'GLOSSARY_TERMS not found in ' + p);
  const terms = vm.runInNewContext('(' + m[1] + ')');
  assert(Array.isArray(terms) && terms.length > 0, p + ': empty glossary');
  return terms;
}

const LANGS = {
  lt: {
    src: 'src/lt.html',
    slugs: slugsFrom('js/nav.js'),
    base: '/pamoka/',
    home: '/',
    landingOut: 'index.html',
    titleSuffix: ' — Bėgimo fiziologija | Begikas',
    courseName: 'Bėgimo Fiziologija — Pradedantiesiems',
    hashRedirect: `(function(){var m=location.hash.match(/^#pamoka\\/([a-z0-9-]+)/);if(m)location.replace('/pamoka/'+m[1]+'/');})();`,
    scriptsLesson: n => `<script>window.LESSON=${n};</script>
<script defer src="/js/nav.js?v=8"></script>
<script defer src="/js/quiz.js?v=3"></script>
<script defer src="/js/glossary.js?v=4"></script>
<script defer src="/js/demos.js?v=5"></script>`,
    scriptsLanding: `<script defer src="/js/nav.js?v=8"></script>
<script defer src="/js/glossary.js?v=4"></script>
<script defer src="/js/landing.js?v=6"></script>`,
    glossary: {
      js: 'js/glossary.js',
      out: 'zodynas/index.html',
      path: '/zodynas/',
      h1: 'Bėgimo terminų žodynas',
      eyebrow: n => `Žodynas · ${n} ${n % 10 === 0 || (n % 100 >= 11 && n % 100 <= 19) ? 'terminų' : n % 10 === 1 ? 'terminas' : 'terminai'}`,
      intro: 'Svarbiausi bėgimo terminai, paaiškinti paprastai — nuo laktato iki VO₂max. Žodyną rasite ir kiekvienos pamokos viršutiniame meniu.',
      desc: 'Bėgimo terminų žodynas: laktatas, VO₂max, kadencija, glikogenas ir kiti svarbiausi terminai, paaiškinti paprastai.',
      scripts: `<script defer src="/js/nav.js?v=8"></script>
<script defer src="/js/glossary.js?v=4"></script>`,
    },
  },
  en: {
    src: 'src/en.html',
    slugs: slugsFrom('en/js/nav.js'),
    base: '/en/lesson/',
    home: '/en/',
    landingOut: 'en/index.html',
    titleSuffix: ' — Running Physiology | Begikas',
    courseName: 'Running Physiology — For Beginners',
    hashRedirect: `(function(){var m=location.hash.match(/^#lesson\\/([a-z0-9-]+)/);if(m)location.replace('/en/lesson/'+m[1]+'/');})();`,
    scriptsLesson: n => `<script>window.LESSON=${n};</script>
<script defer src="/en/js/nav.js?v=8"></script>
<script defer src="/js/quiz.js?v=3"></script>
<script defer src="/en/js/glossary.js?v=3"></script>
<script defer src="/en/js/demos.js?v=5"></script>`,
    scriptsLanding: `<script defer src="/en/js/nav.js?v=8"></script>
<script defer src="/en/js/glossary.js?v=3"></script>
<script defer src="/js/landing.js?v=6"></script>`,
    glossary: {
      js: 'en/js/glossary.js',
      out: 'en/glossary/index.html',
      path: '/en/glossary/',
      h1: 'Running glossary',
      eyebrow: n => `Glossary · ${n} terms`,
      intro: 'The key running terms, explained simply — from lactate to VO₂max. The glossary is also available from the top menu in every lesson.',
      desc: 'Running glossary: lactate, VO₂max, cadence, glycogen and other key terms explained in plain language.',
      scripts: `<script defer src="/en/js/nav.js?v=8"></script>
<script defer src="/en/js/glossary.js?v=3"></script>`,
    },
  },
};

/* ---------- helpers ---------- */

function absolutize(html) {
  /* images/... or ../images/... → /images/  (lookbehind avoids https://...lt/images/) */
  return html.replace(/(?<=["'(,\s])(\.\.\/)?images\//g, '/images/');
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

function escAttr(s) { return s.replace(/"/g, '&quot;'); }

function replaceOnce(s, re, repl, what) {
  assert(re.test(s), 'pattern not found: ' + what);
  return s.replace(re, repl);
}

function slugify(s) {
  return decodeEntities(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* Fill the head template's per-page fields: title, description, canonical,
   hreflang pair, OG/Twitter, JSON-LD. */
function pageHead(headTpl, o) {
  let h = headTpl.replace('__FLASH_SCRIPT__', '');
  h = replaceOnce(h, /<title>[\s\S]*?<\/title>/, `<title>${o.title}</title>`, 'title');
  h = replaceOnce(h, /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${escAttr(o.desc)}">`, 'meta description');
  h = replaceOnce(h, /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${o.url}">`, 'canonical');
  h = replaceOnce(h, /<link rel="alternate" hreflang="lt" href="[^"]*">/,
    `<link rel="alternate" hreflang="lt" href="${o.ltUrl}">`, 'hreflang lt');
  h = replaceOnce(h, /<link rel="alternate" hreflang="en" href="[^"]*">/,
    `<link rel="alternate" hreflang="en" href="${o.enUrl}">`, 'hreflang en');
  h = replaceOnce(h, /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="x-default" href="${o.ltUrl}">`, 'hreflang x-default');
  h = replaceOnce(h, /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${escAttr(o.title)}">`, 'og:title');
  h = replaceOnce(h, /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${escAttr(o.desc)}">`, 'og:description');
  h = replaceOnce(h, /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${o.url}">`, 'og:url');
  h = replaceOnce(h, /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${escAttr(o.title)}">`, 'twitter:title');
  h = replaceOnce(h, /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${escAttr(o.desc)}">`, 'twitter:description');
  h = replaceOnce(h, /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(o.ld, null, 2)}\n</script>`, 'JSON-LD');
  return h;
}

/* ---------- per-language build ---------- */

const sitemapUrls = [];

for (const [lang, L] of Object.entries(LANGS)) {
  const other = LANGS[lang === 'lt' ? 'en' : 'lt'];
  const src = read(L.src);

  /* -- slice the source -- */
  const headEnd = src.indexOf('</head>');
  const bodyStart = src.indexOf('<body>');
  const landingStart = src.indexOf('<section id="landing">');
  const mainStart = src.indexOf('<main');
  const mainOpenEnd = src.indexOf('>', mainStart) + 1;
  const mainEnd = src.indexOf('</main>');
  assert(headEnd > 0 && bodyStart > 0 && landingStart > 0 && mainStart > 0 && mainEnd > 0, L.src + ': structure markers');

  const srcHead = src.slice(0, headEnd);            // without </head>
  let chrome = src.slice(bodyStart + '<body>'.length, landingStart);
  /* strip the LANDING banner comment that precedes <main> from chrome side */
  let landingHTML = src.slice(landingStart, mainStart).replace(/<!--\s*═+[\s\S]*?-->\s*$/, '').trimEnd();
  const mainInner = src.slice(mainOpenEnd, mainEnd);
  const footer = src.slice(mainEnd, src.indexOf('</body>'));
  const mobileBarM = footer.match(/<nav class="mobile-bar"[\s\S]*?<\/nav>/);
  assert(mobileBarM, L.src + ': mobile-bar');
  const mobileBar = mobileBarM[0];

  /* -- articles -- */
  const articles = [...mainInner.matchAll(/<article class="lesson[^"]*" id="lesson-(\d+)">([\s\S]*?)<\/article>/g)];
  assert(articles.length === 22, L.src + ': expected 22 articles, got ' + articles.length);

  /* -- chrome transforms (shared by all pages of this language) -- */
  chrome = replaceOnce(chrome,
    /<button class="nav-home-btn" onclick="enterLanding\(\)">([\s\S]*?)<\/button>/,
    `<a class="nav-home-btn" href="${L.home}">$1</a>`, 'nav-home-btn');
  chrome = replaceOnce(chrome,
    /<span class="topnav-brand">([\s\S]*?)<\/span>/,
    `<a class="topnav-brand" href="${L.home}">$1</a>`, 'topnav-brand');
  const pillCount = (chrome.match(/<button class="nav-pill/g) || []).length;
  assert(pillCount === 22, L.src + ': expected 22 nav pills, got ' + pillCount);
  chrome = chrome.replace(/<button class="nav-pill[^"]*" data-lesson="(\d+)">(\d+)<\/button>/g,
    (m, n, num) => `<a class="nav-pill" data-lesson="${n}" href="${L.base}${L.slugs[+n]}/">${num}</a>`);

  /* language-switch link: rewritten per page below; mark it for replacement */
  const langLinkRe = lang === 'lt'
    ? /<a href="\/en\/" class="tnav-link">EN<\/a>/
    : /<a href="(?:\.\.\/|\/)" class="tnav-link">LT<\/a>/;
  assert(langLinkRe.test(chrome), L.src + ': language switch link');

  chrome = absolutize(chrome);

  /* -- head template transforms (shared) -- */
  let head = srcHead;
  head = replaceOnce(head,
    /<script>if\(location\.hash[\s\S]*?<\/script>/,
    '__FLASH_SCRIPT__', 'flash-prevention script');
  head = replaceOnce(head,
    /gtag\('config', 'G-3G4SLW2V7C'[^\n]*/,
    `gtag('config', 'G-3G4SLW2V7C');`, 'gtag config');
  head = head.replace(/href="(?:\.\.\/)?css\//g, 'href="/css/');
  head = replaceOnce(head,
    /(<link rel="stylesheet" href="\/css\/landing\.css[^>]*>)/,
    `$1\n<link rel="stylesheet" href="/css/static.css?v=3">`, 'landing.css link');

  /* ---------- landing page ---------- */
  {
    let h = head.replace('__FLASH_SCRIPT__', `<script>${L.hashRedirect}</script>`);
    let body = chrome.replace(langLinkRe,
      lang === 'lt' ? `<a href="/en/" class="tnav-link">EN</a>` : `<a href="/" class="tnav-link">LT</a>`);

    let landing = landingHTML;
    const ctaCount = (landing.match(/onclick="startCourse\(/g) || []).length;
    landing = landing.replace(/<button class="lp-cta" onclick="startCourse\((\d+)\)">([\s\S]*?)<\/button>/g,
      (m, n, label) => `<a class="lp-cta" href="${L.base}${L.slugs[+n]}/">${label}</a>`);
    assert(ctaCount > 0 && !/startCourse/.test(landing), L.src + ': lp-cta transform');
    const cardCount = (landing.match(/data-start-lesson=/g) || []).length;
    assert(cardCount === 22, L.src + ': expected 22 lesson cards, got ' + cardCount);
    landing = landing.replace(/^(\s*)<div class="lp-lcard" data-start-lesson="(\d+)">(.*)<\/div>\s*$/gm,
      (m, ind, n, inner) => `${ind}<a class="lp-lcard" href="${L.base}${L.slugs[+n]}/">${inner}</a>`);
    assert(!/data-start-lesson/.test(landing), L.src + ': lesson card transform');
    landing = absolutize(landing);

    const page = `${h}</head>\n<body>\n${body}${landing}\n\n${L.scriptsLanding}\n</body>\n</html>\n`;
    assert(!/onclick="(goLesson|startCourse|enterLanding)/.test(page), 'landing ' + lang + ': leftover SPA onclick');
    write(L.landingOut, page);
    sitemapUrls.push(SITE + L.home);
  }

  /* ---------- lesson pages ---------- */
  for (const [, numStr, inner] of articles) {
    const n = +numStr;
    const slug = L.slugs[n];
    const pageUrl = `${SITE}${L.base}${slug}/`;
    const otherUrl = `${SITE}${other.base}${other.slugs[n]}/`;
    const ltUrl = lang === 'lt' ? pageUrl : otherUrl;
    const enUrl = lang === 'en' ? pageUrl : otherUrl;

    const h2 = inner.match(/<h2 class="lesson-title">([\s\S]*?)<\/h2>/);
    const intro = inner.match(/<p class="lesson-intro">([\s\S]*?)<\/p>/);
    assert(h2, `lesson ${n} (${lang}): no h2.lesson-title`);
    assert(intro, `lesson ${n} (${lang}): no .lesson-intro`);
    const titleText = stripTags(h2[1]);
    const descText = stripTags(intro[1]).slice(0, 160);
    const fullTitle = titleText + L.titleSuffix;

    const h = pageHead(head, {
      title: fullTitle, desc: descText, url: pageUrl, ltUrl, enUrl,
      ld: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: decodeEntities(titleText),
        description: decodeEntities(descText),
        inLanguage: lang,
        url: pageUrl,
        isPartOf: { '@type': 'Course', name: L.courseName, url: SITE + L.home },
      },
    });

    /* body */
    const body = chrome.replace(langLinkRe,
      lang === 'lt' ? `<a href="${enUrl.replace(SITE, '')}" class="tnav-link">EN</a>`
                    : `<a href="${ltUrl.replace(SITE, '')}" class="tnav-link">LT</a>`);

    let article = `<article class="lesson active" id="lesson-${n}">${inner}</article>`;
    article = article.replace(/<button class="([^"]*)" onclick="goLesson\((\d+)\)"([^>]*)>([\s\S]*?)<\/button>/g,
      (m, cls, target, extra, label) => `<a class="${cls}" href="${L.base}${L.slugs[+target]}/"${extra}>${label}</a>`);
    article = article.replace(/<h2 class="lesson-title">([\s\S]*?)<\/h2>/,
      '<h1 class="lesson-title">$1</h1>');
    article = absolutize(article);
    assert(!/onclick="goLesson/.test(article), `lesson ${n} (${lang}): leftover goLesson onclick`);

    const page = `${h}</head>\n<body class="lessons-on">\n${body}<main>\n\n${article}\n\n</main>\n\n${mobileBar}\n\n${L.scriptsLesson(n)}\n</body>\n</html>\n`;
    write(`${L.base.slice(1)}${slug}/index.html`, page);
    sitemapUrls.push(pageUrl);
  }

  /* ---------- glossary page ---------- */
  {
    const G = L.glossary;
    const terms = glossaryTerms(G.js);
    const pageUrl = SITE + G.path;
    const ltUrl = SITE + LANGS.lt.glossary.path;
    const enUrl = SITE + LANGS.en.glossary.path;
    const h = pageHead(head, {
      title: G.h1 + L.titleSuffix, desc: G.desc, url: pageUrl, ltUrl, enUrl,
      ld: {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: G.h1,
        url: pageUrl,
        inLanguage: lang,
        hasDefinedTerm: terms.map(t => ({
          '@type': 'DefinedTerm',
          name: decodeEntities(t.term),
          description: decodeEntities(t.def),
        })),
      },
    });
    const body = chrome.replace(langLinkRe,
      lang === 'lt' ? `<a href="${LANGS.en.glossary.path}" class="tnav-link">EN</a>`
                    : `<a href="${LANGS.lt.glossary.path}" class="tnav-link">LT</a>`);
    const entries = terms.map(t => `  <div class="glossary-entry" id="${slugify(t.term)}">
    <div class="glossary-term">${t.term}</div>
    <div class="glossary-def">${t.def}</div>
  </div>`).join('\n');
    const article = `<article class="lesson active glossary-page">
  <div class="lesson-header">
    <div class="lesson-num">${G.eyebrow(terms.length)}</div>
    <h1 class="lesson-title">${G.h1}</h1>
    <p class="lesson-intro">${G.intro}</p>
  </div>
  <div class="glossary-page-list">
${entries}
  </div>
</article>`;
    const page = `${h}</head>\n<body class="lessons-on">\n${body}<main>\n\n${article}\n\n</main>\n\n${G.scripts}\n</body>\n</html>\n`;
    write(G.out, page);
    sitemapUrls.push(pageUrl);
  }

  console.log(`${lang}: landing + 22 lesson pages + glossary written`);
}

/* ---------- sitemap ---------- */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
console.log(`sitemap.xml: ${sitemapUrls.length} URLs`);
