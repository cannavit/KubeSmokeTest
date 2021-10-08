const shell = require('shelljs');
const { inputMandatory } = require('../utils/inputsMandatories');

async function getKubeIngress(options) {


  await inputMandatory(options, '--namespace');
  let testCommand =
    "kubectl get ingress -n $$namespace  -o=jsonpath='{.items[*].spec.rules[*]}'";

  
  testCommand = testCommand.replace('$$namespace', options['--namespace']);

  let responseReport = await shell.exec(testCommand, {
    silent: true,
  }).stdout;

  responseReport = responseReport.split(' ');


  let ingressList = [];

  for (response of responseReport) {

    response = JSON.parse(response);

    var keys = Object.keys(response);
    for (path in response) {
      for (p in response[path].paths) {
        let res = 'http://' + response.host + response[path].paths[p].path;
        ingressList.push(res);
      }
    }
  }

  // responseReport = JSON.parse(responseReport)

  options.ingressList = ingressList;

  return options;
}

module.exports.getKubeIngress = getKubeIngress;

// let options = {
//     namespace: "edutelling-develop"
// }
// getKubeIngress(options)
