// express
const router = require("express").Router();
const smoketestClient = require("../cli");
const runJest = require("../runJest.ts");
const fs = require('fs');
const path = require('path');
const {
  executeJestTest
} = require("./run-jest-test.ts");


//TODO pending add inputs here

/**
 * @swagger
 *  /endpoint-coverage/all:
 *    get:
 *      tags:
 *      - "endpoint-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria endpoint-coverage"
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
      "--endpoint-coverage",
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
 *  /endpoint-coverage/curl-url:
 *    get:
 *      tags:
 *      - "endpoint-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria endpoint-coverage"
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
  "/curl-url",
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
      "--curl-url",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketestClient.cli(args); //TODO add inputs

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
 *  /endpoint-coverage/curl-assert:
 *    get:
 *      tags:
 *      - "endpoint-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria endpoint-coverage"
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
  "/curl-assert",
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
      "--curl-assert",
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
 *  /endpoint-coverage/swagger-login-curl:
 *    get:
 *      tags:
 *      - "endpoint-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria endpoint-coverage"
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
  "/swagger-login-curl",
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
      "--swagger-login-curl",
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


