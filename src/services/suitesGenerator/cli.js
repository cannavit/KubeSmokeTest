import arg from 'arg';
import inquirer from 'inquirer';
import { createProject, runMultiTasks } from './main';
import figlet from 'figlet';
import { runJestTest } from './runJestTest';
import { generateCasesSwagger } from './services/smktestSwagger';
// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
import { smktestCheckIfAllPodsAreActive } from './services/kubernetesApi/smokeTest/smktestPods';

// Kubernetes:
import { cliKubernetes } from './services/kubernetesApi/cli.ts';
import { kubernetesIngress } from './services/kubernetesApi/src/ingress';
import { checkConditions } from './services/kubernetesApi/src/conditions';
import { getLogs } from './services/kubernetesApi/src/logs';
import { getPods } from './services/kubernetesApi/src/pods';
import { checkNetworks } from './services/kubernetesApi/src/network';
import {
  checkClusterNodes,
  ifGrepHaveOutputIsError,
} from './services/kubernetesApi/src/checkClusterNodes';

//? Read the standards Variables.

const suiteGenerator = require('./services/suitesGenerator/suiteGenerator');

import generateUniqueId from 'generate-unique-id';

require('dotenv').config();
//Single  Test.
import { curlSingleTest } from './services/assertTest/services/curl';

async function parseArgumentsIntoOptions(rawArgs) {
  // Get Arguments list from the configuration file.
  let argumentsCli = await getConsoleInputs({});

  const args = arg(argumentsCli, {
    argv: rawArgs.slice(2),
  });

  let argumentsData = {};

  argumentsData.args = args;
  let argumentsData = await argsByCriterial(argumentsData);
  let args = argumentsData.args;

  const smokeTestVariableList = [];

  // Add Configuration Variables from smktest.json
  let smktestConfig = await getStandardVariables({});
  for (const smktest of smktestConfig['smktestConfig']) {
    smokeTestVariableList.push(smktest);
  }

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
  }

  return argumentsData;
}

//! 1) Option: Criterial.

async function promptForContext(options) {
  const defaultSelection = 'localhost';

  if (options.skipPrompts) {
    return {
      ...options,
      criterial: options.context || defaultSelection,
    };
  }

  const questions = [];

  if (!options.projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Add your projectName:',
    });
  }

  if (!options.environmentVariable) {
    questions.push({
      type: 'input',
      name: 'environmentVariable',
      message: 'Add an environment variable to associate (example: NODE_ENV):',
    });
  }

  if (!options.environment) {
    questions.push({
      type: 'input',
      name: 'environment',
      message:
        'Add the smoke test environment where apply the test (example: develop, production, test):',
    });
  }

  if (!options.context) {
    questions.push({
      type: 'rawlist',
      name: 'context',
      message: 'Please choose a smoke test context:',
      choices: [
        'localhost',
        'specific host',
        'docker',
        'kubernetes',
        'remote-server',
      ],
    });
  }

  let answers;
  if (options.configFile) {
    // only with --create-config-file
    answers = await inquirer.prompt(questions);
  }

  //! Default values >>>
  let projectName;
  try {
    projectName = answers.projectName;
  } catch (error) {
    projectName = 'undefined';
  }
  let environmentVariable;
  try {
    projectName = answers.environmentVariable;
  } catch (error) {
    environmentVariable = 'undefined';
  }
  let environment;
  try {
    projectName = answers.environment;
  } catch (error) {
    environment = 'kubernetes';
  }
  let context;
  try {
    projectName = answers.context;
  } catch (error) {
    context = 'kubernetes';
  }

  return {
    ...options,
    projectName: options.projectName || projectName,
    environmentVariable: options.environmentVariable || environmentVariable,
    environment: options.environment || environment,
    context: options.context || context,
    // scannerApiMethod: options.scannerApiMethod || answers.scannerApiMethod,
  };
}

