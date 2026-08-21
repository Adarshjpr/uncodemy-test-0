#!/usr/bin/env node
/**
 * check-sitemap.js
 * ----------------
 * Sitemap.xml ke har URL ke liye check karta hai ki uska local file
 * root folder me maujood hai ya nahi.
 *
 * https://uncodemy.com/course/playwright-training-course-in-mumbai
 *    ->  ./course/playwright-training-course-in-mumbai.html
 *
 * Usage:
 *   node check-sitemap.js                    // sitemap.xml, current folder
 *   node check-sitemap.js sitemap.xml .      // explicit
 *   node check-sitemap.js sitemap.xml . -v   // found files bhi dikhao
 */

const fs = require("fs");
const path = require("path");

// Inme se koi bhi file mil gayi to page "OK" maana jayega
const EXTENSIONS = [".html", ".htm", ".php", ".asp", ".aspx", ".jsp"];

// ---------- sitemap se saare <loc> nikalo ----------
function getLocs(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [];
  // namespace ho ya na ho, dono handle
  const re = /<\s*(?:\w+:)?loc\s*>([\s\S]*?)<\s*\/\s*(?:\w+:)?loc\s*>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    let val = m[1].trim();
    val = val.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
    if (val) locs.push(val);
  }
  return locs;
}

// ---------- ek URL path ke liye possible local files ----------
function candidates(relPath) {
  const out = [];
  if (relPath === "" || relPath === "/") {
    return ["index.html", "index.htm", "index.php"];
  }
  const p = relPath.replace(/\/+$/, "");

  out.push(p); // exact file (agar URL me pehle se .html hai)
  for (const ext of EXTENSIONS) out.push(p + ext); // course/xyz.html
  for (const ext of EXTENSIONS) out.push(path.join(p, "index" + ext)); // course/xyz/index.html
  return out;
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

// ---------- main ----------
function main() {
  const args = process.argv.slice(2).filter((a) => a !== "-v");
  const verbose = process.argv.includes("-v");

  const sitemap = args[0] || "sitemap.xml";
  const rootDir = args[1] || ".";

  if (!isFile(sitemap)) {
    console.log(`[X] '${sitemap}' nahi mila. Root folder me ho? Ya path do.`);
    process.exit(1);
  }

  const locs = getLocs(sitemap);
  console.log(`Sitemap   : ${sitemap}`);
  console.log(`Root dir  : ${path.resolve(rootDir)}`);
  console.log(`Total URLs: ${locs.length}\n`);

  const found = [];
  const missing = [];

  for (const url of locs) {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(url).pathname);
    } catch {
      urlPath = url; // agar plain path ho
    }
    const rel = urlPath.replace(/^\/+/, "");

    let hit = null;
    for (const cand of candidates(rel)) {
      if (isFile(path.join(rootDir, cand))) {
        hit = cand;
        break;
      }
    }

    if (hit) {
      found.push({ url, file: hit });
    } else {
      const expected = rel ? rel.replace(/\/+$/, "") + ".html" : "index.html";
      missing.push({ url, expected });
      console.log(`[MISSING] ${url}\n          expected -> ${expected}`);
    }
  }

  console.log("\n" + "-".repeat(55));
  console.log(`OK      : ${found.length}`);
  console.log(`MISSING : ${missing.length}`);

  if (missing.length) {
    const csv =
      "url,expected_file\n" +
      missing.map((m) => `"${m.url}","${m.expected}"`).join("\n") +
      "\n";
    fs.writeFileSync("missing_pages.csv", csv, "utf8");
    console.log("Missing list saved -> missing_pages.csv");
  }

  if (verbose && found.length) {
    console.log("\nFound files:");
    for (const f of found) console.log(`[OK] ${f.file}`);
  }
}

main();