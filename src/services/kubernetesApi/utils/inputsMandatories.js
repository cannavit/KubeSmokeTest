const chalk = require('chalk');

async function inputMandatory(options, variableRequired) {
  var keys = Object.keys(options);
  let pass = false;

  for (const key of keys) {
    if (key === variableRequired) {
      pass = true;
    }
  }

  if (
    !pass |
    (options[variableRequired] === 'false') |
    (options[variableRequired] === false)
  ) {
    console.log(chalk.red.bold('ERROR: INPUT MANDATORY'));
    throw new Error(
      chalk.yellow.bold(` 🛑  The Input: "${variableRequired}" is required`)
    );
  }

  return options;
}

module.exports.inputMandatory = inputMandatory;
