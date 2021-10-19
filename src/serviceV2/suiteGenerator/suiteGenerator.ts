import smktestUtils from '../../utils/smktestUtils';
import pushTest from '../../utils/pushTest'
const shell = require('shelljs');
const fs = require('fs');
const Listr = require('listr');
const _ = require('lodash');

import getVolumePath from './src/volumeV2'

async function getServicesName(options: any){

  await smktestUtils.inputMandatory(options, '--namespace');

  let command =
    'kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v "NAME"';
  command = command.replace('$$namespace', options.args['--namespace']);

  let response = await shell.exec(command, {
    silent: true,
  }).stdout;

  response = response.split('\n');

  // Delete the last element of one list
  response.pop();


  options.services = response;

  return options;

}

async function getKubeIngress(options :any){

  let testCommand =
    "kubectl get ingress -n $$namespace  -o=jsonpath='{.items[*].spec.rules[*]}'";

  
  testCommand = testCommand.replace('$$namespace', options.args['--namespace']);
  

  let responseReport = await shell.exec(testCommand, {
    silent: true,
  }).stdout;

  responseReport = responseReport.split(' ');

  let ingressList = [];
  for (var response of responseReport) {

    response = JSON.parse(response);

    var keys = Object.keys(response);

    for (var path in response) {
      for (var p in response[path].paths) {
        let res = 'http://' + response.host + response[path].paths[p].path;
        ingressList.push(res);
      }
    }
  }

  // responseReport = JSON.parse(responseReport)

  options.ingressList = ingressList;

  return options;
}


// Add function for parse Config JSON FILE smktest.config.json
// function typescript, inputs list of string
//? Old Name of the function parseArgumentsIntoOptions
// Create Suites Test.

async function cleanCriterialsNotUsed(options) {
  let smokeTestSuitesActive = options.smokeTestSuites;
  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      if (options.smokeTestSuites[criterial][test].defaultValue === 'false') {
        delete smokeTestSuitesActive[criterial][test];
      }
    }
  }

  for (const criterial of Object.keys(options.smokeTestSuites)) {
    if (Object.keys(smokeTestSuitesActive[criterial]).length === 0) {
      delete smokeTestSuitesActive[criterial];
    }
  }

  options.smokeTestSuites = smokeTestSuitesActive;

  return options;
}

async function addDependencies(options: any) {
  const dependenciesFile: string =
    __dirname + '/src/templates/initDependencies.js';
  let suiteSmokeTest: string = '';

  let dependencies = await fs.promises.readFile(
    dependenciesFile,
    'utf8',
    function (err, data) {}
  );


  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      options.smokeTestSuites[criterial][test]['textDependencies'] =
        dependencies;
    }
  }

  return options;
}

async function replaceAll(str, search, replacement) {
  var newStr = '';
  if (_.isString(str)) {
    // maybe add a lodash test? Will not handle numbers now.
    newStr = await str.split(search).join(replacement);
  }
  return newStr;
}

