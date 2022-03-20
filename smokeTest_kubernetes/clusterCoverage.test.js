const smktestDep = require('smktest-utils');




test('Smoke Test criterial --cluster-coverage test name: --check-memory', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-memory';
  let reportCommand = 'kubectl describe nodes | head -32 | tail -4 | grep "MemoryPressure"';
  let testCommand = 'kubectl describe nodes | head -32 | tail -4 | grep "MemoryPressure" | grep -v "False"';
  let assertValue = '';

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


