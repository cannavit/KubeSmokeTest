// express
const router = require("express").Router();
const smoketestClient = require("../cli");
const runJest = require("../runJest.ts");
const jest = require('jest');
const fs = require('fs');
const path = require('path');



async function executeJestTest() {
  let directoryTest = path.join(__dirname, '../../');
  directoryTest = directoryTest + 'smokeTest_kubernetes'


  const optionsJest = {
    projects: [
      directoryTest
      // __dirname
    ],
    // roots: ['smokeTest_suites'],
    silent: true,
  }; 

  let testResult = await jest.runCLI(optionsJest, optionsJest.projects);

  let testResultsElements = []
  testResult.results.testResults.forEach(element => {

    element.testResults.forEach(test => {
      console.log(test);

          testResultsElements.push({
            fullName: test.fullName,
            status: test.status,
            title: test.title,
            failureMessages: JSON.stringify(test.failureMessages),
            duration: test.duration,
    })
    });

    
  });

  return testResultsElements

}


/**
 * @swagger
 *  /cluster-coverage/memory-pressure:
 *    get:
 *      tags:
 *      - "cluster-coverage"
 *      summary: "Verify cluster memory pressure"
 *      parameters:
 *      - in: query
 *        name: "namespace"
 *        description: "The namespace of the cluster"
 *        x-example: "test"
 *      - in: query
 *        name: "runTests"
 *        description: "Run the smoke-test generated and get results"
 *        x-example: true
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 */
router.get(
  "/memory-pressure",
  async function (
    request: { query: { namespace: string; runTests: string } },
    response: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: {
          (arg0: {
            message: string;
            testId: string;
            criteriaDictionary: any;
          }): any;
          new (): any;
        };
      };
    },
    next: any
  ) {
    let args = [
      "",
      "",
      "--cluster-coverage",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketestClient.cli(args);

    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary
      });
      
    } else {

      let testResults = await executeJestTest();
    
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
        testSuccess: testResult.results.success,
        numPassedTests: testResult.results.numPassedTests,
        numFailedTestSuites: testResult.results.numFailedTestSuites,
        testResults: testResults
      });
    }
  }
);

module.exports = router;
