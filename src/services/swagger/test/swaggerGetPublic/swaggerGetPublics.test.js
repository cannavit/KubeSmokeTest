const swaggerSmktest = require('swagger-smktest');

// example:
// create-smktest --check-swagger-public-apis=https://trust-api-develop.openshift.techgap.it/api/v5/api-docs/
test('Check Swagger [GET]/publics apis', async () => {
  //! Is possible use /api-docs

  console.log('@1Marker-No:_1255141546');

  let docsSwagger = process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS;

  console.log('>>>>>636909397>>>>>');
  console.log(docsSwagger);
  console.log('<<<<<<<<<<<<<<<<<<<');

  let {
    responseOfRequest,
    coverage,
    successSmokeTest,
    report,
    abstractReport,
  } = await swaggerSmktest.smokeTest(docsSwagger);

  console.log('>>>>>-1890639539>>>>>');
  console.log(successSmokeTest);
  console.log('<<<<<<<<<<<<<<<<<<<');
  console.log('>>>>>571094574>>>>>');
  console.log(responseOfRequest);
  console.log('<<<<<<<<<<<<<<<<<<<');
  for (const key in responseOfRequest) {
    let element = responseOfRequest[key];

    console.log('>>>>>-261344459>>>>>');
    console.log(element);
    console.log('<<<<<<<<<<<<<<<<<<<');
  }

  expect(false).toBe(true);
}, 100000);
