var _ = require('lodash');
const fs = require('fs');
const shell = require('shelljs');
const arg = require('arg');
require('dotenv').config();
const chalk = require('chalk');

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

async function toCammel(name: string) {
  let nameCamel = camelize(name);

  nameCamel = _.replace(nameCamel, '-', '');
  nameCamel = _.replace(nameCamel, '-', '');
  nameCamel = _.replace(nameCamel, '-', '');
  nameCamel = _.replace(nameCamel, '-', '');
  nameCamel = _.replace(nameCamel, '-', '');

  nameCamel = _.lowerFirst(nameCamel);

  return nameCamel;
}

// Import Standart Variables from smktest.config.json
// function typescript, inputs list of string
// Name of the function getStandardVariables
async function getStandardVariables(options: any) {

  let pathConfigurationFile: string = './smktest.config.json';

  // Verify if the configuration file exist.
  // If not, throw an error.
  let existConfigFile: boolean = await fs.existsSync(pathConfigurationFile);

  if (!existConfigFile) {
    throw new Error(
      `The configuration file ${pathConfigurationFile} does not exist.`
    );
  }

  // Import Config File
  const smokeConfig = require('../../smktest.config.json');

  // Initialize Lists
  let withStandardVariables: string[] = [];
  let config2: string[] = [];

  for (const smktest of smokeConfig) {
    // Console value associate with the test example (--check-nodes)
    let consoleValue: string = smktest.consoleValue;

    if (consoleValue !== undefined) {
      // Criterial value associate with the test example ("--cluster-coverage")
      let criterial: string = smktest.criterial;
      let variable: string = await this.toCammel(consoleValue);

      // Add variables inside of the smktest object.
      smktest.variable = variable;

      // Create the next data structure
      // '--check-cluster-info' to  'SMKTEST_CHECK_CLUSTER_INFO',

      let environmentVariable: string = variable.substring(2).toUpperCase();

      environmentVariable = _.replace(environmentVariable, '-', '');

      smktest['environmentVariable'] = 'SMKTEST_' + environmentVariable;
      smktest['environmentVariableResultTest'] =
        'SMKTEST_RESULT_' + environmentVariable;
      smktest['environmentVariableDisabled'] =
        'SMKTEST_DISABLED_' + environmentVariable;

      withStandardVariables.push(smktest);
    } else {
      config2 = Object.keys(smktest);
    }
  }

  options['smktestConfig'] = withStandardVariables;
  options['smktestConfigInputs'] = config2;

  return options;
}

// Verify if the the library have access to culster brefore to run the generator suite
// Use one eval command for try to get one cluster simple feedback
async function checkAccessToCluster(options: any) {
  // Run one command line using the shell
  let command: string =
    'kubectl cluster-info | grep -v "diagnose" | grep "running"';

  let result: string = await shell.exec(command, {
    silent: true,
  }).stdout;

  // Verify if the command return a feedback
  let passTest = false;
  if (result !== '') {
    passTest = true;
  } else {
    // Create error event
    throw new Error(
      'Not is possible generate the suite test, loss cluster connection'
    );
  }

  // options['checkAccessToCluster'] = {clusterActive: passTest}

  return passTest;
}

// Old Name createSuiteByCriterialV2
async function createSuiteByCriterial(options: any) {
  // console.log('@1Marker-No:_1995650075');

  //   console.log(">>>>>609442077>>>>>")
  // console.log(options)
  // console.log("<<<<<<<<<<<<<<<<<<<")

  return options;
}

// Create the list of criteria and test.
// Old Name splitCriterials
async function splitCriterial(options: any) {
  let criterialSplit = options.smokeConfig;

  // console.log(">>>>>-688026535>>>>>")
  // console.log(criterialSplit)
  // console.log("<<<<<<<<<<<<<<<<<<<")
}

