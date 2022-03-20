// express
const router = require("express").Router();
const smoketest_client = require("../cli");
const runJest = require("../runJest.ts");
const fs = require("fs");
const path = require("path");
const { executeJestTest } = require("./run-jest-test.ts");

/**
 * @swagger
 *  /cluster-coverage/all:
 *    get:
 *      tags:
 *      - "cluster-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria cluster-coverage"
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
      "--cluster-coverage",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketest_client.cli(args);

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

      let statusCode = 200;
      if (!testResult.results.success) {
        statusCode = 600;
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
 *  /cluster-coverage/check-memory:
 *    get:
 *      tags:
 *      - "cluster-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria cluster-coverage"
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
  "/check-memory",
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
      "--check-memory",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketest_client.cli(args);

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

      let statusCode = 200;
      if (!testResult.results.success) {
        statusCode = 600;
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
 *  /cluster-coverage/check-disk:
 *    get:
 *      tags:
 *      - "cluster-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria cluster-coverage"
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
  "/check-disk",
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
      "--check-disk",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketest_client.cli(args);

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

      let statusCode = 200;
      if (!testResult.results.success) {
        statusCode = 600;
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
 *  /cluster-coverage/check-nodes:
 *    get:
 *      tags:
 *      - "cluster-coverage"
 *      summary: "Apply the smoke-test using all test with the criteria cluster-coverage"
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
  "/check-nodes",
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
      "--check-nodes",
      "--namespace=" + request.query.namespace
    ];

    let respTest = await smoketest_client.cli(args);

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

      let statusCode = 200;
      if (!testResult.results.success) {
        statusCode = 600;
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
