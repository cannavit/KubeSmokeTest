const smktestDep = require('smktest-utils');




test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-api -- df -h --block-size=1GB /usr/src/app/uploads | awk "{print $5}" | grep -v "Use%"| sed "s/%//" | awk -F: "$1>=90"';
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



test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-memcached -- df -h --block-size=1GB /memcached/databases | awk "{print $5}" | grep -v "Use%"| sed "s/%//" | awk -F: "$1>=90"';
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



test('Smoke Test criterial --resource-up test name: --volumes-free-space', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-free-space';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases | awk "{print $5}" | grep -v "Use%"| sed "s/%//" | awk -F: "$1>=90"';
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



test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/$$service  -- ls $/usr/src/app/uploads';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-api  -- ls  $/usr/src/app/uploads | grep -i -c ""';
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



test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/$$service  -- ls $/memcached/databases';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-memcached  -- ls  $/memcached/databases | grep -i -c ""';
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



test('Smoke Test criterial --resource-up test name: --volumes-exist-files', async () => {
  // Declarative
  let criterial = '--resource-up';
  let consoleValue = '--volumes-exist-files';
  let reportCommand = 'kubectl --namespace=edutelling-develop exec service/$$service  -- ls $/orientdb/databases';
  let testCommand = 'kubectl --namespace=edutelling-develop exec service/edutelling-orientdb  -- ls  $/orientdb/databases | grep -i -c ""';
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


