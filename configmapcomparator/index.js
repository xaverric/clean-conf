const fs = require("fs");
const path = require("path");
const {args} = require("./cmd-arguments");
const {transform} = require("./config-map-transform");
const {compare} = require("./config-map-comparator");
const {updateFiles, getFiles} = require("./tools/file-path");

const main = () => {
  let cmdArguments = args();
  updateFiles(getFiles(cmdArguments.lhsDir), transform);
  updateFiles(getFiles(cmdArguments.rhsDir), transform);
  compare(cmdArguments.lhsDir, cmdArguments.rhsDir, cmdArguments.reportDir)
}

main();