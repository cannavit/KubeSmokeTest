const { response } = require('express');
const shell = require('shelljs');
require('dotenv').config();
const swaggerSmktest = require('swagger-smktest');
const { getPods } = require('./pods');

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

async function installLibraryDependencies(options) {
  console.log('>>>>>-1680542299>>>>>');
  console.log(options);
  console.log('<<<<<<<<<<<<<<<<<<<');
  //
  let SMKTEST_CURL_DEPENDENCIES_FROM_SERVICE =
    process.env.SMKTEST_CURL_DEPENDENCIES_FROM_SERVICE;

  let pods = await getPods(options);
  pods = options.testConfig.kubernetes.pods;
  let podName;

  for (const key in pods) {
    // Get pod name
    let element = pods[key];
    if (element.pod.includes(SMKTEST_CURL_DEPENDENCIES_FROM_SERVICE)) {
      podName = element.pod;
    }
  }

  console.log(' INSTALL DEPENDENCIES LIBRARY: ');

  console.log(' 1) Update ');
  let response = await shell.exec(
    `kubectl --namespace=edutelling-develop exec ${podName} -- apt-get update`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  console.log(response);

  console.log(' 2) Install net-tool ');

  response = await shell.exec(
    `kubectl --namespace=edutelling-develop exec ${podName} -- apt-get install -y net-tools`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  console.log(response);

  console.log(' 3) Install tcpdump');

  response = await shell.exec(
    `kubectl --namespace=edutelling-develop exec ${podName} -- apt-get install -y tcpdump`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  console.log(response);

  console.log(' 4) ifConfig ');
  response = await shell.exec(
    `kubectl --namespace=edutelling-develop exec ${podName} -- ifconfig`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts

  console.log(response);

  return options;
}

// installLibraryDependencies({
//   testConfig: {
//     kubernetes: {
//       namespace: 'edutelling-develop',
//     },
//   },
// });

async function getDependencies(options) {
  console.log('@1Marker-No:_354467327');

  console.log();

  await installLibraryDependencies({
    testConfig: {
      kubernetes: {
        namespace: 'edutelling-develop',
      },
    },
  });

  console.log('Open tcpdump ');
  response = shell.exec(
    `kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- timeout 5400 tcpdump -c 30 -i eth0 -n -w ./captura_dep.pcap`,
    {
      silent: false,
    }
  );

  console.log('>>>>>1415158349>>>>>');
  console.log(response);
  console.log('<<<<<<<<<<<<<<<<<<<');
  // await initDependencies();

  return options;
}

getDependencies();

// >>>>>>>>>>>>>>>>>>>>> NETWORK >>>>>>>>>>>>>>>>>
// master-service-network: edutelling-api
// check-pods-internet-access: true
// check-pods-internal-network: true
// kubectl get ep edutelling-api --namespace=edutelling-staging
// kubectl --namespace=edutelling-staging exec edutelling-api-78b64d76fd-ljkkk -- ping 10.42.0.33

// https://xxradar.medium.com/how-to-tcpdump-effectively-in-kubernetes-part-2-7e4127b42dc7
// Check Networks.
// 1. Select one pod
// edutelling-api-68f5bfbbbd-wtg2g
// get pods -n edutelling-develop

// 1) Install DEPENDENCIES:
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get update
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get install -y net-tools
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get install -y tcpdump
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- ifconfig

// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- tcpdump
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- tcpdump  -i eth0 -n

// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- tcpdump -c 30 -i eth0 -n ./captura_dep.pcap
