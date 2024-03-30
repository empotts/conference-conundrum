const fs = require('fs');

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
        // Assuming 'school' field is present in the CSV
        
        
        
        const school = rowData[0] ? rowData[0].trim() : '';
        obj['school'] = school;
        const logoPath = 'logos/' + school.replace(/\s+/g, ' ') + '.png';
        obj['logoPath'] = logoPath;
        obj['conference'] = '';
        obj['id'] = school.toLowerCase().replace(/\s+/g, '-');
        dataArray.push(obj);
    }

    return dataArray;
}

let fbsTeams = csvToArray('src/logo_ref.csv');
console.log(fbsTeams);
const jsonContent = JSON.stringify(fbsTeams);
fs.writeFileSync('fbsTeams1.json', jsonContent);