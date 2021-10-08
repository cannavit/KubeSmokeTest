// NAME      STATUS   ROLES                      AGE    VERSION
// rancher   Ready    controlplane,etcd,worker   2y2d   v1.14.6

const shell = require('shelljs');
const { sendToSmokeCollector } = require('../../../utils/sendReport');

module.exports.checkClusterNodes = async function (options) {
  var dateInit = await new Date();

  // Get conditions using kubectl commands.
  let response = await shell.exec(
    'kubectl get nodes | grep -v "VERSION" | grep -v "Ready"',
    {
      silent: true,
    }
  );

  responseTest = response.stdout;

  let passTest = false;
  if (responseTest === '') {
    passTest = true;
  }

  response = await shell.exec('kubectl get nodes', {
    silent: true,
  });

  responseReport = response.stdout;

  let jsonResult = {
    passTest: passTest,
    responseTest: responseTest,
    conditionsText: responseReport,
  };

  process.env['SMKTEST_KUBERNETES_NODE_STATUS'] = JSON.stringify(jsonResult);

  options.checkClusterNodes = jsonResult;

  var dateFinish = await new Date();

  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.customDictionary.generalOptions['--namespace'],
      testName: 'checkClusterNodes',
      testResult: JSON.stringify(responseTest),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  return options;
};

// kubectl cluster-info

module.exports.ifGrepHaveOutputIsError = async function (
  options,
  grepTestCommand,
  grepReportCommand,
  variableEnvResponse
) {
  var dateInit = await new Date();

  // Get conditions using kubectl commands.
  let response = await shell.exec(grepTestCommand, {
    silent: true,
  });

  responseTest = response.stdout;

  let passTest = false;
  if (responseTest === '') {
    passTest = true;
  }

  response = await shell.exec(grepReportCommand, {
    silent: true,
  });

  responseReport = response.stdout;

  let jsonResult = {
    passTest: passTest,
    responseTest: responseTest,
    conditionsText: responseReport,
  };
  process.env[variableEnvResponse] = JSON.stringify(jsonResult);

  options.checkClusterNodes = jsonResult;

  var dateFinish = await new Date();

  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.customDictionary.generalOptions['--namespace'],
      testName: 'checkClusterNodes',
      testResult: JSON.stringify(responseTest),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  return options;
};
