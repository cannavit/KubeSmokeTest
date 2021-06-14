import arg from 'arg';
import inquirer from 'inquirer';
import { createProject, runMultiTasks } from './main';
import figlet from 'figlet';

import { generateCasesSwagger } from './services/smktestSwagger';
// https://www.twilio.com/blog/how-to-build-a-cli-with-node-js

// Kubernetes:
import { cliKubernetes } from './services/kubernetesApi/cli.js';
//Single Test.
import { curlSingleTest } from './services/assertTest/services/curl';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--yes': Boolean,
      '--criterial': String,
      '--context': String,
      '--environmentVariable': String,
      '--environment': String,
      '--scannerApi': Boolean,
      '--auto-detect': Boolean,
      '--namespace': String,
      '--scannerApiMethod': Boolean,
      '--create-config-file': Boolean,
      '--swaggerUrl': String,
      '--curlLogin': String,
      '--assert-curl': String,
      '--project-name': String,
      '--mode-auto': Boolean,
      '-c': '--criterial',
      '-c': '--context',
      '-s': '--scannerApi',
      '-a': '--auto-detect',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  const smokeTestVariableList = [
    {
      variable: 'skipPrompts',
      environmentVariable: 'SMKTEST_SKIP_PROMPTS',
      defaultValue: false,
      consoleValue: '--yes',
    },
    {
      variable: 'projectName',
      environmentVariable: 'SMKTEST_PROJECT_NAME',
      defaultValue: undefined,
      consoleValue: '--project-name',
    },
    {
      variable: 'environmentVariable',
      environmentVariable: 'SMKTEST_ENVIRONMENT_VARIABLE',
      defaultValue: 'NODE_ENV',
      consoleValue: '--environmentVariable',
    },
    {
      variable: 'environment',
      environmentVariable: 'SMKTEST_ENVIRONMENT',
      defaultValue: undefined,
      consoleValue: '--environment',
    },
    {
      variable: 'context',
      environmentVariable: 'SMKTEST_CONTEXT',
      defaultValue: undefined,
      consoleValue: '--context',
    },
    {
      variable: 'assertCurl',
      environmentVariable: 'SMKTEST_ASSERT_CURL',
      defaultValue: undefined,
      consoleValue: '--assert-curl',
    },
    {
      variable: 'criterial',
      environmentVariable: 'SMKTEST_CRITERIAL',
      defaultValue: undefined,
      consoleValue: '--criterial',
    },
    {
      variable: 'scannerApiMethod',
      environmentVariable: 'SMKTEST_SCANNER_API_METHOD',
      defaultValue: undefined,
      consoleValue: '--scanner-scanner-api-method',
    },
    {
      variable: 'curlLogin',
      environmentVariable: 'SMKTEST_CURL_LOGIN',
      defaultValue: undefined,
      consoleValue: '--curl-login',
    },
    {
      variable: 'scannerApi',
      environmentVariable: 'SMKTEST_SCANNER_LOGIN',
      defaultValue: undefined,
      consoleValue: '--curl-login',
    },
    {
      variable: 'autoDetect',
      environmentVariable: 'SMKTEST_AUTO_DETECT',
      defaultValue: undefined,
      consoleValue: '--auto-detect',
    },
    {
      variable: 'namespace',
      environmentVariable: 'SMKTEST_NAMESPACE',
      defaultValue: undefined,
      consoleValue: '--namespace',
    },
  ];

  let argumentsData = {};
  for (const key in smokeTestVariableList) {
    let element = smokeTestVariableList[key];
    let data = args[element.consoleValue] || element.defaultValue;

    //! If exist parameter inside of the console (* Have priority)
    let useNext = true;
    if (data) {
      process.env[element.environmentVariable] = data;
      useNext = false;
    }
    //! If exist environment variable get value
    if (process.env[element.environmentVariable] && useNext) {
      data = process.env[element.environmentVariable];
    }

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
      choices: ['localhost', 'specific host', 'docker', 'kubernetes'],
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    environmentVariable:
      options.environmentVariable || answers.environmentVariable,
    environment: options.environment || answers.environment,
    context: options.context || answers.context,
    // scannerApiMethod: options.scannerApiMethod || answers.scannerApiMethod,
  };
}

async function promptForScannerAPI(options) {
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

  console.log(
    figlet.textSync('smkTest', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })
  );

  let options = parseArgumentsIntoOptions(args);

  options.projectDir = __dirname; // SmokeTest route
  options.smktestFolder = 'smktest'; // SmokeTet base directory

  options = await promptForContext(options);

  //! Run Context test.
  if (options.context === 'kubernetes') {
    // await cliKubernetes(options);
  }

  //! Run Direct Accerts >>>>

  if (options.assertCurl) {
    await curlSingleTest(options);
  }
  //! <<<<

  // options = await promptDocker(options);
  // options = await promptForScannerAPI(options);

  // runMultiTasks(options);
}

// create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=NAMESPACE --mode-auto=true --assert-curl="curl www.google.com"

// create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=NAMESPACE --mode-auto=true --assert-curl="curl -X 'GET' 'https://petstore.swagger.io/v2/store/inventory3' -H 'accept: application/json'"

// create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=NAMESPACE --mode-auto=true --assert-curl='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'

// create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=NAMESPACE --mode-auto=true --assert-curl='curl -X POST "https://pot-uat.paxitalia.com:8443/api/public/auth/signin" -H "accept: */*" -H "Content-Type: application/json" -d "{ \"password\": \"AdminPOT1111\", \"usernameOrEmail\": \"AdminPOT\"}"'

// docker run -it --rm --entrypoint sh smktest-master

// docker run -it smktest-master sh -c 'create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=NAMESPACE --mode-auto=true --assert-curl="curl www.google.com"'

//docker push smktesting/smoke-master:tagname

// docker run -it --rm --entrypoint sh smktesting/smoke-master
