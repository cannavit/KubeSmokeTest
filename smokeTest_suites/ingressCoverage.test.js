const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./smokeTestDependencies');

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test --ingress-coverage test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand =
    "curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep 'ERROR'"; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    environmentVariableResultTest
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(options, dateInit);

  expect(passTest).toBe(true);
});
