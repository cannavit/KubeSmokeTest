import { json } from 'express';

const { evalCurl } = require('../../smktestTools/src/curlCheck');
const assert = require('assert');
const shell = require('shelljs');
const jest = require('jest');
const { sendToSmokeCollector } = require('../../../utils/sendReport');

export async function curlSingleTest(options) {
  // options = await evalCurl(options);

  var dateInit = await new Date();

  //! Run Jest Test. >>>
  const optionsJest = {
    projects: [__dirname],
    roots: [__dirname],
    silent: false,
  };

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);
  let passTest = true;
  if (testResult.results.numFailedTestSuites > 0) {
    passTest = false;
    console.log('🛑 👎 NOT PASS THE TEST ASSERT CURL');
  }

  options.responseTest = {
    passTest: passTest,
    curlSingleTest: testResult,
  };
  //! <<<
  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  //! Report for collector:

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'curlSingleTest',
      testResult: JSON.stringify(testResult),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  return options;
}