// console.log('@1Marker-No:_-1953631800');
//! Test verify
async function getConsoleInputs(options: any) {

  let standartVariables: any = await this.getStandardVariables(options);

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

async function parseArgumentsIntoOptions(args: any) {

  let argumentsCli = await this.getConsoleInputs({});

  // With this is possible add one argument --cluster-coverage  === --cluster-coverage=true
  let argsL = [];
  for (const r of args) {
    let envent2 = r.includes('=');
    if (r.includes('--') && !envent2) {
      argsL.push(r + '=true');
    }

    let envent3: any = !r.includes('--');
    if (envent3 | r.includes('=true') | r.includes('=')) {
      argsL.push(r);
    }
  }
  

  //! Black list of arguments Delete all arguments 
  for  (const iterator of Object.keys(argumentsCli)) {
    if (iterator.includes('async ()')){
      delete argumentsCli[iterator]
    } 
  }

  //! Register arguments
  args = arg(argumentsCli, {
    argv: argsL.slice(2),
  });

  let options = {
    args: args,
    argumentsCli: argumentsCli,
  };

  args = await this.argsByCriterial(options);
  args = await this.createDictionaryInputs(args);

  const smokeTestVariableList = [];
  // console.log('@1Marker-No:_-1565193173');

  let smktestConfig = await this.getStandardVariables({}); //!OK

  for (const smktest of smktestConfig['smktestConfig']) {
    smokeTestVariableList.push(smktest);
  }

  let argumentsData = {};
  let listOfJestPath = [];
  for (const element of smokeTestVariableList) {
    let data = args[element.consoleValue] || element.defaultValue;
    //! If exist parameter inside of the console (* Have priority)
    let useNext = true;

    if (data) {
      process.env[element.environmentVariable] = data;
      useNext = false;
      if (element.jestTestPath !== '') {
        listOfJestPath.push(element.jestTestPath);
      }
    }

    //! If exist environment variable get value:
    if (process.env[element.environmentVariable] && useNext) {
      data = process.env[element.environmentVariable];
      if (element.jestTestPath !== '') {
        listOfJestPath.push(element.jestTestPath);
      }
    }

    argumentsData['listOfJestPath'] = listOfJestPath;
    argumentsData[element.variable] = data;

    // argumentsData.customDictionary = args.customDictionary;

    argumentsData = {
      listOfJestPath: listOfJestPath,
      data: data,
      ...args,
    };
  }

  return argumentsData;
}

// Create Group by Criteria
async function argsByCriterial(options: any = {}) {
  // console.log('@1Marker-No:_2044119132');

  let args: any = options.args;

  let standartVariables: any = await this.getStandardVariables(options);

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

async function getSuiteTst(options) {
  options = await this.getStandardVariables(options);
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

  options['smokeTestSuites'] = smokeTestSuites;
  return options;
}

async function createCriterialDicctionary(options) {
  options = await this.getStandardVariables(options);

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

async function createDictionaryInputs(options) {
  // CustomDictionary
  options = await this.createCriterialDicctionary(options);

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
  options = await this.getSuiteTst(options);

  return options;
}

async function inputMandatory(options, variableRequired) {

  var keys = Object.keys(options.args);
  let pass = false;

  for (const key of keys) {
    if (key === variableRequired) {
      pass = true;
    }
  }

  if (
    pass !== true ||
    options[variableRequired] === 'false' ||
    options[variableRequired] === false
  ) {
    console.log(chalk.red.bold('ERROR: INPUT MANDATORY'));
    throw new Error(
      chalk.yellow.bold(` 🛑  The Input: ${variableRequired} is required`)
    );
  }

  return options;
}

export default {
  toCammel,
  getStandardVariables,
  createSuiteByCriterial,
  checkAccessToCluster,
  splitCriterial,
  getConsoleInputs,
  parseArgumentsIntoOptions,
  argsByCriterial,
  createDictionaryInputs,
  createCriterialDicctionary,
  getSuiteTst,
  inputMandatory,
};
