const fs = require('fs');

const filePath = './test.csv';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    processData(data);
});

function processData(csvContent) {
    // Parse CSV content here
    const rows = csvContent.split('\n');

    for (const row of rows) {
        const columns = row.split(',');

        // Check if there is a column at index 0 (change index based on your CSV structure)
        if (columns.length > 0) {
            const nameColumn = columns[3];
            console.log(nameColumn);
            // Do something with the nameColumn
        }
    }
}
