const fs = require('fs');
const path = require('path');
const {readConfigMap} = require("./config-map-reader");
const {getFileName, getDirectoryPath} = require("./tools/file-path");

const FILE_NAME_PATTERN = /(\w+\-\w+\-\w+-async|\w+\-\w+\-\w+g02|\w+\-\w+\-\w+g01|\w+\-\w+\-main)(.*)(\-application\-config)/;

/**
 * Transforms YAML file to JSON format and updates the name according to the pattern {@link FILE_NAME_PATTERN}
 *
 * @param path
 */
const transform = (filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(readConfigMap(filePath), null, 4));
  fs.renameSync(filePath, getNewFilenamePath(filePath));
}

/**
 * translate file name according to ${@link FILE_NAME_PATTERN}
 *
 * @param filePath
 * @returns {string}
 */
const getNewFilenamePath = filePath => {
  let originalName = getFileName(filePath);
  let newName = originalName.replace(FILE_NAME_PATTERN, "$1$3");

  return `${getDirectoryPath(filePath)}${path.sep}${newName}.json`
}

module.exports = {transform}