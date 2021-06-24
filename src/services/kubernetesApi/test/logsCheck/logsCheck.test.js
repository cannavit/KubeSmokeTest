const { getPods } = require('../../src/pods');
const { getLogs } = require('../../src/logs');
const chalk = require('chalk');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');

//? Check if is possible

test('Check Logs errors', async () => {
  //? List of the wold to find error

  var dateInit = await new Date();

  let options = process.env.SMKTEST_OPTIONS;
  options = JSON.parse(options);

  options = await getPods(options);
  options = await getLogs(options);

  logs = options.testConfig.kubernetes.logs;

  let passTest = true;

  for (const key in logs) {
    let element = logs[key];

    if (element.isLogError === true && element.name !== undefined) {
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

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  //! Report for collector:

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'logsCheck.test',
      testResult: JSON.stringify(logs),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
      GITLAB_USER_ID: process.env.GITLAB_USER_ID
        ? process.env.GITLAB_USER_ID
        : '',
      CI_PROJECT_URL: process.env.CI_PROJECT_URL
        ? process.env.CI_PROJECT_URL
        : '',
      CI_PROJECT_TITLE: process.env.CI_PROJECT_TITLE
        ? process.env.CI_PROJECT_TITLE
        : '',
      CI_PROJECT_NAME: process.env.CI_PROJECT_NAME
        ? process.env.CI_PROJECT_NAME
        : '',
      CI_PROJECT_ID: process.env.CI_PROJECT_ID ? process.env.CI_PROJECT_ID : '',
      CI_PIPELINE_ID: process.env.CI_PIPELINE_ID
        ? process.env.CI_PIPELINE_ID
        : '',
      CI_COMMIT_TAG: process.env.CI_COMMIT_TAG ? process.env.CI_COMMIT_TAG : '',
      CI_COMMIT_REF_NAME: process.env.CI_COMMIT_REF_NAME
        ? process.env.CI_COMMIT_REF_NAME
        : '',
      CI_COMMIT_SHA: process.env.CI_COMMIT_SHA ? process.env.CI_COMMIT_SHA : '',
      CI_COMMIT_MESSAGE: process.env.CI_COMMIT_MESSAGE
        ? process.env.CI_COMMIT_MESSAGE
        : '',
      CI_COMMIT_TITLE: process.env.CI_COMMIT_TITLE
        ? process.env.CI_COMMIT_TITLE
        : '',
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
});
