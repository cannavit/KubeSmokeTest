const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./src/smokeTestDependencies');




test('Smoke Test criterial --cluster-coverage test name: --check-cluster-info', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster-info';
  let reportCommand = 'kubectl cluster-info';
  let testCommand = 'kubectl cluster-info';
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





test('Smoke Test criterial --cluster-coverage test name: --check-nodes', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-nodes';
  let reportCommand = 'kubectl get nodes';
  let testCommand = 'kubectl get nodes';
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





test('Smoke Test criterial --cluster-coverage test name: --check-cluster', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster';
  let reportCommand = 'kubectl describe nodes | grep -A 6 "Conditions"';
  let testCommand = 'kubectl describe nodes | grep -A 6 "Conditions"';
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





test('Smoke Test criterial --cluster-coverage test name: --check-disc', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-disc';
  let reportCommand = 'kubectl describe nodes | grep "DiskPressure"';
  let testCommand = 'kubectl describe nodes | grep "DiskPressure"';
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





test('Smoke Test criterial --cluster-coverage test name: --check-memory', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-memory';
  let reportCommand = 'kubectl describe nodes | grep "MemoryPressure"';
  let testCommand = 'kubectl describe nodes | grep "MemoryPressure"';
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


