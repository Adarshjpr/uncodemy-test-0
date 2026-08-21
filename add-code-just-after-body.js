const fs = require("fs");
const cheerio = require("cheerio");

// Function to add Google Tag Manager (noscript) code after the opening body tag
function addGoogleTagManagerNoscript(filePath, googleTagManagerNoscript) {
  // Read the HTML file
  const html = fs.readFileSync(filePath, "utf8");

  // Load HTML into Cheerio
  const $ = cheerio.load(html);

  // Add Google Tag Manager (noscript) code immediately after the opening body tag
  $('body').prepend(googleTagManagerNoscript);

  // Write the modified HTML back to the file
  fs.writeFileSync(filePath, $.html());
}

// Directory containing HTML files
const directoryPath = "./";

// Google Tag Manager (noscript) code
const googleTagManagerNoscript = `<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NTBHKZ5H" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->`;

// Read each HTML file in the directory and add the Google Tag Manager (noscript) code
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    // Check if file is HTML
    if (file.endsWith(".html")) {
      const filePath = `${directoryPath}/${file}`;
      addGoogleTagManagerNoscript(filePath, googleTagManagerNoscript);

      console.log(`Google Tag Manager (noscript) added to ${file}`);
    }
  });
});
