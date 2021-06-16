// kubectl get ingress --namespace=edutelling-develop -o json

const { response } = require('express');
const shell = require('shelljs');

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

  let SMKTEST_INGRESS_BY_TEST = '';
  for (const key in ingressWithPathList) {
    let element = ingressWithPathList[key];
    SMKTEST_INGRESS_BY_TEST = SMKTEST_INGRESS_BY_TEST + '@@s@@' + element;
  }

  process.env['SMKTEST_KUBERNETES_INGRESS_BY_TEST'] = SMKTEST_INGRESS_BY_TEST;

  return options;
};
