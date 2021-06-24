let options = {
  swagger: {
    docs: 'https://edutelling-api-develop.openshift.techgap.it/api/v1/api-docs/',
    // docs: 'https://trust-api-develop.openshift.techgap.it/api/v5/api-docs/',
    // docs: 'https://pot-uat.paxitalia.com:8443/api/v2/api-docs',
    // docs: 'https://pot-uat.paxitalia.com:8443/api/swagger-ui.html',
  },
};

const swaggerSmktest = require('swagger-smktest');
const chalk = require('chalk');

async function getSwaggerGetPublicApis(options) {
  // const docsSwagger = options.swagger.docs;

  let docsSwagger =
    'https://edutelling-api-develop.openshift.techgap.it/api/v1/api-docs/';

  var dateInit = await new Date(); // Init Time

  // let docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;

  let {
    responseOfRequest,
    coverage,
    successSmokeTest,
    report,
    abstractReport,
  } = await swaggerSmktest.smokeTest(docsSwagger);
  console.log('@1Marker-No:_219503613');
  console.log('@1Marker-No:_-647677017');
  console.log(report);
  console.log(abstractReport);
  console.log('@1Marker-No:_-999625004');

  //Get test fail for send the report
  let failTestList = [];
  let shortReport = {
    status400: 0,
    status500: 0,
    status200: 0,
    status600: 0,
  };
  console.log('@1Marker-No:_-469148146');
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

  console.log('@1Marker-No:_-1360949302');
  let sendReport = {
    failCases: failTestList,
    shortReport: shortReport,
  };

  //! Print Report

  let passTest = successSmokeTest;
  console.log('@1Marker-No:_-241775085');
  if (passTest == false) {
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
  console.log('@1Marker-No:_-2034763523');
}

getSwaggerGetPublicApis(options);
