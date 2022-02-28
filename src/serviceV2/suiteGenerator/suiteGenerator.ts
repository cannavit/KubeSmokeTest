import smktestUtils from "../../utils/smktestUtils";
import pushTest from "../../utils/pushTest";
const shell = require("shelljs");
const fs = require("fs");
const Listr = require("listr");
const _ = require("lodash");
const chalk = require("chalk");
const swaggerSmktest = require("swagger-smktest");
const smktestDep = require("smktest-utils");

import getVolumePath from "./src/volumeV2";

async function getServicesName(options: any) {
  await smktestUtils.inputMandatory(options, "--namespace");

  let command =
    'kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v "NAME"';
  command = command.replace("$$namespace", options.args["--namespace"]);

  let response = await shell.exec(command, {
    silent: true
  }).stdout;

  response = response.split("\n");

  // Delete the last element of one list
  response.pop();

  options.services = response;

  return options;
}

async function getKubeIngress(options: any) {
  let testCommand =
    "kubectl get ingress -n $$namespace  -o=jsonpath='{.items[*].spec.rules[*]}'";

  testCommand = testCommand.replace("$$namespace", options.args["--namespace"]);

  let responseReport = await shell.exec(testCommand, {
    silent: true
  }).stdout;

  responseReport = responseReport.split(" ");

  let ingressList = [];
  for (var response of responseReport) {
    let resp = JSON.parse(response);

    for (var path in resp) {
      for (var p in resp[path].paths) {
        let res = "http://" + resp.host + resp[path].paths[p].path;
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

async function cleanCriterialsNotUsed(options: any) {
  let smokeTestSuitesActive = options.smokeTestSuites;
  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      if (options.smokeTestSuites[criterial][test].defaultValue === "false") {
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
    __dirname + "/src/templates/initDependencies.js";
  let suiteSmokeTest: string = "";

  let dependencies = await fs.promises.readFile(
    dependenciesFile,
    "utf8",
    // @ts-ignore
    function (err, data) {}
  );

  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      options.smokeTestSuites[criterial][test]["textDependencies"] =
        dependencies;
    }
  }

  return options;
}

async function replaceAll(str: string, search: string, replacement: string) {
  var newStr = "";
  if (_.isString(str)) {
    // maybe add a lodash test? Will not handle numbers now.
    newStr = await str.split(search).join(replacement);
  }
  return newStr;
}

// TODO Add test case
async function addTestCase(options: any) {
  // Create function addTestCase(options: any){

  let listOfTestPath: any = {
    "--check-cluster": "/src/templates/grepTemplate.js",
    "--check-disk": "/src/templates/grepTemplate.js",
    "--check-memory": "/src/templates/grepTemplate.js",
    "--check-pods-running": "/src/templates/grepTemplate.js",
    "--check-cluster-info": "/src/templates/grepTemplate.js",
    "--check-nodes": "/src/templates/grepTemplate.js",
    "--check-ingress": "/src/templates/ingressTemplate.js",
    "--check-pods-logs": "/src/templates/grepTemplate.js",
    "--volumes-free-space": "/src/templates/grepTemplate.js",
    "--volumes-exist-files": "/src/templates/grepTemplate.js",
    "--curl-url": "",
    "--curl-assert": "/src/templates/grepTemplate.js",
    "--service-up": "",
    "--swagger-docs": "/src/templates/swaggerRequest.js",
    "--swagger-login-curl": "/src/templates/swaggerRequest.js",
    "--execution-unit-coverage": "/src/templates/grepTemplate.js"
  };

  // // Read the Test Case template
  for (const criterial of Object.keys(options.smokeTestSuites)) {
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      let swaggerLoginCurl;
      try {
        swaggerLoginCurl =
          options.smokeTestSuites["--endpoint-coverage"][
            "--swagger-login-curl"
          ];
      } catch (error) {}

      if (swaggerLoginCurl) {
        listOfTestPath[test] = "/src/templates/simpleCurlAssertLogin.js";
      }

      let smktest = options.smokeTestSuites[criterial][test];

      if (listOfTestPath[test] === undefined) {
        throw new Error(
          chalk.red.bold(
            ` 🛑  The Input: ${test} is required inside of the list listOfTestPath`
          )
        );
      }

      const testPath: string = __dirname + listOfTestPath[test];

      // $$criterial
      let testType = Object.keys(smktest.testType)[0];

      // @ts-ignore
      let testContent = await fs.promises.readFile(
        testPath,
        "utf8",
        // @ts-ignore
        function (err, data) {}
      );

      // Replace variables
      testContent = await replaceAll(
        testContent,
        "$$criterial",
        smktest.criterial
      );

      testContent = await replaceAll(
        testContent,
        "$$consoleValue",
        smktest.consoleValue
      );

      //! Check Logs
      if (testType == "checkPodsLogs") {
        testContent = await replaceAll(
          testContent,
          "$$reportCommand",
          smktest.testType.checkPodsLogs.reportCommand
        );

        testContent = await replaceAll(
          testContent,
          "$$assert",
          smktest.testType.checkPodsLogs.assert
        );

        testContent = await replaceAll(
          testContent,
          "$$testCommand",
          smktest.testType.checkPodsLogs.testCommand
        );

        options = await getServicesName(options);

        let testContentOne = "";
        for (const service of options.services) {
          let testContentTwo = await replaceAll(
            testContent,
            "$$serviceName",
            service
          );
          testContentOne = testContentOne + testContentTwo;
        }

        testContent = testContentOne;
      }

      //! Use Grep Template
      if (testType == "grep") {
        testContent = await replaceAll(
          testContent,
          "$$reportCommand",
          smktest.testType.grep.reportCommand
        );

        testContent = await replaceAll(
          testContent,
          "$$testCommand",
          smktest.testType.grep.testCommand
        );

        testContent = await replaceAll(
          testContent,
          "$$assert",
          smktest.testType.grep.assert
        );
      }

      //! Check Ingress
      if (testType == "checkIngress") {
        let allTest = "";

        await smktestUtils.inputMandatory(options, "--namespace");

        options = await getKubeIngress(options);

        let ingressList = options.ingressList;

        let count2 = -1;

        for (const ingress of ingressList) {
          count2 = count2 + 1;

          let initTestContent = testContent;

          for (let testOne of smktest.testType.checkIngress.testCommand) {
            let testCommand = testOne.test.replace("$$ingress", ingress);
            initTestContent = initTestContent.replaceAll(
              "$$testCommand",
              testCommand
            );

            initTestContent = initTestContent.replaceAll(
              "$$assert",
              testOne.assert
            );
            initTestContent = initTestContent.replaceAll(
              "$$reportCommand",
              testOne.reportCommand
            );

            initTestContent = await replaceAll(
              initTestContent,
              "$$assert",
              testOne.assert
            );
          }

          allTest = allTest + initTestContent;
        }

        testContent = allTest;
      }

      //! Check Volumes

      if (testType == "checkVolumes") {
        options = await getVolumePath(options);
        let mountPath = options.mountPath;
        let service = Object.keys(mountPath);

        let grepTemplate02 = "";

        for (const serviceName of service) {
          // $mountPath

          let grepTemplate = await replaceAll(
            testContent,
            "$$testCommand",
            smktest.testType.checkVolumes.testCommand
          );

          grepTemplate = await replaceAll(
            grepTemplate,
            "$$service",
            serviceName
          );

          grepTemplate = await replaceAll(
            grepTemplate,
            "$$assert",
            smktest.testType.checkVolumes.assert
          );

          grepTemplate = await replaceAll(
            grepTemplate,
            "$$reportCommand",
            smktest.testType.checkVolumes.reportCommand
          );

          grepTemplate = await replaceAll(
            grepTemplate,
            "$mountPath",
            mountPath[serviceName].mountPath
          );

          grepTemplate02 = grepTemplate02 + grepTemplate;
        }

        testContent = grepTemplate02;
      }

      //! Check simpleCurlAssert --endpoint-up

      if (testType == "simpleCurlAssert") {
        let curlList = smktest.defaultValue;

        try {
          curlList = eval(eval(curlList));
          // curlList = eval(curlList)
        } catch (error) {
          // Print error message
          console.log(error);
          console.log();
          console.log(chalk.red.bold(curlList));
          throw new Error(
            chalk.yellow.bold(
              ` 🛑  The Input: ${curlList} not is possible eval it. `
            )
          );
        }

        let curlGeneralGTemplate = "";

        for (const curl of curlList) {
          let curlTemplate = testContent;

          curlTemplate = await replaceAll(curlTemplate, "$$testCommand", curl);

          curlTemplate = await replaceAll(
            curlTemplate,
            "$$assert",
            smktest.testType.simpleCurlAssert.assert
          );

          curlTemplate = await replaceAll(
            curlTemplate,
            "$$reportCommand",
            curl
          );

          curlGeneralGTemplate = curlGeneralGTemplate + curlTemplate;
        }

        testContent = curlGeneralGTemplate;
      }

      //! Check Swagger Urls
      if (testType == "swaggerDocs") {
        // Check if exist the curlSwaggerLogin
        let swaggerAll = "";
        //? If not exist login swagger curl
        if (!swaggerLoginCurl) {
          let { responseOfRequest } = await swaggerSmktest.smokeTest(
            smktest.defaultValue
          );

          for (const swagger of responseOfRequest) {
            let swaggerTemplate = testContent;

            swaggerTemplate = await replaceAll(
              swaggerTemplate,
              "$$testCommand",
              swagger.curlRequest
            );

            swaggerTemplate = await replaceAll(
              swaggerTemplate,
              "$$reportCommand",
              swagger.curlRequest
            );

            swaggerTemplate = await replaceAll(
              swaggerTemplate,
              "$$assert",
              swagger.status
            );

            swaggerTemplate = await replaceAll(
              swaggerTemplate,
              "$$requestUrl",
              swagger.status
            );

            swaggerTemplate = await replaceAll(
              swaggerTemplate,
              "$$URL_SWAGGER",
              swagger.requestUrl
            );

            swaggerAll = swaggerAll + swaggerTemplate;
          }

          testContent = swaggerAll;
        }

        //? If exist login swagger curl
        if (swaggerLoginCurl) {
          let swaggerLoginCurlURL = swaggerLoginCurl.defaultValue;

          let {
            responseOfRequest,
            coverage,
            successSmokeTest,
            report,
            abstractReport
          } = await swaggerSmktest.smokeTest(smktest.defaultValue, {
            tokenConfig: {
              curlRequest: swaggerLoginCurlURL
            }
          });

          let testContentSwaggerLogin = "";
          //* Get Header Token >>>>>>>>>>>>>>>>>>>>>>>>
          for (const swagger of responseOfRequest) {
            let testContentElement = testContent;

            // header = swagger.header
            let objectHeader = JSON.parse(swagger.headers);
            let header: any = {};

            //? Get Header >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            for (const headerName of Object.keys(objectHeader)) {
              let content = objectHeader[headerName];
              if (content.length > 100) {
                if (content.includes("Bearer")) {
                  header[headerName] = "Bearer $$TOKEN";
                } else {
                  header[headerName] = "$$TOKEN";
                }
              } else {
                header[headerName] = content;
              }
            }

            //? Get Url Login Authentication >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            let urlCurl;
            for (const urlG of swaggerLoginCurl.defaultValue.split(" ")) {
              if (urlG.includes("http")) {
                urlCurl = urlG;
              }
            }

            testContentElement = await replaceAll(
              testContentElement,
              "$$curlLogin",
              swaggerLoginCurl.defaultValue
            );

            testContentElement = await replaceAll(
              testContentElement,
              "$$URL",
              swagger.requestUrl
            );

            testContentElement = await replaceAll(
              testContentElement,
              "$$header",
              JSON.stringify(header)
            );

            //? Get Assert
            const options = {
              method: "GET",
              headers: objectHeader,
              url: swagger.requestUrl
            };

            let statusCode = await smktestDep.getStatusCodeToken(options);

            testContentElement = await replaceAll(
              testContentElement,
              "$$assert",
              JSON.stringify(statusCode)
            );

            testContentSwaggerLogin =
              testContentSwaggerLogin + testContentElement;
          }

          testContent = testContentSwaggerLogin;
        }
      }

      try {
        testContent = await replaceAll(
          testContent,
          "$$namespace",
          options.args["--namespace"]
        );
      } catch (error) {}

      options.smokeTestSuites[criterial][test]["testText"] = testContent;
    }
  }

  return options;
}

// let result = await tasksInit.run().catch(err => {
//     console.error(err);
//     return err.message
// });

async function pushTestV2(options: {
  testText: string;
  dependenciesText: string;
  criterial: string;
  testPath: string;
}) {}

function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

async function createTestSuite(options: any) {
  let testPath = "./smokeTest_kubernetes";

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
    await fs.mkdirSync(testPath + "/src");
  }

  // Copy Dependencies file inside of the folder /src

  // try {
  //   await fs.promises.copyFile(
  //     __dirname+'/src/templates/smokeTestDependencies.js',
  //     testPath+'/src/smokeTestDependencies.js'
  //   );
  // } catch (error) {
  //   console.log(error.message);
  // }

  // Copy Dependencies file inside of the folder smktest.config.json
  // try {
  //   await fs.promises.copyFile(
  //     'smktest.config.json',
  //     testPath+'/src/smktest.config.json'
  //   );
  // } catch (error) {
  //   // @ts-ignore
  //   console.log(error.message);
  // }

  // Push Suite
  for (const criterial of Object.keys(options.smokeTestSuites)) {
    // Create File With Name of Criterial.
    // Create File Name Using the Criterial name

    let criterialFile = criterial.substring(2);
    criterialFile = camelize(criterialFile);
    criterialFile = await replaceAll(criterialFile, "-", "");
    criterialFile = criterialFile + ".test.js";

    // Add Dependencies File.
    let count = -1;
    for (const test of Object.keys(options.smokeTestSuites[criterial])) {
      let pathTestOne = `smokeTest_kubernetes/${criterialFile}`;

      let smktest = options.smokeTestSuites[criterial][test];

      count = count + 1;
      var tasksInit;

      // Init Work
      if (count === 0) {
        // Remove Old Test if exist.
        if (await fs.existsSync(pathTestOne)) {
          // Remove The old test
          await fs.unlinkSync(pathTestOne, "utf8");
        }

        var tasksInit = new Listr([
          {
            title: `Create Criterial ${criterial} in ${testPath}/${criterialFile}`,
            task: async () => {
              // Add Dependencies File.
              await fs.promises.writeFile(
                pathTestOne,
                smktest.textDependencies,
                // @ts-ignore
                function (err) {}
              );
            }
          }
        ]);

        // @ts-ignore
        await tasksInit.run().catch((err) => {
          console.error(err);
          return err.message;
        });
      }

      //!  Push test inside of the folder.
      var testOne = new Listr([
        {
          title: `     Add ${testPath}/${criterialFile} ${test}`,
          task: async () => {
            // Read the file if exist
            let testOld = "AAA";
            testOld = await fs.promises.readFile(pathTestOne, "utf8");
            let newTest = testOld + smktest.testText;
            await fs.promises.writeFile(pathTestOne, newTest, "utf8");
          }
        }
      ]);

      // @ts-ignore
      await testOne.run().catch((err) => {
        console.error(err);
        return err.message;
      });
    }
  }

  return options;
}

export async function createSuiteByCriterialV2(options: any) {
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

export async function suiteGenerator(options: any) {
  // Import dependencies.
  // Import Config File

  const dependenciesFile: string =
    __dirname + "/src/templates/initDependencies.js";

  let suiteSmokeTest: string = "";
  let dependencies = await fs.promises.readFile(
    dependenciesFile,
    "utf8",
    function (err: any, data: any) {}
  );

  suiteSmokeTest = suiteSmokeTest + dependencies;

  // Separate by criteria
  options = await createSuiteByCriterialV2(options);

  return options;
}

export default {
  suiteGenerator,
  createSuiteByCriterialV2,
  cleanCriterialsNotUsed
};
