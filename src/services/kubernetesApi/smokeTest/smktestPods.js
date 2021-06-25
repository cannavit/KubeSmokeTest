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
      //   console.log('@1Marker-No:_887020282');
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
      namespace: options.namespace,
      testName: 'smktestCheckIfAllPodsAreActive',
      testResult: JSON.stringify({
        passTest: passTest,
        podFail: podFail,
        statusPodFail: statusPodFail,
      }),
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
      SMKTEST_CHECK_LOGIN_CURL: provess.env.SMKTEST_CHECK_LOGIN_CURL
        ? process.env.SMKTEST_CHECK_LOGIN_CURL
        : '',
      SMKTEST_CHECK_SWAGGER_APIS: provess.env.SMKTEST_CHECK_SWAGGER_APIS
        ? process.env.SMKTEST_CHECK_SWAGGER_APIS
        : '',
      SMKTEST_CHECK_SWAGGER_PUBLIC_APIS: provess.env
        .SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
        ? process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
        : '',
      SMKTEST_CHECK_VOLUMES: provess.env.SMKTEST_CHECK_VOLUMES
        ? process.env.SMKTEST_CHECK_VOLUMES
        : '',
      SMKTEST_CREATE_CONFIG_FILE: provess.env.SMKTEST_CREATE_CONFIG_FILE
        ? process.env.SMKTEST_CREATE_CONFIG_FILE
        : '',
      SMKTEST_CHECK_PODS_LOGS: provess.env.SMKTEST_CHECK_PODS_LOGS
        ? process.env.SMKTEST_CHECK_PODS_LOGS
        : '',
      SMKTEST_CHECK_CONDITIONS: provess.env.SMKTEST_CHECK_CONDITIONS
        ? process.env.SMKTEST_CHECK_CONDITIONS
        : '',
      SMKTEST_CHECK_INGRESS: provess.env.SMKTEST_CHECK_INGRESS
        ? process.env.SMKTEST_CHECK_INGRESS
        : '',
      SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE: provess.env
        .SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
        ? process.env.SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
        : '',
      SMKTEST_NAMESPACE: provess.env.SMKTEST_NAMESPACE
        ? process.env.SMKTEST_NAMESPACE
        : '',
      SMKTEST_AUTO_DETECT: provess.env.SMKTEST_AUTO_DETECT
        ? process.env.SMKTEST_AUTO_DETECT
        : '',
      SMKTEST_SCANNER_LOGIN: provess.env.SMKTEST_SCANNER_LOGIN
        ? process.env.SMKTEST_SCANNER_LOGIN
        : '',
      SMKTEST_CURL_LOGIN: provess.env.SMKTEST_CURL_LOGIN
        ? process.env.SMKTEST_CURL_LOGIN
        : '',
      SMKTEST_SCANNER_API_METHOD: provess.env.SMKTEST_SCANNER_API_METHOD
        ? process.env.SMKTEST_SCANNER_API_METHOD
        : '',
      SMKTEST_CRITERIAL: provess.env.SMKTEST_CRITERIAL
        ? process.env.SMKTEST_CRITERIAL
        : '',
      SMKTEST_ASSERT_CURL: provess.env.SMKTEST_ASSERT_CURL
        ? process.env.SMKTEST_ASSERT_CURL
        : '',
      SMKTEST_CONTEXT: provess.env.SMKTEST_CONTEXT
        ? process.env.SMKTEST_CONTEXT
        : '',
      SMKTEST_ENVIRONMENT: provess.env.SMKTEST_ENVIRONMENT
        ? process.env.SMKTEST_ENVIRONMENT
        : '',
      SMKTEST_ENVIRONMENT_VARIABLE: provess.env.SMKTEST_ENVIRONMENT_VARIABLE
        ? process.env.SMKTEST_ENVIRONMENT_VARIABLE
        : '',
      SMKTEST_PROJECT_NAME: provess.env.SMKTEST_PROJECT_NAME
        ? process.env.SMKTEST_PROJECT_NAME
        : '',
      SMKTEST_SKIP_PROMPTS: provess.env.SMKTEST_SKIP_PROMPTS
        ? process.env.SMKTEST_SKIP_PROMPTS
        : '',
    },
  };

  await sendToSmokeCollector(options);

  return options;
}
