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
      GITLAB_USER_EMAIL: process.env.GITLAB_USER_EMAIL
        ? process.env.GITLAB_USER_EMAIL
        : '',
    },
  };

  await sendToSmokeCollector(options);

  return options;
}
