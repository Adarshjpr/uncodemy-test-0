const fs = require("fs");
const cheerio = require("cheerio");

// Function to add Meta Pixel Code to HTML file before closing head tag
function addMetaPixelCode(filePath, metaPixelCode) {
  // Read the HTML file
  const html = fs.readFileSync(filePath, "utf8");

  // Load HTML into Cheerio
  const $ = cheerio.load(html);

  // Add Meta Pixel Code before closing head tag
  $('head').append(metaPixelCode);

  // Write the modified HTML back to the file
  fs.writeFileSync(filePath, $.html());
}

// Directory containing HTML files
const directoryPath = "./";

// Meta Pixel Code
const metaPixelCode=`<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16792742286"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-16792742286');</script>`;

// Read each HTML file in the directory and add Meta Pixel Code before closing head tag
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    // Check if file is HTML
    if (file.endsWith(".html")) {
      const filePath = `${directoryPath}/${file}`;
      addMetaPixelCode(filePath, metaPixelCode);

      console.log(`Meta Pixel Code added to ${file}`);
    }
  });
});
