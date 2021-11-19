const shell = require('shelljs');
const { inputMandatory } = require('../utils/inputsMandatories');

async function getServicesName(options) {
  await inputMandatory(options, '--namespace');

  let command =
    "kubectl get pods -n $$namespace -o jsonpath='{.items[*].spec.containers[*].volumeMounts[*].mountPath}'";
  console.log('@1Marker-No:_-1539542204');

  command = command.replace('$$namespace', options['--namespace']);

  let response = await shell.exec(command, {
    silent: true,
  }).stdout;

  response = response.split(' ');

  // Delete the last element of one list

  let responseFilter = [];
  for (const r of response) {
    if (!r.includes('kubernetes')) {
      responseFilter.push(r);
    }
  }

  console.log(responseFilter);

  options.services = response;

  return options;
}

// export module

const { response } = require('express');

//! Test Decriptions.
// 1. Get space for the pods
// 2. Get space available for pod.
// 3. Get space available inside of the cluster.
// 4. Check if space is > 30% by default

// kubectl get pvc --namespace=edutelling-develop
// kubectl top pod   --namespace=edutelling-develop --containers
//  kubectl get storageclasses
// kubectl --namespace=edutelling-develop exec edutelling-api-68f5bfbbbd-wtg2g -- df -h --block-size=1GB /usr/src/app/uploads
// kubectl -n edutelling-develop get --raw /apis/metrics.k8s.io/v1beta1/namespaces/default/pods/edutelling-api-68f5bfbbbd-wtg2g | jq

async function convertToMi(unit) {
  //   unit = '8Gi';

  let changeUnit = [
    { serachUnit: 'B', multiply: 0.000001 },
    { serachUnit: 'MB', multiply: 1 },
    { serachUnit: 'kB', multiply: 0.001 },
    { serachUnit: 'Mi', multiply: 1 },
    { serachUnit: 'Gi', multiply: 1024 },
  ];

  let unitMi;
  for (const key in changeUnit) {
    let element = changeUnit[key];

    let data = unit.indexOf(element.serachUnit);

    if (data !== -1) {
      unitMi = parseFloat(unit.substr(0, data)) * element.multiply;
    }
  }

  return unitMi;
}

async function textToList(response) {
  // Inputs Example
  // Filesystem     1GB-blocks  Used Available Use% Mounted on
  // tmpfs                  34     1        34   1% /run/secrets/kubernetes.io/serviceaccount

  // Output Example:
  //   { Filesystem: '/dev/nvme1n1p1',
  //   '1GB-blocks': '503',
  //   Used: '161',
  //   Available: '317',
  //   'Use%': '34%',
  //   Mounted: '/usr/src/app/uploads',
  //   on: undefined }

  response = response.trim().split(/\r?\n/);
  elementList = [];
  for (const key in response) {
    let element = response[key];
    element = element.split(' ');

    let data = [];
    let count = -1;
    for (const key in element) {
      count = count + 1;
      let i = element[key];
      if (i !== '') {
        data.push(i);
      }
    }
    elementList.push(data);
  }

  output = {};
  for (const key in elementList[0]) {
    output[elementList[0][key]] = elementList[1][key];
  }

  return output;
}

async function getPodsCapacity(options) {
  let response = await shell.exec(
    `kubectl get pvc --namespace=${options.customDictionary.generalOptions['--namespace']}`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts
  let responseOriginal = response;

  response = response.trim().split(/\r?\n/);
  //   response[0] = '';

  let capacityKey, unitMi, name, status, volume, access, modes, storageclass;
  let dataOutput = [];

  for (const key in response) {
    let element = response[key];
    element = element.split(' ');

    data = [];
    for (const key in element) {
      let i = element[key];
      if (i !== '') {
        data.push(i);
      }
    }
    // Get Position inside of the array
    if (data.indexOf('CAPACITY') !== -1) {
      capacityKey = data.indexOf('CAPACITY');
      name = data.indexOf('NAME');
      status = data.indexOf('STATUS');
      volume = data.indexOf('VOLUME');
      access = data.indexOf('ACCESS');
      modes = data.indexOf('MODES');
      storageclass = data.indexOf('STORAGECLASS');
      age = data.indexOf('AGE');
    } else {
      let capacity = data[capacityKey];

      unitMi = await convertToMi(capacity);

      capacityList = {
        NAME: data[name],
        STATUS: data[status],
        VOLUME: data[volume],
        CAPACITY: data[capacityKey],
        ACCESS: data[access],
        MODES: data[modes],
        STORAGECLASS: data[storageclass],
        AGE: data[age],
        MB: unitMi,
      };

      dataOutput.push(capacityList);
    }
  }

  options.volumePvc = {
    output: dataOutput,
    responseOriginal: responseOriginal,
  };

  return options;
}

//! Get volumes for

async function getVolumePath(options) {
  let namespace = options.customDictionary.generalOptions['--namespace'];

  const shell = require('shelljs');

  let response = await shell.exec(
    `kubectl get pods --namespace=${namespace} -o json`,
    {
      silent: true,
    }
  );

  response = response.stdout; //Get outupts
  response = JSON.parse(response);

  volumes = {};

  let volumeMounts = [];
  for (const key in response.items) {
    let element = response.items[key].spec.containers;
    let name = element[0].name;
    let podName = response.items[key].metadata.name;

    for (const key2 in element) {
      let element2 = element[key2].volumeMounts;
      for (const key3 in element2) {
        let element3 = element2[key3];
        element3.serviceName = name;

        //! Check Space in path volume.
        if (!element3.name.includes('default-token'))
          volumes[podName] = {
            volume: element3.mountPath,
          };
      }
    }
  }

  // Replace the pod name by service name>
  command =
    "kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v 'NAME'";
  response = await shell.exec(
    command.replace('$$namespace', options['--namespace']),
    { silent: true }
  ).stdout;
  response = response.split('\n');
  // Delete the last element
  response.pop();

  // Get only names of one json object
  let podsName = Object.keys(volumes);
  let serviceVolumes = {};
  for (const service of response) {
    for (pod of podsName) {
      if (pod.includes(service)) {
        serviceVolumes[service] = {
          mountPath: volumes[pod].volume,
        };
      }
    }
  }

  options.mountPath = serviceVolumes;

  return options;
}

//! Test for check volume spaces.
module.exports.getMountPath = getVolumePath;

// getVolumePath({namespace: "edutelling-develop"})
// edutelling-develop  exec service/edutelling-orientdb -- df -h --block-size=1GB /orientdb/databases
