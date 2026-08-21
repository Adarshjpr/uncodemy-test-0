const fs = require('fs');
const path = require('path');

// Directory where your HTML files are located
const directoryPath = path.join(__dirname, '/');

// Function to remove the noindex tag in a file
const removeNoindexTag = (filePath) => {
    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
        }

        // Remove the noindex tag from the content
        const updatedContent = data.replace(/<meta name="robots" content="noindex, nofollow" ?\/?>/gi, '');

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to file ${filePath}:`, err);
            } else {
                console.log(`Removed noindex tag in: ${filePath}`);
            }
        });
    });
};

// Read all HTML files from the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter for Digital Marketing course HTML files (assuming they contain "digital-marketing" in the filename)
    files.forEach(file => {
        if (path.extname(file) === '.html' && file.includes('digital-marketing')) {
            const filePath = path.join(directoryPath, file);
            removeNoindexTag(filePath);
        }
    });
});
