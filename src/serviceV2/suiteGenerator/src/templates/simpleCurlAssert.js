test('Smoke Test criterial $${criterial}test name: $$consoleValue', async () => {
  // Declarative
  let criterial = '$$criterial';
  let consoleValue = '$$consoleValue';
  let reportCommand = '$$reportCommand';
  let testCommand = '$$testCommand';
  let assertValue = '$$assert';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  var dateInit = await new Date();
  
  let passTest = await smktestDep.simpleCurlAssert(
    testCommand,
    assertValue,
    criterial,
    consoleValue,
    reportCommand
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

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
