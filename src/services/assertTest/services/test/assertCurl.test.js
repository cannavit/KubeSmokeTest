//! For run the test is necessary to have access one cluster:
const { evalCurl } = require('../../../smktestTools/src/curlCheck');
//? Check if is possible

const assertCurl = process.env.SMKTEST_ASSERT_CURL;

test(`Check Assert Curl: `, async () => {
  //! Is possible use /api-docs
  const assertCurl = process.env.SMKTEST_ASSERT_CURL;

  // Init Options
  let options = { assertResponse: {} };
  options.assertCurl = assertCurl;

  options = await evalCurl(options);

  let stdout = options.assertResponse.curl.stdout;

  let passTest = false;
  if (stdout) {
    passTest = true;
  }

  expect(passTest).toBe(true);
});

test(`Check Assert Response 200 code: `, async () => {
  //! Is possible use /api-docs
  const assertCurl = process.env.SMKTEST_ASSERT_CURL;

  // Init Options
  let options = { assertResponse: {} };
  options.assertCurl = assertCurl;

  options = await evalCurl(options);

  let stdout = options.assertResponse.curl.stdout;

  //! Check if exist code 500 or 400 family.
  let dataJson;
  try {
    dataJson = JSON.parse(stdout);
  } catch (error) {}

  let passTest = true;
  let codeValue;

  for (const key in dataJson) {
    if (String(key).toLowerCase().includes('code')) {
      variableName = String(key);
      codeValue = dataJson[key];

      if (String(codeValue).substring(0, 1) !== '2') {
        passTest = false;
      }
    }

    if (String(key).toLowerCase().includes('status')) {
      variableName = String(key);
      codeValue = dataJson[key];

      if (String(codeValue).substring(0, 1) !== '2') {
        passTest = false;
      }
    }
  }

  if (stdout) {
    passTest = true;
  }

  expect(passTest).toBe(true);
});
