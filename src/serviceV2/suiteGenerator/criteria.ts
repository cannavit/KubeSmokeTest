import inquirer from 'inquirer';



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


  export default {
    promptForContext
  }