// TODO Add test case
async function addTestCase(options: any) {
  // Creasync function addTestCase(options: any){

  // In this dictionary for correlate the test name with test file.

  //TODO add rest of cases
 
  //! List of templates

  let listOfTestPath = {
    '--check-cluster': '/src/templates/grepTemplate.js',
    '--check-disc': '/src/templates/grepTemplate.js',
    '--check-memory': '/src/templates/grepTemplate.js',
    '--check-pods-running': '/src/templates/grepTemplate.js',
    '--check-cluster-info': '/src/templates/grepTemplate.js',
    '--check-nodes': '/src/templates/grepTemplate.js',
    '--check-ingress': '/src/templates/ingressTemplate.js',
    '--check-pods-logs': '/src/templates/grepTemplate.js',
    '--volumes-free-space': '/src/templates/grepTemplate.js',
    '--volumes-exist-files': '/src/templates/grepTemplate.js',
    '--curl-url': '',
    '--curl-assert': '',
    '--service-up': '',
  };


  console.log('@1Marker-No:_-64731297');
  // // Read the Test Case template
  for (const criterial of Object.keys(options.smokeTestSuites)) {

    console.log('@1Marker-No:_-1498640429');

    for (const test of Object.keys(options.smokeTestSuites[criterial])) {

      console.log('@1Marker-No:_62473862');

      let smktest = options.smokeTestSuites[criterial][test];
      const testPath: string = __dirname + listOfTestPath[test];

      // $$criterial
      let testType = Object.keys(smktest.testType)[0]

      let testContent = await fs.promises.readFile(
        testPath,
        'utf8',
        function (err, data) {}
      );

      // Replace variables
      testContent = await replaceAll(
         testContent,
         '$$criterial',
         smktest.criterial
      );

      testContent = await replaceAll(
        testContent,
        '$$consoleValue',
        smktest.consoleValue
      );
      

      console.log('@1Marker-No:_2057593260');
      

      //! Check Logs 
      if (testType == "checkPodsLogs"){

        testContent = await replaceAll(
          testContent,
          '$$reportCommand',
          smktest.testType.checkPodsLogs.reportCommand
        );

        testContent = await replaceAll(
          testContent,
          '$$assert',
          smktest.testType.checkPodsLogs.assert
        );

        testContent = await replaceAll(
          testContent,
          '$$testCommand',
          smktest.testType.checkPodsLogs.testCommand
        );

        options = await getServicesName(options);

        let testContentOne = ""
        for (const service of options.services){
          let testContentTwo = await replaceAll(testContent,
            '$$serviceName',
            service
            )
            testContentOne = testContentOne + testContentTwo  
        }

        testContent = testContentOne
      }

      //! Use Grep Template
      if (testType == "grep"){

        testContent = await replaceAll(
          testContent,
          '$$reportCommand',
          smktest.testType.grep.reportCommand
        );
  
        testContent = await replaceAll(
          testContent,
          '$$testCommand',
          smktest.testType.grep.reportCommand
        );
  
        testContent = await replaceAll(
          testContent,
          '$$assert',
          smktest.testType.grep.assert
        );

      }


      //! Check Ingress
      if (testType == "checkIngress"){

        let allTest = ""

        await smktestUtils.inputMandatory(options, '--namespace');

        options = await getKubeIngress(options);

        let ingressList = options.ingressList;

        let count2 = -1
       
        for (const ingress of ingressList) {

          count2 = count2 + 1

          let initTestContent = testContent

          for (const test of smktest.testType.checkIngress.testCommand) {

            let testCommand = test.test.replace('$$ingress', ingress);
            initTestContent = initTestContent.replaceAll(
              '$$testCommand',
              testCommand
            );

            initTestContent = initTestContent.replaceAll('$$assert', test.assert);
            initTestContent = initTestContent.replaceAll(
              '$$reportCommand',
              test.reportCommand
            );

            initTestContent = await replaceAll(
              initTestContent,
              '$$assert',
              test.assert
            );
          }

          allTest =  allTest + initTestContent
        }

        testContent = allTest

      }

      //! Check Volumes
      console.log('@1Marker-No:_-1881019206');
      
      if (testType == "checkVolumes"){

        options = await getVolumePath(options);
        let mountPath = options.mountPath
        let service = Object.keys(mountPath);

        console.log(">>>>>-386726181>>>>>  mountPath")
        console.log(mountPath)
        console.log("<<<<<<<<<<<<<<<<<<<")

        let grepTemplate02 = ""

        for (const serviceName of service){
          // $mountPath

         let grepTemplate = await replaceAll(
            testContent,
            '$$testCommand',
            smktest.testType.checkVolumes.testCommand
          );

          grepTemplate = await replaceAll(grepTemplate,'$$service', serviceName);

          grepTemplate = await replaceAll(
            grepTemplate,
            '$$assert',
            smktest.testType.checkVolumes.assert
          );


          grepTemplate = await replaceAll(
            grepTemplate,
            '$$reportCommand',
            smktest.testType.checkVolumes.reportCommand
          );



          grepTemplate = await replaceAll(
            grepTemplate,
            '$mountPath',
            mountPath[serviceName].mountPath
          );


          grepTemplate02 = grepTemplate02 + grepTemplate
        }


        testContent = grepTemplate02

      }


      try {
        testContent = await replaceAll(
          testContent,
          '$$namespace',
          options.args['--namespace']
        );
      } catch (error) {}

      options.smokeTestSuites[criterial][test]['testText'] = testContent;
    }
  }

  return options;
}


