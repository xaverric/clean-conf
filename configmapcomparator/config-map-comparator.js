const fs = require('fs');
const path = require('path');
var jsonDiff = require('json-diff')
const {getFiles, getBaseName} = require("./tools/file-path");

/**
 * compares config map in JSON format
 *
 * @param lhs
 * @param rhs
 * @param destinationDir
 * @param fileName
 */
const compare = (lhs, rhs, dst) => {
  getFiles(lhs).forEach(lhsFilePath => {
    let lhsFileName = getBaseName(lhsFilePath);
    let rhsFilePath = `${rhs}${path.sep}${lhsFileName}.json`;

    let lhsFile = readFile(lhsFilePath);
    let rhsFile = readFile(rhsFilePath);

    if (lhsFile && rhsFile) {
      let diff = jsonDiff.diffString(lhsFile, rhsFile);
      console.log(jsonDiff.diffString(lhsFile, rhsFile));
      fs.writeFileSync(`${dst}${path.sep}${lhsFileName}.txt`, diff);
    }
  });
};

const readFile = path => {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch (e) {
    console.error(`File does not exist: ${path}`);
  }
}



module.exports = {compare}