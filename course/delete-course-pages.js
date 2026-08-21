/**
 * delete-course-pages.js
 * ----------------------
 * Is file ko apne "course" folder ke ANDAR daal do (jahan saare .html pages hain)
 * aur wahi se chalao:
 *
 *     node delete-course-pages.js
 *
 * Ye script niche di gayi list ke har naam me ".html" laga kar
 * usi folder me file dhundegi aur delete kar degi.
 * Baaki files ko touch nahi karegi.
 */

const fs = require("fs");
const path = require("path");

const slugs = [
  "full-stack-development-training-course-in-aligarh",
  "full-stack-development-training-course-in-allahabad",
  "full-stack-development-training-course-in-ameerpet",
  "full-stack-development-training-course-in-bareilly",
  "full-stack-development-training-course-in-ghaziabad",
  "full-stack-development-training-course-in-gorakhpur",
  "full-stack-development-training-course-in-greater-noida",
  "full-stack-development-training-course-in-gwalior",
  "full-stack-development-training-course-in-hisar",
  "full-stack-development-training-course-in-jabalpur",
  "full-stack-development-training-course-in-kanpur",
  "full-stack-development-training-course-in-kolkata",
  "full-stack-development-training-course-in-mathura",
  "full-stack-development-training-course-in-meerut",
  "full-stack-development-training-course-in-mohali",
  "full-stack-development-training-course-in-nagarcoil",
  "full-stack-development-training-course-in-nashik",
  "full-stack-development-training-course-in-navi-mumbai",
  "full-stack-development-training-course-in-ranchi",
  "full-stack-development-training-course-in-rohtak",
  "full-stack-development-training-course-in-roorkee",
  "full-stack-development-training-course-in-trichy",
  "full-stack-development-training-course-in-trivandrum",
  "full-stack-development-training-course-in-Vadodara",
  "data-analyst-training-course-in-bangalore",
  "data-analyst-training-course-in-delhi",
  "data-analytics-course-fees",
  "data-analytics-course-in-aligarh",
  "data-analytics-course-in-allahabad",
  "data-analytics-course-in-gorakhpur",
  "data-analytics-training-course-global",
  "data-analytics-training-course-in-ajmer",
  "data-analytics-training-course-in-alappuzha",
  "data-analytics-training-course-in-alwar",
  "data-analytics-training-course-in-amaravati",
  "data-analytics-training-course-in-amravati",
  "data-analytics-training-course-in-amritsar",
  "data-analytics-training-course-in-anantapur",
  "data-analytics-training-course-in-asansol",
  "data-analytics-training-course-in-aurangabad",
  "data-analytics-training-course-in-avadi",
  "data-analytics-training-course-in-bagaha",
  "data-analytics-training-course-in-bangalore",
  "data-analytics-training-course-in-barasat",
  "data-analytics-training-course-in-bardhaman",
  "data-analytics-training-course-in-bareilly",
  "data-analytics-training-course-in-bareily",
  "data-analytics-training-course-in-beed",
  "data-analytics-training-course-in-bettiah",
  "data-analytics-training-course-in-bhilai",
  "data-analytics-training-course-in-bhubaneswar",
  "data-analytics-training-course-in-bidhan-nagar",
  "data-analytics-training-course-in-buxar",
  "data-analytics-training-course-in-chennai",
  "data-analytics-training-course-in-coimbatore",
  "data-analytics-training-course-in-dehri",
  "data-analytics-training-course-in-dewas",
  "data-analytics-training-course-in-dhanbad",
  "data-analytics-training-course-in-dindigul",
  "data-analytics-training-course-in-dubai",
  "data-analytics-training-course-in-durg",
  "data-analytics-training-course-in-durgapur",
  "data-analytics-training-course-in-ernakulam",
  "data-analytics-training-course-in-erode",
  "data-analytics-training-course-in-faridabad",
  "data-analytics-training-course-in-gandhinagar",
  "data-analytics-training-course-in-gaya",
  "data-analytics-training-course-in-germany",
  "data-analytics-training-course-in-ghana",
  "data-analytics-training-course-in-gudivada",
  "data-analytics-training-course-in-guna",
  "data-analytics-training-course-in-guntur",
  "data-analytics-training-course-in-guwahati",
  "data-analytics-training-course-in-gwalior",
  "data-analytics-training-course-in-hajipur",
  "data-analytics-training-course-in-hisar",
  "data-analytics-training-course-in-hugli-chinsurah",
  "data-analytics-training-course-in-jabalpur",
  "data-analytics-training-course-in-jamalpur",
  "data-analytics-training-course-in-jaunpur",
  "data-analytics-training-course-in-kadapa",
  "data-analytics-training-course-in-kakinada",
  "data-analytics-training-course-in-kanchipuram",
  "data-analytics-training-course-in-kanpur",
  "data-analytics-training-course-in-kanyakumari",
  "data-analytics-training-course-in-karaikudi",
  "data-analytics-training-course-in-karawal-nagar",
  "data-analytics-training-course-in-karimnagar",
  "data-analytics-training-course-in-katihar",
  "data-analytics-training-course-in-kavali",
  "data-analytics-training-course-in-kishanganj",
  "data-analytics-training-course-in-kochi",
  "data-analytics-training-course-in-kolkata",
  "data-analytics-training-course-in-kollam",
  "data-analytics-training-course-in-kota",
  "data-analytics-training-course-in-kottayam",
  "data-analytics-training-course-in-kurnool",
  "data-analytics-training-course-in-latur",
  "data-analytics-training-course-in-ludhiana",
  "data-analytics-training-course-in-machilipatnam",
  "data-analytics-training-course-in-madanapalle",
  "data-analytics-training-course-in-mathura",
  "data-analytics-training-course-in-mau",
  "data-analytics-training-course-in-meerut",
  "data-analytics-training-course-in-miryalaguda",
  "data-analytics-training-course-in-moradabad",
  "data-analytics-training-course-in-motihari",
  "data-analytics-training-course-in-nagapattinam",
  "data-analytics-training-course-in-nangloi-jat",
  "data-analytics-training-course-in-narasaraopet",
  "data-analytics-training-course-in-nashik",
  "data-analytics-training-course-in-navi-mumbai",
  "data-analytics-training-course-in-panipat",
  "data-analytics-training-course-in-patiala",
  "data-analytics-training-course-in-prakasam",
  "data-analytics-training-course-in-prayagraj",
  "data-analytics-training-course-in-proddatur",
  "data-analytics-training-course-in-rae-bareli",
  "data-analytics-training-course-in-raiganj",
  "data-analytics-training-course-in-ranchi",
  "data-analytics-training-course-in-rohtak",
  "data-analytics-training-course-in-roorkee",
  "data-analytics-training-course-in-saharsa",
  "data-analytics-training-course-in-sangli-miraj-kupwad",
  "data-analytics-training-course-in-sangli",
  "data-analytics-training-course-in-sasaram",
  "data-analytics-training-course-in-satara",
  "data-analytics-training-course-in-serampore",
  "data-analytics-training-course-in-shivpuri",
  "data-analytics-training-course-in-singapore",
  "data-analytics-training-course-in-sirsa",
  "data-analytics-training-course-in-sivaganga",
  "data-analytics-training-course-in-sonipat",
  "data-analytics-training-course-in-south-dumdum",
  "data-analytics-training-course-in-srikakulam",
  "data-analytics-training-course-in-surat",
  "data-analytics-training-course-in-suryapet",
  "data-analytics-training-course-in-tadepalligudem",
  "data-analytics-training-course-in-thiruvananthapuram",
  "data-analytics-training-course-in-tiruchirappalli",
  "data-analytics-training-course-in-tirunelveli",
  "data-analytics-training-course-in-tumkur",
  "data-analytics-training-course-in-udaipur",
  "data-analytics-training-course-in-ujjain",
  "data-analytics-training-course-in-unnao",
  "data-analytics-training-course-in-vadodara",
  "data-analytics-training-course-in-varanasi",
  "data-analytics-training-course-in-villupuram",
  "data-analytics-training-course-in-virudhunagar",
  "data-analytics-training-course-in-warangal",
  "data-analytics-training-course-in-wardha",
  "data-analytics-training-course-in-yamuna-nagar",
  "software-testing-course-in-bhubaneswar",
  "software-testing-course-in-coimbatore",
  "software-testing-training-course-global",
  "software-testing-training-course-in-aligarh",
  "software-testing-training-course-in-allahabad",
  "software-testing-training-course-in-bareilly",
  "software-testing-training-course-in-bareily",
  "software-testing-training-course-in-chennai",
  "software-testing-training-course-in-gorakhpur",
  "software-testing-training-course-in-greater-noida",
  "software-testing-training-course-in-gwalior",
  "software-testing-training-course-in-hisar",
  "software-testing-training-course-in-jabalpur",
  "software-testing-training-course-in-jaipur",
  "software-testing-training-course-in-kanpur",
  "software-testing-training-course-in-mathura",
  "software-testing-training-course-in-meerut",
  "software-testing-training-course-in-nashik",
  "software-testing-training-course-in-navi-mumbai",
  "software-testing-training-course-in-ranchi",
  "software-testing-training-course-in-rohtak",
  "software-testing-training-course-in-roorkee",
  "software-testing-training-course-in-surat",
  "software-testing-training-course-in-thane",
  "software-testing-training-course-in-vadodara",
];

// Jis folder me ye script rakhi hai, usi folder me kaam karegi
const folder = __dirname;

// Folder ki files ka lowercase map (Vadodara jaise capital letter issues ke liye)
const filesMap = {};
for (const f of fs.readdirSync(folder)) {
  filesMap[f.toLowerCase()] = f;
}

let deleted = 0;
let notFound = 0;

console.log("Folder :", folder);
console.log("Total  :", slugs.length, "pages\n");

for (const slug of slugs) {
  const target = slug.trim() + ".html";
  const actual = filesMap[target.toLowerCase()];

  if (actual) {
    try {
      fs.unlinkSync(path.join(folder, actual));
      console.log("[DELETED]   " + actual);
      deleted++;
    } catch (err) {
      console.log("[ERROR]     " + actual + " -> " + err.message);
    }
  } else {
    console.log("[NOT FOUND] " + target);
    notFound++;
  }
}

console.log("\n----- Summary -----");
console.log("Deleted   :", deleted);
console.log("Not found :", notFound);