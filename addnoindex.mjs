
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory where all HTML files are located
const directoryPath = path.join(__dirname, 'course');

// Cities to specifically include for meta tag insertion
const specificCities = ["greater-noida", "new-delhi"];

// Function to check if the file matches the specific cities
function shouldProcessFile(fileName) {
  const lowerFileName = fileName.toLowerCase();
  return specificCities.some(city => {
    const exactCityPattern = new RegExp(`\\b${city}\\b`, 'i');
    return exactCityPattern.test(lowerFileName);
  });
}

// Function to check if the file already has a noindex tag
function alreadyHasNoindexTag(fileContent) {
  return /<meta\s+name=["']robots["']\s+content=["']noindex, nofollow["']\s*\/?>/i.test(fileContent);
}

async function updateFileContent(filePath) {
  try {
    let data = await fs.readFile(filePath, 'utf8');
    
    // Check if the file already contains the noindex meta tag
    if (alreadyHasNoindexTag(data)) {
      console.log(`${filePath} already contains noindex tag. Skipping...`);
      return;
    }

    // Add the meta tag before the closing </head> tag
    data = data.replace(/<\/head>/i, '<meta name="robots" content="noindex, nofollow" />\n</head>');
    
    await fs.writeFile(filePath, data, 'utf8');
    console.log(`${filePath} updated successfully.`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

async function processFiles() {
  try {
    const files = await fs.readdir(directoryPath);
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    for (const file of htmlFiles) {
      // Only process if the file matches "greater-noida" or "new-delhi"
      if (!shouldProcessFile(file)) {
        console.log(`Skipping ${file} (not a target city page).`);
        continue;
      }

      const filePath = path.join(directoryPath, file);
      await updateFileContent(filePath); // Process files one by one
    }

    console.log('All target city files processed successfully.');
  } catch (err) {
    console.error(`Error scanning directory: ${err.message}`);
  }
}

processFiles();




























// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Directory where all HTML files are located
// const directoryPath = path.join(__dirname, 'course');

// // Cities to exclude from the meta tag insertion
// const excludedCities = ["noida", "delhi"];

// // Function to check if the file should be skipped based on city names
// function shouldSkipFile(fileName) {
//   return excludedCities.some(city => fileName.toLowerCase().includes(city));
// }
// async function updateFileContent(filePath) {
//   try {
//     let data = await fs.readFile(filePath, 'utf8');
    
//     // Add the meta tag before the closing </head> tag
//     data = data.replace(/<\/head>/i, '<meta name="robots" content="noindex, nofollow" />\n</head>');
    
//     await fs.writeFile(filePath, data, 'utf8');
//     console.log(`${filePath} updated successfully.`);
//   } catch (err) {
//     console.error(`Error processing ${filePath}: ${err.message}`);
//   }
// }

// async function processFiles() {
//   try {
//     const files = await fs.readdir(directoryPath);
//     const htmlFiles = files.filter(file => path.extname(file) === '.html');

//     for (const file of htmlFiles) {
//       // Skip if the file matches any excluded city names
//       if (shouldSkipFile(file)) {
//         console.log(`Skipping ${file} (excluded city page).`);
//         continue;
//       }

//       const filePath = path.join(directoryPath, file);
//       await updateFileContent(filePath); // Process files one by one
//     }

//     console.log('All eligible files processed successfully.');
//   } catch (err) {
//     console.error(`Error scanning directory: ${err.message}`);
//   }
// }

// processFiles();
