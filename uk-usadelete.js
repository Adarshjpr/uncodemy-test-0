const fs = require('fs');
const path = require('path');

// Define the directory where HTML files are stored
const directoryPath = 'course';

// Read all the files in the course directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error(`Unable to scan directory: ${err}`);
  }

  // Filter files that end with 'usa.html' or 'uk.html'
  const urlsToRemove = files.filter((file) => {
    return file.endsWith('usa.html') || file.endsWith('uk.html');
  });

  // Counter to keep track of successfully deleted files
  let deletedCount = 0;

  // Loop through the list of filtered URLs
  urlsToRemove.forEach((url) => {
    const filePath = path.join(directoryPath, url);

    // Check if the file exists before trying to delete it
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete ${url}: ${err}`);
        } else {
          deletedCount++;
          console.log(`Successfully deleted: ${url}`);
        }
      });
    } else {
      console.log(`File not found: ${url}`);
    }
  });

  // Log the total count of successfully deleted files
  process.on('exit', () => {
    console.log(`Total files deleted successfully: ${deletedCount}`);
  });
});
