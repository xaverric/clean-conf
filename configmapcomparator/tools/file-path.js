const fs = require('fs');
const path = require('path');

/**
 * Return array of file paths within provided directory path
 *
 * @param dirPath
 * @returns {string}
 */
const getFiles = (dirPath) => {
  return fs.readdirSync(dirPath).map(fileName => `${dirPath}${path.sep}${fileName}`).filter(item => !item.includes(".DS_Store"))
};

/**
 * Use each item in files as an argument for the function
 *
 * @param files
 * @param func
 */
const updateFiles = (files, func) => {
  files.forEach(func);
}

/**
 * Return filename according provided filePath
 *
 * @param filePath
 * @returns {*}
 */
const getFileName = (filePath) => {
  return path.parse(filePath).name;
}

/**
 * Return filename with extension according provided filePath
 * @param filePath
 * @returns {*}
 */
const getBaseName = (filePath) => {
  return path.parse(filePath).name;
}

/**
 * Return directory path based on provided filePath
 *
 * @param filePath
 * @returns {*}
 */
const getDirectoryPath = filePath => {
  return path.dirname(filePath);
}

module.exports = {getFiles, updateFiles, getFileName, getBaseName, getDirectoryPath}