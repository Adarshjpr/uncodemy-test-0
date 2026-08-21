#!/usr/bin/env node
/**
 * rename-2025-to-2026.js
 *
 * index folder ke andar ke saare sub-folders me recursively jaata hai,
 * har file ka naam print karta hai, aur jis file ke naam me 2025 hai
 * use 2026 kar deta hai.
 *
 * Usage:
 *   node rename-2025-to-2026.js                 # current folder
 *   node rename-2025-to-2026.js ./index         # koi bhi folder
 *   node rename-2025-to-2026.js --dry-run       # sirf preview, rename nahi
 */

const fs = require("fs");
const path = require("path");

// ---------- arguments ----------
let dir = ".";
let dryRun = false;

for (const arg of process.argv.slice(2)) {
  if (arg === "-n" || arg === "--dry-run") {
    dryRun = true;
  } else if (arg === "-h" || arg === "--help") {
    console.log("Usage: node rename-2025-to-2026.js [folder] [--dry-run]");
    process.exit(0);
  } else {
    dir = arg;
  }
}

if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
  console.error(`Error: '${dir}' naam ka folder nahi mila.`);
  process.exit(1);
}

// ---------- counters ----------
let total = 0;
let renamed = 0;
let skipped = 0;

// ---------- recursive walk ----------
function walk(current) {
  let entries;
  try {
    entries = fs.readdirSync(current, { withFileTypes: true });
  } catch (err) {
    console.error(`      ERROR: '${current}' padha nahi ja saka — ${err.message}`);
    return;
  }

  // folders baad me, taki rename ke waqt path na toote
  const files = entries.filter((e) => e.isFile());
  const dirs = entries.filter((e) => e.isDirectory());

  for (const entry of files) {
    const fullPath = path.join(current, entry.name);
    total++;
    console.log(`FILE: ${fullPath}`);

    if (!entry.name.includes("2025")) continue;

    const newName = entry.name.split("2025").join("2026");
    const newPath = path.join(current, newName);

    if (fs.existsSync(newPath)) {
      console.log(`      SKIP  -> '${newName}' pehle se maujood hai`);
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`      WOULD RENAME -> ${newName}`);
      renamed++;
    } else {
      try {
        fs.renameSync(fullPath, newPath);
        console.log(`      RENAMED -> ${newName}`);
        renamed++;
      } catch (err) {
        console.error(`      ERROR: rename fail — ${err.message}`);
        skipped++;
      }
    }
  }

  for (const entry of dirs) {
    walk(path.join(current, entry.name));
  }
}

// ---------- run ----------
console.log(`Scanning: ${path.resolve(dir)}`);
if (dryRun) console.log("*** DRY RUN — kuch bhi rename nahi hoga ***");
console.log("-".repeat(50));

walk(dir);

console.log("-".repeat(50));
console.log(`Total files : ${total}`);
console.log(`Renamed     : ${renamed}`);
console.log(`Skipped     : ${skipped}`);