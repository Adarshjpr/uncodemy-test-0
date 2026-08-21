const fs = require('fs').promises;
const cheerio = require('cheerio');


// List of specific files to process (from your provided list)
const filesToProcess = [
  "advance-excel-training-in-chennai.html",
  "advance-excel-training-in-faridabad.html",
  "advance-excel-training-in-ghaziabad.html",
  "advance-excel-training-in-greater-noida.html",
  "advance-excel-training-in-gurgaon.html",
  "android-app-development-training-course-in-faridabad.html",
  "android-app-development-training-course-in-ghaziabad.html",
  "android-app-development-training-course-in-greater-noida.html",
  "android-app-development-training-course-in-gurgaon.html",
  "artificial-intelligence-training-course-in-faridabad.html",
  "artificial-intelligence-training-course-in-ghaziabad.html",
  "artificial-intelligence-training-course-in-greater-noida.html",
  "artificial-intelligence-training-course-in-gurgaon.html",
  "automation-testing-course-in-allahabad.html",
  "automation-testing-course-in-alwar.html",
  "automation-testing-course-in-ranchi.html",
  "automation-testing-course-in-yamuna-nagar.html",
  "aws-training-course-in-faridabad.html",
  "aws-training-course-in-ghaziabad.html",
  "aws-training-course-in-greater-noida.html",
  "aws-training-course-in-gurgaon.html",
  "blockchain-training-course-in-ghaziabad.html",
  "blockchain-training-course-in-greater-noida.html",
  "business-analyst-training-course-in-agra.html",
  "business-analyst-training-course-in-bangalore.html",
  "business-analyst-training-course-in-bhopal.html",
  "business-analyst-training-course-in-bhubaneswar.html",
  "business-analyst-training-course-in-chandigarh.html",
  "business-analyst-training-course-in-chennai.html",
  "business-analyst-training-course-in-dehradun.html",
  "business-analyst-training-course-in-faridabad.html",
  "business-analyst-training-course-in-gorakhpur.html",
  "business-analyst-training-course-in-greater-noida.html",
  "business-analyst-training-course-in-jaipur.html",
  "business-analyst-training-course-in-lucknow.html",
  "business-analyst-training-course-in-meerut.html",
  "business-analyst-training-course-in-vadodara.html",
  "cyber-security-training-course-in-faridabad.html",
  "cyber-security-training-course-in-ghaziabad.html",
  "cyber-security-training-course-in-greater-noida.html",
  "cyber-security-training-course-in-gurgaon.html",
  "cyber-security-training-course-in-mathura.html",
  "data-analytics-pdf.html",
  "data-structure-and-algorithm-training-course-in-faridabad.html",
  "data-structure-and-algorithm-training-course-in-ghaziabad.html",
  "data-structure-and-algorithm-training-course-in-greater-noida.html",
  "data-structure-and-algorithm-training-course-in-gurgaon.html",
  "data-structure-and-algorithm-training-course-in-kanpur.html",
  "data-structure-and-algorithm-training-course-in-roorkee.html",
  "data-structure-and-algorithm-training-course-in-visakhapatnam.html",
  "devops-training-course-in-faridabad.html",
  "devops-training-course-in-ghaziabad.html",
  "devops-training-course-in-greater-noida.html",
  "devops-training-course-in-gurgaon.html",
  "ethical-hacking-course-in-faridabad.html",
  "ethical-hacking-course-in-ghaziabad.html",
  "ethical-hacking-course-in-greater-noida.html",
  "ethical-hacking-course-in-gurgaon.html",
  "ethical-hacking-course-in-hyderabad.html",
  "graphic-designing-training-course-in-faridabad.html",
  "graphic-designing-training-course-in-ghaziabad.html",
  "graphic-designing-training-course-in-greater-noida.html",
  "graphic-designing-training-course-in-gurgaon.html",
  "guidewire-training-course-in-faridabad.html",
  "guidewire-training-course-in-ghaziabad.html",
  "guidewire-training-course-in-greater-noida.html",
  "guidewire-training-course-in-gurgaon.html",
  "guidewire-training-course-in-ranchi.html",
  "java-training-course-in-faridabad.html",
  "java-training-course-in-greater-noida.html",
  "machine-learning-training-course-in-faridabad.html",
  "machine-learning-training-course-in-ghaziabad.html",
  "machine-learning-training-course-in-greater-noida.html",
  "machine-learning-training-course-in-gurgaon.html",
  "microsoft-azure-training-course-in-ghaziabad.html",
  "microsoft-azure-training-course-in-greater-noida.html",
  "mobile-app-development-course-in-faridabad.html",
  "mobile-app-development-course-in-ghaziabad.html",
  "mobile-app-development-course-in-greater-noida.html",
  "mobile-app-development-course-in-gurgaon.html",
  "power-bi-training-course-in-faridabad.html",
  "power-bi-training-course-in-ghaziabad.html",
  "power-bi-training-course-in-greater-noida.html",
  "power-bi-training-course-in-gurgaon.html",
  "python-training-course-in-faridabad.html",
  "python-training-course-in-greater-noida.html",
  "react-js-training-course-in-dehradun.html",
  "react-js-training-course-in-faridabad.html",
  "react-js-training-course-in-ghaziabad.html",
  "react-js-training-course-in-greater-noida.html",
  "react-js-training-course-in-gurgaon.html",
  "react-js-training-course-in-gwalior.html",
  "react-js-training-course-in-moradabad.html",
  "react-js-training-course-in-ranchi.html",
  "sap-fico-training-course-in-faridabad.html",
  "sap-fico-training-course-in-ghaziabad.html",
  "sap-fico-training-course-in-greater-noida.html",
  "sap-fico-training-course-in-gurgaon.html",
  "sap-mm-training-course-in-faridabad.html",
  "sap-mm-training-course-in-ghaziabad.html",
  "sap-mm-training-course-in-greater-noida.html",
  "sap-mm-training-course-in-gurgaon.html",
  "sap-pm-training-course-in-faridabad.html",
  "sap-pm-training-course-in-ghaziabad.html",
  "sap-pm-training-course-in-greater-noida.html",
  "sap-pm-training-course-in-gurgaon.html",
  "sap-pp-training-course-in-faridabad.html",
  "sap-pp-training-course-in-ghaziabad.html",
  "sap-pp-training-course-in-greater-noida.html",
  "sap-pp-training-course-in-gurgaon.html",
  "sap-scm-training-course-in-faridabad.html",
  "sap-scm-training-course-in-ghaziabad.html",
  "sap-scm-training-course-in-greater-noida.html",
  "sap-scm-training-course-in-gurgaon.html",
  "sap-scm-training-course-in-hyderabad.html",
  "sap-sd-training-course-in-faridabad.html",
  "sap-sd-training-course-in-ghaziabad.html",
  "sap-sd-training-course-in-greater-noida.html",
  "sap-sd-training-course-in-gurgaon.html",
  "sap-sd-training-course-in-meerut.html",
  "sap-training-course-in-ghaziabad.html",
  "sap-training-course-in-greater-noida.html",
  "selenium-course-in-bhopal.html",
  "selenium-course-in-greater-noida.html",
  "selenium-course-in-gurgaon.html",
  "selenium-course-in-jaipur.html",
  "seo-training-course-in-aligarh.html",
  "seo-training-course-in-bhopal.html",
  "seo-training-course-in-chandigarh.html",
  "seo-training-course-in-dehradun.html",
  "seo-training-course-in-ghaziabad.html",
  "seo-training-course-in-greater-noida.html",
  "seo-training-course-in-gurgaon.html",
  "seo-training-course-in-meerut.html",
  "seo-training-course-in-mohali.html",
  "seo-training-course-in-thane.html",
  "sql-training-course-in-faridabad.html",
  "sql-training-course-in-ghaziabad.html",
  "sql-training-course-in-greater-noida.html",
  "sql-training-course-in-gurgaon.html",
  "tableau-training-course-in-agra.html",
  "tableau-training-course-in-faridabad.html",
  "tableau-training-course-in-ghaziabad.html",
  "tableau-training-course-in-greater-noida.html",
  "tableau-training-course-in-gurgaon.html",
  "tableau-training-course-in-jaipur.html",
  "uiux-training-course-in-bareilly.html",
  "uiux-training-course-in-faridabad.html",
  "uiux-training-course-in-ghaziabad.html",
  "uiux-training-course-in-greater-noida.html",
  "uiux-training-course-in-gurgaon.html",
  "video-editing-training-course-in-faridabad.html",
  "video-editing-training-course-in-ghaziabad.html",
  "video-editing-training-course-in-greater-noida.html",
  "video-editing-training-course-in-gurgaon.html",
  "video-editing-training-course-in-jabalpur.html",
  "web-designing-training-course-in-ahmedabad.html",
  "web-designing-training-course-in-chennai.html",
  "web-designing-training-course-in-faridabad.html",
  "web-designing-training-course-in-ghaziabad.html",
  "web-designing-training-course-in-gorakhpur.html",
  "web-designing-training-course-in-greater-noida.html",
  "web-designing-training-course-in-gurgaon.html",
  "web-designing-training-course-in-indore.html",
  "web-designing-training-course-in-pune.html",
  "web-designing-training-course-in-vadodara.html",
  "workday-training-course-in-faridabad.html",
  "workday-training-course-in-ghaziabad.html",
  "workday-training-course-in-greater-noida.html",
  "workday-training-course-in-gurgaon.html"
];

// Directory containing HTML files
const directoryPath = 'course';

async function updateMetaTags(filePath) {
  try {
    // Read the HTML file
    const html = await fs.readFile(filePath, 'utf8');

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Remove any existing robots meta tags (noindex or others)
    $('head meta[name="robots"]').remove();

    // Add new index, follow meta tag
    $('head').append('<meta name="robots" content="index, follow">');

    // Write the modified HTML back to the file
    await fs.writeFile(filePath, $.html());
    console.log(`Updated meta tags in ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function processFiles() {
  for (const file of filesToProcess) {
    const filePath = `${directoryPath}/${file}`;
    try {
      // Check if file exists before processing
      await fs.access(filePath);
      await updateMetaTags(filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`File not found, skipping: ${filePath}`);
      } else {
        console.error(`Error accessing file ${filePath}:`, err);
      }
    }
  }
  console.log('All specified files processed.');
}

processFiles();