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
  const docsSwagger = options.swagger.docs;

  // let docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;

  let {
    responseOfRequest,
    coverage,
    successSmokeTest,
    report,
    abstractReport,
  } = await swaggerSmktest.smokeTest(docsSwagger);

  //Get test fail for send the report
  let failTestList = [];
  for (const key in responseOfRequest) {
    let element = responseOfRequest[key];
    let codeString = String(element.status).substr(0, 1);
    if (codeString === '5') {
      failTestList.push(element);
    }
  }

  //! Print Report
  if (!successSmokeTest) {
    console.log(
      report.render() +
        '\n \n' +
        chalk.red.bold(
          '\n 💨 🔥 💨 ERROR: Detected 500 error in swagger automatic test.\n'
        ) +
        ' 🛑      Test: 🧁 Swagger  [GET]/Public \n \n \n' +
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
        ' 🟢  Test: 🧁 Swagger  [GET]/Public \n \n \n' +
        abstractReport.render() +
        '\n \n'
    );
  }
}

getSwaggerGetPublicApis(options);
