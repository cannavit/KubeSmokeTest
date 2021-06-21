import inquirer from 'inquirer';

async function prompt(options) {
  const questions = [];

  if (!options.namespace) {
    questions.push({
      type: 'input',
      name: 'namespace',
      message: 'Add kubernetes namespace:',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    namespace: options.namespace || answers.namespace,
  };
}

export async function cliKubernetes(options) {
  // Console kubernetes options
  options = await prompt(options);
}
