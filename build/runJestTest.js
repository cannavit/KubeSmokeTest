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
const jest = require('jest');
const chalk = require('chalk');
var fs = require('fs');
const shell = require('shelljs');
function runJestTest() {
    return __awaiter(this, void 0, void 0, function* () {
        //! Run Jest Test. >>>
        const optionsJest = {
            projects: './smokeTest_kubernetes',
            roots: '',
            silent: false,
        };
        let testResult = yield jest.runCLI(optionsJest, optionsJest.projects);
        if (testResult.results.numFailedTestSuites > 0) {
            console.log();
            console.log('-------------------------------------------------------');
            console.log(chalk.red.bold(` 🛑  SMOKE TEST ERROR 👎`));
            console.log(' FORCE BREAK OF THE PIPELINE >>');
            console.log();
            console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥💨 💨 💨 🔥');
            console.log(' 🛑  ERROR: Smoke Test');
            console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥💨 💨 💨 🔥');
            console.log();
            console.log('-------------------------------------------------------');
            console.log();
            process.exit(1); // failed pipeline gitlab
        }
        else {
            console.log();
            console.log('-------------------------------------------------------');
            console.log();
            console.log(' 🟩 Job succeeded');
            console.log(' 🟢 🚭 SUCCESS SMOKE TEST');
            console.log(' ✅ You can continue with the rest of the test suites');
            console.log();
            console.log('-------------------------------------------------------');
            console.log();
            process.exit(0); //pass pipeline gitlab
        }
        // break
    });
}
;
exports.default = runJestTest;
