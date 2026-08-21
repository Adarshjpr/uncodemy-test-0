#!/usr/bin/env node
/**
 * fix-css-paths.js
 *
 * Ye script HTML file(s) ke andar CSS paths ko replace karta hai:
 *   /css/placement.css      ->  ../css/placement.css
 *   /css/responsive2.css    ->  ../css/responsive2.css
 *
 * USAGE:
 *   node fix-css-paths.js file1.html file2.html ...
 *   node fix-css-paths.js ./some-folder      (folder ke andar sabhi .html files process honge)
 *
 * Agar koi argument nahi diya to current folder (".") me sabhi .html
 * files dhoond kar process karega.
 */

const fs = require("fs");
const path = require("path");

// Yahan jitne chahe utne find/replace pairs add kar sakte ho
const REPLACEMENTS = [
  { find: "../css/placement.css", replace: "/css/placement.css" },
  { find: "../css/responsive2.css", replace: "/css/responsive2.css" },
];

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.isFile() && fullPath.toLowerCase().endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

function processFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`❌ Read error: ${filePath} -> ${err.message}`);
    return;
  }

  let updatedContent = content;
  let changesInFile = 0;

  REPLACEMENTS.forEach(({ find, replace }) => {
    // Global replace (ek file me multiple occurrence bhi ho to sab replace honge)
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const matches = updatedContent.match(regex);
    if (matches) {
      changesInFile += matches.length;
      updatedContent = updatedContent.replace(regex, replace);
    }
  });

  if (changesInFile > 0) {
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`✅ ${filePath} -> ${changesInFile} replacement(s) kiye gaye`);
  } else {
    console.log(`➖ ${filePath} -> koi matching path nahi mila`);
  }
}

function main() {
  const args = process.argv.slice(2);
  let targets = [];

  if (args.length === 0) {
    // Koi argument nahi -> current folder me sabhi .html files
    targets = getAllHtmlFiles(".");
  } else {
    args.forEach((arg) => {
      const stat = fs.statSync(arg);
      if (stat.isDirectory()) {
        targets = targets.concat(getAllHtmlFiles(arg));
      } else {
        targets.push(arg);
      }
    });
  }

  if (targets.length === 0) {
    console.log("⚠️  Koi .html file nahi mili process karne ke liye.");
    return;
  }

  console.log(`🔍 ${targets.length} file(s) process ho rahi hai...\n`);
  targets.forEach(processFile);
  console.log("\n🎉 Done!");
}

main();