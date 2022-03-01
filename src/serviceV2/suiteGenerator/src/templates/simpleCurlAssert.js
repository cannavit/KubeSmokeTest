test('Smoke Test criterial $${criterial}test name: $$consoleValue', async () => {
  // Declarative
  let criterial = '$$criterial';
  let consoleValue = '$$consoleValue';
  let reportCommand = '$$reportCommand';
  let testCommand = '$$testCommand';
  let assertValue = '$$assert';
  let environmentVariableResultTest = '$$environmentVariableResultTest';

  // Get record of init test
  let passTest = await smktestDep.simpleCurlAssert(
    testCommand,
    assertValue,
    criterial,
    consoleValue,
    reportCommand
  );

  expect(passTest).toBe(true);
}, 20010);

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
