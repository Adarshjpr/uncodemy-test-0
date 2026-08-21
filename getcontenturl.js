const fs = require('fs');
const path = require('path');

const directoryPath = 'course';  // Change this to your directory path
const baseUrl = 'https://uncodemy.com/course/';  // Replace with your website's base URL
const outputFilePath = './output1.js';  // Path to save URLs with the specified image

// Function to check if a file contains the specified image
function containsImage(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes('/img/tools/DS1.png');
}

// Function to get URLs of pages containing the specified image
function getImageUrls(dirPath) {
    const imageUrls = [];

    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);

        // Check if the file is an HTML file and contains the image
        if (path.extname(file) === '.html' && containsImage(filePath)) {
            const url = baseUrl + file;
            imageUrls.push(url);
        }
    });

    return imageUrls;
}

// Get the list of URLs containing the specified image
const imageUrls = getImageUrls(directoryPath);

// Write the URLs to output1.js file
fs.writeFileSync(outputFilePath, `module.exports = ${JSON.stringify(imageUrls, null, 2)};`, 'utf-8');

console.log(`URLs with "/img/tools/DS1.png" have been saved to ${outputFilePath}`);
