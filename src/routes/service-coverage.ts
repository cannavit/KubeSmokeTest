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
 *  /service-coverage/all:
 *    get:
 *      tags:
 *      - "service-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria service-coverage"
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
      "--service-coverage",
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
 *  /service-coverage/check-pods-running:
 *    get:
 *      tags:
 *      - "service-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria service-coverage"
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
  "/check-pods-running",
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
      "--check-pods-running",
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
 *  /service-coverage/check-pods-logs:
 *    get:
 *      tags:
 *      - "service-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria service-coverage"
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
  "/check-pods-logs",
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
      "--check-pods-logs",
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
 *  /service-coverage/execution-unit-coverage:
 *    get:
 *      tags:
 *      - "service-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria service-coverage"
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
  "/execution-unit-coverage",
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
      "--execution-unit-coverage",
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


