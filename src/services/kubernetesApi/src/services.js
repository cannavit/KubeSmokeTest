const { getKS } = require('./connect');

module.exports.getServices = async function (options) {
  const k8sApi = await getKS();
  let nameSpace = await options.testConfig.kubernetes.namespace;

  let listServices = [];
  let listNamespace;
  try {
    listNamespace = await k8sApi.listNamespacedService(nameSpace);
  } catch (error) {
    console.log(error.message);
  }

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

  console.log(listServices);

  if (options.testConfig.kubernetes.services) {
    options.testConfig.kubernetes.services = listServices;
  } else {
    options.testConfig.kubernetes = {
      services: listServices,
    };
  }
  return options;
};
