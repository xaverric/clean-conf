const fs = require("fs");
const path = require("path");
const sortedJSON = require('sorted-json');

const KEYS_FOR_REMOVAL = ["sys", "id"];

const cleanConf = (dirPath) => {
	updateFiles(getFiles(dirPath));
};

const updateFiles = (filePaths) => {
    filePaths.forEach(filePath => {
        updateFile(filePath);
    });
};

const updateFile = (filePath) => {
    let data = JSON.parse(fs.readFileSync(filePath));
    removeAttr(data);

    data = sortedJSON.sortify(data, {sortBy: (a, b) => {
    	return (a.code > b.code) ? 1 : -1;
    }});

    fs.writeFileSync(`${filePath}`, JSON.stringify(data, null, 4));
}

const removeAttr = (data) => {
    Object.keys(data).some(key => {
        KEYS_FOR_REMOVAL.includes(key) && delete data[key];
        data[key] && typeof data[key] === "object" && removeAttr(data[key]);
    });
}

const getFiles = (dirPath) => {
    let filePaths = [];
    fs.readdirSync(dirPath).forEach(fileName => {
        filePaths.push(`${dirPath}${path.sep}${fileName}`)
    });
    return filePaths;
};


module.exports = {
	cleanConf
}