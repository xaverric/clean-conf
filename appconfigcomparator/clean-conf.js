const fs = require("fs");
const path = require("path");
const sortedJSON = require('sorted-json');

const KEYS_FOR_REMOVAL = ["sys", "id", "awid"];

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

    // sort object fields
    data = sortedJSON.sortify(data, {sortBy: sortFunction});
    // sort array
    data = Array.isArray(data) ? data.sort(sortFunction) : data;
    // sort nested arrays - depth 1
    Object.keys(data).forEach(key => {
        data[key] = Array.isArray(data[key]) ? data[key].sort(sortFunction) : data[key];
    })

    fs.writeFileSync(`${filePath}`, JSON.stringify(data, null, 4));
}

const sortFunction = (a, b) => {
    let result = 0;
    result = a.code || b.code ? (a.code > b.code) ? 1 : -1 : 0;
    result = a.eic || b.eic ? (a.eic > b.eic) ? 1 : -1 : result;
    return result;
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