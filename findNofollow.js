const fs = require('fs');
const path = require('path');

const directoryPath = 'course';  // Change this to your directory path
const baseUrl = 'https://uncodemy.com/course/';  // Replace with your website's base URL
const outputFilePath = './output1.js';  // Path to save URLs with "nofollow" tag

// Function to check if a file contains the nofollow tag
function containsNofollowTag(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes('<meta name="robots" content="index, follow">');
}

// Function to get URLs of pages containing the nofollow tag
function getNofollowUrls(dirPath) {
    const nofollowUrls = [];

    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);

        // Check if the file is an HTML file and contains the nofollow tag
        if (path.extname(file) === '.html' && containsNofollowTag(filePath)) {
            const url = baseUrl + file;
            nofollowUrls.push(url);
        }
    });

    return nofollowUrls;
}

// Get the list of nofollow URLs
const nofollowUrls = getNofollowUrls(directoryPath);

// Write the URLs to output.js file
fs.writeFileSync(outputFilePath, `module.exports = ${JSON.stringify(nofollowUrls, null, 2)};`, 'utf-8');

console.log(`URLs with "nofollow" tag have been saved to ${outputFilePath}`);
