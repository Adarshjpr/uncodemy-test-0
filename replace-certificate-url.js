/**
 * replace-certificate-url.js
 *
 * Ye script current folder (jaha ye file rakhi hai) se shuru hoke
 * SAARE sub-folders me jaake har file ke andar ye replace karegi:
 *
 *   https://uncodemy.com/uncodemy-apply-for-certificate-form
 *   /uncodemy-apply-for-certificate-form
 *
 *        ---->   https://certificate.uncodemy.com/
 *
 * .history folder ko SKIP kar diya jayega (aur kuch common
 * heavy/irrelevant folders bhi, jaise node_modules, .git).
 *
 * KAISE CHALAYE:
 *   1) Is file ko apne project ke ROOT folder me rakh do.
 *   2) Terminal me project root par jaao.
 *   3) Command chalao:  node replace-certificate-url.js
 *
 * Sabse pehle ye DRY RUN mode me chalti hai (kuch change nahi karti,
 * sirf batati hai kitni files me match milega). Agar sab sahi lage
 * to neeche DRY_RUN ko false karke dobara chalao — tab actual
 * replace ho jayega.
 */

const fs = require("fs");
const path = require("path");

// ====== SETTINGS - INHE ZAROORAT PADE TO BADAL SAKTE HO ======

// true = sirf preview karega, kuch file me change nahi karega
// false = actual me files ke andar replace kar dega
const DRY_RUN =false;

// Root folder jaha se scan shuru hoga (default: is script ki location)
const ROOT_DIR = __dirname;

// In folder-names ko poori tarah skip kar diya jayega
const SKIP_FOLDERS = new Set([
  ".history",
  ".git",
  "node_modules",
  ".vscode",
  ".idea",
]);

// Sirf in extensions wali files me hi dhundega/replace karega
// (binary files jaise images, fonts, zip etc. ko avoid karne ke liye)
const ALLOWED_EXTENSIONS = new Set([
  ".html", ".htm", 
]);

// Jo strings dhundhni hain (in order me check hoga)
const SEARCH_PATTERNS = [
  "https://uncodemy.com/uncodemy-apply-for-certificate-form",
  "/uncodemy-apply-for-certificate-form",
];

// Jisse replace karna hai
const REPLACEMENT = "https://certificate.uncodemy.com/";

// ====== SCRIPT LOGIC (isse chhedne ki zaroorat nahi) ======

let filesScanned = 0;
let filesChanged = 0;
let totalReplacements = 0;
const changedFilesList = [];

function shouldSkipDir(dirName) {
  return SKIP_FOLDERS.has(dirName);
}

function hasAllowedExtension(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

function processFile(filePath) {
  filesScanned++;

  let content;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    // Binary ya unreadable file, skip kar do
    return;
  }

  let newContent = content;
  let countInFile = 0;

  for (const pattern of SEARCH_PATTERNS) {
    const parts = newContent.split(pattern);
    const matches = parts.length - 1;
    if (matches > 0) {
      countInFile += matches;
      newContent = parts.join(REPLACEMENT);
    }
  }

  if (countInFile > 0) {
    filesChanged++;
    totalReplacements += countInFile;
    changedFilesList.push({
      file: path.relative(ROOT_DIR, filePath),
      count: countInFile,
    });

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, "utf8");
    }
  }
}

function walkDir(currentPath) {
  let entries;
  try {
    entries = fs.readdirSync(currentPath, { withFileTypes: true });
  } catch (err) {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) {
        continue; // .history (aur baaki skip list) yaha se ignore ho jaata hai
      }
      walkDir(fullPath);
    } else if (entry.isFile()) {
      if (hasAllowedExtension(entry.name)) {
        processFile(fullPath);
      }
    }
  }
}

console.log("=======================================");
console.log(DRY_RUN ? " MODE: DRY RUN (preview only)" : " MODE: LIVE (files will be modified)");
console.log(" Root folder:", ROOT_DIR);
console.log("=======================================\n");

walkDir(ROOT_DIR);

console.log("---- RESULT ----");
console.log("Files scanned :", filesScanned);
console.log("Files changed :", filesChanged);
console.log("Total matches :", totalReplacements);
console.log("");

if (changedFilesList.length > 0) {
  console.log("Changed files list:");
  changedFilesList.forEach((f) => {
    console.log(`  - ${f.file}  (${f.count} match${f.count > 1 ? "es" : ""})`);
  });
} else {
  console.log("Koi matching URL nahi mila.");
}

console.log("");
if (DRY_RUN) {
  console.log("Ye sirf PREVIEW tha, koi file change NAHI hui.");
  console.log("Actual replace karne ke liye script ke top me DRY_RUN = false karke dobara chalao:");
  console.log("   node replace-certificate-url.js");
} else {
  console.log("Files me changes save ho gaye hain.");
}