const { getKS } = require('./connect');

// kubectl get ingress --namespace=edutelling-develop
// kubectl describe nodes
// module.exports.getNodes = async function (options) {
async function getNodes(options) {
  const k8sApi = await getKS();
  // getPodsTotalRequestsAndLimits
  // describeNodeResource
  let listNode = await k8sApi.net;

  // let listNode = await k8sApi.readNodeStatus('openshift.techgap.it');
  // let listNode = await k8sApi.listNode();

  console.log('>>>>>1082346485>>>>>');
  console.log(listNode);
  console.log('<<<<<<<<<<<<<<<<<<<');

  // kubectl describe nodes
}

getNodes();
