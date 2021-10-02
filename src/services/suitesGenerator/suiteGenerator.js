// Load configuration of the test suites.
const fs = require('fs');
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


  const smokeConfig = require('../../../smktest.json');
  let withStandarVariables = [];

  let config2 = []
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

      smktest.environmentVariable = 'SMKTEST_' + environmentVariable;;
      smktest.environmentVariableResultTest = 'SMKTEST_RESULT_' + environmentVariable;
      smktest.environmentVariableDisabled =
        'SMKTEST_DISABLED_' + environmentVariable;

      withStandarVariables.push(smktest);
    } else {
      config2 = Object.keys(smktest)
    }
  }


  options.smktestConfig = withStandarVariables;
  options.smktestConfigInputs = config2

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

export async function createSuiteByCriterial(options) {
  // Read the criteriaActive
  suitesTest = {};
  for (const criterial of options.criteriaActive) {
    suitesTest[criterial] = '';
    for (const smktest of options.criteriaSplit[criterial]) {
      let testName = Object.keys(smktest.testType)[0];
      //! Load the template case GREP
      if (testName === 'grep') {
        let grepTemplate = await fs.promises.readFile(
          './src/services/suitesGenerator/src/grepTemplate.js',
          'utf-8'
        );
        // grepTemplate = String(grepTemplate)
        grepTemplate = grepTemplate.replaceAll(
          '$$criterial',
          smktest.criterial
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$consoleValue',
          smktest.consoleValue
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$reportCommand',
          smktest.testType.grep.reportCommand
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$testCommand',
          smktest.testType.grep.testCommand.replace(
            '$$namespace',
            options.namespace
          )
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$assert',
          smktest.testType.grep.assert
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$environmentVariableResultTest',
          smktest.environmentVariableResultTest.replace(
            '$$namespace',
            options.namespace
          )
        );
        suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
      }

      //! Load test check Ingress ------------

      if (testName === 'checkIngress') {
        let grepTemplate = await fs.promises.readFile(
          './src/services/suitesGenerator/src/ingressTemplate.js',
          'utf-8'
        );

        // Get List of Ingress.
        options = await getKubeIngress(options);
        let ingressList = options.ingressList;

        for (const ingress of ingressList) {
          // for (const test of smktest){
          for (const test of smktest.testType.checkIngress.testCommand) {
            let testCommand = test.test.replace('$$ingress', ingress);
            grepTemplate = grepTemplate.replaceAll(
              '$$criterial',
              smktest.criterial
            );
            grepTemplate = grepTemplate.replaceAll(
              '$$consoleValue',
              smktest.consoleValue
            );
            grepTemplate = grepTemplate.replaceAll(
              '$$testCommand',
              testCommand
            );
            grepTemplate = grepTemplate.replaceAll('$$assert', test.assert);
            grepTemplate = grepTemplate.replaceAll(
              '$$reportCommand',
              test.reportCommand
            );
            suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
          }
        }
      }

      //! Load test check pods Logs.
      if (testName === 'checkPodsLogs') {
        // Read the template
        let grepTemplate = await fs.promises.readFile(
          './src/services/suitesGenerator/src/podLogsTemplate.js',
          'utf-8'
        );

        // Get Services Name
        options = await getServicesName(options);

        for (service of options.services) {
          grepTemplate = grepTemplate.replaceAll(
            '$$criterial',
            smktest.criterial
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$consoleValue',
            smktest.consoleValue
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$testCommand',
            smktest.testType.checkPodsLogs.testCommand
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$assert',
            smktest.testType.checkPodsLogs.assert
          );
          grepTemplate = grepTemplate.replaceAll(
            '$namespace',
            options.namespace
          );
          grepTemplate = grepTemplate.replaceAll('$serviceName', service);

          // grepTemplate = grepTemplate.replaceAll("$$reportCommand", test.reportCommand)
          suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
        }
      }

      //! Check Volumes mountPath
      if (testName === 'checkVolumes') {
        options = await getMountPath(options);
        let mountPath = options.mountPath;
        let grepTemplate = await fs.promises.readFile(
          './src/services/suitesGenerator/src/grepSimpleTemplate.js',
          'utf-8'
        );

        // get list of keys in json object
        let service = Object.keys(mountPath);
        for (const serviceName of service) {
          grepTemplate = grepTemplate.replaceAll(
            '$$criterial',
            smktest.criterial
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$consoleValue',
            smktest.consoleValue
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$testCommand',
            smktest.testType.checkVolumes.testCommand
          );
          grepTemplate = grepTemplate.replaceAll(
            '$namespace',
            options.namespace
          );
          grepTemplate = grepTemplate.replaceAll('$service', serviceName);
          grepTemplate = grepTemplate.replaceAll(
            '$mountPath',
            mountPath[serviceName].mountPath
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$reportCommand',
            smktest.testType.checkVolumes.reportCommand
          );
          grepTemplate = grepTemplate.replaceAll(
            '$$assert',
            smktest.testType.checkVolumes.assert
          );
          suitesTest[criterial] = suitesTest[criterial] + grepTemplate;
        }
      }
    }
  }

  options.suitesTest = suitesTest;

  return options;
}

