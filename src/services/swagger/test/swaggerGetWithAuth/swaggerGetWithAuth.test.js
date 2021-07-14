const swaggerSmktest = require('swagger-smktest');

// example:
// create-smktest --project-name=test-swagger --context=remote-apis --environment=localhost  --check-swagger-public-apis=https://trust-api-develop.openshift.techgap.it/api/v5/api-docs/

const docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;
const chalk = require('chalk');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');

test(`Check Swagger [GET-WITH-AUTH]/${docsSwagger}`, async () => {
  //! Is possible use /api-docs
  var dateInit = await new Date(); // Init Time

  let swaggerLoginCurl = process.env.SMKTEST_SWAGGER_LOGIN_CURL;
  let checkSwaggerApis = process.env.SMKTEST_CHECK_SWAGGER_APIS;

  let options = {
    tokenConfig: {
      curlRequest: swaggerLoginCurl,
    },
  };

  let {
    responseOfRequest,
    coverage,
    successSmokeTest,
    report,
    abstractReport,
  } = await swaggerSmktest.smokeTest(checkSwaggerApis, options);

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
    console.log('@1Marker-No:_-22657907');
    console.log(
      report.render() +
        '\n \n' +
        chalk.red.bold(
          '\n 💨 🔥 💨 ERROR: Detected 500 error in swagger automatic test.\n'
        ) +
        ` 🛑  Test: 🧁 Swagger  [GET-WITH-AUTH]/${docsSwagger} \n \n \n` +
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
        ` 🟢  Test: 🧁 Swagger  [GET-WITH-AUTH]/${docsSwagger} \n \n \n` +
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
      testName: 'swaggerGetWithAuth',
      testResult: JSON.stringify(sendReport),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
}, 100000000);
