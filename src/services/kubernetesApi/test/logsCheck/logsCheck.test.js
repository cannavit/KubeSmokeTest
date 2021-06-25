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
      GITLAB_USER_EMAIL: process.env.GITLAB_USER_EMAIL
        ? process.env.GITLAB_USER_EMAIL
        : '',
      SMKTEST_CHECK_LOGIN_CURL: provess.env.SMKTEST_CHECK_LOGIN_CURL
        ? process.env.SMKTEST_CHECK_LOGIN_CURL
        : '',
      SMKTEST_CHECK_SWAGGER_APIS: provess.env.SMKTEST_CHECK_SWAGGER_APIS
        ? process.env.SMKTEST_CHECK_SWAGGER_APIS
        : '',
      SMKTEST_CHECK_SWAGGER_PUBLIC_APIS: provess.env
        .SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
        ? process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
        : '',
      SMKTEST_CHECK_VOLUMES: provess.env.SMKTEST_CHECK_VOLUMES
        ? process.env.SMKTEST_CHECK_VOLUMES
        : '',
      SMKTEST_CREATE_CONFIG_FILE: provess.env.SMKTEST_CREATE_CONFIG_FILE
        ? process.env.SMKTEST_CREATE_CONFIG_FILE
        : '',
      SMKTEST_CHECK_PODS_LOGS: provess.env.SMKTEST_CHECK_PODS_LOGS
        ? process.env.SMKTEST_CHECK_PODS_LOGS
        : '',
      SMKTEST_CHECK_CONDITIONS: provess.env.SMKTEST_CHECK_CONDITIONS
        ? process.env.SMKTEST_CHECK_CONDITIONS
        : '',
      SMKTEST_CHECK_INGRESS: provess.env.SMKTEST_CHECK_INGRESS
        ? process.env.SMKTEST_CHECK_INGRESS
        : '',
      SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE: provess.env
        .SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
        ? process.env.SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
        : '',
      SMKTEST_NAMESPACE: provess.env.SMKTEST_NAMESPACE
        ? process.env.SMKTEST_NAMESPACE
        : '',
      SMKTEST_AUTO_DETECT: provess.env.SMKTEST_AUTO_DETECT
        ? process.env.SMKTEST_AUTO_DETECT
        : '',
      SMKTEST_SCANNER_LOGIN: provess.env.SMKTEST_SCANNER_LOGIN
        ? process.env.SMKTEST_SCANNER_LOGIN
        : '',
      SMKTEST_CURL_LOGIN: provess.env.SMKTEST_CURL_LOGIN
        ? process.env.SMKTEST_CURL_LOGIN
        : '',
      SMKTEST_SCANNER_API_METHOD: provess.env.SMKTEST_SCANNER_API_METHOD
        ? process.env.SMKTEST_SCANNER_API_METHOD
        : '',
      SMKTEST_CRITERIAL: provess.env.SMKTEST_CRITERIAL
        ? process.env.SMKTEST_CRITERIAL
        : '',
      SMKTEST_ASSERT_CURL: provess.env.SMKTEST_ASSERT_CURL
        ? process.env.SMKTEST_ASSERT_CURL
        : '',
      SMKTEST_CONTEXT: provess.env.SMKTEST_CONTEXT
        ? process.env.SMKTEST_CONTEXT
        : '',
      SMKTEST_ENVIRONMENT: provess.env.SMKTEST_ENVIRONMENT
        ? process.env.SMKTEST_ENVIRONMENT
        : '',
      SMKTEST_ENVIRONMENT_VARIABLE: provess.env.SMKTEST_ENVIRONMENT_VARIABLE
        ? process.env.SMKTEST_ENVIRONMENT_VARIABLE
        : '',
      SMKTEST_PROJECT_NAME: provess.env.SMKTEST_PROJECT_NAME
        ? process.env.SMKTEST_PROJECT_NAME
        : '',
      SMKTEST_SKIP_PROMPTS: provess.env.SMKTEST_SKIP_PROMPTS
        ? process.env.SMKTEST_SKIP_PROMPTS
        : '',
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
});
