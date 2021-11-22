const smktestDep = require('smktest-utils');




test('Smoke Test criterial --service-coverage test name: --check-pods-running', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-running';
  let reportCommand = 'kubectl get nodes --namespace=edutelling-develop';
  let testCommand = 'kubectl get pods --namespace=edutelling-develop | grep -v "NAME" | grep -v "Running"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST



test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-api --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-api --namespace=edutelling-develop | grep -i "error"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST



test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-app --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-app --namespace=edutelling-develop | grep -i "error"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST



test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-memcached --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-memcached --namespace=edutelling-develop | grep -i "error"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST



test('Smoke Test criterial --service-coverage test name: --check-pods-logs', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--check-pods-logs';
  let reportCommand = 'kubectl logs --since=1h service/edutelling-orientdb --namespace=edutelling-develop | tail -4';
  let testCommand = 'kubectl logs --since=1h service/edutelling-orientdb --namespace=edutelling-develop | grep -i "error"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST



test('Smoke Test criterial --service-coverage test name: --execution-unit-coverage', async () => {
  // Declarative
  let criterial = '--service-coverage';
  let consoleValue = '--execution-unit-coverage';
  let reportCommand = 'get pods --namespace=edutelling-develop';
  let testCommand = 'get pods --namespace=edutelling-develop | grep -v "NAME" | grep -v "Running"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST


