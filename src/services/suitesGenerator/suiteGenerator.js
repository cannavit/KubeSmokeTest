// Load configuration of the test suites.
const fs = require('fs');
const shell = require('shelljs');
const Listr = require('listr');

const generatorCase = require('./generatorCases');

const execa = require('execa');

const {
  getKubeIngress,
} = require('../../../src/services/kubernetesApi/src/ingressV2');
const {
  getServicesName,
} = require('../../../src/services/kubernetesApi/src/podsV2');
const {
  getMountPath,
} = require('../../../src/services/kubernetesApi/src/volumeV2');

//TODO: Active the use of one standard variable for disabled the test

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export async function getStandardVariables(options) {
  // Load the smktest.json

  const smokeConfig = require('../../smktest.config.json');
  let withStandardVariables = [];

  let config2 = [];
  for (const smktest of smokeConfig) {
    // '--check-cluster-info' to checkClusterInfo
    let consoleValue = smktest.consoleValue;
    // If the configuration have

    if (consoleValue) {
      consoleValue = consoleValue.substring(2);

      let variable = camelize(consoleValue);
      variable = variable.replaceAll('-', '');
      smktest.variable = variable;

      // '--check-cluster-info' to  'SMKTEST_CHECK_CLUSTER_INFO',
      let environmentVariable = smktest.consoleValue
        .substring(2)
        .toUpperCase()
        .replaceAll('-', '_');

      smktest.environmentVariable = 'SMKTEST_' + environmentVariable;
      smktest.environmentVariableResultTest =
        'SMKTEST_RESULT_' + environmentVariable;
      smktest.environmentVariableDisabled =
        'SMKTEST_DISABLED_' + environmentVariable;

      withStandardVariables.push(smktest);
    } else {
      config2 = Object.keys(smktest);
    }
  }

  options.smktestConfig = withStandardVariables;
  options.smktestConfigInputs = config2;

  return options;
}

//? export variables.
// module.exports.getStandardVariables = getStandardVariables;

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export async function splitCriterials(options) {
  let criteriaSplit = options.smokeConfig;

  let criteriaActive = [];
  for (const criterial of criteriaSplit) {
    criteriaActive.push(criterial.criterial);
  }

  criteriaActive = [...new Set(criteriaActive)];

  let criterialSplit = {};
  for (const criterial of criteriaActive) {
    criterialSplit[criterial] = [];
    for (const criterial2 of criteriaSplit) {
      if (criterial2.criterial === criterial) {
        criterialSplit[criterial].push(criterial2);
      }
    }
  }

  options.criteriaSplit = criterialSplit;
  options.criteriaActive = criteriaActive;

  return options;
}

export async function cleanCriterialsNotUsed(options) {
  let smokeTestSuitesActive = options.smokeTestSuites;
  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      if (options.smokeTestSuites[criterial][test].defaultValue === 'false') {
        delete smokeTestSuitesActive[criterial][test];
      }
    }
  }

  for (const criterial of Object.keys(options.smokeTestSuites)) {
    if (Object.keys(smokeTestSuitesActive[criterial]).length === 0) {
      delete smokeTestSuitesActive[criterial];
    }
  }

  options.smokeTestSuites = smokeTestSuitesActive;

  return options;
}

export async function createSuiteByCriterialV2(options) {
  let printList = [
    {
      title: 'Verify Cluster Connection',
      task: () => {
        return new Listr(
          [
            {
              title: 'Get Cluster Information 01',
              task: () =>
                execa('kubectl', ['cluster-info']).then((result) => {
                  result = result.stdout;
                  if (result === '') {
                    throw new Error('Cluster inaccessible');
                  }
                }),
            },
          ],
          { concurrent: false }
        );
      },
    },
  ];

  options = {
    ...options,
    ...options.customDictionary.generalOptions,
  };

  // Delete test not active
  options = await cleanCriterialsNotUsed(options);

  // Read the criteriaActive:
  let suitesTest = [];
  let listOfTestBuildByCriterial = [];

  for (const criterial of Object.keys(options.smokeTestSuites)) {
    let tests = options.smokeTestSuites[criterial];

    suitesTest[criterial] = '';

    for (const test02 of Object.keys(tests)) {
      let smktest = tests[test02];

      let testName = Object.keys(smktest.testType)[0];

      //! Load the template case GREP
      suitesTest = await generatorCase.grepTemplate(
        options,
        testName,
        smktest,
        suitesTest
      );

      let tasks = new Listr([
        {
          title: `Add ${smktest.criterial} test inside of the suite`,
          task: () => {
            return generatorCase.grepTemplate(
              options,
              testName,
              smktest,
              suitesTest
            );
          },
        },
      ]);

      tasks.run().catch((err) => {
        console.error(err);
      });

      await tasks.run().catch((err) => {
        console.error(err);
      });
      //! Load test check Ingress ------------

      // if (testName === 'checkIngress') {

      //   let grepTemplate = await fs.promises.readFile(
      //     './src/services/suitesGenerator/src/ingressTemplate.js',
      //     'utf-8'
      //   );

      //   // Get List of Ingress.
      options = await getKubeIngress(options);

      //   let ingressList = options.ingressList;

      //   for (const ingress of ingressList) {
      //     // for (const test of smktest){
      //     for (const test of smktest.testType.checkIngress.testCommand) {
      //       let testCommand = test.test.replace('$$ingress', ingress);
      //       grepTemplate = grepTemplate.replaceAll(
      //         '$$criterial',
      //         smktest.criterial
      //       );
      //       grepTemplate = grepTemplate.replaceAll(
      //         '$$consoleValue',
      //         smktest.consoleValue
      //       );
      //       grepTemplate = grepTemplate.replaceAll(
      //         '$$testCommand',
      //         testCommand
      //       );
      //       grepTemplate = grepTemplate.replaceAll('$$assert', test.assert);
      //       grepTemplate = grepTemplate.replaceAll(
      //         '$$reportCommand',
      //         test.reportCommand
      //       );
      //       suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
      //     }
      //   }
      // }

      //! Load test check pods Logs.
      // if (testName === 'checkPodsLogs') {
      //   // Read the template
      //   let grepTemplate = await fs.promises.readFile(
      //     './src/services/suitesGenerator/src/podLogsTemplate.js',
      //     'utf-8'
      //   );

      //   // Get Services Name
      //   options = await getServicesName(options);

      //   for (const service of options.services) {
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$criterial',
      //       smktest.criterial
      //     );
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$consoleValue',
      //       smktest.consoleValue
      //     );
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$testCommand',
      //       smktest.testType.checkPodsLogs.testCommand
      //     );
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$assert',
      //       smktest.testType.checkPodsLogs.assert
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$namespace',
      //       options.customDictionary.generalOptions['--namespace']
      //     );
      //     grepTemplate = grepTemplate.replaceAll('$serviceName', service);

      //     // grepTemplate = grepTemplate.replaceAll("$$reportCommand", test.reportCommand)
      //     suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
      //   }
      // }

      //! Check Volumes mountPath
      // if (testName === 'checkVolumes') {
      //   options = await getMountPath(options);

      //   let mountPath = options.mountPath;
      //   let grepTemplate = await fs.promises.readFile(
      //     './src/services/suitesGenerator/src/grepSimpleTemplate.js',
      //     'utf-8'
      //   );

      //   // get list of keys in json object
      //   let service = Object.keys(mountPath);

      //   for (const serviceName of service) {

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$criterial',
      //       smktest.criterial
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$consoleValue',
      //       smktest.consoleValue
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$testCommand',
      //       smktest.testType.checkVolumes.testCommand
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$namespace',
      //       options.customDictionary.generalOptions['--namespace']
      //     );

      //     // Create test only if is detected the files inside of the volumes

      //     grepTemplate = grepTemplate.replaceAll('$service', serviceName);

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$mountPath',
      //       mountPath[serviceName].mountPath
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$reportCommand',
      //       smktest.testType.checkVolumes.reportCommand
      //     );

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$assert',
      //       smktest.testType.checkVolumes.assert
      //     );

      //     // Test Generator control
      //     let createTest = true;

      //     if (smktest.consoleValue === '--volumes-exist-files') {
      //       let commandFlag = smktest.testType.checkVolumes.testCommand;
      //       commandFlag = commandFlag.replaceAll(
      //         '$$namespace',
      //         options.customDictionary.generalOptions['--namespace']
      //       );
      //       commandFlag = commandFlag.replaceAll('$$service', serviceName);
      //       commandFlag = commandFlag.replaceAll(
      //         '$$mountPath',
      //         mountPath[serviceName].mountPath
      //       );

      //       let respCommand = await shell.exec(commandFlag, {
      //         silent: true,
      //       }).stdout;

      //       createTest = false;
      //     }

      //     if (createTest) {
      //       if (!grepTemplate.includes('$namespace')) {
      //         suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
      //         console.log(
      //           `WARNING: ${smktest.criterial}/${smktest.consoleValue} with ${serviceName} `
      //         );
      //       }
      //     }
      //   }
      // }
      //! Check Ingress simpleCurlAssert

      // let testNameAndFileName = 'simpleCurlAssert';

      // if (testName === testNameAndFileName) {

      //   let grepTemplate = await fs.promises.readFile(
      //     './src/services/suitesGenerator/src/' + testNameAndFileName + '.js',
      //     'utf-8'
      //   );

      //   // create-smktest --curl-assert="curl -v https://edutelling-app-develop.openshift.techgap.it/login 2>&1 | grep -E 'HTTP|<title>'"

      //   let curls =
      //     options.smokeTestSuites['--endpoint-coverage']['--curl-assert']
      //       .defaultValue;

      //   if (curls.includes(';')) {
      //     curls = curls.split(';');
      //   } else {
      //     curls = [curls];
      //   }

      //   for (const curl of curls) {
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$criterial',
      //       smktest.criterial
      //     );
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$consoleValue',
      //       smktest.consoleValue
      //     );

      //     if (smktest.testType[testName].testCommand === 'eval') {
      //       smktest.testType[testName].testCommand = curl;
      //     }

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$testCommand',
      //       smktest.testType[testName].testCommand
      //     );
      //     grepTemplate = grepTemplate.replaceAll(
      //       '$namespace',
      //       options.customDictionary.generalOptions['--namespace']
      //     );

      //     grepTemplate = grepTemplate.replaceAll('$$reportCommand', curl);

      //     grepTemplate = grepTemplate.replaceAll(
      //       '$$assert',
      //       smktest.testType[testName].assert
      //     );

      //     suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
      //   }
      // }
    }
  }

  options.suitesTest = suitesTest;
  return options;
}

