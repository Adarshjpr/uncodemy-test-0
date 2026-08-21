#!/usr/bin/env node
/**
 * inject-footer.js
 * -----------------
 * Scans the "blog" folder recursively for .html pages (skips ".history" folder),
 * finds every <footer ...> tag, and inserts a fixed promo block RIGHT ABOVE
 * (before) each <footer> tag.
 *
 * Usage:
 *   node inject-footer.js --dry            -> Dry run: sirf report deta hai
 *   node inject-footer.js                  -> Normal run: actually inject karta hai (+ .bak backup)
 *   node inject-footer.js --dir=./blog     -> custom blog folder path
 */

const fs = require('fs');
const path = require('path');

// ---------- CONFIG ----------
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry') || args.includes('--dry-run');

const dirArg = args.find(a => a.startsWith('--dir='));
const BLOG_DIR = dirArg ? dirArg.split('=')[1] : path.join(process.cwd(), 'blog');

const SKIP_DIRS = ['.history', '.htsitory', 'node_modules', '.git']; // .htsitory typo bhi handle kar diya

const INJECT_CODE = `<div class="footer-fixed-section">
        <div class="ask-for-demo fixed-section-child" onclick="showPopUpForm()"><span class="below-btn">Ask For
                Demo</span></div><a class="contact-thumb" href="https://pages.razorpay.com/fees-uncodemy"
            target="_blank">
            <div class="fee-payment fixed-section-child"><span class="below-btn">Fee Payment</span></div>
        </a><a href="https://api.whatsapp.com/send?phone=918800023723" target="_blank">
            <div class="whatsapp fixed-section-child"><span class="below-btn">WhatsApp</span></div>
        </a><a class="ail ail1" href="mailto:info@uncodemy.com" aria-label="Email Uncodemy">
            <div class="email-section fixed-section-child"><span class="below-btn">Email</span></div>
        </a><a class="ail" href="tel:+9198183 66550">
            <div class="phone fixed-section-child"><span class="below-btn">Call Us Now</span></div>
        </a>
    </div>
`;

const FOOTER_REGEX = /<footer\b[^>]*>/gi;
const MARKER = 'footer-fixed-section'; // agar already inject ho chuka hai to dobara na kare

// ---------- HELPERS ----------
function shouldSkipDir(dirName) {
  return SKIP_DIRS.includes(dirName) || dirName.startsWith('.');
}

function walk(dir, fileList = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read dir: ${dir} -> ${err.message}`);
    return fileList;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(fullPath, fileList);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function countFooters(content) {
  const matches = content.match(FOOTER_REGEX);
  return matches ? matches.length : 0;
}

function alreadyInjected(content) {
  return content.includes(MARKER);
}

function injectAboveFooter(content) {
  return content.replace(FOOTER_REGEX, (match) => `${INJECT_CODE}${match}`);
}

// ---------- MAIN ----------
function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog folder nahi mila: ${BLOG_DIR}`);
    console.error(`   --dir=./path/to/blog use karke sahi path do.`);
    process.exit(1);
  }

  const files = walk(BLOG_DIR);

  if (files.length === 0) {
    console.log(`⚠️  Koi .html file nahi mili "${BLOG_DIR}" me.`);
    return;
  }

  console.log(`${isDryRun ? '🔍 DRY RUN' : '🚀 NORMAL RUN'} — Blog dir: ${BLOG_DIR}`);
  console.log(`Total .html files scan hui: ${files.length}\n`);

  let totalFooters = 0;
  let filesWithFooter = 0;
  let filesModified = 0;
  let filesSkippedAlready = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const count = countFooters(content);

    if (count === 0) continue;

    filesWithFooter++;
    totalFooters += count;
    const rel = path.relative(process.cwd(), file);

    if (isDryRun) {
      console.log(`📄 ${rel}  ->  ${count} <footer> tag(s)`);
      continue;
    }

    // Normal run: actually inject
    if (alreadyInjected(content)) {
      console.log(`⏭️  Skip (already injected): ${rel}`);
      filesSkippedAlready++;
      continue;
    }

    // backup first
    fs.writeFileSync(`${file}.bak`, content, 'utf8');

    const newContent = injectAboveFooter(content);
    fs.writeFileSync(file, newContent, 'utf8');

    console.log(`✅ Injected in: ${rel}  (${count} footer tag(s), backup: ${path.basename(file)}.bak)`);
    filesModified++;
  }

  console.log(`\n----- SUMMARY -----`);
  console.log(`Files with <footer>: ${filesWithFooter}`);
  console.log(`Total <footer> tags found: ${totalFooters}`);
  if (!isDryRun) {
    console.log(`Files modified: ${filesModified}`);
    console.log(`Files skipped (already injected): ${filesSkippedAlready}`);
  } else {
    console.log(`\nAb normal run ke liye chalao: node inject-footer.js --dir="${BLOG_DIR}"`);
  }
}

main();