const { getPods } = require('../../src/pods');
const { getLogs } = require('../../src/logs');
const chalk = require('chalk');

//? Check if is possible

test('Check Logs errors', async () => {
  //? List of the wold to find error

  let namespace = process.env['SMKTEST_NAMESPACE'];

  options = {
    testConfig: {
      kubernetes: {
        namespace: namespace,
      },
    },
  };

  options = await getPods(options);
  options = await getLogs(options);

  logs = options.testConfig.kubernetes.logs;

  //   console.log('>>>>>320744767>>>>>');
  //   console.log(logs);
  //   console.log('<<<<<<<<<<<<<<<<<<<');

  let passTest = true;

  for (const key in logs) {
    let element = logs[key];

    if (element.isLogError === true && element.name !== undefined) {
      passTest = false;
    }
  }

  if (!passTest) {
    console.log(chalk.red.bold('ERROR IN LOGS TEST'));
    console.log(chalk.red.bold('TEST WITH --check-pods-logs'));
    console.log(chalk.red.bold(logs.reportText));
  } else {
    console.log(chalk.green.bold('SUCCESS, LOGS TEST'));
    console.log(chalk.green.bold('TEST WITH --check-pods-logs'));
    // console.log(chalk.green.bold(logs.reportText));
  }

  expect(passTest).toBe(true);
});
