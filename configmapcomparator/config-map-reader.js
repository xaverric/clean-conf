const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Reads config map from provided yaml file (config must be stored under data.SERVER_CFG key
 *
 * @param path
 * @returns {any}
 */
const readConfigMap = (path) => {
  try {
    const doc = yaml.load(fs.readFileSync(path));
    return JSON.parse(doc.data.stringifiedConfigurationMap);
  } catch (e) {
    console.log(e);
  }
}


module.exports = {readConfigMap};