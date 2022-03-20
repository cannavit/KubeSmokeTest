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
// express
const router = require("express").Router();
const smoketest_client = require("../cli");
const runJest = require("../runJest.ts");
const fs = require("fs");
const path = require("path");
const { executeJestTest } = require("./run-jest-test.ts");
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
router.get("/all", function (request, response, next) {
  return __awaiter(this, void 0, void 0, function* () {
    let args = [
      "",
      "",
      "--endpoint-coverage",
      "--namespace=" + request.query.namespace
    ];
    let respTest = yield smoketest_client.cli(args);
    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary
      });
    } else {
      let dataResultTest = yield executeJestTest();
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
  });
});
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
router.get("/curl-url", function (request, response, next) {
  return __awaiter(this, void 0, void 0, function* () {
    let args = ["", "", "--curl-url", "--namespace=" + request.query.namespace];
    let respTest = yield smoketest_client.cli(args); //TODO add inputs
    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary
      });
    } else {
      let dataResultTest = yield executeJestTest();
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
  });
});
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
router.get("/curl-assert", function (request, response, next) {
  return __awaiter(this, void 0, void 0, function* () {
    let args = [
      "",
      "",
      "--curl-assert",
      "--namespace=" + request.query.namespace
    ];
    let respTest = yield smoketest_client.cli(args);
    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary
      });
    } else {
      let dataResultTest = yield executeJestTest();
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
  });
});
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
 *      - in: query
 *        name: "swaggerDocsUrl"
 *        description: "Add the swagger (OpenApi) documentation url"
 *        x-example: true
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 */
router.get("/swagger-login-curl", function (request, response, next) {
  return __awaiter(this, void 0, void 0, function* () {
    let args = [
      "",
      "",
      "--swagger-login-curl",
      "--namespace=" + request.query.namespace,
      "--swagger-docs='" + request.query.swaggerDocsUrl + "'"
    ];
    let respTest = yield smoketest_client.cli(args);
    if (request.query.runTests == "false") {
      return response.status(200).send({
        message: "Welcome to KubeSomkeTest API",
        testId: respTest.testId,
        criteriaDictionary: respTest.criteriaDictionary
      });
    } else {
      let dataResultTest = yield executeJestTest();
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
  });
});
module.exports = router;
