const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./smokeTestDependencies');

test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand =
    'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand =
    "kubectl -n edutelling-develop exec service/edutelling-api -- df -h --block-size=1GB /usr/src/app/uploads | awk '{print $5}' | grep -v 'Use%' | sed 's/%//' | awk -F: '$1>=90'";
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

test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand =
    'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand =
    "kubectl -n edutelling-develop exec service/edutelling-api -- df -h --block-size=1GB /usr/src/app/uploads | awk '{print $5}' | grep -v 'Use%' | sed 's/%//' | awk -F: '$1>=90'";
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

test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand =
    'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand =
    "kubectl -n edutelling-develop exec service/edutelling-api -- df -h --block-size=1GB /usr/src/app/uploads | awk '{print $5}' | grep -v 'Use%' | sed 's/%//' | awk -F: '$1>=90'";
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

test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand =
    'kubectl -n $namespace  exec service/$service  -- ls $mountPath';
  let testCommand =
    "kubectl -n edutelling-develop  exec service/edutelling-api  -- ls  /usr/src/app/uploads | grep -i -c ''";
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

test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand =
    'kubectl -n edutelling-develop  exec service/edutelling-memcached  -- ls /memcached/databases';
  let testCommand =
    "kubectl -n edutelling-develop  exec service/edutelling-api  -- ls  /usr/src/app/uploads | grep -i -c ''";
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

test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand =
    'kubectl -n edutelling-develop  exec service/edutelling-memcached  -- ls /memcached/databases';
  let testCommand =
    "kubectl -n edutelling-develop  exec service/edutelling-api  -- ls  /usr/src/app/uploads | grep -i -c ''";
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
