const swaggerSmktest = require('swagger-smktest');

// example:
// create-smktest --project-name=test-swagger --context=remote-apis --environment=localhost  --check-swagger-public-apis=https://trust-api-develop.openshift.techgap.it/api/v5/api-docs/

const docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;
const chalk = require('chalk');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');

test(`Check Swagger [GET-PUBLICS-APIS]/${docsSwagger}`, async () => {
  //! Is possible use /api-docs
  var dateInit = await new Date(); // Init Time

  let docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;
  let options = JSON.parse(process.env.SMKTEST_OPTIONS);

  let {
    responseOfRequest,
    coverage,
    successSmokeTest,
    report,
    abstractReport,
  } = await swaggerSmktest.smokeTest(docsSwagger);

  //Get test fail for send the report
  let failTestList = [];

  let shortReport = {
    status400: 0,
    status500: 0,
    status200: 0,
    status600: 0,
  };

  for (const key in responseOfRequest) {
    let element = responseOfRequest[key];

    let codeString = String(element.status).substr(0, 1);

    if (codeString === '5') {
      failTestList.push(element);
      shortReport.type500 = shortReport.status500 + 1;
    }
    if (codeString === '4') {
      shortReport.type400 = shortReport.status400 + 1;
    }
    if (codeString === '2') {
      shortReport.type500 = shortReport.status500 + 1;
    }
    if (codeString === '6') {
      shortReport.type600 = shortReport.status600 + 1;
    }
  }

  let sendReport = {
    failCases: failTestList,
    shortReport: shortReport,
  };

  //! Print Report

  let passTest = successSmokeTest;

  if (passTest === false || passTest === 'false') {
    console.log(
      report.render() +
        '\n \n' +
        chalk.red.bold(
          '\n 💨 🔥 💨 ERROR: Detected 500 error in swagger automatic test.\n'
        ) +
        ` 🛑  Test: 🧁 Swagger  [GET-PUBLICS]/${docsSwagger} \n \n \n` +
        abstractReport.render() +
        '\n \n'
    );
  } else {
    console.log(
      report.render() +
        '\n \n' +
        chalk.green.bold(
          '\n 💨 🔥 💨 SUCCESS: Pass smoke test with swagger .\n'
        ) +
        ` 🟢  Test: 🧁 Swagger  [GET-PUBLICS]/${docsSwagger} \n \n \n` +
        abstractReport.render() +
        '\n \n'
    );
  }

  var dateFinish = await new Date();

  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'swaggerGetPublics',
      testResult: JSON.stringify(sendReport),
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
}, 100000000);
