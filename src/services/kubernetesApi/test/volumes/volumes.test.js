const { checkVolumeSpace } = require('../../src/volumes');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');
const chalk = require('chalk');

test('Check space free inside of volumes', async () => {
  //! Is possible use /api-docs
  var dateInit = await new Date(); // Init Time

  // Read NameSpace
  let options = process.env.SMKTEST_OPTIONS;

  options = JSON.parse(options);
  options = await checkVolumeSpace(options);

  let passTest = true;
  for (const key in options.volumeMounts) {
    let element = options.volumeMounts[key];

    if (element.use > 80) {
      passTest = false;

      console.log(
        ` 🧪 Check Volume >>>>>>> \n 🚀 POD NAME: ${element.podName} \n 📦  PATH VOLUME:  ${element.mountPath}\n \n` +
          chalk.red.bold('💾 ⚠️ Is necessary free space in volume\n') +
          chalk.red.bold('👎 ERROR KUBERNETES CLUSTER CONDITIONS\n') +
          chalk.red.bold(
            ' 🛑 Communicate that your kubernetes cluster administrator'
          )
      );

      console.log();
      console.log(chalk.red.bold(element.responseTestOriginal));
    } else {
      console.log(
        ` 🧪 Check Volume >>>>>>> \n 🚀 POD NAME: ${element.podName} \n 📦  PATH VOLUME:  ${element.mountPath}\n \n` +
          chalk.green('✅ 💾 Exist enough free space inside of the volume \n') +
          chalk.green.bold(element.responseTestOriginal)
      );
    }
  }

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'checkVolumeSpace',
      testResult: JSON.stringify(options.volumeMounts),
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

  expect(passTest).toBe(true);
}, 100000);
