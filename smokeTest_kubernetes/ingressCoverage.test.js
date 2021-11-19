const smktestDep = require('smktest-utils');





// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test $${criterial}test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand = 'curl -v http://edutelling-db-develop.openshift.techgap.itundefined  2>&1 | grep "ERROR"'; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand
  );

  // // Run Command
  // await smktestDep.collectSmokeTestResults(
  //   dateInit,
  //   criterial,
  //   consoleValue,
  //   '',
  //   passTest
  // );

  expect(passTest).toBe(true);
});




// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test $${criterial}test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand = 'curl -v http://edutelling-api-develop.openshift.techgap.it/api  2>&1 | grep "ERROR"'; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand
  );

  // // Run Command
  // await smktestDep.collectSmokeTestResults(
  //   dateInit,
  //   criterial,
  //   consoleValue,
  //   '',
  //   passTest
  // );

  expect(passTest).toBe(true);
});




// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test $${criterial}test name: --check-ingress', async () => {
  //? Inputs
  let criterial = '--ingress-coverage';
  let consoleValue = '--check-ingress';
  let testCommand = 'curl -v http://edutelling-app-develop.openshift.techgap.it/  2>&1 | grep "ERROR"'; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '';
  let reportCommand = 'curl -v $ingress  2>&1';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand
  );

  // // Run Command
  // await smktestDep.collectSmokeTestResults(
  //   dateInit,
  //   criterial,
  //   consoleValue,
  //   '',
  //   passTest
  // );

  expect(passTest).toBe(true);
});


