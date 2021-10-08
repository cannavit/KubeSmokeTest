const shell = require('shelljs');
// const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
require('dotenv').config();
const fs = require('fs');

// Send data to Smoke Test collector.

async function collectSmokeTestResults(
  dateInit,
  criterial = 'not-defined',
  testName = 'undefined',
  responseTest = '',
  passTest = ''
) {
  // Collect metrics
  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  // Print current folder content
  let options = await fs.promises.readFile(
    './smokeTest_suites/src/SMKTEST_OPTIONS.json',
    'utf-8'
  );

  options = JSON.parse(options);

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.customDictionary.generalOptions['--namespace'],
      testName: testName,
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
      chalk.red.bold(`👎 SMOKE TEST ERROR ${criterial}/ ${consoleValue}`)
    );
    console.log(
      chalk.red.bold(
        ' 🛑 Communicate that your kubernetes cluster administrator'
      )
    );
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log('@1Marker-No:_1403960922');
    console.log(chalk.red.bold(responseReport));
  } else {
    console.log(
      chalk.green.bold(
        ` 👍 SUCCESS SMOKE TEST, 🚀  ${criterial}/ ${consoleValue}`
      )
    );
    console.log(chalk.green.bold(responseReport));
  }

  return passTest;
}

module.exports.checkIngress = checkIngress;

async function simpleCurlAssert(
  curls,
  assertValue,
  criterial,
  consoleValue,
  reportCommand
) {
  let passTest;

  let responseReport = await shell.exec(curls, {
    silent: true,
  });

  responseReport = responseReport.stdout.includes(assertValue);

  if (responseReport) {
    passTest = true;
    console.log(
      chalk.green.bold(
        ` 👍 SUCCESS SMOKE TEST, 🚀  ${criterial} / ${consoleValue} `
      )
    );
    console.log(chalk.green.bold(responseReport));
  } else {
    passTest = false;
    console.log(
      chalk.red.bold(`👎 SMOKE TEST ERROR ${criterial} / ${consoleValue} `)
    );
    console.log(chalk.red.bold(' 🛑 The endpoint is not available'));
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log(chalk.red.bold(responseReport));
  }

  return passTest;
}

module.exports.simpleCurlAssert = simpleCurlAssert;

async function preCommandTest(command) {
  await shell.exec(command, { silent: false }).stdout;
}

// module.exports.simpleCurlAssert = simpleCurlAssert;

simpleCurlAssert('curl -v www.google.com', '200');
