"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeJestTest = void 0;
const jest = require('jest');
const path = require('path');
function executeJestTest() {
    return __awaiter(this, void 0, void 0, function* () {
        let directoryTest = path.join(__dirname, '../../');
        directoryTest = directoryTest + 'smokeTest_kubernetes';
        const optionsJest = {
            projects: [
                directoryTest
                // __dirname
            ],
            // roots: ['smokeTest_suites'],
            silent: true,
        };
        let testResult;
        try {
            testResult = yield jest.runCLI(optionsJest, optionsJest.projects);
        }
        catch (error) {
            console.log(error);
        }
        let testResultsElements = [];
        testResult.results.testResults.forEach((element) => {
            element.testResults.forEach((test) => {
                console.log(test);
                testResultsElements.push({
                    fullName: test.fullName,
                    status: test.status,
                    title: test.title,
                    failureMessages: JSON.stringify(test.failureMessages),
                    duration: test.duration,
                });
            });
        });
        return {
            testResultsElements: testResultsElements,
            testResult: testResult
        };
    });
}
exports.executeJestTest = executeJestTest;
// module.exports.default = executeJestTest
exports.default = executeJestTest;
