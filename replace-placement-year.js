/**
 * replace-placement-year.js
 * ---------------------------------------------------
 * Is script ko ROOT folder me rakho aur run karo:
 *
 *      node replace-placement-year.js
 *
 * Kya karega:
 *  - Sirf in TEEN folders ke andar jayega (root ke seedha niche):
 *        course, blog, tutorial
 *    (in teeno ke andar recursively sub-folders me bhi jayega)
 *  - Baaki koi bhi folder (history, ya aur kuch) TOUCH nahi karega
 *  - Sirf ".html" files ko process karega
 *  - Har HTML file ke andar:
 *        - jaha "#placement-2024" mila (href me ya text me kahi bhi)
 *          usko "#placement-2026" karega
 *        - jaha bina # ke "placement-2024" mila (text me),
 *          usko "placement-2026" karega
 *  - File ko wahi save kar dega (overwrite)
 *  - End me kitni files change hui, uski list print karega
 * ---------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

// ====== SETTINGS ======
const OLD_HASH_TEXT = '#placement-2024';
const NEW_HASH_TEXT = '#placement-2026';

const OLD_TEXT = '';
const NEW_TEXT = 'placement-2026';

// Sirf in folders ke andar jaana hai (root ke seedha niche)
const TARGET_FOLDERS = ['course'];

// Sirf yeh extension process hogi
const VALID_EXTENSIONS = ['.html'];
// ========================

const ROOT_DIR = __dirname; // script jaha rakhi hai, wahi root

let changedFiles = [];
let scannedCount = 0;

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
      walk(fullPath); // andar jitne bhi sub-folders hain, sabme jao
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTENSIONS.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
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
  let didChange = false;

  // Pehle #placement-2024 -> #placement-2026 (href wale links)
  if (updatedContent.includes(OLD_HASH_TEXT)) {
    updatedContent = updatedContent.split(OLD_HASH_TEXT).join(NEW_HASH_TEXT);
    didChange = true;
  }

  // Fir bacha hua plain placement-2024 (bina #) -> placement-2026 (text me)
  if (updatedContent.includes(OLD_TEXT)) {
    updatedContent = updatedContent.split(OLD_TEXT).join(NEW_TEXT);
    didChange = true;
  }

  if (didChange) {
    try {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      changedFiles.push(filePath);
      console.log(`✅ Update ho gaya: ${filePath}`);
    } catch (err) {
      console.error(`❌ File write error: ${filePath} -> ${err.message}`);
    }
  }
}

console.log(`\n🚀 Shuru ho raha hai... Root: ${ROOT_DIR}\n`);

// 1) Root me jo seedhe .html files pade hain, unko process karo (root ke andar ke
//    doosre folders me NAHI jaana, sirf root ki apni files)
console.log(`📂 Root ki direct .html files check kar raha hu: ${ROOT_DIR}`);
try {
  const rootEntries = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTENSIONS.includes(ext)) {
        processFile(path.join(ROOT_DIR, entry.name));
      }
    }
  }
} catch (err) {
  console.error(`❌ Root folder read nahi ho paya: ${err.message}`);
}

// 2) course, blog, tutorial folders ke andar recursively jao
TARGET_FOLDERS.forEach((folderName) => {
  const folderPath = path.join(ROOT_DIR, folderName);
  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    console.log(`📂 Andar ja raha hu: ${folderPath}`);
    walk(folderPath);
  } else {
    console.log(`⚠️  Folder nahi mila, skip kiya: ${folderPath}`);
  }
});

console.log(`\n----------------------------------------`);
console.log(`📂 Total .html files scan hui: ${scannedCount}`);
console.log(`✏️  Total files change hui: ${changedFiles.length}`);
if (changedFiles.length > 0) {
  console.log(`\nChange hui files ki list:`);
  changedFiles.forEach((f) => console.log('  - ' + f));
}
console.log(`----------------------------------------\n`);
console.log(`🎉 Kaam pura ho gaya!`);