export async function writeSuitesTest(options) {
  let path = options.suitePath;

  for (const criterial of options.criteriaActive) {
    let dependenciesFile =
      './src/services/suitesGenerator/src/initDependencies.js';

    console.log('@1Marker-No:_-1478913842');
    console.log(dependenciesFile);

    let grepTemplate = await fs.promises.readFile(dependenciesFile, 'utf-8');
    let consoleValue = criterial;
    consoleValue = consoleValue.substring(2);
    let variable = camelize(consoleValue);
    variable = variable.replaceAll('-', '');
    let fileName = variable + '.test.js';

    let suiteText = grepTemplate + options.suitesTest[criterial];
    await fs.promises.writeFile(path + '/' + fileName, suiteText, 'utf8');
  }
}

// Create Suites Test.
export async function suiteGenerator(options) {


  console.log('@1Marker-No:_-159926971');


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
  }

  // Copy dependencie file
  try {
    await fs.promises.copyFile(
      './src/services/suitesGenerator/src/smokeTestDependencies.js',
      './smokeTest_suites/smokeTestDependencies.js'
    );
  } catch (error) {
    console.log(error.message);
  }

  options.suitePath = path;
  // Write the suitest test by criterial
  options = await writeSuitesTest(options);


}

// let options = {
//      namespace: "edutelling-develop"
// }

export async function getConsoleInputs(options) {

  let standartVariables = await getStandardVariables(options);

  // Load namespaces
  let consoleInputs = [];
  for (const params of standartVariables.smktestConfigInputs){
    consoleInputs.push(params)
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
          consoleInputs.push(stdVariable[k]);çç
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

  let args = options.args
  let standartVariables = await getStandardVariables(options);


  let originalArgs = args

  standartVariables = standartVariables.smktestConfig;
  let criteriaList = [];
  for (const smktest of standartVariables) {
      let criterial = smktest['criterial']      
      if (args[criterial]){
        if (smktest.criterial === criterial){   
          args[smktest.consoleValue] = 'true'
        }
      }
      criteriaList.push(smktest.criterial)

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
  let criterialSet = {}
  
  // get the keys of json objects originalArgs
  let originalArgsKeys = Object.keys(originalArgs)

  for (const criterial of originalArgsKeys) {
    // Verify if criterial is inside of the list of criterials
    if (unicsCriterials.includes(criterial)) {
      criterialSet[criterial] = criteriaDictionary[criterial];           
    }
  }


  // Create dictionary with credentials selected. 
  // input example: 

  console.log('------------------------------------------------')
  options.args = args
  
  return options  
}


export async function createCriterialDicctionary(options) {

  options = await getStandardVariables(options);

  let criteriaDictionary = {};
  
  for (const smktest of options.smktestConfig) {
    try {
      criteriaDictionary[smktest.criterial][smktest.consoleValue] = "false"
    } catch (error) {
      criteriaDictionary[smktest.criterial] = {}
      criteriaDictionary[smktest.criterial][smktest.consoleValue] = "false"
      
    }
  }


  options.criteriaDictionary = criteriaDictionary

  return options;
}

// Create the single suite using criterial and suite name

export async function getSuiteTst(options){

  options = await getStandardVariables(options);
  
  let smokeTestSuites = {}

  for (const criterial of Object.keys(options.customDictionary.suites)) {
    for (const suite of Object.keys(options.customDictionary.suites[criterial])) {
      let value = options.customDictionary.suites[criterial][suite]
      // console.log(criterial + ' ' + suite + ' ' + value)

      // Find Test Suites

      for (const smktest of options.smktestConfig) {
        if (smktest.criterial === criterial && smktest.consoleValue === suite) {
          smktest.defaultValue = value

          // console.log(smktest.criterial + ' ' + smktest.consoleValue + ' ' + smktest.defaultValue
          try {
            smokeTestSuites[criterial][suite] = smktest            
          } catch (error) {
            smokeTestSuites[criterial] = {}
            smokeTestSuites[criterial][suite] = smktest                        
          }
        }
      }
    }
  }


  options.smokeTestSuites = smokeTestSuites
  
  return options

}

export async function createDictionaryInputs(options){

  // CustomDictionary
  options = await createCriterialDicctionary(options);
  let criteriaDictionary = options.criteriaDictionary;
  let customDictionary = options.criteriaDictionary;

  // Active single test:  
  for (const criterial of Object.keys(criteriaDictionary)) {
    for (const test of Object.keys(criteriaDictionary[criterial])) {
      if (options.args[test]){
        customDictionary[criterial][test] = options.args[test]
      }
    }
  }

 

  // Active criteria: 
  for (const args of Object.keys(options.args)) {
    if (customDictionary[args]){
      for (const test of Object.keys(customDictionary[args])) {
        if (customDictionary[args][test] === "false"){
          customDictionary[args][test] = "true"
        }
      }
    }
  }


  let generalOptions = customDictionary['--general-options']

  delete customDictionary['--general-options']

  options.customDictionary = {
    generalOptions: generalOptions,
    suites: customDictionary
  }

  // Load test suite of smktest.json. 
  options  = await getSuiteTst(options)
  
  return options
}
