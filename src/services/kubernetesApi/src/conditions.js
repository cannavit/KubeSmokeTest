// Check conditions of the nodes.
// kubectl describe nodes
// Conditions:
//   Type             Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
//   ----             ------  -----------------                 ------------------                ------                       -------
//   MemoryPressure   False   Wed, 16 Jun 2021 11:37:34 +0200   Thu, 26 Sep 2019 12:13:47 +0200   KubeletHasSufficientMemory   kubelet has sufficient memory available
//   DiskPressure     False   Wed, 16 Jun 2021 11:37:34 +0200   Mon, 01 Mar 2021 18:01:45 +0100   KubeletHasNoDiskPressure     kubelet has no disk pressure
//   PIDPressure      False   Wed, 16 Jun 2021 11:37:34 +0200   Thu, 26 Sep 2019 12:13:47 +0200   KubeletHasSufficientPID      kubelet has sufficient PID available
//   Ready            True    Wed, 16 Jun 2021 11:37:34 +0200   Tue, 08 Jun 2021 14:12:12 +0200   KubeletReady                 kubelet is posting ready status

const shell = require('shelljs');
const { sendToSmokeCollector } = require('../../../utils/sendReport');

module.exports.checkConditions = async function (options) {
  // Get conditions using kubectl commands.
  let response = await shell.exec('kubectl describe nodes', {
    silent: true,
  });

  var dateInit = await new Date();

  response = response.stdout; //Get outupts
  response = response.split('Conditions:'); // Detect kew wold
  response = response[1];
  response = 'Addresses: ' + response;
  response = response.split('Addresses:'); // Detect kew wold
  response = response[1];
  let conditionsText = response;

  response = conditionsText.trim().split(/\r?\n/);

  let passTest = true;
  for (const key in response) {
    let element = response[key];

    if (element.includes('Ready')) {
      if (element.includes('False')) {
        passTest = false;
      }
    }

    if (!element.includes('Ready')) {
      if (element.includes('True')) {
        passTest = false;
      }
    }
  }

  let responseTest = {
    conditionsText: conditionsText,
    passTest: passTest,
  };

  process.env['SMKTEST_KUBERNETES_NODE_CONDITIONS'] =
    JSON.stringify(responseTest);

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'checkConditions',
      testResult: JSON.stringify(responseTest),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  return options;
};
