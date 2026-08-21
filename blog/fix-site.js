#!/usr/bin/env node
/**
 * fix-site.js
 * -----------
 * Kaam ye karta hai (2 kaam):
 *
 * 1) Check karta hai ki har .html file me ye line hai ya nahi:
 *      <script defer src="https://uncodemy.com/js/form.js"></script>
 *    - Agar HAI  -> kuch nahi karta (chhod deta hai jaise hai waise).
 *    - Agar NAHI -> </body> se pehle ye line add kar deta hai.
 *
 * 2) Jis div ka class="...features-section-k9n4..." hai, us POORE div ko
 *    (uske andar ka sara content sahit) hata deta hai.
 *
 * MODES:
 *   Dry run (default)  -> sirf batayega kya-kya badlega, file me kuch nahi likhega.
 *      node fix-site.js <folder>
 *
 *   Launch (apply)      -> asal me files ko modify karega (backup .bak banayega).
 *      node fix-site.js <folder> --apply
 *
 * Example:
 *   node fix-site.js ./my-website          (dry run - pehle isse chalao)
 *   node fix-site.js ./my-website --apply  (jab satisfied ho jao)
 */

const fs = require("fs");
const path = require("path");

// ---------- CONFIG ----------
const TARGET_SRC = "https://uncodemy.com/js/form.js";
const SCRIPT_TAG = `<script defer src="${TARGET_SRC}"></script>`;
const TARGET_CLASS = "features-section-k9n4";
const HTML_EXT = new Set([".html", ".htm"]);
// -----------------------------

