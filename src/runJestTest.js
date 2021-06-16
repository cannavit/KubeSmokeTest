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
    process.exit(0);
    throw new Error(chalk.red.bold(` 🛑 SMOKE TEST ERROR 👎`));
  }

  // break
};
