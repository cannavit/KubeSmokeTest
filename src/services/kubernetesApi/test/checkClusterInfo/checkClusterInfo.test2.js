//! For run the test is necessary to have access one cluster:
const shell = require('shelljs');
const chalk = require('chalk');
//? Check if is possible

test(`Cluster Cluster Info`, async () => {
  //? List of the wold to find error

  let response = process.env['SMKTEST_KUBERNETES_CLUSTER_INFO'];

  response = JSON.parse(response);

  let passTest = response.passTest;

  if (!response.passTest) {
    console.log(chalk.red.bold('👎 ERROR KUBERNETzES CLUSTER NODES'));
    console.log(
      chalk.red.bold(
        ' 🛑 Communicate that your kubernetes cluster administrator'
      )
    );
    console.log(chalk.red.bold('Your cluster is unstable.'));
    console.log(chalk.red.bold(response.conditionsText));
  } else {
    console.log(
      chalk.green.bold('👍 SUCCESS, 🚀   TEST WITH --check-cluster-info')
    );
    console.log(chalk.green.bold(response.conditionsText));
  }

  expect(passTest).toBe(true);
});