//   // return options;
// }
// }

export async function writeSuitesTestV2(options) {
  let path = options.suitePath;

  options = await createSuiteByCriterialV2(options);

  for (const criterial of Object.keys(options.smokeTestSuites)) {
    let dependenciesFile =
      './src/services/suitesGenerator/src/initDependencies.js';

    let grepTemplate = await fs.promises.readFile(dependenciesFile, 'utf-8');

    let consoleValue = criterial;
    consoleValue = consoleValue.substring(2);
    let variable = camelize(consoleValue);
    variable = variable.replaceAll('-', '');
    let fileName = variable + '.test.js';

    let suiteText = grepTemplate + options.suitesTest[criterial];
    let path = './smokeTest_suites';

    await fs.promises.writeFile(path + '/' + fileName, suiteText, 'utf8');
  }
}

// Create Suites Test.
export async function suiteGenerator(options) {
  // Create Standarts Variables.
  options = await getStandardVariables(options);

  // Import dependencies.
  let suiteSmokeTest = '';
  let dependencies = await fs.readFile(
    './src/services/suitesGenerator/src/initDependencies.js',
    'utf8',
    function (err, data) {}
  );

  suiteSmokeTest = suiteSmokeTest + dependencies;

  // Separate by criterials
  options = await splitCriterials(options);
  // Create Test Suite by Criterial
  options = await createSuiteByCriterial(options);

  // Delete folder if exist
  let path = './smokeTest_suites';

  if (fs.existsSync(path)) {
    await fs.rmdirSync(path, { recursive: true });
  }

  // Create Folder if not exit
  if (!fs.existsSync(path)) {
    await fs.mkdirSync(path);
    await fs.mkdirSync(path + '/src');
  }

  // Create Folder if not exit src

  // Copy dependencie file
  try {
    await fs.promises.copyFile(
      './src/services/suitesGenerator/src/smokeTestDependencies.js',
      './smokeTest_suites/src/smokeTestDependencies.js'
    );
  } catch (error) {
    console.log(error.message);
  }

  options.suitePath = path;
  // Write the suitest test by criterial
  options = await writeSuitesTest(options);
}

// Create Suites Test.
export async function suiteGeneratorV2(options) {
  // Import dependencies.
  let suiteSmokeTest = '';

  let dependencies = await fs.readFile(
    './src/services/suitesGenerator/src/initDependencies.js',
    'utf8',
    function (err, data) {}
  );

  suiteSmokeTest = suiteSmokeTest + dependencies;

  // Separate by criterials
  // options = await splitCriterialsV2(options);
  // // Create Test Suite by Criterial
  options = await createSuiteByCriterialV2(options);

  // Delete folder if exist
  let path = './smokeTest_suites';
  if (fs.existsSync(path)) {
    await fs.rmdirSync(path, { recursive: true });
  }
  // Create Folder if not exit
  if (!fs.existsSync(path)) {
    await fs.mkdirSync(path);
    await fs.mkdirSync(path + '/src');
  }

  // Copy dependency file
  try {
    await fs.promises.copyFile(
      './src/services/suitesGenerator/src/smokeTestDependencies.js',
      './smokeTest_suites/src/smokeTestDependencies.js'
    );
  } catch (error) {
    console.log(error.message);
  }

  options.suitePath = './smokeTest_suites';

  // Write the suitest test by criterial
  options = await writeSuitesTestV2(options);
}

