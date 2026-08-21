const fs = require("fs");
const path = require("path");

const ROBOTS_TAG = '<meta name="robots" content="noindex, nofollow">';

// Sirf slug likho
const pages =[
    "data-science-training-course-in-australia",
"data-science-training-course-in-uk",
"software-testing-training-course-in-south-africa",
"software-testing-training-course-in-sri-lanka",
"full-stack-development-training-course-in-germany",
"full-stack-development-training-course-in-ghana",
"full-stack-development-training-course-in-canada",
"full-stack-development-training-course-in-ireland",
"full-stack-development-training-course-in-malaysia",
"full-stack-development-training-course-in-nepal",
"full-stack-development-training-course-in-netherlands",
"full-stack-development-training-course-in-nigeria",
"full-stack-development-training-course-in-singapore",
"data-science-training-course-in-malaysia",
"data-analytics-training-course-in-germany",
"data-analytics-training-course-in-ghana",
"data-analytics-training-course-in-singapore",
"data-analytics-training-course-in-dubai",
"full-stack-development-training-course-in-dubai",
"full-stack-development-training-course-in-south-africa"
]

pages.forEach((page) => {
  const filePath = path.join(__dirname, `${page}.html`);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${page}.html not found`);
    return;
  }

  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes('name="robots"')) {
    console.log(`⏭ ${page}.html already updated`);
    return;
  }

  html = html.replace(
    /<head([^>]*)>/i,
    `<head$1>\n    ${ROBOTS_TAG}`
  );

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`✅ ${page}.html updated`);
});

console.log("Done!");