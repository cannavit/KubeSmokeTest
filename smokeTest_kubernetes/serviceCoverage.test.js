const smktestDep = require('smktest-utils');




test('Smoke Test criterial --service-coverage test name: --check-pods-running', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-running';
  let reportCommand = 'kubectl get nodes --namespace=smoke-test';
  let testCommand = 'kubectl get pods --namespace=smoke-test | grep -v "NAME" | grep -v "Running"';
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


