/**
 * replace-footer-year.js
 * ---------------------------------------------------
 * Is script ko ROOT folder me rakho aur run karo:
 *
 *      node replace-footer-year.js
 *
 * ================== KYA KAREGI ==================
 *
 * <footer> ke andar 2025 -> 2026
 *   - SAARE .html pages me (root ki direct files + SAARE sub-folders)
 *   - Sirf "history" naam ka folder SKIP hoga, baaki sab me jayega
 *   - Sirf <footer>...</footer> tag ke ANDAR jaha "2025" likha hai,
 *     usko "2026" kar dega (footer ke bahar kuch touch nahi hoga)
 * ---------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

// ====== SETTINGS ======
// Ye folder(s) hamesha SKIP honge (poore tree me kahi bhi mile)
const SKIP_FOLDERS = ['history'];

// Sirf yeh extension process hogi
const VALID_EXTENSIONS = ['.html'];

// Footer tag ke andar ka content dhoondhne ke liye regex
const FOOTER_REGEX = /<footer[^>]*>[\s\S]*?<\/footer>/gi;
const OLD_YEAR = '2025';
const NEW_YEAR = '2026';
// ========================

const ROOT_DIR = __dirname; // script jaha rakhi hai, wahi root

let changedFiles = new Set();
let scannedCount = 0;

function shouldSkipFolder(folderName) {
  return SKIP_FOLDERS.some((skip) => skip.toLowerCase() === folderName.toLowerCase());
}

function processFile(filePath) {
  scannedCount++;
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`❌ File read error: ${filePath} -> ${err.message}`);
    return;
  }

  let updatedContent = content;
  let changed = false;

  if (FOOTER_REGEX.test(updatedContent)) {
    FOOTER_REGEX.lastIndex = 0; // reset regex state (g flag ki wajah se zaroori)
    updatedContent = updatedContent.replace(FOOTER_REGEX, (footerBlock) => {
      if (footerBlock.includes(OLD_YEAR)) {
        changed = true;
        return footerBlock.split(OLD_YEAR).join(NEW_YEAR);
      }
      return footerBlock;
    });
  }

  if (changed) {
    try {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      changedFiles.add(filePath);
      console.log(`✅ Update ho gaya: ${filePath}`);
    } catch (err) {
      console.error(`❌ File write error: ${filePath} -> ${err.message}`);
    }
  }
}

// ---------- Pura tree ghoomna, sirf "history" skip karna ----------
function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`❌ Folder read nahi ho paya: ${dir} -> ${err.message}`);
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipFolder(entry.name)) {
        console.log(`⏭️  Skip kiya folder: ${fullPath}`);
        continue;
      }
      walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTENSIONS.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

console.log(`\n🚀 Shuru ho raha hai... Root: ${ROOT_DIR}\n`);
console.log(`===== <footer> ke andar 2025 -> 2026 (saare folders, history skip) =====`);
walk(ROOT_DIR);

console.log(`\n----------------------------------------`);
console.log(`📂 Total .html files scan hui: ${scannedCount}`);
console.log(`✏️  Total files change hui: ${changedFiles.size}`);
if (changedFiles.size > 0) {
  console.log(`\nChange hui files ki list:`);
  [...changedFiles].forEach((f) => console.log('  - ' + f));
}
console.log(`----------------------------------------\n`);
console.log(`🎉 Kaam pura ho gaya!`);