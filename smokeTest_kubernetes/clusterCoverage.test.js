const smktestDep = require('smktest-utils');




test('Smoke Test criterial --cluster-coverage test name: --check-cluster-info', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster-info';
  let reportCommand = 'kubectl cluster-info';
  let testCommand = 'kubectl cluster-info | grep "Kubernetes" | grep -v "running"';
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



test('Smoke Test criterial --cluster-coverage test name: --check-nodes', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-nodes';
  let reportCommand = 'kubectl get nodes';
  let testCommand = 'kubectl get nodes | grep -v "NAME" | grep -v "Ready"';
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



test('Smoke Test criterial --cluster-coverage test name: --check-cluster', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-cluster';
  let reportCommand = 'kubectl describe nodes |  head -32 | tail -4 | grep -A 6 "Conditions"';
  let testCommand = 'kubectl describe nodes | head -32 | tail -4 | grep "Ready" | grep -v "True"';
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



test('Smoke Test criterial --cluster-coverage test name: --check-disc', async () => {
  // Declarative
  let criterial = '--cluster-coverage';
  let consoleValue = '--check-disc';
  let reportCommand = 'kubectl describe nodes | head -32 | tail -4 | grep "DiskPressure"';
  let testCommand = 'kubectl describe nodes | head -32 | tail -4 | grep "DiskPressure" | grep -v "False"';
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
  
}, 5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEXT TEST


