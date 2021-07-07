const shell = require('shelljs');
require('dotenv').config();
const swaggerSmktest = require('swagger-smktest');
const { getPods } = require('../pods');
const { getServices } = require('../services');
require('dotenv').config();

async function initDependencies(options) {
  //Get environment variables.

  let SMKTEST_CURL_LOGIN = process.env.SMKTEST_CURL_LOGIN;
  let SMKTEST_CURL_DEPENDENCIES = process.env.SMKTEST_CURL_DEPENDENCIES;

  // options.tokenConfig.curlRequest;
  let token = await swaggerSmktest.getToken({
    tokenConfig: {
      curlRequest: SMKTEST_CURL_LOGIN,
    },
  });

  SMKTEST_CURL_DEPENDENCIES = SMKTEST_CURL_DEPENDENCIES.replace(
    '$SMKTEST_CURL_LOGIN',
    token.tokenObj.tokenValue
  );

  // console.log(key);

  let response = await shell.exec(SMKTEST_CURL_DEPENDENCIES, {
    silent: true,
  });

  response = response.stdout; //Get outupts

  options.dependecies = {
    response: response,
  };

  return options;
}

// initDependencies({});

async function checkDependencies(options) {
  //

  let services = await getServices(options);

  services = options.testConfig.kubernetes.services;
  let dependencies = [];

  let netResponse = options.dependencies.netResponse;
  let numberOfDependenciesExited = 0;
  for (const key in services) {
    // Get pod name
    let element = services[key];

    let userPort = false;
    if (netResponse.includes(String(element.port))) {
      numberOfDependenciesExited = numberOfDependenciesExited + 1;
      userPort = true;
    }

    dependencies.push({ userPort: userPort, service: element.name });
  }

  options.dependencies.result = {
    dependencies: dependencies,
    numberOfDependenciesExited: numberOfDependenciesExited,
    netResponse: netResponse,
  };

  return options;
}

async function installLibraryDependencies(options) {
  //
  let SMKTEST_CHECK_DEPENDENCIES_FROM_SERVICE =
    process.env.SMKTEST_CHECK_DEPENDENCIES_FROM_SERVICE;

  let pods = await getPods(options);
  pods = options.testConfig.kubernetes.pods;

  let podName;

  for (const key in pods) {
    // Get pod name
    let element = pods[key];
    if (element.pod.includes(SMKTEST_CHECK_DEPENDENCIES_FROM_SERVICE)) {
      podName = element.pod;
    }
  }

  console.log(' 🎬 INSTALL DEPENDENCIES LIBRARY: \n');

  let namespace = options.testConfig.kubernetes.namespace;

  console.log(' 1) Update \n');

  console.log(
    `📦 kubectl --namespace=${namespace} exec ${podName} -- apt-get update \n `
  );
  let response = await shell.exec(
    `kubectl --namespace=${namespace} exec ${podName} -- apt-get update`,
    {
      silent: true,
    }
  );

  options.dependencies = { podMaster: podName };

  response = response.stdout; //Get outupts

  console.log(response);

  console.log(' 2) Install net-tool \n');

  console.log(
    `📦 kubectl --namespace=${namespace} exec ${podName} -- apt-get install -y net-tools \n`
  );

  response = await shell.exec(
    `kubectl --namespace=${namespace} exec ${podName} -- apt-get install -y net-tools`,
    {
      silent: false,
    }
  );

  response = response.stdout; //Get outupts

  console.log(' 3) Install tcpdump \n');

  console.log(
    `📦  kubectl --namespace=${namespace} exec ${podName} -- apt-get install -y tcpdump \n`
  );
  response = await shell.exec(
    `kubectl --namespace=${namespace} exec ${podName} -- apt-get install -y tcpdump`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  console.log(' 4) ifConfig \n');
  console.log(
    `🧪  kubectl --namespace=${namespace} exec ${podName} -- ifconfig \n`
  );

  response = await shell.exec(
    `kubectl --namespace=${namespace} exec ${podName} -- ifconfig`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  return options;
}

const { fork } = require('child_process');
var forked = fork('./src/services/kubernetesApi/src/dependencies/runCurl');

async function getDependencies(options) {
  //

  let namespace = options.namespace
    ? options.namespace
    : process.env.SMKTEST_NAMESPACE;

  options = await installLibraryDependencies(options);

  let podMaster = options.dependencies.podMaster;
  //! Get TOKEN:
  let token = await swaggerSmktest.getToken({
    tokenConfig: {
      curlRequest: process.env.SMKTEST_CURL_LOGIN,
    },
  });

  //! Run Script in parallel:

  console.log('⌛️ Test dependencies, run parallel script runCurl.js ');

  forked.send({
    runCurl: true,
    SMKTEST_CURL_LOGIN: process.env.SMKTEST_CURL_LOGIN,
    SMKTEST_CURL_DEPENDENCIES: process.env.SMKTEST_CURL_DEPENDENCIES,
    token: token.tokenObj.tokenValue,
  });

  // console.log('Open tcpdump ');

  let SMKTEST_DEPENDENCIES_NET = process.env.SMKTEST_DEPENDENCIES_NET || 'eth0';

  // console.log(" Use the ")

  console.log(
    `🧪 kubectl --namespace=${namespace} exec ${podMaster} -- timeout 10 tcpdump -c 100 -i ${SMKTEST_DEPENDENCIES_NET} -n \n`
  );
  let netResponse;
  let response = await shell.exec(
    `kubectl --namespace=${namespace} exec ${podMaster} -- timeout 10 tcpdump -c 100 -i ${SMKTEST_DEPENDENCIES_NET} -n`,
    {
      silent: false,
    }
  );

  try {
    netResponse = response.stdout;
  } catch (error) {}

  //! Get expose ports:
  options.dependencies.netResponse = netResponse;

  options = await checkDependencies(options);

  forked.kill('SIGHUP');
  console.log(' 🏁 Close the parallel script');

  return options;
}

// getDependencies({
//   namespace: 'edutelling-develop',
//   testConfig: {
//     kubernetes: {
//       namespace: 'edutelling-develop',
//     },
//   },
// });

module.exports.getDependencies = getDependencies;
