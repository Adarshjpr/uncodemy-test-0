#!/usr/bin/env node
/**
 * build-curriculum.js
 * -----------------------------------------------------------------
 * Ye Node script static .html files ke andar
 *   <section class="syllabus-bottom" id="curriculum">...</section>
 * ke content ko curriculum-core.js se generate kiya hua REAL HTML
 * se replace kar deta hai — deploy/build time par.
 *
 * Isse view-source aur crawler dono ko poora curriculum HTML milta
 * hai, bina kisi client-side JS ke wait kiye.
 *
 * USAGE:
 *   node build-curriculum.js <folder-ya-file> [--dry]
 *
 * Examples:
 *   node build-curriculum.js ./public
 *   node build-curriculum.js ./public/course/data-analytics-training-course-in-noida.html
 *
 * Rules:
 *   - Sirf un files pe chalega jinke filename/path me
 *     "data-analytics" ya "data-analyst" ho.
 *   - City filename ke end se nikaali jaati hai: "...-in-<city>.html"
 *     City na mile to default "Delhi".
 *   - File me agar <section id="curriculum"> nahi mila to skip + warning.
 * -----------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const core = require("./curriculum-core.js");

const OPEN_TAG_RE = /<section\b[^>]*\bid=["']curriculum["'][^>]*>/i;

function findMatchingClose(html, openTagEndIdx) {
  // simple case: is section ke andar koi nested <section> nahi hoti
  // (sirf divs), isliye pehla </section> hi humara closing tag hoga.
  const closeIdx = html.indexOf("</section>", openTagEndIdx);
  return closeIdx === -1 ? -1 : closeIdx;
}

function processFile(filePath, { dry }) {
  const lowerPath = filePath.toLowerCase();
  const isTarget = /data-analytics|data-analyst/.test(lowerPath);
  if (!isTarget) return { skipped: true, reason: "not a data-analytics/data-analyst page" };

  const html = fs.readFileSync(filePath, "utf8");

  const openMatch = html.match(OPEN_TAG_RE);
  if (!openMatch) {
    return { skipped: true, reason: '<section id="curriculum"> tag nahi mila' };
  }

  const openTagStr = openMatch[0];
  const openStart = openMatch.index;
  const openEnd = openStart + openTagStr.length;
  const closeIdx = findMatchingClose(html, openEnd);
  if (closeIdx === -1) {
    return { skipped: true, reason: "matching </section> nahi mila" };
  }

  const { city } = core.detectContextFromUrl(filePath);
  const innerHtml = core.renderCurriculumHTML(city);

  const before = html.slice(0, openEnd);
  const after = html.slice(closeIdx); // starts at "</section>"
  const newHtml = `${before}\n${innerHtml}\n${after}`;

  if (!dry) {
    fs.writeFileSync(filePath, newHtml, "utf8");
  }

  return { skipped: false, city };
}

function walk(target, files = []) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(path.join(target, entry), files);
    }
  } else if (stat.isFile() && target.endsWith(".html")) {
    files.push(target);
  }
  return files;
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const target = args.find((a) => !a.startsWith("--"));

  if (!target) {
    console.error("Usage: node build-curriculum.js <folder-or-file> [--dry]");
    process.exit(1);
  }

  const resolved = path.resolve(target);
  if (!fs.existsSync(resolved)) {
    console.error(`Path not found: ${resolved}`);
    process.exit(1);
  }

  const stat = fs.statSync(resolved);
  const files = stat.isDirectory() ? walk(resolved) : [resolved];

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const result = processFile(file, { dry });
    if (result.skipped) {
      skipped++;
      console.log(`SKIP  ${path.relative(process.cwd(), file)} — ${result.reason}`);
    } else {
      updated++;
      console.log(`${dry ? "[DRY] " : ""}OK    ${path.relative(process.cwd(), file)} — city: ${result.city}`);
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}${dry ? " (dry run, no files written)" : ""}`);
}

main();