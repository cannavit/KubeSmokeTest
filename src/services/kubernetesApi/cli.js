import inquirer from 'inquirer';

async function prompt(options) {
  const questions = [];

  if (!options.customDictionary.generalOptions['--namespace']) {
    questions.push({
      type: 'input',
      name: 'namespace',
      message: 'Add kubernetes namespace:',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    namespace:
      options.customDictionary.generalOptions['--namespace'] ||
      answers.namespace,
  };
}

export async function cliKubernetes(options) {
  // Console kubernetes options
  options = await prompt(options);
}
