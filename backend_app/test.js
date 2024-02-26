const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function logRequest(destination) {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/2');
        const processedRequest = {
            id: response.data.id,
            title: response.data.title,
            body: response.data.body,
            timestamp: new Date().toISOString(),
        };
        let logData = [];
        try {
            const filePath = path.resolve(destination);
            logData = JSON.parse(fs.readFileSync(filePath));
        } catch (error) {
        }
        logData.push(processedRequest);
        fs.writeFileSync(destination, JSON.stringify(logData, null, 2));
        console.log('Request logged successfully.');
    } catch (error) {
        console.error('Error logging request:', error.message);
    }
}
logRequest('request_log.json');
