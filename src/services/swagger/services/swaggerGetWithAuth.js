// create-smktest --check-swagger-apis=https://edutelling-api-develop.openshift.techgap.it/api/v1/api-docs/ --swagger-login-curl='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
const swaggerSmktest = require('swagger-smktest');
require('dotenv').config();

async function test() {
  console.log('@1Marker-No:_354467327');

  // Using Edutelling ---------
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

  console.log(report.render());
  console.log(abstractReport.render());
}

test();
