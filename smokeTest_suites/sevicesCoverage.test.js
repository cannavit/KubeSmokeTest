const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./smokeTestDependencies');

test('Smoke Test criterial --sevices-coverage test name: --check-nodes', async () => {
  // Declarative
  let criterial = '--sevices-coverage';
  let consoleValue = '--check-nodes';
  let reportCommand = 'kubectl get nodes';
  let testCommand = "kubectl get nodes | grep -v 'NAME' | grep -v 'Ready'";
  let assertValue = '';
  let environmentVariableResultTest = 'SMKTEST_RESULT_SMKTEST_CHECK_NODES';

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

test('Smoke Test criterial --sevices-coverage test name: --check-pods-running', async () => {
  // Declarative
  let criterial = '--sevices-coverage';
  let consoleValue = '--check-pods-running';
  let reportCommand = 'kubectl get nodes -n $namespace';
  let testCommand =
    "kubectl get pods -n edutelling-develop | grep -v 'NAME' | grep -v 'Running'";
  let assertValue = '';
  let environmentVariableResultTest =
    'SMKTEST_RESULT_SMKTEST_CHECK_PODS_RUNNING';

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
