const fs = require("fs");
const path = require("path");

const clarityScript = `
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xmqak04f7r");
</script>
`;

function processFolder(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processFolder(filePath);
        } else if (/\.(html|htm)$/i.test(file)) {
            let content = fs.readFileSync(filePath, "utf8");

            // Duplicate avoid
            if (content.includes("xmqak04f7r")) {
                console.log(`Skipped: ${filePath}`);
                return;
            }

            if (content.includes("</head>")) {
                content = content.replace("</head>", `${clarityScript}\n</head>`);
                fs.writeFileSync(filePath, content, "utf8");
                console.log(`Updated: ${filePath}`);
            } else {
                console.log(`No </head>: ${filePath}`);
            }
        }
    });
}

processFolder(__dirname);
console.log("\n✅ Done! Clarity script added to all HTML files.");