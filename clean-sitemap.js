#!/usr/bin/env node
/**
 * clean-sitemap.js
 * ----------------
 * Sitemap.xml me se un URLs ke <url> blocks hata deta hai jinki
 * local .html file root folder me maujood nahi hai.
 *
 * Usage:
 *   node clean-sitemap.js                 // DRY RUN - sirf dikhayega, kuch change nahi
 *   node clean-sitemap.js --apply         // actually sitemap.xml update karega (backup ke saath)
 *   node clean-sitemap.js sitemap.xml . --apply
 */

const fs = require("fs");
const path = require("path");

const EXTENSIONS = [".html", ".htm", ".php", ".asp", ".aspx", ".jsp"];

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function candidates(relPath) {
  if (relPath === "" || relPath === "/") {
    return ["index.html", "index.htm", "index.php"];
  }
  const p = relPath.replace(/\/+$/, "");
  const out = [p];
  for (const ext of EXTENSIONS) out.push(p + ext);
  for (const ext of EXTENSIONS) out.push(path.join(p, "index" + ext));
  return out;
}

function pageExists(url, rootDir) {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(url).pathname);
  } catch {
    urlPath = url;
  }
  const rel = urlPath.replace(/^\/+/, "");
  for (const cand of candidates(rel)) {
    if (isFile(path.join(rootDir, cand))) return true;
  }
  return false;
}

function main() {
  const argv = process.argv.slice(2);
  const apply = argv.includes("--apply");
  const args = argv.filter((a) => !a.startsWith("--"));

  const sitemap = args[0] || "sitemap.xml";
  const rootDir = args[1] || ".";

  if (!isFile(sitemap)) {
    console.log(`[X] '${sitemap}' nahi mila. Root folder me ho? Ya path do.`);
    process.exit(1);
  }

  const xml = fs.readFileSync(sitemap, "utf8");

  // Har <url> ... </url> block ko poora ka poora pakdo (formatting preserve rehti hai)
  const blockRe = /[ \t]*<\s*(?:\w+:)?url\s*>[\s\S]*?<\s*\/\s*(?:\w+:)?url\s*>[ \t]*\r?\n?/gi;
  const locRe = /<\s*(?:\w+:)?loc\s*>([\s\S]*?)<\s*\/\s*(?:\w+:)?loc\s*>/i;

  let total = 0;
  const removed = [];
  const kept = [];

  const newXml = xml.replace(blockRe, (block) => {
    const m = block.match(locRe);
    if (!m) return block; // loc hi nahi mila -> chhod do, safe side

    let url = m[1].trim().replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
    total++;

    if (pageExists(url, rootDir)) {
      kept.push(url);
      return block; // rakho
    }
    removed.push(url);
    return ""; // hata do
  });

  console.log(`Sitemap   : ${sitemap}`);
  console.log(`Root dir  : ${path.resolve(rootDir)}`);
  console.log(`Mode      : ${apply ? "APPLY (file update hoga)" : "DRY RUN (kuch change nahi)"}\n`);

  if (removed.length) {
    console.log("Ye URLs sitemap se hataye jayenge:");
    for (const u of removed) console.log(`  [REMOVE] ${u}`);
    console.log("");
  }

  console.log("-".repeat(55));
  console.log(`Total URLs : ${total}`);
  console.log(`Rakhe gaye : ${kept.length}`);
  console.log(`Hataye     : ${removed.length}`);

  if (!removed.length) {
    console.log("\nSab pages maujood hain. Sitemap me koi change ki zarurat nahi.");
    return;
  }

  // Removed URLs ka record hamesha save karo
  fs.writeFileSync(
    "removed_urls.txt",
    removed.join("\n") + "\n",
    "utf8"
  );
  console.log("Hataye gaye URLs ka record -> removed_urls.txt");

  if (!apply) {
    console.log("\n>> Ye sirf preview tha. Actually update karne ke liye chalao:");
    console.log("   node clean-sitemap.js --apply");
    return;
  }

  // Backup pehle
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = `${sitemap}.backup-${stamp}`;
  fs.copyFileSync(sitemap, backup);

  // Extra blank lines saaf karke likho
  const cleaned = newXml.replace(/\n{3,}/g, "\n\n");
  fs.writeFileSync(sitemap, cleaned, "utf8");

  console.log(`\nBackup banaya   -> ${backup}`);
  console.log(`Sitemap updated -> ${sitemap}`);
}

main();