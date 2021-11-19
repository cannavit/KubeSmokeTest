const shell = require('shelljs');

// async function checkNetworks(options) {
module.exports.checkNetworks = async function (options) {
  //
  let masterNetworkPod = process.env.SMKTEST_CHECK_NETWORKS_FROM_SERVICE;
  let namespace = process.env.SMKTEST_NAMESPACE;

  let pods = options.testConfig.kubernetes.pods;
  let podName;

  for (const key in pods) {
    // Get pod name
    let element = pods[key];
    if (element.pod.includes(masterNetworkPod)) {
      podName = element.pod;
    }
  }

  let response = await shell.exec(
    `kubectl get ep  --namespace=${namespace} -o json`,
    // 'echo $HOME',
    // 'kubectl config view',
    // 'echo "$(<kubectl.sha256)  kubectl" | shasum -a 256 --check',
    {
      silent: true,
    }
  );

  response = JSON.parse(response.stdout); //Get outupts

  let passTest = true;

  let abstract = '';
  let checkIfHavePing = true; //Control
  for (const key in response.items) {
    let element = response.items[key];

    let name = element.metadata.name;

    for (const key in element.subsets) {
      for (const k in element.subsets[key].addresses) {
        let ee = element.subsets[key].addresses[k];

        let cover = 'ping network ' + podName;
        let query = `kubectl --namespace=${namespace} exec ${podName} -- ping -c 3 ${ee.ip}`;

        let shellOut = await shell.exec(query, {
          silent: true,
        });

        let stringReport;
        if (shellOut.stdout) {
          stringReport =
            ' ✅ SUCCESS PING TO: ' +
            cover +
            ' \n \n' +
            '🧪 🟢 ' +
            query +
            '\n \n' +
            shellOut.stdout +
            '------------------\n \n';
        }
        if (shellOut.stderr) {
          passTest = false;
          if (
            shellOut.stderr.includes('command terminated with exit code 126\n')
          ) {
            shellOut.stderr =
              ' 🟠 WARNING PODS NOT HAVE PING ACCESS, SELECT OTHER NETWORK SERVICE ';
            passTest = 'NOT_WORK_SERVICE_NOT_HAVE_PING_ACCESS';
          }

          stringReport =
            ' ❌ FAIL PING TO: ' +
            cover +
            ' \n \n' +
            '🧪 🛑 💨 ' +
            query +
            '\n \n \n OUTPUT' +
            shellOut.stderr +
            '----------------\n\n';
        }

        abstract = abstract + '\n\n\n' + stringReport;

        if (shellOut.stderr) {
          passTest = true;
        }
      }
    }
  }

  options.network = {
    abstract: abstract,
    passTest: passTest,
  };

  process.env.SMKTEST_OPTIONS_NETWORK = JSON.stringify({
    abstract: abstract,
    passTest: passTest,
  });

  return options;
};

// checkNetworks();
