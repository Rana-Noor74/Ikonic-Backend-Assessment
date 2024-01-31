const axios = require('axios');
const { getStatusText } = require('http-status');
const http = require("http")

class ApiHandler {
    static async fetchData(apiEndpoint) {
        try {
            const response = await axios.get(apiEndpoint);
            console.log('Data successfully fetched:', response.data);

        } catch (error) {
            if (error.response) {
                const statusCode = error.response.status;
                const statusText = http.STATUS_CODES[statusCode] || 'Unknown Status';

                console.error(`Server responded with an error status: ${statusCode}`);
                console.error(`Error details: ${error.response.data}`);
                console.error(`Status text: ${statusText}`);

            } else if (error.request) {
                console.error('No response received from the server.');
            } else {
                console.error(`Error during request setup: ${error.message}`);
            }
        }
    }
}

//Add anything at the end of url to test the negative case
const url = 'https://jsonplaceholder.typicode.com/posts/1';
ApiHandler.fetchData(url);


