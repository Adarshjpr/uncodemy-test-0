const fs = require('fs').promises;
const cheerio = require('cheerio');

// Function to remove all instances of the specified link tag
async function removeLinkTag(filePath) {
  try {
    // Read the HTML file
    const html = await fs.readFile(filePath, 'utf8');

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Find and remove any <link> tag with href="public/css/style.css"
    $('link[href="public/css/style.css"]').remove();

    // Write the modified HTML back to the file
    await fs.writeFile(filePath, $.html());
    console.log(`Specified link tag removed from ${filePath}`);
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
      await removeLinkTag(filePath); // Process files one by one
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
