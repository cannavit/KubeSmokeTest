const jest = require('jest');
const chalk = require('chalk');

module.exports.runJestTest = async function (options) {
  //! Run Jest Test. >>>
  const optionsJest = {
    projects: [__dirname],
    roots: options.listOfJestPath,
    silent: false,
  };

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);

  if (testResult.results.numFailedTestSuites > 0) {
    console.log(chalk.red.bold(` 🛑 SMOKE TEST ERROR 👎`));
    console.log(' FORCE BREAK OF THE PIPELINE >>');
    console.log(BREAK);
    throw new Error(chalk.red.bold(` 🛑 SMOKE TEST ERROR 👎`));
  }

  // break
};
