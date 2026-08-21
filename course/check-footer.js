const fs = require("fs");
const path = require("path");

const courseFolder = __dirname;

function checkFolder(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            checkFolder(fullPath);
        } else if (item.isFile() && item.name.endsWith(".html")) {
            const content = fs.readFileSync(fullPath, "utf8");

            // footer-form class check
            if (!/class\s*=\s*["'][^"']*\bfooter-form\b[^"']*["']/i.test(content)) {
                console.log(path.relative(courseFolder, fullPath));
            }
        }
    }
}

checkFolder(courseFolder);