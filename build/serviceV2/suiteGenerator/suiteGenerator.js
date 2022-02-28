"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.suiteGenerator = exports.createSuiteByCriterialV2 = void 0;
const smktestUtils_1 = __importDefault(require("../../utils/smktestUtils"));
const shell = require("shelljs");
const fs = require("fs");
const Listr = require("listr");
const _ = require("lodash");
const chalk = require("chalk");
const swaggerSmktest = require("swagger-smktest");
const smktestDep = require("smktest-utils");
const volumeV2_1 = __importDefault(require("./src/volumeV2"));
function getServicesName(options) {
  return __awaiter(this, void 0, void 0, function* () {
    yield smktestUtils_1.default.inputMandatory(options, "--namespace");
    let command =
      'kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v "NAME"';
    command = command.replace("$$namespace", options.args["--namespace"]);
    let response = yield shell.exec(command, {
      silent: true
    }).stdout;
    response = response.split("\n");
    // Delete the last element of one list
    response.pop();
    options.services = response;
    return options;
  });
}
function getKubeIngress(options) {
  return __awaiter(this, void 0, void 0, function* () {
    let testCommand =
      "kubectl get ingress -n $$namespace  -o=jsonpath='{.items[*].spec.rules[*]}'";
    testCommand = testCommand.replace(
      "$$namespace",
      options.args["--namespace"]
    );
    let responseReport = yield shell.exec(testCommand, {
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
  });
}
// Add function for parse Config JSON FILE smktest.config.json
// function typescript, inputs list of string
//? Old Name of the function parseArgumentsIntoOptions
// Create Suites Test.
function cleanCriterialsNotUsed(options) {
  return __awaiter(this, void 0, void 0, function* () {
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
  });
}
function addDependencies(options) {
  return __awaiter(this, void 0, void 0, function* () {
    const dependenciesFile = __dirname + "/src/templates/initDependencies.js";
    let suiteSmokeTest = "";
    let dependencies = yield fs.promises.readFile(
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
  });
}
function replaceAll(str, search, replacement) {
  return __awaiter(this, void 0, void 0, function* () {
    var newStr = "";
    if (_.isString(str)) {
      // maybe add a lodash test? Will not handle numbers now.
      newStr = yield str.split(search).join(replacement);
    }
    return newStr;
  });
}
// TODO Add test case
function addTestCase(options) {
  return __awaiter(this, void 0, void 0, function* () {
    // Create function addTestCase(options: any){
    let listOfTestPath = {
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
        const testPath = __dirname + listOfTestPath[test];
        // $$criterial
        let testType = Object.keys(smktest.testType)[0];
        // @ts-ignore
        let testContent = yield fs.promises.readFile(
          testPath,
          "utf8",
          // @ts-ignore
          function (err, data) {}
        );
        // Replace variables
        testContent = yield replaceAll(
          testContent,
          "$$criterial",
          smktest.criterial
        );
        testContent = yield replaceAll(
          testContent,
          "$$consoleValue",
          smktest.consoleValue
        );
        //! Check Logs
        if (testType == "checkPodsLogs") {
          testContent = yield replaceAll(
            testContent,
            "$$reportCommand",
            smktest.testType.checkPodsLogs.reportCommand
          );
          testContent = yield replaceAll(
            testContent,
            "$$assert",
            smktest.testType.checkPodsLogs.assert
          );
          testContent = yield replaceAll(
            testContent,
            "$$testCommand",
            smktest.testType.checkPodsLogs.testCommand
          );
          options = yield getServicesName(options);
          let testContentOne = "";
          for (const service of options.services) {
            let testContentTwo = yield replaceAll(
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
          testContent = yield replaceAll(
            testContent,
            "$$reportCommand",
            smktest.testType.grep.reportCommand
          );
          testContent = yield replaceAll(
            testContent,
            "$$testCommand",
            smktest.testType.grep.testCommand
          );
          testContent = yield replaceAll(
            testContent,
            "$$assert",
            smktest.testType.grep.assert
          );
        }
        //! Check Ingress
        if (testType == "checkIngress") {
          let allTest = "";
          yield smktestUtils_1.default.inputMandatory(options, "--namespace");
          options = yield getKubeIngress(options);
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
              initTestContent = yield replaceAll(
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
          options = yield (0, volumeV2_1.default)(options);
          let mountPath = options.mountPath;
          let service = Object.keys(mountPath);
          let grepTemplate02 = "";
          for (const serviceName of service) {
            // $mountPath
            let grepTemplate = yield replaceAll(
              testContent,
              "$$testCommand",
              smktest.testType.checkVolumes.testCommand
            );
            grepTemplate = yield replaceAll(
              grepTemplate,
              "$$service",
              serviceName
            );
            grepTemplate = yield replaceAll(
              grepTemplate,
              "$$assert",
              smktest.testType.checkVolumes.assert
            );
            grepTemplate = yield replaceAll(
              grepTemplate,
              "$$reportCommand",
              smktest.testType.checkVolumes.reportCommand
            );
            grepTemplate = yield replaceAll(
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
            curlTemplate = yield replaceAll(
              curlTemplate,
              "$$testCommand",
              curl
            );
            curlTemplate = yield replaceAll(
              curlTemplate,
              "$$assert",
              smktest.testType.simpleCurlAssert.assert
            );
            curlTemplate = yield replaceAll(
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
            let { responseOfRequest } = yield swaggerSmktest.smokeTest(
              smktest.defaultValue
            );
            for (const swagger of responseOfRequest) {
              let swaggerTemplate = testContent;
              swaggerTemplate = yield replaceAll(
                swaggerTemplate,
                "$$testCommand",
                swagger.curlRequest
              );
              swaggerTemplate = yield replaceAll(
                swaggerTemplate,
                "$$reportCommand",
                swagger.curlRequest
              );
              swaggerTemplate = yield replaceAll(
                swaggerTemplate,
                "$$assert",
                swagger.status
              );
              swaggerTemplate = yield replaceAll(
                swaggerTemplate,
                "$$requestUrl",
                swagger.status
              );
              swaggerTemplate = yield replaceAll(
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
            } = yield swaggerSmktest.smokeTest(smktest.defaultValue, {
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
              let header = {};
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
              testContentElement = yield replaceAll(
                testContentElement,
                "$$curlLogin",
                swaggerLoginCurl.defaultValue
              );
              testContentElement = yield replaceAll(
                testContentElement,
                "$$URL",
                swagger.requestUrl
              );
              testContentElement = yield replaceAll(
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
              let statusCode = yield smktestDep.getStatusCodeToken(options);
              testContentElement = yield replaceAll(
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
          testContent = yield replaceAll(
            testContent,
            "$$namespace",
            options.args["--namespace"]
          );
        } catch (error) {}
        options.smokeTestSuites[criterial][test]["testText"] = testContent;
      }
    }
    return options;
  });
}
// let result = await tasksInit.run().catch(err => {
//     console.error(err);
//     return err.message
// });
function pushTestV2(options) {
  return __awaiter(this, void 0, void 0, function* () {});
}
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
function createTestSuite(options) {
  return __awaiter(this, void 0, void 0, function* () {
    let testPath = "./smokeTest_kubernetes";
    // Create folder if not exist
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }
    // create Folder if not exist:
    options.testPath = testPath;
    // Remove Old Smoke Test Suite
    if (fs.existsSync(testPath)) {
      yield fs.rmdirSync(testPath, { recursive: true });
    }
    // Create Folder if not exit
    if (!fs.existsSync(testPath)) {
      yield fs.mkdirSync(testPath);
      yield fs.mkdirSync(testPath + "/src");
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
      criterialFile = yield replaceAll(criterialFile, "-", "");
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
          if (yield fs.existsSync(pathTestOne)) {
            // Remove The old test
            yield fs.unlinkSync(pathTestOne, "utf8");
          }
          var tasksInit = new Listr([
            {
              title: `Create Criterial ${criterial} in ${testPath}/${criterialFile}`,
              task: () =>
                __awaiter(this, void 0, void 0, function* () {
                  // Add Dependencies File.
                  yield fs.promises.writeFile(
                    pathTestOne,
                    smktest.textDependencies,
                    // @ts-ignore
                    function (err) {}
                  );
                })
            }
          ]);
          // @ts-ignore
          yield tasksInit.run().catch((err) => {
            console.error(err);
            return err.message;
          });
        }
        //!  Push test inside of the folder.
        var testOne = new Listr([
          {
            title: `     Add ${testPath}/${criterialFile} ${test}`,
            task: () =>
              __awaiter(this, void 0, void 0, function* () {
                // Read the file if exist
                let testOld = "AAA";
                testOld = yield fs.promises.readFile(pathTestOne, "utf8");
                let newTest = testOld + smktest.testText;
                yield fs.promises.writeFile(pathTestOne, newTest, "utf8");
              })
          }
        ]);
        // @ts-ignore
        yield testOne.run().catch((err) => {
          console.error(err);
          return err.message;
        });
      }
    }
    return options;
  });
}
function createSuiteByCriterialV2(options) {
  return __awaiter(this, void 0, void 0, function* () {
    options = yield cleanCriterialsNotUsed(options);
    // Add fragment dependencies:
    options = yield addDependencies(options);
    // Add fragment of test
    options = yield addTestCase(options);
    // Execute cases of test using the library
    options = yield createTestSuite(options);
    return options;
  });
}
exports.createSuiteByCriterialV2 = createSuiteByCriterialV2;
//! Load test check Ingress ------------
function suiteGenerator(options) {
  return __awaiter(this, void 0, void 0, function* () {
    // Import dependencies.
    // Import Config File
    const dependenciesFile = __dirname + "/src/templates/initDependencies.js";
    let suiteSmokeTest = "";
    let dependencies = yield fs.promises.readFile(
      dependenciesFile,
      "utf8",
      function (err, data) {}
    );
    suiteSmokeTest = suiteSmokeTest + dependencies;
    // Separate by criteria
    options = yield createSuiteByCriterialV2(options);
    return options;
  });
}
exports.suiteGenerator = suiteGenerator;
exports.default = {
  suiteGenerator,
  createSuiteByCriterialV2,
  cleanCriterialsNotUsed
};
