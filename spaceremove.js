const fs = require('fs');
const path = require('path');

// Directory where your HTML files are stored
const directoryPath = 'course';

// List of specific words to replace
const wordsToReplace = [
    { incorrect: 'Trainingin', correct: 'Training in' },
    { incorrect: 'Intelligencebootcamp', correct: 'Intelligence bootcamp' },
    { incorrect: 'experttrainers', correct: 'expert trainers' },
    { incorrect: 'thecompanies', correct: 'the companies' },
    { incorrect: 'ArtificialIntelligence', correct: 'Artificial Intelligence' },
    { incorrect: 'anddiscernment', correct: 'and discernment' },
    { incorrect: 'forUncodemy', correct: 'for Uncodemy' },
    { incorrect: 'Uncodemytied', correct: 'Uncodemy tied' },
    { incorrect: 'wellknown', correct: 'well known' },
    { incorrect: 'comesfrom', correct: 'comes from' },
    { incorrect: 'alsowill', correct: 'also will' },
    { incorrect: 'themoment', correct: 'the moment' },
    { incorrect: 'kindof', correct: 'kind of' },
    { incorrect: 'todo', correct: 'to do' },
    { incorrect: 'thequality', correct: 'the quality' },
    { incorrect: 'mostappropriate', correct: 'most appropriate' },
    { incorrect: 'naiveand', correct: 'naive and' },
    { incorrect: 'Uncodemyis', correct: 'Uncodemy is' },
    { incorrect: 'skilledprofessional', correct: 'skilled professional' },
    { incorrect: 'Don’tsit', correct: 'Don’t sit' },
    { incorrect: 'rapidlyearning', correct: 'rapidly earning' },
    { incorrect: 'theindustry', correct: 'the industry' },
    { incorrect: 'justa', correct: 'just a' },
    { incorrect: '100%placement', correct: '100% placement' },
    { incorrect: 'AffordableBootcamps', correct: 'Affordable Bootcamps' },
    { incorrect: 'Globallyrecognised', correct: 'Globally recognised' },
    { incorrect: 'Multiplelive', correct: 'Multiple live' },
    { incorrect: 'Oneon', correct: 'One on' },
    { incorrect: 'Specialbatches', correct: 'Special batches' },
    { incorrect: 'Paidinternships', correct: 'Paid internships' },
    { incorrect: 'Certifiedcourses', correct: 'Certified courses' },
    { incorrect: 'WorkingMentors', correct: 'Working Mentors' },
    { incorrect: 'Optionto', correct: 'Option to' },
    { incorrect: 'Q/Aafter', correct: 'Q/A after' },
    { incorrect: 'Chatwith', correct: 'Chat with' },
    { incorrect: 'Onetime', correct: 'One time' },
    { incorrect: 'thatcontains', correct: 'that contains' },
    { incorrect: 'strengthen', correct: 'strengthen' },
    { incorrect: 'standarddeviation', correct: 'standard deviation' },
    { incorrect: 'exponentialdistributions', correct: 'exponential distributions' },
    { incorrect: 'Uncodemytied', correct: 'Uncodemy tied' },
    { incorrect: 'knowntitles', correct: 'known titles' },
    { incorrect: 'toace', correct: 'to ace' },
    { incorrect: 'belowmentioned', correct: 'below mentioned' },
    { incorrect: 'ofDelhi', correct: 'of Delhi' },
    { incorrect: 'Noida,based', correct: 'Noida-based' },
    { incorrect: 'gameto', correct: 'game to' },
    { incorrect: 'personalisedgrooming', correct: 'personalised grooming' },
    { incorrect: 'oronline', correct: 'or online' },
    { incorrect: 'wantto', correct: 'want to' },
    { incorrect: 'DataScience', correct: 'Data Science' },
    { incorrect: 'AutomationTesting', correct: 'Automation Testing' },
    { incorrect: 'Training,Artificial', correct: 'Training, Artificial' },
    { incorrect: 'Search EngineOptimisation', correct: 'Search Engine Optimisation' },
    { incorrect: 'andcompany', correct: 'and company' },
    { incorrect: 'Data,Deloitte', correct: 'Data, Deloitte' },
    { incorrect: 'Stanleyetc', correct: 'Stanley etc' },
    { incorrect: 'experttrainer', correct: 'expert trainer' },
    { incorrect: 'Uncodemyclosely', correct: 'Uncodemy closely' },
    { incorrect: 'courseTraining', correct: 'course Training' },
    { incorrect: 'tutorswho', correct: 'tutors who' },
    { incorrect: 'tobecome', correct: 'to become' },
    { incorrect: 'establishedglobal', correct: 'established global' },
    { incorrect: 'theefficient', correct: 'the efficient' },
    { incorrect: 'Traininginstitute', correct: 'Training institute' },
    { incorrect: 'talentedinstructors', correct: 'talented instructors' },
    { incorrect: 'Liveprojects', correct: 'Live projects' },
    { incorrect: 'alsotries', correct: 'also tries' },
    { incorrect: 'byconducting', correct: 'by conducting' },
    { incorrect: 'ofArtificial', correct: 'of Artificial' },
    { incorrect: 'Intelligencecourse', correct: 'Intelligence course' },
    { incorrect: 'responsibilityto', correct: 'responsibility to' },
    { incorrect: 'Intelligencewell', correct: 'Intelligence well' },
    { incorrect: 'learnevery', correct: 'learn every' },
    { incorrect: 'libraryresources', correct: 'library resources' },
    { incorrect: 'tothat', correct: 'to that' },
    { incorrect: ',Uncodemy', correct: ', Uncodemy' },
    { incorrect: 'thedoubts', correct: 'the doubts' },
    { incorrect: 'is,raise', correct: 'is, raise' },
    { incorrect: 'andfeasible', correct: 'and feasible' },
    { incorrect: 'ajob', correct: 'a job' },
    { incorrect: 'classesof', correct: 'classes of' },
    { incorrect: 'additionalfacilities', correct: 'additional facilities' },
    { incorrect: 'freshmind', correct: 'fresh mind' },
  ];
  
  
// Function to replace specific words
function replaceWords(content) {
    wordsToReplace.forEach((wordPair) => {
        const regex = new RegExp(wordPair.incorrect, 'g');
        content = content.replace(regex, wordPair.correct);
    });
    return content;
}

// Function to process a single file
function processFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            return;
        }

        // Only replace the specific words
        const updatedContent = replaceWords(data);

        // Write back the corrected content to the file
        fs.writeFile(filePath, updatedContent, 'utf-8', (err) => {
            if (err) {
                console.error(`Error writing to file: ${filePath}`, err);
            } else {
                console.log(`Processed file: ${filePath}`);
            }
        });
    });
}

// Function to loop through all HTML files in the directory
function processAllFiles(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);

            // Check if the file has a .html extension
            if (path.extname(filePath) === '.html') {
                processFile(filePath);
            }
        });
    });
}

// Run the function to process all files
processAllFiles(directoryPath);
