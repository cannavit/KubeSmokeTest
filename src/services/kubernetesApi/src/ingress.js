// kubectl get ingress --namespace=edutelling-develop -o json

const { response } = require('express');
const shell = require('shelljs');

const { sendToSmokeCollector } = require('../../../utils/sendReport');

async function getIngress(options) {
  let namespace = options.namespace;

  let response = await shell.exec(
    `kubectl get ingress --namespace=${namespace} -o=jsonpath='{@}'`,
    {
      silent: true,
    }
  );

  let response_str = JSON.parse(response.stdout);
  let ingressList = [];

  for (const key in response_str.items) {
    let element = response_str.items[key];

    for (const key2 in element.spec.rules) {
      let ingress = element.spec.rules[key2];
      ingressList.push(ingress);
    }
  }

  options.ingress = ingressList;

  return options;
}

module.exports.kubernetesIngress = async function (options) {
  // Check Kubernetes Ingress

  var dateInit = await new Date();

  options = await getIngress(options);

  let ingressWithPathList = [];

  for (const key in options.ingress) {
    let element = options.ingress[key];

    //Build Request URL
    let http;
    for (const data in element) {
      if (data.includes('http')) {
        http = data;
      }
    }

    let host = element.host;
    let ingress = http + '://' + host;

    for (const n in element.http.paths) {
      let d = element.http.paths[n];
      if (d.path) {
        ingressWithPathList.push(ingress + d.path);
      } else {
        ingressWithPathList.push(ingress);
      }
    }
  }

  //! Load environment variable:
  let listOfErrors = [
    'ERROR',
    '503 Service Temporarily Unavailable',
    'Internal Server Error',
  ];

  let passTest = true;
  let results = [];

  for (const key in ingressWithPathList) {
    let element = ingressWithPathList[key];

    if (element !== '') {
      let response = await shell.exec(`curl ${element}`, {
        silent: true,
      });

      //Check if is one Error.
      for (const keyWold in listOfErrors) {
        let errorWold = listOfErrors[keyWold];
        if (response.stdout.includes(errorWold)) {
          passTest = false;
        }

        if (response.stdout === '' && response.stderr.length > 600) {
          passTest = false;
          errorWold =
            'Detect using response.stderr.length=' + response.stderr.length;
        }
        results.push({
          passTest: passTest,
          test: `curl ${element}`,
          keyWold: errorWold,
        });
      }
    }
  }

  options.responseTest = {
    kubernetesIngress: results,
  };

  process.env['SMKTEST_KUBERNETES_INGRESS_BY_TEST'] = JSON.stringify(results);

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'kubernetesIngress',
      testResult: JSON.stringify(results),
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
};
