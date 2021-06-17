const jest = require('jest');
const chalk = require('chalk');
const assert = require('assert');
var fs = require('fs');

module.exports.runJestTest = async function (options) {
  //! Run Jest Test. >>>
  const optionsJest = {
    projects: [__dirname],
    roots: options.listOfJestPath,
    silent: false,
  };

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);

  if (testResult.results.numFailedTestSuites > 0) {
    console.log(chalk.red.bold(` 🛑  SMOKE TEST ERROR 👎`));
    console.log(' FORCE BREAK OF THE PIPELINE >>');

    process.env.SMKTEST_PASS_TEST = false;
    await fs.writeFileSync('passText.txt', 'false');
    // assert.deepEqual(false, true);
    throw new Error(chalk.red.bold(` 🛑  SMOKE TEST ERROR 👎`));
  } else {
    await fs.writeFileSync('passText.txt', 'true');
  }

  // break
};
