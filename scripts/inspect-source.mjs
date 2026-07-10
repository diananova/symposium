// Quick source inspector for the content pipeline. Prints just enough to
// write a build-texts config without reading the whole file:
//   node scripts/inspect-source.mjs <url> [search phrase]...
// Shows Title/Translator header lines, structural headings (INTRODUCTION,
// BOOK N, PERSONS OF THE DIALOGUE), the first words after each, and the
// position + context of any search phrases.

const [url, ...phrases] = process.argv.slice(2);
if (!url) {
  console.error('usage: node scripts/inspect-source.mjs <url> [phrase]...');
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`fetch failed: ${res.status}`);
  process.exit(1);
}
const raw = await res.text();
const lines = raw.split('\n');

console.log(`bytes: ${raw.length}`);
for (const line of lines.slice(0, 40)) {
  if (/^(Title|Author|Translator|Release date):/i.test(line)) console.log(line.trim());
}

const headingRe = /^\s*(INTRODUCTION\.?|PREFACE\.?|APPENDIX.*|BOOK [IVXLC]+\.?|PERSONS OF THE DIALOGUE.*|\*\*\* (START|END) OF THE PROJECT.*)\s*$/;
for (let i = 0; i < lines.length; i++) {
  if (headingRe.test(lines[i])) {
    const next = lines
      .slice(i + 1, i + 6)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);
    console.log(`L${i + 1}: ${lines[i].trim()}  →  ${next}`);
  }
}

for (const phrase of phrases) {
  let idx = raw.indexOf(phrase);
  if (idx === -1) {
    console.log(`PHRASE NOT FOUND: "${phrase}"`);
    continue;
  }
  while (idx !== -1) {
    const line = raw.slice(0, idx).split('\n').length;
    console.log(
      `PHRASE L${line}: ...${raw.slice(Math.max(0, idx - 60), idx).replace(/\s+/g, ' ')} ⟪${phrase}⟫`,
    );
    idx = raw.indexOf(phrase, idx + 1);
  }
}
