#!/usr/bin/env node
/**
 * year-fix.js  —  2025 se 2026 karne ka safe script
 *
 * STEP 1 (audit):  node year-fix.js scan
 * STEP 2 (change): node year-fix.js apply
 *
 * Kya change hota hai:
 *   - <title> ka text
 *   - <meta ... content="..."> ka content (URL wale meta chhod ke)
 *   - <body> ke andar sirf TEXT (script/style ke andar nahi)
 *
 * Kya NEVER change hota:
 *   - href / src / id / class / data-* etc. koi bhi attribute
 *   - <script> aur <style> ka code
 *   - 12025 / 20250 jaise bade number (sirf standalone 2025)
 */

'use strict';

const fs = require('fs');
const path = require('path');

/* ------------------------- CONFIG ------------------------- */
const FROM = '2025';
const TO   = '2026';

const DEFAULT_EXTS = ['.html', '.htm', '.php'];
// Ye folders kabhi scan nahi honge. Saare dot-folders (.history, .vscode,
// .git, .idea ...) bhi automatic skip hote hain — niche walk() dekho.
const SKIP_DIRS = new Set([
  'node_modules', 'bower_components', 'vendor',
  'dist', 'build', 'out',
  'backup', 'backups', 'old', 'trash',
  '_history', 'History'
]);
const VOID_TAGS = new Set([
  'area','base','br','col','embed','hr','img','input',
  'link','meta','param','source','track','wbr'
]);
/* ---------------------------------------------------------- */

const reYear = () => new RegExp(`(?<!\\d)${FROM}(?!\\d)`, 'g');

/* -------------------- CLI args parsing -------------------- */
const argv = process.argv.slice(2);
const cmd  = (argv[0] || 'scan').toLowerCase();
const positional = argv.slice(1).filter(a => !a.startsWith('--'));
const flags = {};
argv.filter(a => a.startsWith('--')).forEach(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  flags[k] = v === undefined ? true : v;
});

const ROOT      = path.resolve(positional[0] || flags.root || '.');
const EXTS      = (flags.ext ? String(flags.ext).split(',') : DEFAULT_EXTS)
                    .map(e => (e.startsWith('.') ? e : '.' + e).toLowerCase());
const AUDIT_JSON = path.resolve(flags.out || 'audit-2025.json');
const AUDIT_MD   = AUDIT_JSON.replace(/\.json$/i, '.md');
const DRY        = !!flags.dry;
const NO_BACKUP  = !!flags['no-backup'];
const INC_JSONLD = !!flags['include-jsonld'];
const ONLY_FILE  = flags.file ? path.resolve(String(flags.file)) : null;

/* ------------------------ helpers ------------------------- */
function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // .history, .vscode, .git, .idea etc. — sab dot-folder skip
      if (e.name.startsWith('.')) continue;
      if (SKIP_DIRS.has(e.name)) continue;
      if (e.name.startsWith('_backup_')) continue;
      if (flags.skip && String(flags.skip).split(',').includes(e.name)) continue;
      walk(full, out);
    } else if (EXTS.includes(path.extname(e.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function tokenize(html) {
  const tokens = [];
  const re = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|<!\[CDATA\[[\s\S]*?\]\]>|<![^>]*>/g;
  let last = 0, m;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) tokens.push({ t: 'text', v: html.slice(last, m.index) });
    tokens.push({ t: m[0].startsWith('<!--') ? 'comment' : 'tag', v: m[0] });
    last = re.lastIndex;
  }
  if (last < html.length) tokens.push({ t: 'text', v: html.slice(last) });
  return tokens;
}

function tagInfo(raw) {
  const m = /^<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9:-]*)/.exec(raw);
  if (!m) return null;
  const name = m[2].toLowerCase();
  return {
    name,
    closing: m[1] === '/',
    selfClose: /\/\s*>$/.test(raw) || VOID_TAGS.has(name)
  };
}