async function promptForScannerAPI(options) {
  // options.

  //! Context localhost:

  if (options.skipPrompts) {
    return {
      ...options,
      curlLogin: options.curlLogin || '',
      swaggerUrl: options.swaggerUrl || '',
    };
  }

  const questions = [];
  if (options.scannerApiMethod === 'Swagger/OpenApi') {
    // Add the API url swagger

    if (!options.swaggerUrl) {
      questions.push({
        type: 'input',
        name: 'swaggerUrl',
        message:
          'Add you swagger documentation url, example: https://.../v2/swagger.json (N/None)',
      });
    }

    if (!options.curlLogin) {
      questions.push({
        type: 'input',
        name: 'curlLogin',
        message:
          'Copy your CURL for create one login, example: curl -X POST "https://... (N/None)',
      });
    }
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    swaggerUrl: options.swaggerUrl || answers.swaggerUrl,
    curlLogin: options.curlLogin || answers.curlLogin,
  };
}

import promptDocker from './services/dockerService';

export async function cli(args) {
  //! Presentation text:

  let options = await parseArgumentsIntoOptions(args);

  // Generate the Test Unic ID.
  const id = generateUniqueId({
    length: 32,
    useLetters: true,
  });

  options.testId = id;

  options.projectDir = __dirname; // SmokeTest route
  options.smktestFolder = 'smktest'; // SmokeTet base directory
  options = await promptForContext(options);

  //! Run Context test.
  process.env.SMKTEST_OPTIONS = JSON.stringify(options);
  //

  if (options.context === 'kubernetes' || options.context == undefined) {
    //! Namespace not required >>>>>
    //* Check the node cluster conditions:
    if (options.checkConditions) {
      options = await checkConditions(options);
    }

    //* Check nodes cluster status.
    if (options.checkClusterNodes) {
      options = await checkClusterNodes(options);
    }

    if (options.checkClusterInfo) {
      // RUN SCRIPT FOR GET CLUSTER INFO
      let grepTestCommand =
        'kubectl cluster-info | grep "Kubernetes" | grep -v  "running"';
      let grepReportCommand = 'kubectl cluster-info';
      let variableEnvResponse = 'SMKTEST_KUBERNETES_CLUSTER_INFO';
      options = await ifGrepHaveOutputIsError(
        options,
        grepTestCommand,
        grepReportCommand,
        variableEnvResponse
      );
      // ADD OF TETS LIST
      options = await checkClusterNodes(options);
    }
    //! <<<<<<xz

    if (options.customDictionary.generalOptions['--namespace']) {
      //* Init kubernetes options
      options.testConfig = {
        kubernetes: {
          namespace: options.customDictionary.generalOptions['--namespace'],
        },
      };

      //* Check if All Pods Are Active
      if (options.checkIfAllPodsAreActive) {
        options = await smktestCheckIfAllPodsAreActive(options);
      }

      //* Check the ingress of the cluster
      if (options.checkIngress) {
        options = await kubernetesIngress(options);
      }

      //* Check if exist logs inside of the pods logs
      if (options.checkPodsLogs) {
        options = await getPods(options);
        options = await getLogs(options);
      }

      //* Check networks from service (Pods)
      if (options.checkNetworksFromService) {
        // Check networks from service
        options = await getPods(options);
        await checkNetworks(options);
      }

      //* Check dependencies
      if (options.curlDependencies && options.checkDependenciesFromService) {
        // Run the test only if exist the last conditions
        options.listOfJestPath.push(
          './src/services/kubernetesApi/test/checkDependencies'
        );
      }
    }
  }

  process.env.SMKTEST_OPTIONS = JSON.stringify(options);

  //! Run Direct Accerts >>>>
  if (options.assertCurl) {
    options = await curlSingleTest(options);
  }

  process.env.SMKTEST_OPTIONS = JSON.stringify(options);

  //! Run Jest Tests.
  if (options.listOfJestPath) {
    await runJestTest(options);
  }
}
