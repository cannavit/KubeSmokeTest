
test('Smoke Test criterial $$criterial test name: $$consoleValue', async () => {
  // Declarative
  let criterial = '$$criterial';
  let consoleValue = '$$consoleValue';
  let reportCommand = '$$reportCommand';
  let testCommand = '$$testCommand';
  let assertValue = '$$assert';

  // Get record of init test
  let passTest = await smktestDep.checkIngress(
    testCommand,
    assertValue,
    reportCommand,
    criterial,
    consoleValue
  );

  expect(passTest).toBe(true);
  
}, 20010);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST


