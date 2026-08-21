const fs = require('fs').promises;
const cheerio = require('cheerio');

// Function to clean the HTML file
async function cleanHTMLFile(filePath) {
    try {
        // Read the HTML file
        const html = await fs.readFile(filePath, 'utf8');

        // Load HTML into Cheerio
        const $ = cheerio.load(html);

        // Define an array of tag selectors to remove, including dynamic script content
        const tagsToRemove = [
            'script[type="rocketlazyloadscript"][defer]',
            'script[src="https://www.googletagmanager.com/gtag/js?id=AW-11463379837"]',
            'script[src="https://www.googletagmanager.com/gtag/js?id=G-Z8VKK51YYL"]',
            'script[src="https://www.googletagmanager.com/gtag/js?id=UA-233902290-1"]',
            'script[src="https://connect.facebook.net/en_US/fbevents.js"]',
            'script:not([type])[async][src*="googletagmanager.com/gtm.js"]',
            'meta[name="google-site-verification"]',
            'noscript',
            'iframe[src*="googletagmanager.com"]',
            'img[src*="facebook.com"]',
            'script:contains("window.dataLayer = window.dataLayer || []")',
            'script:contains("gtag")',
            'script:contains("fbq")',
            // The dynamic Google Tag Manager script
            'script:contains("googletagmanager.com/gtm.js")',
            'body[src*="googletagmanager.com/ns.html"]',
        ];

        // Remove each tag or matching script block from the HTML
        tagsToRemove.forEach(tag => {
            $(tag).remove();
        });

        // Remove HTML comments
        $('*').contents().each(function () {
            if (this.nodeType === 8) { // Node type 8 is a comment node
                $(this).remove();
            }
        });

        // Clean up any extra spaces or blank lines
        let cleanedHTML = $.html().replace(/\s*\n\s*/g, ''); // Minify white spaces

        // Write the modified HTML back to the file
        await fs.writeFile(filePath, cleanedHTML);
        console.log(`Unwanted tags removed from ${filePath}`);
    } catch (err) {
        console.error(`Error processing file ${filePath}:`, err);
    }
}

// Directory containing HTML files
const directoryPath = './';

// Function to process files sequentially
async function processFiles(files) {
    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = `${directoryPath}/${file}`;
            await cleanHTMLFile(filePath);
        }
    }
}

// Function to start the process
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
