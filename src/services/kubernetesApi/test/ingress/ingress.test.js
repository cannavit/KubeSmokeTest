//! For run the test is necessary to have access one cluster:
const shell = require('shelljs');
const chalk = require('chalk');
//? Check if is possible

const assertCurl = process.env.SMKTEST_ASSERT_CURL;

test(`Check Kubernetes Ingress`, async () => {
  //? List of the wold to find error
  let listOfErrors = [
    'ERROR',
    '503 Service Temporarily Unavailable',
    'Internal Server Error',
  ];

  // Load environment variable:
  let smktestKubeIngress = process.env['SMKTEST_KUBERNETES_INGRESS_BY_TEST'];

  smktestKubeIngress = smktestKubeIngress.split('@@s@@'); // Convert in one List

  let passTest = true;
  for (const key in smktestKubeIngress) {
    let element = smktestKubeIngress[key];

    if (element !== '') {
      let response = await shell.exec(`curl ${element}`, {
        silent: true,
      });

      //Check if is one Error.
      for (const keyWold in listOfErrors) {
        let errorWold = listOfErrors[keyWold];
        if (response.stdout.includes(errorWold)) {
          //Register the error
          passTest = false;
          console.log(
            chalk.red.bold(`ERROR: curl ${element}, errorWold: ${errorWold}`)
          );
          console.log(
            chalk.yellow.bold('NOTE: Please check your ingress in the cluster')
          );
        }
      }
    }
  }

  expect(passTest).toBe(true);
});
