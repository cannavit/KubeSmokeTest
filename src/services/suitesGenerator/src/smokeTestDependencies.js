const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');

async function checkIngress(
  testCommand,
  assertValue,
  reportCommand,
  environmentVariableResultTest,
  criterial,
  consoleValue
) {
  let passTest = false;
  let response = await shell.exec(testCommand, { silent: true }).stdout;

  // Check assert variables.
  if (response === assertValue) {
    passTest = true;
  }

  // Eval command for print report
  let responseReport = await shell.exec(reportCommand, { silent: true }).stdout;

  // SAVE RESULT IN ENVIRONMENT VARIABLE
  process.env[environmentVariableResultTest] = response;

  if (!passTest) {
    console.log(
      chalk.red.bold(`👎 SMOKE TEST ERROR $criterial / $consoleValue `)
    );
    console.log(
      chalk.red.bold(
        ' 🛑 Communicate that your kubernetes cluster administrator'
      )
    );
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log(chalk.red.bold(responseReport));
  } else {
    console.log(
      chalk.green.bold(
        ` 👍 SUCCESS SMOKE TEST, 🚀  $criterial / $consoleValue `
      )
    );
    console.log(chalk.green.bold(responseReport));
  }

  return passTest;
}

// export module
module.exports.checkIngress = checkIngress;

// Send data to Smoke Test collector.

async function collectSmokeTestResults(options, dateInit) {
  // Collect metrics
  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;
  let options = JSON.parse('SMKTEST_OPTIONS');

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: consoleValue,
      criterial: criterial,
      testResult: JSON.stringify(responseTest),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  //TODO Connect Function for collect the metrics.
}

module.exports.collectSmokeTestResults = collectSmokeTestResults;

// Smoke test check ingress

async function checkIngress(
  testCommand,
  assertValue,
  reportCommand,
  environmentVariableResultTest,
  criterial,
  consoleValue
) {
  let passTest = false;
  let response = await shell.exec(testCommand, { silent: true }).stdout;

  // Check assert variables.
  if (response === assertValue) {
    passTest = true;
  }

  // Eval command for print report
  let responseReport = await shell.exec(reportCommand, {
    silent: true,
  }).stdout;

  // SAVE RESULT IN ENVIRONMENT VARIABLE
  process.env[environmentVariableResultTest] = response;

  if (!passTest) {
    console.log(
      chalk.red.bold(`👎 SMOKE TEST ERROR $criterial / $consoleValue `)
    );
    console.log(
      chalk.red.bold(
        ' 🛑 Communicate that your kubernetes cluster administrator'
      )
    );
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log(chalk.red.bold(responseReport));
  } else {
    console.log(
      chalk.green.bold(
        ` 👍 SUCCESS SMOKE TEST, 🚀  $criterial / $consoleValue `
      )
    );
    console.log(chalk.green.bold(responseReport));
  }

  return passTest;
}

module.exports.checkIngress = checkIngress;
