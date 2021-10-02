const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./smokeTestDependencies');

test('Smoke Test criterial --pods-logs-test test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--pods-logs-test';
  let consoleValue = '--check-pods-logs';
  let reportCommand = '$$reportCommand';
  let testCommand =
    "kubectl logs --since=1h service/edutelling-api -n edutelling-develop | grep -i 'error'";
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest,
    criterial,
    consoleValue
  );
  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//

test('Smoke Test criterial --pods-logs-test test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--pods-logs-test';
  let consoleValue = '--check-pods-logs';
  let reportCommand = '$$reportCommand';
  let testCommand =
    "kubectl logs --since=1h service/edutelling-api -n edutelling-develop | grep -i 'error'";
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest,
    criterial,
    consoleValue
  );
  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//

test('Smoke Test criterial --pods-logs-test test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--pods-logs-test';
  let consoleValue = '--check-pods-logs';
  let reportCommand = '$$reportCommand';
  let testCommand =
    "kubectl logs --since=1h service/edutelling-api -n edutelling-develop | grep -i 'error'";
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest,
    criterial,
    consoleValue
  );
  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//

test('Smoke Test criterial --pods-logs-test test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--pods-logs-test';
  let consoleValue = '--check-pods-logs';
  let reportCommand = '$$reportCommand';
  let testCommand =
    "kubectl logs --since=1h service/edutelling-api -n edutelling-develop | grep -i 'error'";
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest,
    criterial,
    consoleValue
  );
  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//