const args = process.argv.slice(2);
const applyMode = args.includes("--apply");
const targetDir = args.find((a) => !a.startsWith("--")) || ".";

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Folder nahi mila: ${targetDir}`);
  process.exit(1);
}

// ---------- Helpers ----------

// Ye folder names skip karne hain (in ke andar scan/modify nahi karna)
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".history",   // VS Code "Local History" extension folder
  ".vscode",
  ".bak",
]);

// Sab .html files dhoondo (recursive), upar wale folders skip karo
function findHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(full));
    } else if (HTML_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

// Check: kya form.js wala <script defer src="..."> tag already hai?
// (attribute order / quotes / extra spaces sab handle karta hai)
function hasFormScript(html) {
  const scriptTagRegex = /<script\b[^>]*>/gi;
  let match;
  while ((match = scriptTagRegex.exec(html)) !== null) {
    const tag = match[0];
    const hasDefer = /\bdefer\b/i.test(tag);
    const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (hasDefer && srcMatch && srcMatch[1].trim() === TARGET_SRC) {
      return true;
    }
  }
  return false;
}

// </body> se just pehle script tag insert karo. Agar </body> na mile to end me daal do.
function insertScriptTag(html) {
  const bodyCloseRegex = /<\/body\s*>/i;
  if (bodyCloseRegex.test(html)) {
    return html.replace(bodyCloseRegex, `  ${SCRIPT_TAG}\n</body>`);
  }
  return html + `\n${SCRIPT_TAG}\n`;
}

// Diye gaye class wale <div> ko dhoondo aur poora balanced block nikaalo
// (nested <div> tags ko sahi se count karke matching </div> tak).
// Return: { found: bool, start, end, block } — पहले match ke liye.
function findClassDivBlock(html, className) {
  // <div ... class="...className..." ...>  -- class attribute me kahin bhi ho sakta hai
  const openDivRegex = /<div\b[^>]*>/gi;
  let match;
  while ((match = openDivRegex.exec(html)) !== null) {
    const tag = match[0];
    const classMatch = tag.match(/\bclass\s*=\s*["']([^"']*)["']/i);
    if (!classMatch) continue;
    const classes = classMatch[1].split(/\s+/);
    if (!classes.includes(className)) continue;

    // Ab yahan se balanced <div>...</div> dhoondo
    const startIdx = match.index;
    let depth = 1;
    let cursor = openDivRegex.lastIndex;
    const tagRegex = /<\/?div\b[^>]*>/gi;
    tagRegex.lastIndex = cursor;
    let innerMatch;
    while ((innerMatch = tagRegex.exec(html)) !== null) {
      if (innerMatch[0].startsWith("</")) {
        depth--;
      } else {
        depth++;
      }
      if (depth === 0) {
        const endIdx = tagRegex.lastIndex;
        return {
          found: true,
          start: startIdx,
          end: endIdx,
          block: html.slice(startIdx, endIdx),
        };
      }
    }
    // Agar yahan tak aaye to matching close nahi mila (malformed HTML)
    return { found: false };
  }
  return { found: false };
}

function removeClassDiv(html, className) {
  const result = findClassDivBlock(html, className);
  if (!result.found) return { html, removed: false };
  const newHtml = html.slice(0, result.start) + html.slice(result.end);
  return { html: newHtml, removed: true, blockPreview: result.block.slice(0, 200) };
}

// ---------- Main ----------

const files = findHtmlFiles(targetDir);

if (files.length === 0) {
  console.log(`⚠️  ${targetDir} me koi .html file nahi mili.`);
  process.exit(0);
}

console.log(`\n🔍 Mode: ${applyMode ? "LAUNCH (apply - files change hongi)" : "DRY RUN (scan only, kuch change nahi hoga)"}`);
console.log(`📁 Folder: ${path.resolve(targetDir)}`);
console.log(`📄 Total .html files mili: ${files.length}\n`);
console.log("─".repeat(70));

let scriptAddedCount = 0;
let scriptAlreadyPresentCount = 0;
let divRemovedCount = 0;
let divNotFoundCount = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let html = original;
  let changed = false;

  // 1) Script tag check
  if (hasFormScript(html)) {
    scriptAlreadyPresentCount++;
    console.log(`✅ [SCRIPT OK]      ${file}  (pehle se hai, chhod diya)`);
  } else {
    html = insertScriptTag(html);
    scriptAddedCount++;
    changed = true;
    console.log(`➕ [SCRIPT ADD]     ${file}  (add hoga: ${SCRIPT_TAG})`);
  }

  // 2) Remove features-section-k9n4 div
  const divResult = removeClassDiv(html, TARGET_CLASS);
  if (divResult.removed) {
    html = divResult.html;
    divRemovedCount++;
    changed = true;
    console.log(`🗑️  [DIV REMOVE]    ${file}  (class="${TARGET_CLASS}" wala poora div hataya)`);
  } else {
    divNotFoundCount++;
    console.log(`ℹ️  [DIV NOT FOUND] ${file}  (class="${TARGET_CLASS}" wala div nahi mila)`);
  }

  // Apply mode me hi actually likhna hai
  if (applyMode && changed) {
    fs.writeFileSync(file + ".bak", original, "utf8"); // backup
    fs.writeFileSync(file, html, "utf8");
    console.log(`   💾 Saved (backup: ${path.basename(file)}.bak)`);
  }
}

console.log("─".repeat(70));
console.log(`\n📊 SUMMARY`);
console.log(`   Script tag already present : ${scriptAlreadyPresentCount}`);
console.log(`   Script tag added           : ${scriptAddedCount}`);
console.log(`   "${TARGET_CLASS}" div removed        : ${divRemovedCount}`);
console.log(`   "${TARGET_CLASS}" div not found       : ${divNotFoundCount}`);

if (!applyMode) {
  console.log(`\n👉 Ye sirf DRY RUN tha, koi file change nahi hui.`);
  console.log(`   Jab result sahi lage, ye chalao:\n`);
  console.log(`   node fix-site.js "${targetDir}" --apply\n`);
} else {
  console.log(`\n✅ LAUNCH complete. Files modify ho gayi hain.`);
  console.log(`   Har changed file ke saath ek .bak backup bhi bana hai — kuch galat lage to usse restore kar sakte ho.\n`);
}