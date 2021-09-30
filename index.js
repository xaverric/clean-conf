const fs = require("fs");
const path = require("path");
const { cleanConf } = require("./clean-conf.js");
const { logDiff } = require("./diff-conf.js");

const args = process.argv.slice(2);
const lhsDir = args[0];
const rhsDir = args[1];
const reportDir = args[2];

const compareConfig = (lhsDir, rhsDir, reportDir) => {
	let comparedFiles = [];
    fs.readdirSync(lhsDir).forEach(fileName => {
        let lhs = readFile(`${lhsDir}${path.sep}${fileName}`);
        let rhs = readFile(`${rhsDir}${path.sep}${fileName}`);
        logDiff(lhs, rhs, reportDir,fileName);

        comparedFiles.push(fileName);
    });

    fs.readdirSync(rhsDir).forEach(fileName => {
    	if( !comparedFiles.includes(fileName) ) {
    		let lhs = readFile(`${lhsDir}${path.sep}${fileName}`);
        	let rhs = readFile(`${rhsDir}${path.sep}${fileName}`);
        	logDiff(lhs, rhs, reportDir,fileName);
    	}
    });
};

const readFile = (filePath) => {
	let data;
	try {
		data = JSON.parse(fs.readFileSync(filePath));
	} catch (err) {
		data = null;
	}	
	return flattenObj(data);
}

 const flattenObj = (obj, parent, res = {}) => {
    for(let key in obj){
        let propName = parent ? parent + '.' + key : key;
        if(typeof obj[key] == 'object'){
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

const main = () => {
	cleanConf(lhsDir);
	cleanConf(rhsDir);

	compareConfig(lhsDir, rhsDir, reportDir);
}

main();
