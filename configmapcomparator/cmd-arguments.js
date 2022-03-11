const cmdArgs = process.argv.slice(2);

const argsObject = {
  lhsDir: cmdArgs[0],
  rhsDir: cmdArgs[1],
  reportDir: cmdArgs[2]
}

const args = () => {
  if (!isFilled(argsObject)) {
    console.log("Mandatory arguments missing");
    //process.exit(1);
  }
  return argsObject;
}

const isFilled = parameters => {
  return Object.keys(parameters).every(key => !!parameters[key]);
}

module.exports = {args}