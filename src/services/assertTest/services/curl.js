const { evalCurl } = require('../../smktestTools/src/curlCheck');
const assert = require('assert');
const shell = require('shelljs');
const jest = require('jest');

export async function curlSingleTest(options) {
  // options = await evalCurl(options);

  //! Run Jest Test. >>>
  const optionsJest = {
    projects: [__dirname],
    roots: [__dirname],
    silent: false,
  };

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);

  if (testResult.results.numFailedTestSuites > 0) {
    throw new Error('🛑 👎 NOT PASS THE TEST ASSERT CURL');
  }
  //! <<<

  return options;
}
