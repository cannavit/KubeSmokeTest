const shell = require('shelljs');

async function test() {
  console.log('@1Marker-No:_354467327');

  for (const key in [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]) {
    let element = [key];

    console.log(key);
    let response = await shell.exec(
      `curl 'https://edutelling-api-staging.openshift.techgap.it/api/v1/auth/user' \
    -H 'authority: edutelling-api-staging.openshift.techgap.it' \
    -H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIjMTU6M183OTU5NzYiLCJhY2NvdW50SWQiOiIjMTU6MyIsImVtYWlsIjoibC52ZXJkaUBlZHV0ZWxsaW5nLml0IiwiZW50aXR5VHlwZSI6IlN0dWRlbnQiLCJlbnRpdHlJZCI6IiMzMTowIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpYXQiOjE2MjQ2MjUwOTksImV4cCI6MTYyNDYzNTg5OX0.OCXAdc7_dxCilRINuY2GPKK3I75gI7RcQs3Bebd4ZjM' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36' \
    -H 'origin: https://edutelling-app-staging.openshift.techgap.it' \
    -H 'sec-fetch-site: same-site' \
    -H 'sec-fetch-mode: cors' \
    -H 'sec-fetch-dest: empty' \
    -H 'referer: https://edutelling-app-staging.openshift.techgap.it/' \
    -H 'accept-language: en-US,en;q=0.9,es;q=0.8' \
    --compressed`,
      {
        silent: true,
      }
    );
  }

  //   response = response.stdout; //Get outupts
}

test();

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

// Install:
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get update
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get install -y net-tools
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- apt-get install -y tcpdump
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- ifconfig
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- tcpdump
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- tcpdump -i eth0 -n
