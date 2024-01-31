const axios = require('axios');

async function downloadContent(urls) {
    try {
        const downloadPromises = urls.map(async (url) => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                if (error.code === 'ECONNRESET') {
                    console.error(`Connection intrupted while downloading from ${url}`);
                    return null; 
                } else {
                    throw error;
                }
            }
        });

        const downloadedContent = await Promise.all(downloadPromises);

        return downloadedContent.filter(content => content !== null);
    } catch (error) {
        console.error('Error during download:', error.message);
        throw error;
    }
}

// Example usage with an array of URLs
const urlArray = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];

downloadContent(urlArray)
    .then((downloads) => {
        console.log('Downloaded content:', downloads);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
