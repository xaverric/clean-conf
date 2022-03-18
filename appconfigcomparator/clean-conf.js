const fs = require("fs");
const path = require("path");
const sortedJSON = require('sorted-json');

const KEYS_FOR_REMOVAL = ["sys", "id", "awid", "revisionNumber", "version"];

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
    data = Array.isArray(data) ? data.sort(sortFunction) : sortAttributesInside(data);
    // sort nested arrays - depth 1
    Object.keys(data).forEach(key => {
        data[key] = Array.isArray(data[key]) ? data[key].sort(sortFunction) : sortAttributesInside(data[key]);
    })

    fs.writeFileSync(`${filePath}`, JSON.stringify(data, null, 4));
}

const sortFunction = (a, b) => {
    let result = 0;
    result = a.code || b.code ? (a.code > b.code) ? 1 : -1 : 0;
    result = a.eic || b.eic ? (a.eic > b.eic) ? 1 : -1 : result;
    result = a.coId || b.coId ? (a.coId > b.coId) ? 1 : -1 : result; // sort contingencies
    return result;
}

/**
 * try to sort object if it is object
 * @param object
 * @returns {{[p: string]: unknown}|*}
 */
const sortAttributesInside = object => {
    if (typeof object === 'object' && !Array.isArray(object) && object !== null){
        return Object.fromEntries(Object.entries(object).sort());
    }
    return object;
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