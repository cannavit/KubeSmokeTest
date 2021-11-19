const jest = require('jest');
const chalk = require('chalk');
var fs = require('fs');
const shell = require('shelljs');

async function runJestTest() {
  //! Run Jest Test. >>>
  const optionsJest = {
    projects: './smokeTest_kubernetes',
    roots: '',
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

    process.exit(1); // failed pipeline gitlab
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


export default runJestTest;