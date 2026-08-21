import { promises as fs } from 'fs';
import * as cheerio from 'cheerio'; // Importing cheerio as a named import

// Function to remove the noindex meta tag specifically near the closing head tag
async function removeNoindexTag(filePath) {
  try {
    // Read the HTML file
    const html = await fs.readFile(filePath, 'utf8');

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Find the meta tag near the closing </head> tag and remove it
    $('head meta[name="robots"][content="noindex, nofollow"]').remove();

    // Write the modified HTML back to the file
    await fs.writeFile(filePath, $.html());
    console.log(`Noindex tag removed from ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

// Directory containing HTML files
const directoryPath = 'course';

// Function to process files sequentially to avoid too many open files error
async function processFiles(files) {
  for (const file of files) {
    if (file.endsWith('.html')) {
      const filePath = `${directoryPath}/${file}`;
      await removeNoindexTag(filePath); // Process files one by one
    }
  }
}

async function startProcessing() {
  try {
    const files = await fs.readdir(directoryPath);
    await processFiles(files);
    console.log('All files processed successfully.');
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

startProcessing();
