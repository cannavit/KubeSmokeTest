

// SMOKE TEST WITH JEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
test('Smoke Test $${criterial}test name: $$consoleValue', async () => {
  //? Inputs
  let criterial = '$$criterial';
  let consoleValue = '$$consoleValue';
  let testCommand = '$$testCommand';
  let assertValue = '$$assert';
  let reportCommand = '$$reportCommand';

  // Get record of init test
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand
  );

  expect(passTest).toBe(true);
});


