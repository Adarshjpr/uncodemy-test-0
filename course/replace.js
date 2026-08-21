const fs = require("fs").promises;
const path = require("path");

// Define the directory containing the HTML files
const directoryPath = "./";

// Define the old and new code for the replacement
const oldCode1 = /<a target="_blank" class="text-white" href="#">Uncodemy<\/a>/g;
const newCode1 = `<a class="text-white" href="/">Uncodemy</a>`;

// Function to process each file
async function processFile(filePath) {
  try {
    // Read the file content
    const data = await fs.readFile(filePath, "utf8");

    // Replace all occurrences of the old code with the new code using regex
    const updatedContent = data.replace(oldCode1, newCode1);

    // Write the updated content back to the file
    await fs.writeFile(filePath, updatedContent, "utf8");
    console.log(`Updated file: ${filePath}`);
  } catch (err) {
    console.error("Unable to read or write file: " + err);
  }
}

// Read all files from the directory
async function processFiles() {
  try {
    const files = await fs.readdir(directoryPath);

    // Filter for HTML files
    const htmlFiles = files.filter((file) => path.extname(file) === ".html");
    let replacedCount = 0;

    // Process each file sequentially
    for (const file of htmlFiles) {
      const filePath = path.join(directoryPath, file);
      await processFile(filePath);
      replacedCount++;
    }

    console.log(`All files processed. Total files replaced: ${replacedCount}`);
  } catch (err) {
    console.error("Unable to scan directory: " + err);
  }
}

// Start the processing
processFiles();
