const fs = require('fs');
const path = require('path');

// Define the function to read domain names and return them as an array
function getDomainNames() {
    const filePath = path.join(__dirname, 'domains.txt');

    try {
        // Read the file synchronously
        const data = fs.readFileSync(filePath, 'utf8');

        // Split the file content by new lines to get an array of domain names
        const domainArray = data.split('\n').map(domain => domain.trim()).filter(domain => domain.trim() !== '');
        console.log(domainArray);
        return domainArray;
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

exports.getDomainNames = getDomainNames;
