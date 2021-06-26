const base64 = require('base-64');
const axios = require('axios');

module.exports.sendToSmokeCollector = async function (options) {
  // export async function sendToSmokeCollector(options) {
  // Decode
  let urlSomeCollectorCoded = process.env.SMOKE_COLLECTOR;
  let data = options.smokeCollector.data;

  data = {
    ...data,
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
    SMKTEST_CHECK_LOGIN_CURL: process.env.SMKTEST_CHECK_LOGIN_CURL
      ? process.env.SMKTEST_CHECK_LOGIN_CURL
      : '',
    SMKTEST_CHECK_SWAGGER_APIS: process.env.SMKTEST_CHECK_SWAGGER_APIS
      ? process.env.SMKTEST_CHECK_SWAGGER_APIS
      : '',
    SMKTEST_CHECK_SWAGGER_PUBLIC_APIS: process.env
      .SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
      ? process.env.SMKTEST_CHECK_SWAGGER_PUBLIC_APIS
      : '',
    SMKTEST_CHECK_VOLUMES: process.env.SMKTEST_CHECK_VOLUMES
      ? process.env.SMKTEST_CHECK_VOLUMES
      : '',
    SMKTEST_CREATE_CONFIG_FILE: process.env.SMKTEST_CREATE_CONFIG_FILE
      ? process.env.SMKTEST_CREATE_CONFIG_FILE
      : '',
    SMKTEST_CHECK_PODS_LOGS: process.env.SMKTEST_CHECK_PODS_LOGS
      ? process.env.SMKTEST_CHECK_PODS_LOGS
      : '',
    SMKTEST_CHECK_CONDITIONS: process.env.SMKTEST_CHECK_CONDITIONS
      ? process.env.SMKTEST_CHECK_CONDITIONS
      : '',
    SMKTEST_CHECK_INGRESS: process.env.SMKTEST_CHECK_INGRESS
      ? process.env.SMKTEST_CHECK_INGRESS
      : '',
    SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE: process.env
      .SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
      ? process.env.SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE
      : '',
    SMKTEST_NAMESPACE: process.env.SMKTEST_NAMESPACE
      ? process.env.SMKTEST_NAMESPACE
      : '',
    SMKTEST_AUTO_DETECT: process.env.SMKTEST_AUTO_DETECT
      ? process.env.SMKTEST_AUTO_DETECT
      : '',
    SMKTEST_SCANNER_LOGIN: process.env.SMKTEST_SCANNER_LOGIN
      ? process.env.SMKTEST_SCANNER_LOGIN
      : '',
    SMKTEST_CURL_LOGIN: process.env.SMKTEST_CURL_LOGIN
      ? process.env.SMKTEST_CURL_LOGIN
      : '',
    SMKTEST_SCANNER_API_METHOD: process.env.SMKTEST_SCANNER_API_METHOD
      ? process.env.SMKTEST_SCANNER_API_METHOD
      : '',
    SMKTEST_CRITERIAL: process.env.SMKTEST_CRITERIAL
      ? process.env.SMKTEST_CRITERIAL
      : '',
    SMKTEST_ASSERT_CURL: process.env.SMKTEST_ASSERT_CURL
      ? process.env.SMKTEST_ASSERT_CURL
      : '',
    SMKTEST_CONTEXT: process.env.SMKTEST_CONTEXT
      ? process.env.SMKTEST_CONTEXT
      : '',
    SMKTEST_ENVIRONMENT: process.env.SMKTEST_ENVIRONMENT
      ? process.env.SMKTEST_ENVIRONMENT
      : '',
    SMKTEST_ENVIRONMENT_VARIABLE: process.env.SMKTEST_ENVIRONMENT_VARIABLE
      ? process.env.SMKTEST_ENVIRONMENT_VARIABLE
      : '',
    SMKTEST_PROJECT_NAME: process.env.SMKTEST_PROJECT_NAME
      ? process.env.SMKTEST_PROJECT_NAME
      : '',
    SMKTEST_SKIP_PROMPTS: process.env.SMKTEST_SKIP_PROMPTS
      ? process.env.SMKTEST_SKIP_PROMPTS
      : '',
  };

  console.log(
    ' 💾 SEND REPORT TO SMOKE_COLLECTOR \n' +
      ' 💾 Code address: ' +
      urlSomeCollectorCoded +
      '\n \n'
  );

  try {
    if (urlSomeCollectorCoded) {
      var urlSomeCollector = base64.decode(urlSomeCollectorCoded) + 'smktest';

      console.log(' 📬 Decode Address: ' + urlSomeCollector + '\n');

      let result = await axios({
        method: 'post',
        url: urlSomeCollector,
        data: data,
        curlirize: false,
      });

      if (result.status === 200) {
        console.log(
          ' 📝 Send report to smoke-collector \n' +
            ' ✅ OK. send repot to ' +
            urlSomeCollector +
            '\n'
        );
      } else {
        console.log(
          ' 🛑 ERROR. not was possible send repot to ' + urlSomeCollector
        );
      }
    }
  } catch (error) {
    console.log(' 🟠 WARNING: Smoke Collector Disconnected Address: \n');
  }

  return options;
};

// sendToSmokeCollector();
