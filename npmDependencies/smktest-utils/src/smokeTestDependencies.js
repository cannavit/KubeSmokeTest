const shell = require('shelljs');
// const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

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
  let options = await fs.promises.readFile('../smktest.config.json', 'utf-8');

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

  let passTest = true;

  let response = await shell.exec(testCommand, { silent: true });

  if (response.stderr.code !== 0 && response.stdout === ""){
    passTest = false
  }


  // Eval command for print report
  let responseReport = await shell.exec(reportCommand, {
    silent: true,
  }).stdout;

  // SAVE RESULT IN ENVIRONMENT VARIABLE
  process.env[environmentVariableResultTest] = response;

  if (passTest == false) {
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

  
  if (responseReport == true) {
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

module.exports.simpleCurlAssert = simpleCurlAssert;



async function getStatusCode(curl){

  let response

  try {
    response = await axios.get(curl)    

  } catch (error) {

    try {
      response = error.response
    } catch (error) {
      response = {
        status: "600"
      }
      console.log(error.message)
    }
  } 
  

  return response.status;
}

module.exports.getStatusCode = getStatusCode;

