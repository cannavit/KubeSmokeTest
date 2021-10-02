const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./smokeTestDependencies');

test('Smoke Test criterial --cluster-coverage test name: --check-cluster-info', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster-info';
  let reportCommand = 'kubectl cluster-info';
  let testCommand =
    "kubectl cluster-info | grep 'Kubernetes' | grep -v 'running'";
  let assertValue = '';
  let environmentVariableResultTest =
    'SMKTEST_RESULT_SMKTEST_CHECK_CLUSTER_INFO';

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

test('Smoke Test criterial --cluster-coverage test name: --check-nodes', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
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

test('Smoke Test criterial --cluster-coverage test name: --check-cluster', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster';
  let reportCommand = "kubectl describe nodes | grep -A 6 'Conditions'";
  let testCommand = "kubectl describe nodes | grep 'Ready' | grep -v 'True'";
  let assertValue = '';
  let environmentVariableResultTest = 'SMKTEST_RESULT_SMKTEST_CHECK_CLUSTER';

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

test('Smoke Test criterial --cluster-coverage test name: --check-disc', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-disc';
  let reportCommand = "kubectl describe nodes | grep 'DiskPressure'";
  let testCommand =
    "kubectl describe nodes | grep 'DiskPressure' | grep -v 'False'";
  let assertValue = '';
  let environmentVariableResultTest = 'SMKTEST_RESULT_SMKTEST_CHECK_DISC';

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

test('Smoke Test criterial --cluster-coverage test name: --check-memory', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-memory';
  let reportCommand = "kubectl describe nodes | grep 'MemoryPressure'";
  let testCommand =
    "kubectl describe nodes | grep 'MemoryPressure' | grep -v 'False'";
  let assertValue = '';
  let environmentVariableResultTest = 'SMKTEST_RESULT_SMKTEST_CHECK_MEMORY';

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