export async function getConsoleInputs(options) {
  // console.log('@1Marker-No:_-1953631800');

  let standartVariables = await getStandardVariables(options);

  // Load namespaces
  let consoleInputs = [];
  for (const params of standartVariables.smktestConfigInputs) {
    consoleInputs.push(params);
  }

  for (const stdVariable of standartVariables.smktestConfig) {
    // Get keys name of one json object
    let keys = Object.keys(stdVariable);

    for (const k of keys) {
      if (k.includes('--')) {
        consoleInputs.push(k);
      }
      try {
        if (stdVariable[k].includes('--')) {
          consoleInputs.push(stdVariable[k]);
        }
      } catch (error) {}
    }
  }

  // Remove duplicate data from string list
  consoleInputs = [...new Set(consoleInputs)];

  let commands = {};
  for (const inputs of consoleInputs) {
    commands[inputs] = String;
  }

  return commands;
}

export async function argsByCriterial(options) {
  // console.log('@1Marker-No:_2044119132');

  let args = options.args;
  let standartVariables = await getStandardVariables(options);

  let originalArgs = args;

  standartVariables = standartVariables.smktestConfig;
  let criteriaList = [];

  for (const smktest of standartVariables) {
    let criterial = smktest['criterial'];
    if (args[criterial]) {
      if (smktest.criterial === criterial) {
        args[smktest.consoleValue] = 'true';
      }
    }
    criteriaList.push(smktest.criterial);
  }

  // Get unics criterials from list
  let unicsCriterials = [...new Set(criteriaList)];

  // Create dicctionary of criteria using test
  let criteriaDictionary = {};
  for (const criterial of unicsCriterials) {
    criteriaDictionary[criterial] = [];

    for (const smktest of standartVariables) {
      if (smktest.criterial === criterial) {
        criteriaDictionary[criterial].push(smktest.consoleValue);
      }
    }
  }

  // Build the test set using the inputs and the criteriaDiccionary
  let criterialSet = {};

  // get the keys of json objects originalArgs
  let originalArgsKeys = Object.keys(originalArgs);

  for (const criterial of originalArgsKeys) {
    // Verify if criterial is inside of the list of criterials
    if (unicsCriterials.includes(criterial)) {
      criterialSet[criterial] = criteriaDictionary[criterial];
    }
  }

  // Create dictionary with credentials selected.
  // input example:

  options.args = args;

  return options;
}

export async function createCriterialDicctionary(options) {
  options = await getStandardVariables(options);

  let criteriaDictionary = {};

  for (const smktest of options.smktestConfig) {
    try {
      criteriaDictionary[smktest.criterial][smktest.consoleValue] = 'false';
    } catch (error) {
      criteriaDictionary[smktest.criterial] = {};
      criteriaDictionary[smktest.criterial][smktest.consoleValue] = 'false';
    }
  }

  options.criteriaDictionary = criteriaDictionary;

  return options;
}

// Create the single suite using criterial and suite name

export async function getSuiteTst(options) {
  options = await getStandardVariables(options);

  let smokeTestSuites = {};

  for (const criterial of Object.keys(options.customDictionary.suites)) {
    for (const suite of Object.keys(
      options.customDictionary.suites[criterial]
    )) {
      let value = options.customDictionary.suites[criterial][suite];

      // Find Test Suites

      for (const smktest of options.smktestConfig) {
        if (smktest.criterial === criterial && smktest.consoleValue === suite) {
          smktest.defaultValue = value;

          try {
            smokeTestSuites[criterial][suite] = smktest;
          } catch (error) {
            smokeTestSuites[criterial] = {};
            smokeTestSuites[criterial][suite] = smktest;
          }
        }
      }
    }
  }

  options.smokeTestSuites = smokeTestSuites;

  return options;
}

export async function createDictionaryInputs(options) {
  // CustomDictionary
  options = await createCriterialDicctionary(options);
  let criteriaDictionary = options.criteriaDictionary;
  let customDictionary = options.criteriaDictionary;

  // Active single test:
  for (const criterial of Object.keys(criteriaDictionary)) {
    for (const test of Object.keys(criteriaDictionary[criterial])) {
      if (options.args[test]) {
        customDictionary[criterial][test] = options.args[test];
      }
    }
  }

  // Active criteria:
  for (const args of Object.keys(options.args)) {
    if (customDictionary[args]) {
      for (const test of Object.keys(customDictionary[args])) {
        if (customDictionary[args][test] === 'false') {
          customDictionary[args][test] = 'true';
        }
      }
    }
  }

  let generalOptions = customDictionary['--general-options'];

  delete customDictionary['--general-options'];

  options.customDictionary = {
    generalOptions: generalOptions,
    suites: customDictionary,
  };

  // Load test suite of smktest.json.
  options = await getSuiteTst(options);

  return options;
}

// create-smktest --curl-assert="curl -v https://edutelling-app-develop.openshift.techgap.it 2>&1  | grep -E 'HTTP|<title>'"
