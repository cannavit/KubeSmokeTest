import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import UpdaterRenderer from 'listr-update-renderer';

import { configSmktest } from './services/createConfigFile';
import {
  generateCasesSwagger,
  getTrainingSwaggerSmktest,
} from './services/smktestSwagger';

import validUrl from 'valid-url';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirector || process.cwd,
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log('%s Invalid template name', chalk.red.bold('ERROR'));
  }

  await copyTemplateFiles(options);

  console.log(' %s Project ready', chalk.green.bold('DONE'));

  return true;
}

export async function createConfigFileTask(options) {
  //! Create configuration file:
  let listOfTask, tasks;

  listOfTask = [
    {
      title: 'Create ConfigFile',
      task: () => configSmktest(options),
    },
  ];

  tasks = new Listr(listOfTask, {
    renderer: UpdaterRenderer,
    collapse: false,
    showSubtasks: true,
    clearOutput: false,
  });

  await tasks.run();

  return options;
}

export async function runMultiTasks(options) {
  return createConfigFileTask(options)
    .then((options) => {
      //Options:
      let swaggerUrl = options.swaggerUrl || 'N';
      options.swaggerUrl = swaggerUrl;
      let curlLogin = options.curlLogin || 'N';
      options.curlLogin = curlLogin;
      //
      return options;
    })
    .then(async (options) => {
      //Print message for create test cases:

      if (options.swaggerUrl !== 'N') {
        options.swaggerBasic = true;
        let listOfTask = [
          {
            title: 'Create Swagger/OpenApi smoke-test',
            task: () => {},
          },
        ];

        let tasks = new Listr(listOfTask);

        await tasks.run();
      }

      return options;
    })
    .then(async (options) => {
      //! Create tests suite for swagger:

      if (options.swaggerUrl !== 'N') {
        await generateCasesSwagger(options);
      }

      return options;
    })
    .then(async (options) => {
      //! Print message of created test:
      if (options.swaggerUrl !== 'N') {
        let listOfTask = [
          {
            title: 'Smoke tests cases generated for Swagger/OpenApi',
            task: () => {},
          },
        ];

        let tasks = new Listr(listOfTask);

        await tasks.run();
      }
      return options;
    });
}
