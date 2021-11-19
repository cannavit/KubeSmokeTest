const { getKS } = require('./connect');

module.exports.getServices = async function (options) {
  //
  const k8sApi = await getKS();

  if (!options.customDictionary.generalOptions['--namespace']) {
    options = JSON.parse(process.env.SMKTEST_OPTIONS);
  }
  let nameSpace = options.customDictionary.generalOptions['--namespace']; //?

  let listServices = [];
  let listNamespace;

  listNamespace = await k8sApi.listNamespacedService(nameSpace);

  listNamespace.body.items.map((data) => {
    let ports = data.spec.ports;
    let name = data.spec.selector.app;
    let type = data.spec.type;

    if (ports) {
      for (const key in ports) {
        let port = ports[key];
        if (name) {
          listServices.push({
            port: port.port,
            targetPort: port.targetPort,
            protocol: port.protocol,
            name: name,
            type: type,
            checkCurl: [
              {
                url: name + ':' + port.port,
                statusCode: undefined,
                testStatus: 'pending',
                name: name,
                curl: undefined,
              },
              {
                url: 'http://localhost:' + port.port,
                statusCode: undefined,
                testStatus: 'pending',
                name: name,
                curl: undefined,
              },
              {
                url: name + ':' + port.targetPort,
                statusCode: undefined,
                testStatus: 'pending',
                name: name,
                curl: undefined,
              },
              {
                url: 'http://localhost:' + port.targetPort,
                statusCode: undefined,
                testStatus: 'curl: undefined',
                name: name,
                curl: undefined,
              },
            ],
          });
        }
      }
    }
  });

  if (options.testConfig) {
    options.testConfig.kubernetes.services = listServices;
  } else {
    options.testConfig = {
      kubernetes: {
        services: listServices,
      },
    };
  }

  return options;
};
