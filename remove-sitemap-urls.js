const fs = require("fs");
const path = require("path");

const folder = __dirname;
const urlFile = path.join(folder, "urls.txt");

if (!fs.existsSync(urlFile)) {
    console.log("❌ urls.txt nahi mili.");
    process.exit();
}

const urls = fs.readFileSync(urlFile, "utf8")
    .split(/\r?\n/)
    .map(x => x.trim())
    .filter(Boolean);

const sitemapFiles = fs.readdirSync(folder)
    .filter(file => file.endsWith(".xml"));

let totalRemoved = 0;

for (const file of sitemapFiles) {

    const filePath = path.join(folder, file);
    let xml = fs.readFileSync(filePath, "utf8");

    let removed = 0;

    urls.forEach(url => {

        const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(
            `<url>[\\s\\S]*?<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>`,
            "g"
        );

        const matches = xml.match(regex);
        if (matches) removed += matches.length;

        xml = xml.replace(regex, "");
    });

    fs.writeFileSync(filePath, xml, "utf8");

    console.log(`✅ ${file} : ${removed} URL removed`);

    totalRemoved += removed;
}

console.log("\n========================");
console.log(`Total URLs Removed : ${totalRemoved}`);
console.log("========================");