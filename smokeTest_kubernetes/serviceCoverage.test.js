const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./src/smokeTestDependencies');




test('Smoke Test criterial --service-coverage test name: --check-pods-running', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-running';
  let reportCommand = 'kubectl get nodes --namespace=edutelling-develop';
  let testCommand = 'kubectl get nodes --namespace=edutelling-develop';
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//





test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-api --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-api --namespace=edutelling-develop | grep -i "error"';
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//





test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-app --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-app --namespace=edutelling-develop | grep -i "error"';
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//





test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-memcached --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-memcached --namespace=edutelling-develop | grep -i "error"';
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//





test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-orientdb --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-orientdb --namespace=edutelling-develop | grep -i "error"';
  let assertValue = '';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  // Send results for collect the data.
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//


