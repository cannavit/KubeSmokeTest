import arg from 'arg';
import inquirer from 'inquirer';
// Kubernetes:
// import fs from 'fs';
const fs = require('fs');
const suiteGenerator = require('./services/suitesGenerator/suiteGenerator');

import generateUniqueId from 'generate-unique-id';

require('dotenv').config();
console.log('@1Marker-No:_-886104069');

async function parseArgumentsIntoOptions(rawArgs) {


  let argumentsCli = await suiteGenerator.getConsoleInputs({});


  let rawArgsL = [];
  for (const r of rawArgs) {
    if (r.includes('--') & !r.includes('=')) {
      rawArgsL.push(r + '=true');
    }
    if (!r.includes('--') | r.includes('=true') | r.includes('=')) {
      rawArgsL.push(r);
    }
  }

  let args = arg(argumentsCli, {
    argv: rawArgsL.slice(2),
  });
   
  args = await suiteGenerator.argsByCriterial({
    args: args,
    argumentsCli: argumentsCli,
  });
    
  
  args = await suiteGenerator.createDictionaryInputs(args);


  const smokeTestVariableList = [];
  // Add Configuration Variables from smktest.json
  // console.log('@1Marker-No:_-1565193173');

  let smktestConfig = await suiteGenerator.getStandardVariables({});

  console.log(">>>>>1464318171>>>>>")
  console.log(smktestConfig)
  console.log("<<<<<<<<<<<<<<<<<<<")

  for (const smktest of smktestConfig['smktestConfig']) {
    smokeTestVariableList.push(smktest);
  }

  let argumentsData = {};
  let listOfJestPath = [];

  console.log('@1Marker-No:_1313149323 >>>>');

  for (const element of smokeTestVariableList) {

    console.log(">>>>>1145427079>>>>>")
console.log(args)
console.log("<<<<<<<<<<<<<<<<<<<")

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
  console.log('@1Marker-No:_1313149323 <<<<<');

//   console.log(">>>>>-1892741861>>>>>")
// console.log(argumentsData)
// console.log("<<<<<<<<<<<<<<<<<<<")

  return argumentsData;
}

//! 1) Option: Criterial
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

export async function cli(args) {
  // let options = {}
  //! Presentation text:
  // console.log('@1Marker-No:_-886104069');


  let options = await parseArgumentsIntoOptions(args);


  // args = optionss.args
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

  // Create one file Json with fs
  // import dependencies.
  await suiteGenerator.suiteGeneratorV2(options);

  let fileJson = './smokeTest_suites/src/SMKTEST_OPTIONS.json';

  // Create one file JSON using fs
  await fs.promises.writeFile(fileJson, JSON.stringify(options), 'utf8');

  // Generate suites Test
  // options = await  suiteGenerator.suiteGenerator(options);

  // if (options.context === 'kubernetes' || options.context == undefined) {
  //   //! Namespace not required >>>>>
  //   //* Check the node cluster conditions:
  //   if (options.checkConditions) {
  //     options = await checkConditions(options);
  //   }

  //   //* Check nodes cluster status.
  //   if (options.checkClusterNodes) {
  //     options = await checkClusterNodes(options);
  //   }

  // if (options.checkClusterInfo) {
  //   // RUN SCRIPT FOR GET CLUSTER INFO
  //   let grepTestCommand =
  //     'kubectl cluster-info | grep "Kubernetes" | grep -v  "running"';
  //   let grepReportCommand = 'kubectl cluster-info';
  //   let variableEnvResponse = 'SMKTEST_KUBERNETES_CLUSTER_INFO';
  //   options = await ifGrepHaveOutputIsError(
  //     options,
  //     grepTestCommand,
  //     grepReportCommand,
  //     variableEnvResponse
  //   );
  //   // ADD OF TETS LIST
  //   options = await checkClusterNodes(options);
  // }
  //! <<<<<<xz

  // if (options.customDictionary.generalOptions['--namespace']) {
  //   //* Init kubernetes options
  //   options.testConfig = {
  //     kubernetes: {
  //       namespace: options.customDictionary.generalOptions['--namespace'],
  //     },
  //   };

  //   //* Check if All Pods Are Active
  //   if (options.checkIfAllPodsAreActive) {
  //     options = await smktestCheckIfAllPodsAreActive(options);
  //   }

  //   //* Check the ingress of the cluster
  //   if (options.checkIngress) {
  //     options = await kubernetesIngress(options);
  //   }

  //   //* Check if exist logs inside of the pods logs
  //   if (options.checkPodsLogs) {
  //     options = await getPods(options);
  //     options = await getLogs(options);
  //   }

  //   //* Check networks from service (Pods)
  //   if (options.checkNetworksFromService) {
  //     // Check networks from service
  //     options = await getPods(options);
  //     await checkNetworks(options);
  //   }

  //   //* Check dependencies
  //   if (options.curlDependencies && options.checkDependenciesFromService) {
  //     // Run the test only if exist the last conditions
  //     options.listOfJestPath.push(
  //       './src/services/kubernetesApi/test/checkDependencies'
  //     );
  //   }
  // }

  // }

  // process.env.SMKTEST_OPTIONS = JSON.stringify(options);

  // //! Run Direct Accerts >>>>
  // if (options.assertCurl) {
  //   options = await curlSingleTest(options);
  // }

  // process.env.SMKTEST_OPTIONS = JSON.stringify(options);

  // //! Run Jest Tests.
  // if (options.listOfJestPath) {
  //   await runJestTest(options);
  // }
}

// create-smktest  --namespace=edutelling-develop --sevices-coverage --cluster-coverage --ingress-coverage --resource-up --endpoint-coverage
// create-smktest --curl-assert="curl -v https://edutelling-app-develop.openshift.techgap.it/login 2>&1 | grep -E 'HTTP|<title>'"


//create-smktest --curl-assert='curl -v https://edutelling-app-develop.openshift.techgap.it/login 2>&1 | grep -E "HTTP|<title>"' --cluster-coverage