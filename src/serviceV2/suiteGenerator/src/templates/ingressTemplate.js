

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test $${criterial}test name: $$consoleValue', async () => {
  //? Inputs
  let criterial = '$$criterial';
  let consoleValue = '$$consoleValue';
  let testCommand = '$$testCommand'; // curl -v $$ingress  2>&1 | grep 'ERROR'
  let assertValue = '$$assert';
  let reportCommand = '$$reportCommand';

  // Get record of init test
  var dateInit = await new Date();
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand
  );

  // Run Command
  await smktestDep.collectSmokeTestResults(
    dateInit,
    criterial,
    consoleValue,
    '',
    passTest
  );

  expect(passTest).toBe(true);
});