function attr(raw, key) {
  const m = new RegExp(`${key}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(raw);
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function ctx(text, index, pad = 55) {
  const s = Math.max(0, index - pad);
  const e = Math.min(text.length, index + FROM.length + pad);
  return (s > 0 ? '…' : '') +
         text.slice(s, e).replace(/\s+/g, ' ').trim() +
         (e < text.length ? '…' : '');
}

function describeBlock(stack) {
  for (let i = stack.length - 1; i >= 0; i--) {
    const el = stack[i];
    if (['div', 'section', 'article', 'main', 'header', 'footer', 'aside'].includes(el.name)) {
      const id = attr(el.raw, 'id');
      const cls = attr(el.raw, 'class');
      return `<${el.name}${id ? ` id="${id}"` : ''}${cls ? ` class="${cls}"` : ''}>`;
    }
  }
  const last = stack[stack.length - 1];
  return last ? `<${last.name}>` : '(root)';
}

/* --------------------- core processor --------------------- */
/** returns { changed, output, hits: [...], skipped: [...] } */
function processHtml(html) {
  const tokens = tokenize(html);
  const stack = [];
  const hits = [];
  const skipped = [];
  let out = '';
  let inScript = false, inStyle = false, inTitle = false, inBody = false;
  let jsonLd = false;

  for (const tk of tokens) {

    /* ---------- TAG ---------- */
    if (tk.t === 'tag') {
      const info = tagInfo(tk.v);
      let piece = tk.v;

      if (info) {
        if (!info.closing) {
          if (info.name === 'script') {
            inScript = true;
            jsonLd = /ld\+json/i.test(attr(tk.v, 'type') || '');
          }
          if (info.name === 'style') inStyle = true;
          if (info.name === 'title') inTitle = true;
          if (info.name === 'body')  inBody = true;

          /* meta content replace */
          if (info.name === 'meta') {
            const content = attr(tk.v, 'content') || '';
            const isUrl = /^https?:\/\//i.test(content.trim());
            if (reYear().test(content) && (!isUrl || flags['force-urls'])) {
              const name = attr(tk.v, 'name') || attr(tk.v, 'property') || 'meta';
              piece = tk.v.replace(
                /(content\s*=\s*)(["'])([\s\S]*?)\2/i,
                (_a, p1, q, val) => p1 + q + val.replace(reYear(), TO) + q
              );
              hits.push({ zone: 'meta', where: name, block: '<head>', text: content.trim() });
            } else if (reYear().test(content) && isUrl) {
              skipped.push({ reason: 'meta URL', snippet: tk.v.trim() });
            }
          } else if (reYear().test(tk.v)) {
            skipped.push({ reason: 'attribute', snippet: tk.v.trim().slice(0, 160) });
          }

          if (!info.selfClose) stack.push({ name: info.name, raw: tk.v });
        } else {
          if (info.name === 'script') { inScript = false; jsonLd = false; }
          if (info.name === 'style')  inStyle = false;
          if (info.name === 'title')  inTitle = false;
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].name === info.name) { stack.length = i; break; }
          }
        }
      }
      out += piece;
      continue;
    }

    /* ---------- COMMENT ---------- */
    if (tk.t === 'comment') { out += tk.v; continue; }

    /* ---------- TEXT ---------- */
    const skipZone = (inScript && !(jsonLd && INC_JSONLD)) || inStyle;
    if (skipZone) {
      if (reYear().test(tk.v)) {
        skipped.push({ reason: inStyle ? 'inside <style>' : 'inside <script>', snippet: ctx(tk.v, tk.v.search(reYear())) });
      }
      out += tk.v;
      continue;
    }

    let m, re = reYear();
    while ((m = re.exec(tk.v)) !== null) {
      hits.push({
        zone: inTitle ? 'title' : (inBody ? 'body' : 'head-text'),
        where: inTitle ? '<title>' : describeBlock(stack),
        block: describeBlock(stack),
        text: ctx(tk.v, m.index)
      });
    }
    out += tk.v.replace(reYear(), TO);
  }

  return { changed: out !== html, output: out, hits, skipped };
}

/* -------------------------- SCAN -------------------------- */
function runScan() {
  const files = walk(ROOT);
  const report = { root: ROOT, generatedAt: new Date().toISOString(), from: FROM, to: TO, files: [] };

  // Overall totals (poore project ka summary)
  const totals = {
    title: 0,
    meta: 0,
    body: 0,        // body + head-text (dono "body/plain text" hi hain)
    text: 0,        // title + meta + body (ye hi "kul jagah jaha 2025 hai" hai)
    urlSkipped: 0,  // meta content jo URL hone ki wajah se chhode gaye
    attrSkipped: 0, // href/src/id/class/data-* jaise attribute me mila 2025 (chhoda gaya)
    scriptStyleSkipped: 0, // <script>/<style> ke andar mila 2025 (chhoda gaya)
    skipped: 0      // sab skipped ka total (url + attr + script/style)
  };

  for (const f of files) {
    let html;
    try { html = fs.readFileSync(f, 'utf8'); } catch { continue; }
    if (!reYear().test(html)) continue;

    const r = processHtml(html);
    if (!r.hits.length && !r.skipped.length) continue;

    const counts = {
      title: r.hits.filter(h => h.zone === 'title').length,
      meta:  r.hits.filter(h => h.zone === 'meta').length,
      body:  r.hits.filter(h => h.zone === 'body' || h.zone === 'head-text').length,
      urlSkipped: r.skipped.filter(s => s.reason === 'meta URL').length,
      attrSkipped: r.skipped.filter(s => s.reason === 'attribute').length,
      scriptStyleSkipped: r.skipped.filter(s => s.reason === 'inside <script>' || s.reason === 'inside <style>').length,
      skipped: r.skipped.length
    };

    report.files.push({
      file: path.relative(ROOT, f),
      abs: f,
      counts,
      hits: r.hits,
      skipped: r.skipped
    });

    totals.title += counts.title;
    totals.meta  += counts.meta;
    totals.body  += counts.body;
    totals.urlSkipped += counts.urlSkipped;
    totals.attrSkipped += counts.attrSkipped;
    totals.scriptStyleSkipped += counts.scriptStyleSkipped;
    totals.skipped += counts.skipped;
  }
  totals.text = totals.title + totals.meta + totals.body;
  report.totals = totals;

  fs.writeFileSync(AUDIT_JSON, JSON.stringify(report, null, 2), 'utf8');
  fs.writeFileSync(AUDIT_MD, buildMarkdown(report), 'utf8');

  console.log(`\n📁 Root      : ${ROOT}`);
  console.log(`📄 Scanned   : ${files.length} files (${EXTS.join(', ')})`);
  console.log(`⚠️  ${FROM} mila : ${report.files.length} files me`);

  console.log(`\n===== SUMMARY: kaha kaha "${FROM}" mila =====`);
  console.log(`  📝 Kul TEXT jagah (change hongi)  : ${totals.text}`);
  console.log(`      ├─ <title> me                : ${totals.title}`);
  console.log(`      ├─ <meta content=""> me       : ${totals.meta}`);
  console.log(`      └─ <body> (page text) me      : ${totals.body}`);
  console.log(`  🔗 URL me mila (change NAHI hoga) : ${totals.urlSkipped}  (meta content me https:// wale)`);
  console.log(`  🚫 Attribute me mila (skip)       : ${totals.attrSkipped}  (href/src/id/class/data-*)`);
  console.log(`  🚫 <script>/<style> me mila (skip): ${totals.scriptStyleSkipped}`);
  console.log(`  Σ  Total skip (url+attr+script)   : ${totals.skipped}`);
  console.log(`================================================`);

  console.log(`\nTop files:`);
  report.files
    .slice()
    .sort((a, b) => (b.counts.title + b.counts.meta + b.counts.body) - (a.counts.title + a.counts.meta + a.counts.body))
    .slice(0, 20)
    .forEach(f => console.log(`   ${String(f.counts.title + f.counts.meta + f.counts.body).padStart(4)}  ${f.file}   [title:${f.counts.title} meta:${f.counts.meta} body:${f.counts.body} url-skip:${f.counts.urlSkipped} skip:${f.counts.skipped}]`));
  console.log(`\n📝 Audit: ${AUDIT_JSON}\n📝 Audit: ${AUDIT_MD}`);
  console.log(`\n👉 Ab dekh lo, sahi lage to chalao:  node year-fix.js apply\n`);
}

function buildMarkdown(report) {
  const t = report.totals || {};
  let md = `# ${FROM} → ${TO} Audit\n\n`;
  md += `- Root: \`${report.root}\`\n- Date: ${report.generatedAt}\n- Files with ${FROM}: **${report.files.length}**\n\n`;

  md += `## Overall Summary\n\n`;
  md += `| Kaha | Count |\n|---|---|\n`;
  md += `| **Kul TEXT jagah (change hongi)** | **${t.text}** |\n`;
  md += `| — \`<title>\` me | ${t.title} |\n`;
  md += `| — \`<meta content="">\` me | ${t.meta} |\n`;
  md += `| — \`<body>\` (page text) me | ${t.body} |\n`;
  md += `| 🔗 URL me mila (change nahi hoga) | ${t.urlSkipped} |\n`;
  md += `| 🚫 Attribute me mila (skip) | ${t.attrSkipped} |\n`;
  md += `| 🚫 \`<script>\`/\`<style>\` me mila (skip) | ${t.scriptStyleSkipped} |\n`;
  md += `| Σ Total skipped | ${t.skipped} |\n\n`;

  md += `## Per-file Summary\n\n| # | File | Title | Meta | Body | URL-skip | Attr/Script-skip |\n|---|------|-------|------|------|------|------|\n`;
  report.files.forEach((f, i) => {
    md += `| ${i + 1} | \`${f.file}\` | ${f.counts.title} | ${f.counts.meta} | ${f.counts.body} | ${f.counts.urlSkipped} | ${f.counts.attrSkipped + f.counts.scriptStyleSkipped} |\n`;
  });
  md += `\n## Details\n`;
  report.files.forEach(f => {
    md += `\n### \`${f.file}\`\n\n`;
    if (f.hits.length) {
      md += `**Change hoga (${f.hits.length}):**\n\n`;
      f.hits.forEach(h => { md += `- \`${h.zone}\` in \`${h.where}\` → ${h.text}\n`; });
    }
    if (f.skipped.length) {
      md += `\n**Chhoda gaya (${f.skipped.length}) — attribute/script/url:**\n\n`;
      f.skipped.forEach(s => { md += `- _${s.reason}_ → \`${s.snippet}\`\n`; });
    }
  });
  return md;
}

/* -------------------------- APPLY ------------------------- */
function runApply() {
  let targets;

  if (ONLY_FILE) {
    targets = [ONLY_FILE];
  } else if (fs.existsSync(AUDIT_JSON)) {
    const rep = JSON.parse(fs.readFileSync(AUDIT_JSON, 'utf8'));
    targets = rep.files.map(f => f.abs || path.join(rep.root, f.file));
    console.log(`📋 Audit file se ${targets.length} files li gayi.`);
  } else {
    console.log(`⚠️  Audit file nahi mili, poora folder scan kar raha hoon.`);
    targets = walk(ROOT);
  }

  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);
  const backupDir = path.join(ROOT, `_backup_${stamp}`);
  let done = 0, totalHits = 0;

  for (const f of targets) {
    let html;
    try { html = fs.readFileSync(f, 'utf8'); } catch { continue; }
    const r = processHtml(html);
    if (!r.changed) continue;

    if (!DRY) {
      if (!NO_BACKUP) {
        const dest = path.join(backupDir, path.relative(ROOT, f));
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(f, dest);
      }
      fs.writeFileSync(f, r.output, 'utf8');
    }
    done++; totalHits += r.hits.length;
    console.log(`${DRY ? '[dry]' : '✅'} ${path.relative(ROOT, f)}  (${r.hits.length} changes)`);
  }

  console.log(`\n${DRY ? 'DRY RUN — kuch save nahi hua.' : 'Ho gaya!'}`);
  console.log(`Files: ${done}, Total replacements: ${totalHits}`);
  if (!DRY && !NO_BACKUP && done) console.log(`Backup: ${backupDir}`);
  console.log('');
}

/* -------------------------- MAIN -------------------------- */
if (cmd === 'scan') runScan();
else if (cmd === 'apply') runApply();
else {
  console.log(`
year-fix.js — ${FROM} se ${TO}

  node year-fix.js scan [folder]        Audit banao (kuch change nahi hota)
  node year-fix.js apply                Audit ki files me change karo
  node year-fix.js apply --dry          Sirf dikhao, save mat karo
  node year-fix.js apply --file=path    Sirf ek file

Options:
  --ext=.html,.php        kaun se extensions (default .html,.htm,.php)
  --skip=admin,demo       extra folders skip karo (dot-folders already skip)
  --out=audit-2025.json   audit file ka naam
  --no-backup             backup mat banao (recommended nahi)
  --include-jsonld        <script type="application/ld+json"> bhi change karo
  --force-urls            meta ke URL wale content bhi change karo
`);
}