/**
 * update.js
 * -----------------------------------------------------------------------
 * Production-ready script to bulk-update HTML files.
 *
 * WHAT IT DOES:
 *   1. Reads `new-menu.html` (must be in the same folder as this script).
 *   2. Scans the CURRENT folder only for `.html` files (subfolders,
 *      node_modules, and `.bak` files are ignored).
 *   3. In every HTML file, finds the element with class "hii"
 *      (opening tag -> closing tag, including all nested children).
 *   4. Replaces that entire element with the full content of
 *      `new-menu.html`.
 *   5. Creates a `<filename>.html.bak` backup BEFORE overwriting the
 *      original file.
 *   6. Skips files where no `.hii` element is found (with a console log).
 *   7. Prints a final summary (Total / Updated / Skipped / Errors).
 *
 * USAGE:
 *   npm install cheerio
 *   node update.js
 * -----------------------------------------------------------------------
 */

'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// -----------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------
const CURRENT_DIR = __dirname;                     // Folder where script runs
const NEW_MENU_FILE = path.join(CURRENT_DIR, 'new-menu.html');
const TARGET_CLASS = 'hii';                         // Class to search for
const ENCODING = 'utf8';

// -----------------------------------------------------------------------
// Summary counters
// -----------------------------------------------------------------------
const summary = {
  total: 0,
  updated: 0,
  skipped: 0,
  errors: 0,
};

/**
 * Reads the new-menu.html content once at the start.
 * Throws and stops the script if the file is missing/unreadable,
 * because without it nothing can be replaced.
 */
function loadNewMenuContent() {
  if (!fs.existsSync(NEW_MENU_FILE)) {
    throw new Error(`"new-menu.html" not found at: ${NEW_MENU_FILE}`);
  }

  const content = fs.readFileSync(NEW_MENU_FILE, ENCODING);

  if (!content || !content.trim()) {
    throw new Error('"new-menu.html" is empty. Nothing to insert.');
  }

  return content;
}

/**
 * Returns a list of eligible .html files in the CURRENT folder only.
 * Excludes:
 *   - Subfolders (only files directly inside CURRENT_DIR are read)
 *   - node_modules (won't appear anyway since we don't recurse, but
 *     explicitly guarded for safety)
 *   - .bak files
 *   - new-menu.html itself (this is the SOURCE, not a target)
 *   - update.js (this script)
 */
function getHtmlFiles() {
  const entries = fs.readdirSync(CURRENT_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => {
      // Only plain files, skip directories (node_modules, subfolders, etc.)
      if (!entry.isFile()) return false;

      const name = entry.name;

      // Only .html files
      if (!name.toLowerCase().endsWith('.html')) return false;

      // Exclude backup files (defensive check, though extension already filters most)
      if (name.toLowerCase().endsWith('.bak')) return false;

      // Exclude the source menu file itself
      if (name === 'new-menu.html') return false;

      return true;
    })
    .map((entry) => entry.name)
    .sort(); // Deterministic, alphabetical processing order
}

/**
 * Creates a backup of the given file as `<filename>.bak`
 * BEFORE any modification is written.
 */
function backupFile(filePath) {
  const backupPath = `${filePath}.bak`;
  fs.copyFileSync(filePath, backupPath);
}

/**
 * Processes a single HTML file:
 *   - Loads it into Cheerio (DOM parsing, not regex).
 *   - Finds the first element with class "hii".
 *   - Replaces that whole element (with all nested children) with the
 *     new-menu.html content.
 *   - Backs up the original file, then writes the updated content back.
 *
 * Returns one of: 'updated' | 'skipped' | 'error'
 */
function processFile(fileName, newMenuContent) {
  const filePath = path.join(CURRENT_DIR, fileName);

  try {
    const originalHtml = fs.readFileSync(filePath, ENCODING);

    // Load into Cheerio for real DOM parsing.
    // decodeEntities:false -> keeps original entities/characters intact
    //                          (prevents unwanted re-encoding on output).
    const $ = cheerio.load(originalHtml, {
      decodeEntities: false,
    });

    // Find the first element carrying the target class.
    // `.hii` matches any element whose class list includes "hii",
    // which correctly covers both class="hii" and class="foo hii bar".
    const targetElement = $(`.${TARGET_CLASS}`).first();

    if (targetElement.length === 0) {
      console.log(`[SKIPPED] "${fileName}" — no element with class="${TARGET_CLASS}" found.`);
      summary.skipped += 1;
      return 'skipped';
    }

    // Replace the entire element (opening tag -> closing tag,
    // including all nested children) with the new menu HTML.
    targetElement.replaceWith(newMenuContent);

    // Serialize the updated DOM back to a full HTML string.
    const updatedHtml = $.html();

    // Backup the ORIGINAL file before overwriting it.
    backupFile(filePath);

    // Write the updated content back to the original file.
    fs.writeFileSync(filePath, updatedHtml, ENCODING);

    console.log(`[UPDATED] "${fileName}" — class="${TARGET_CLASS}" element replaced successfully.`);
    summary.updated += 1;
    return 'updated';

  } catch (err) {
    console.error(`[ERROR] "${fileName}" — ${err.message}`);
    summary.errors += 1;
    return 'error';
  }
}

/**
 * Prints the final processing summary to the console.
 */
function printSummary() {
  console.log('\n----------------------------------------');
  console.log('           PROCESSING SUMMARY            ');
  console.log('----------------------------------------');
  console.log(`Total HTML files found : ${summary.total}`);
  console.log(`Successfully Updated   : ${summary.updated}`);
  console.log(`Skipped (no .hii)      : ${summary.skipped}`);
  console.log(`Errors                 : ${summary.errors}`);
  console.log('----------------------------------------\n');
}

/**
 * Main entry point.
 */
function main() {
  console.log('Starting update.js ...\n');

  let newMenuContent;
  try {
    newMenuContent = loadNewMenuContent();
  } catch (err) {
    console.error(`[FATAL] ${err.message}`);
    process.exit(1);
  }

  let htmlFiles;
  try {
    htmlFiles = getHtmlFiles();
  } catch (err) {
    console.error(`[FATAL] Could not read directory "${CURRENT_DIR}": ${err.message}`);
    process.exit(1);
  }

  summary.total = htmlFiles.length;

  if (summary.total === 0) {
    console.log('No .html files found in the current folder. Nothing to do.');
    return;
  }

  console.log(`Found ${summary.total} HTML file(s) to process.\n`);

  // Process each file sequentially (safe for 1300+ files, avoids
  // overwhelming the filesystem with parallel I/O).
  for (const fileName of htmlFiles) {
    processFile(fileName, newMenuContent);
  }

  printSummary();
}

// Run the script
main();