const fs = require("fs");
const path = require("path");

const folderPath = __dirname;
const listFile = path.join(folderPath, "pages.txt");

if (!fs.existsSync(listFile)) {
    console.log("pages.txt file nahi mili!");
    process.exit();
}

const pageNames = fs
    .readFileSync(listFile, "utf8")
    .split(/\r?\n/)
    .map(name => name.trim())
    .filter(name => name !== "");

let deleted = 0;
let notFound = 0;

pageNames.forEach(page => {
    const filePath = path.join(folderPath, `${page}.html`);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted: ${page}.html`);
        deleted++;
    } else {
        console.log(`❌ Not Found: ${page}.html`);
        notFound++;
    }
});

console.log("\n------------------------");
console.log(`Deleted : ${deleted}`);
console.log(`Not Found : ${notFound}`);
console.log("------------------------");