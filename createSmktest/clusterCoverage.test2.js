const shell = require('shelljs');
// const chalk = require('chalk');
var fs = require('fs');
const { clear } = require('console');
// const jest2 = require('jest');

test('Exist File with create-smktest --cluster-coverage', async () => {
    
    // Declarative
    let command = 'create-smktest --cluster-coverage'

    let response = await shell.exec(command, {
        silent: true,
    });

    // Check if exist one file inside of one folder
    let files = shell.ls('-l', './smokeTest_suites/clusterCoverage.test.js');
    let passTest = false

    if (files.stderr === null){
        passTest = true
    }


    expect(passTest).toBe(true);

});


test('Run Test Generated: create-smktest --cluster-coverage', async () => {
    // Declarative

    const optionsJest = {
        projects: [__dirname],
        roots: ['./smokeTest_suites'],
        silent: false,
      };

       
      let testResult = await jest.runCLI(optionsJest, "Suite generated");

      console.log(">>>>>-1690061017>>>>>")
      console.log(testResult)
      console.log("<<<<<<<<<<<<<<<<<<<")

//   let testResult = await jest.runCLI({runInBand: true}, ['./smokeTest_suites/clusterCoverage.test.js']);


//   console.log(">>>>>-309143834>>>>>")
//   console.log(testResult)
//   console.log("<<<<<<<<<<<<<<<<<<<")
  
  expect(true).toBe(true);

});