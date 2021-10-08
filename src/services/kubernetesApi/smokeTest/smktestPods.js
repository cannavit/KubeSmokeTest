//! For run the test is necessary to have access one cluster:
const {
  collectConfigKube,
  getPods,
  getLogs,
  getServices,
} = require('../index');

const jest = require('jest');
const { sendToSmokeCollector } = require('../../../utils/sendReport');

async function getLatestPods(options) {
  // Example inputs
  //   options = {
  //     testConfig: {
  //       kubernetes: {
  //         namespace: 'edutelling-develop',
  //       },
  //     },
  //   };

  options = await getPods(options); // Get Pods Name
  options = await getServices(options); // Get Pods Name

  let latestPods = [];
  let serviceNotHavePod = [];
  for (const key in options.testConfig.kubernetes.services) {
    let service = options.testConfig.kubernetes.services[key].name;

    let lastPod;
    let creationTime;
    let podSelect;
    let count = 0; // control variable
    let existPodByService = false;

    for (const key2 in options.testConfig.kubernetes.pods) {
      existPodByService = false;
      let pod = options.testConfig.kubernetes.pods[key2];
      let namePod = pod.pod;

      if (namePod.includes(service)) {
        existPodByService = true;

        podSelect = pod;
        if (count === 0) {
          // Referent date
          creationTime = pod.creationTime;
        }

        if (creationTime <= pod.creationTime) {
          // Find latest date
          creationTime = pod.creationTime;
          lastPod = pod;
        }
        count = count + 1; // Update control variable
      }
    }

    // SmokeTest case, if not exist one Pod by Service Active.

    if (!existPodByService) {
      serviceNotHavePod.push(service);
    }

    if (lastPod) {
      latestPods.push(lastPod);
    } else {
      if (!podSelect) {
        //! If not exist one pod by service
        podSelect = {
          statusReady: 'not-exist-pod',
          pod: service + '_not_exit',
        };
      }

      latestPods.push(podSelect);
    }
  }

  options.testConfig.kubernetes.latestPods = latestPods;
  options.testConfig.kubernetes.serviceNotHavePod = serviceNotHavePod;

  return options;
}

export async function smktestCheckIfAllPodsAreActive(options) {
  var dateInit = await new Date();

  options = await getLatestPods(options);

  let passTest = true;
  let podFail = '';
  let statusPodFail = '';
  let podResult;
  for (const key in options.testConfig.kubernetes.latestPods) {
    let pod = options.testConfig.kubernetes.latestPods[key];

    if (pod.statusReady !== true) {
      podResult = pod;
      podFail = pod.pod;
      statusPodFail = pod.status;
      passTest = false;
    }
  }

  process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE'] = passTest;
  process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE_POD_NAME'] =
    podFail;
  process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE_POD_STATUS'] =
    statusPodFail;

  options.responseTest = {
    smktestCheckIfAllPodsAreActive: {
      passTest: passTest,
      podFail: podFail,
      statusPodFail: statusPodFail,
    },
  };

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.customDictionary.generalOptions['--namespace'],
      testName: 'smktestCheckIfAllPodsAreActive',
      testResult: JSON.stringify({
        passTest: passTest,
        podFail: podFail,
        statusPodFail: statusPodFail,
      }),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  return options;
}
