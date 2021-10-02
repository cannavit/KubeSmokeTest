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
  
  
  smktestKubeIngress = JSON.parse(smktestKubeIngress);

  // smktestKubeIngress = smktestKubeIngress.split('@@s@@'); // Convert in one List

  let passTest = true;

  for (const key in smktestKubeIngress) {
    let element = smktestKubeIngress[key];
    //Check if is one Error.

    if (!element.passTest) {
      console.log('🐞 🛑 ERROR: Ingress: ' + element.test);
      console.log('🚪 check your ingress in the cluster');
      console.log('🚪 KeyWold :', element.keyWold);
      passTest = false;
    }
    {
      console.log('✅ SUCCESS INGRESS: ' + element.test);
    }
  }

  expect(passTest).toBe(true);
});
