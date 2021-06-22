const jest = require('jest');
const chalk = require('chalk');
var fs = require('fs');

const shell = require('shelljs');

module.exports.runJestTest = async function (options) {
  //! Run Jest Test. >>>
  const optionsJest = {
    projects: [__dirname],
    roots: options.listOfJestPath,
    silent: false,
  };

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);

  if (testResult.results.numFailedTestSuites > 0) {
    console.log();
    console.log('-------------------------------------------------------');
    console.log(chalk.red.bold(` 🛑  SMOKE TEST ERROR 👎`));
    console.log(' FORCE BREAK OF THE PIPELINE >>');
    console.log();
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥💨 💨 💨 🔥');
    console.log(' 🛑  ERROR: Smoke Test');
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥💨 💨 💨 🔥');
    console.log();
    console.log('-------------------------------------------------------');
    console.log();

    let pipelineCode = 1; // Break
    if (process.env.SMKTEST_BREAK_HOW_WARNING) {
      pipelineCode = 2;
    }

    process.exit(pipelineCode); // failed pipeline gitlab
  } else {
    console.log();
    console.log('-------------------------------------------------------');
    console.log();
    console.log(' 🟩 Job succeeded');
    console.log(' 🟢 🚭 SUCCESS SMOKE TEST');
    console.log(' ✅ You can continue with the rest of the test suites');
    console.log();
    console.log('-------------------------------------------------------');
    console.log();

    process.exit(0); //pass pipeline gitlab
  }

  // break
};
