/**
 * replace.js
 * Isko apne HTML wale folder me rakho aur chalao:  node replace.js
 *
 * Ye saari .html files me niche diye gaye text replace kar dega.
 */

const fs = require("fs");
const path = require("path");

// ---------------- SETTINGS ----------------

// Subfolders ke andar bhi jana hai? true = haan, false = sirf isi folder ki files
const RECURSIVE = true;

// true karoge to sirf dikhayega, file change nahi karega (pehle test karne ke liye)
const DRY_RUN = false;

// true karoge to change karne se pehle file.html.bak backup bana dega
const BACKUP = true;

// Kya-kya badalna hai (jitne chaho add kar sakte ho)
const REPLACEMENTS = [
  
  ["/course/pg-program-course-details", "/tutorial/"],
];

// Ye folders skip honge
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build"]);

// ------------------------------------------

const ROOT = process.cwd();
let filesScanned = 0;
let filesChanged = 0;
let totalHits = 0;

function getHtmlFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (RECURSIVE && !SKIP_DIRS.has(entry.name) && !entry.name.startsWith("."))
        out = out.concat(getHtmlFiles(full));
    } else if (/\.html?$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function processFile(file) {
  filesScanned++;
  const original = fs.readFileSync(file, "utf8");
  let updated = original;
  let hits = 0;

  for (const [from, to] of REPLACEMENTS) {
    const parts = updated.split(from);
    if (parts.length > 1) {
      hits += parts.length - 1;
      updated = parts.join(to);
    }
  }

  if (hits === 0) return;

  filesChanged++;
  totalHits += hits;
  const rel = path.relative(ROOT, file) || path.basename(file);
  console.log(`${DRY_RUN ? "[dry-run] " : ""}${rel}  ->  ${hits} change(s)`);

  if (!DRY_RUN) {
    if (BACKUP) fs.writeFileSync(file + ".bak", original, "utf8");
    fs.writeFileSync(file, updated, "utf8");
  }
}

const files = getHtmlFiles(ROOT);
console.log(`Folder: ${ROOT}`);
console.log(`HTML files mile: ${files.length}\n`);

files.forEach(processFile);

console.log(`\nScanned: ${filesScanned} | Changed: ${filesChanged} | Total replacements: ${totalHits}`);
if (DRY_RUN) console.log("DRY_RUN on tha — kuch bhi save nahi hua.");