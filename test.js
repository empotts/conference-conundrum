const fs = require('fs');
const path = require('path');

function csvToArray(csvFile) {
    const csvData = fs.readFileSync(csvFile, 'utf-8');
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    const dataArray = [];
    for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        // Skip this row if the 3rd column is not 'P5' or 'G5'
        if (rowData[2] !== 'P5' && rowData[2] !== 'G5') {
            continue;
        }
        const obj = {};
        obj['school'] = rowData[0] ? rowData[0].trim() : '';
        const school = obj['school'];
        const logoPath = 'logos/' + school.replace(/\s+/g, ' ') + '.png';
        obj['logoPath'] = logoPath;
        obj['conference'] = '';
        dataArray.push(obj);
    }

    return dataArray;
}

// Example usage:
const csvFile = 'logo_ref.csv'; // Replace with your CSV file path
const arrayOfObjects = csvToArray(csvFile);
console.log(arrayOfObjects);
