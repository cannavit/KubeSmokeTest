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

  if (!successSmokeTest) {
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
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
}, 100000);
