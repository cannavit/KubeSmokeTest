const shell = require('shelljs');
const { sendToSmokeCollector } = require('../src/utils/sendReport');
const chalk = require('chalk');
const smktestDep = require('./src/smokeTestDependencies');


test('Smoke Test criterial --endpoint-up test name: --curl-assert', async () => {
  // Declarative
  let criterial = '--endpoint-up';
  let consoleValue = '--curl-assert';
  let reportCommand = '$$reportCommand';
  let testCommand = '$$testCommand';
  let assertValue = '$$assert';
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

  // Send results sfor collect the data.
  // await smktestDep.collectSmokeTestResults(
  //   dateInit,
  //   criterial,
  //   consoleValue,
  //   '',
  //   passTest
  // );

  expect(passTest).toBe(true);
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST
//

