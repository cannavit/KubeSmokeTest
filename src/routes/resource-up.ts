// express
const router = require("express").Router();
const smoketestClient = require("../cli");
const runJest = require("../runJest.ts");
const fs = require('fs');
const path = require('path');
const {
  executeJestTest
} = require("./run-jest-test.ts");



/**
 * @swagger
 *  /resource-up/all:
 *    get:
 *      tags:
 *      - "resource-up"
 *      summary: "Apply the smoke-test using all test with the criteria resource-up"
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
  "/all",
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
            testSuccess?: boolean;
            numPassedTests?: number;
            numFailedTestSuites?: number;
            testResults?: any;
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
      "--resource-up",
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

      let dataResultTest = await executeJestTest();
      let testResultsElements = dataResultTest.testResultsElements;
      let testResult = dataResultTest.testResult;
      
      let statusCode=200
      if (!testResult.results.success){
        statusCode=600
      }

      return response.status(statusCode).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
        testSuccess: testResult.results.success,
        numPassedTests: testResult.results.numPassedTests,
        numFailedTestSuites: testResult.results.numFailedTestSuites,
        testResults: testResultsElements
      });
    }
  }
);


/**
 * @swagger
 *  /resource-up/volumes-free-space:
 *    get:
 *      tags:
 *      - "resource-up"
 *      summary: "Apply the smoke-test using all test with the criteria resource-up"
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
  "/volumes-free-space",
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
            testSuccess?: boolean;
            numPassedTests?: number;
            numFailedTestSuites?: number;
            testResults?: any;
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
      "--volumes-free-space",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketestClient.cli(args);

    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
      });

    } else {

      let dataResultTest = await executeJestTest();
      let testResultsElements = dataResultTest.testResultsElements;
      let testResult = dataResultTest.testResult;
      
      let statusCode=200
      if (!testResult.results.success){
        statusCode=600
      }

      return response.status(statusCode).send({
        message: "This is one smoke-test",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
        testSuccess: testResult.results.success,
        numPassedTests: testResult.results.numPassedTests,
        numFailedTestSuites: testResult.results.numFailedTestSuites,
        testResults: testResultsElements
      });
    }
  }
);


/**
 * @swagger
 *  /resource-up/volumes-exist-files:
 *    get:
 *      tags:
 *      - "resource-up"
 *      summary: "Apply the smoke-test using all test with the criteria resource-up"
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
  "/volumes-exist-files",
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
            testSuccess?: boolean;
            numPassedTests?: number;
            numFailedTestSuites?: number;
            testResults?: any;
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
      "--volumes-exist-files",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketestClient.cli(args);

    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
      });

    } else {

      let dataResultTest = await executeJestTest();
      let testResultsElements = dataResultTest.testResultsElements;
      let testResult = dataResultTest.testResult;
      
      let statusCode=200
      if (!testResult.results.success){
        statusCode=600
      }

      return response.status(statusCode).send({
        message: "This is one smoke-test",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary,
        testSuccess: testResult.results.success,
        numPassedTests: testResult.results.numPassedTests,
        numFailedTestSuites: testResult.results.numFailedTestSuites,
        testResults: testResultsElements
      });
    }
  }
);

module.exports = router;


