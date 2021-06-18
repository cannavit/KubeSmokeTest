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

  let passTest = true;

  for (const key in logs) {
    let element = logs[key];

    if (element.isLogError === true && element.name !== undefined) {
      console.log('@1Marker-No:_-1729551266');
      passTest = false;
    }
  }

  if (!passTest) {
    console.log(
      `⚠️ 🟠 🔍 Was detected the errorWold associated inside of the log: ${logs.wordError}`
    );
    console.log(chalk.red.bold(' 🛑 ERROR IN LOGS TEST'));
    console.log(chalk.red.bold(' 🔥 TEST WITH --check-pods-logs'));
    console.log(
      chalk.red.bold(
        logs.reportText.substring(
          logs.reportText.length - 2000,
          logs.reportText.length
        )
      )
    );
  } else {
    console.log(chalk.green.bold('🟢 SUCCESS, LOGS TEST'));
    console.log(chalk.green.bold('✅ TEST WITH --check-pods-logs'));
    // console.log(chalk.green.bold(logs.reportText));
  }

  expect(passTest).toBe(true);
});
