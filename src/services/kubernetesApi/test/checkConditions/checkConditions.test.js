//! For run the test is necessary to have access one cluster:
const shell = require('shelljs');
const chalk = require('chalk');
//? Check if is possible

test(`Check Node Conditions inside of the kubernetes cluster`, async () => {
  //? List of the wold to find error

  let response = process.env['SMKTEST_KUBERNETES_NODE_CONDITIONS'];

  response = JSON.parse(response);

  let passTest = response.passTest;

  if (!response.passTest) {
    console.log(chalk.red.bold('👎 ERROR KUBERNETES CLUSTER CONDITIONS'));
    console.log(
      chalk.red.bold(
        ' 🛑 Communicate that your kubernetes cluster administrator'
      )
    );
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log(chalk.red.bold(response.conditionsText));
  } else {
    console.log(
      chalk.green.bold('👍 SUCCESS, 🚀   TEST WITH --check-conditions')
    );
    console.log(chalk.green.bold(response.conditionsText));
  }

  expect(passTest).toBe(true);
});
