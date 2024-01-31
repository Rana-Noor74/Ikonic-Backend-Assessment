const fs = require('fs');
const path = require('path');

const getFiles= (dirPath, extension) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const filteredFiles = files.filter(file => path.extname(file) === `.${extension}`);
        
        if (filteredFiles.length === 0) {
            console.log(`No files with extension '${extension}' found in the directory.`);
        } else {
            console.log(`Files with extension '${extension}' in the directory:`);
            filteredFiles.forEach(file => {
                console.log(file);
            });
        }
    });
}

module.exports = getFiles;