// let result = await tasksInit.run().catch(err => {
//     console.error(err);
//     return err.message
// });


async function pushTestV2(options: {
  testText: string,
  dependenciesText: string,
  criterial: string,
  testPath: string
}){

  console.log('@1Marker-No:_985773087');


}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}


async function createTestSuite(options: any) {
  
  let testPath =  './smokeTest_kubernetes'

  // Create folder if not exist
  if (!fs.existsSync(testPath)) {
    fs.mkdirSync(testPath);
  }

  // create Folder if not exist:
  options.testPath = testPath;
  
  // Remove Old Smoke Test Suite
  if (fs.existsSync(testPath)) {
    await fs.rmdirSync(testPath, { recursive: true });
  }

  

  // Create Folder if not exit
  if (!fs.existsSync(testPath)) {
    await fs.mkdirSync(testPath);
    await fs.mkdirSync(testPath + '/src');
  }

  // Copy Dependencies file inside of the folder /src

  try {
    await fs.promises.copyFile(
      __dirname+'/src/templates/smokeTestDependencies.js',
      testPath+'/src/smokeTestDependencies.js'
    );
  } catch (error) {
    console.log(error.message);
  }
  
  // Copy Dependencies file inside of the folder smktest.config.json
  try {
    await fs.promises.copyFile(
      'smktest.config.json',
      testPath+'/src/smktest.config.json'
    );
  } catch (error) {
    console.log(error.message);
  }
  

  // Push Suite
  for (const criterial of Object.keys(options.smokeTestSuites)) {

    // Create File With Name of Criterial.
    // Create File Name Using the Criterial name 

    let criterialFile = criterial.substring(2);
    criterialFile = camelize(criterialFile);
    criterialFile = await replaceAll(criterialFile, '-', '');
    criterialFile = criterialFile + '.test.js';

    // Add Dependencies File. 


    let count = -1
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {

      let pathTestOne = `smokeTest_kubernetes/${criterialFile}`

      let smktest = options.smokeTestSuites[criterial][test];

      
      count = count + 1;
      var tasksInit 

      // Init Work 
      if (count === 0) {

        // Remove Old Test if exist. 
        if ( await fs.existsSync(pathTestOne)) {
          // Remove The old test
          await fs.unlinkSync(pathTestOne, 'utf8');  
        }


        var tasksInit = new Listr([
          {
              title:    `Create Criterial ${criterial} in ${testPath}/${criterialFile}`,
              task: async () => {   

                  // Add Dependencies File. 
                  await fs.promises.writeFile(
                    pathTestOne,
                    smktest.textDependencies,
                    function (err) {}
                  );

              }
          }
        ]);

        await tasksInit.run().catch(err => {
              console.error(err);
              return err.message
        });
      }

    
      //!  Push test inside of the folder. 
      var testOne = new Listr([
        {
            title:    `     Add ${testPath}/${criterialFile} ${test}`,
            task: async () => { 
                // Read the file if exist 
                let testOld = "AAA"
                testOld = await fs.promises.readFile(pathTestOne, 'utf8');  
                let newTest  = testOld + smktest.testText
                await fs.promises.writeFile(pathTestOne, newTest, 'utf8');
          
            }
        }
      ]);

      await testOne.run().catch(err => {
            console.error(err);
            return err.message
      });

    }
  }


  return options;
}

export async function createSuiteByCriterialV2(options) {


  options = await cleanCriterialsNotUsed(options);
  // Add fragment dependencies:

  options = await addDependencies(options);
  // Add fragment of test
  options = await addTestCase(options);
  // Execute cases of test using the library
  options = await createTestSuite(options);


  return options;
}


//! Load test check Ingress ------------

export async function suiteGenerator(options) {

  // Import dependencies.

  // Import Config File
  const dependenciesFile: string =
    __dirname + '/src/templates/initDependencies.js';


  let suiteSmokeTest: string = '';
  let dependencies = await fs.promises.readFile(
    dependenciesFile,
    'utf8',
    function (err, data) {}
  );

  suiteSmokeTest = suiteSmokeTest + dependencies;

  // Separate by criteria
  options = await createSuiteByCriterialV2(options);

  return options;
}


export default {
  suiteGenerator,
  createSuiteByCriterialV2,
  cleanCriterialsNotUsed,
};
