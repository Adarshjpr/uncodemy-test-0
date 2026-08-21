const fs = require("fs");
const path = require("path");
const Minimize = require("minimize");

// Specify the directory containing your HTML files
const inputDirectory = __dirname;

// Configure Minimize options to preserve attribute quotes and collapse whitespace
const minimizeOptions = {
  quotes: true, // Preserve quotes around attribute values
  collapseWhitespace: true, // Collapse whitespace between tags
  conservativeCollapse: false // Remove all spaces between tags
};

// Create a new Minimize instance with the specified options
const minimize = new Minimize(minimizeOptions);

// Function to minify HTML file
const minifyHtmlFile = (file) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(inputDirectory, file);
    let content = fs.readFileSync(filePath, "utf8");

    // Remove HTML comments
    content = content.replace(/<!--[\s\S]*?-->/g, "");

    // Minify the HTML content
    minimize.parse(content, (error, minifiedContent) => {
      if (error) {
        console.error(`Error minimizing ${file}: ${error.message}`);
        return reject(error);
      }

      fs.writeFileSync(filePath, minifiedContent, "utf8");
      console.log(`Minimized: ${file}`);
      resolve();
    });
  });
};

// Get list of HTML files and process them sequentially
const files = fs.readdirSync(inputDirectory).filter((file) => file.endsWith(".html"));
const minifyFilesSequentially = async (files) => {
  for (const file of files) {
    try {
      await minifyHtmlFile(file);
    } catch (error) {
      console.error(`Failed to minify ${file}: ${error.message}`);
    }
  }
  console.log("Minification completed.");
  process.exit(0); // Exit the process to release memory
};

minifyFilesSequentially(files);
