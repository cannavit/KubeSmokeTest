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
var _ = require('lodash');
const fs = require('fs');
const shell = require('shelljs');
const arg = require('arg');
require('dotenv').config();
const chalk = require('chalk');
function camelize(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
        .replace(/\s+/g, '');
}
function toCammel(name) {
    return __awaiter(this, void 0, void 0, function* () {
        let nameCamel = camelize(name);
        nameCamel = _.replace(nameCamel, '-', '');
        nameCamel = _.replace(nameCamel, '-', '');
        nameCamel = _.replace(nameCamel, '-', '');
        nameCamel = _.replace(nameCamel, '-', '');
        nameCamel = _.replace(nameCamel, '-', '');
        nameCamel = _.lowerFirst(nameCamel);
        return nameCamel;
    });
}
// Import Standart Variables from smktest.config.json
// function typescript, inputs list of string
// Name of the function getStandardVariables
function getStandardVariables(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Import Config File
        const smokeConfig = require('../smktest.config.json');
        // Initialize Lists
        let withStandardVariables = [];
        let config2 = [];
        for (const smktest of smokeConfig) {
            // Console value associate with the test example (--check-nodes)
            let consoleValue = smktest.consoleValue;
            if (consoleValue !== undefined) {
                // Criterial value associate with the test example ("--cluster-coverage")
                let criterial = smktest.criterial;
                let variable = yield toCammel(consoleValue);
                // Add variables inside of the smktest object.
                smktest.variable = variable;
                // Create the next data structure
                // '--check-cluster-info' to  'SMKTEST_CHECK_CLUSTER_INFO',
                let environmentVariable = variable.substring(2).toUpperCase();
                environmentVariable = _.replace(environmentVariable, '-', '');
                smktest['environmentVariable'] = 'SMKTEST_' + environmentVariable;
                smktest['environmentVariableResultTest'] =
                    'SMKTEST_RESULT_' + environmentVariable;
                smktest['environmentVariableDisabled'] =
                    'SMKTEST_DISABLED_' + environmentVariable;
                withStandardVariables.push(smktest);
            }
            else {
                config2 = Object.keys(smktest);
            }
        }
        options['smktestConfig'] = withStandardVariables;
        options['smktestConfigInputs'] = config2;
        return options;
    });
}
// Verify if the the library have access to culster brefore to run the generator suite
// Use one eval command for try to get one cluster simple feedback
function checkAccessToCluster(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Run one command line using the shell
        let command = 'kubectl cluster-info | grep -v "diagnose" | grep "running"';
        let result = yield shell.exec(command, {
            silent: true,
        }).stdout;
        // Verify if the command return a feedback
        let passTest = false;
        if (result !== '') {
            passTest = true;
        }
        else {
            // Create error event
            throw new Error('Not is possible generate the suite test, loss cluster connection');
        }
        // options['checkAccessToCluster'] = {clusterActive: passTest}
        return passTest;
    });
}
// Old Name createSuiteByCriterialV2
function createSuiteByCriterial(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return options;
    });
}
// Create the list of criteria and test.
// Old Name splitCriterials
function splitCriterial(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let criterialSplit = options.smokeConfig;
    });
}
//! Test verify
function getConsoleInputs(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let standartVariables = yield getStandardVariables(options);
        // Load namespaces
        let consoleInputs = [];
        for (const params of standartVariables.smktestConfigInputs) {
            consoleInputs.push(params);
        }
        for (const stdVariable of standartVariables.smktestConfig) {
            // Get keys name of one json object
            let keys = Object.keys(stdVariable);
            for (const k of keys) {
                if (k.includes('--')) {
                    consoleInputs.push(k);
                }
                try {
                    if (stdVariable[k].includes('--')) {
                        consoleInputs.push(stdVariable[k]);
                    }
                }
                catch (error) { }
            }
        }
        // Remove duplicate data from string list
        // consoleInputs = [...new Set(consoleInputs)];
        consoleInputs = Array.from(new Set(consoleInputs));
        let commands = {};
        for (const inputs of consoleInputs) {
            commands[inputs] = String;
        }
        return commands;
    });
}
function parseArgumentsIntoOptions(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let argumentsCli = yield getConsoleInputs({});
        // With this is possible add one argument --cluster-coverage  === --cluster-coverage=true
        let argsL = [];
        for (const r of args) {
            let envent2 = r.includes('=');
            if (r.includes('--') && !envent2) {
                argsL.push(r + '=true');
            }
            let envent3 = !r.includes('--');
            if (envent3 | r.includes('=true') | r.includes('=')) {
                argsL.push(r);
            }
        }
        //! Black list of arguments Delete all arguments 
        for (const iterator of Object.keys(argumentsCli)) {
            if (iterator.includes('async ()')) {
                delete argumentsCli[iterator];
            }
        }
        //! Register arguments
        args = arg(argumentsCli, {
            argv: argsL.slice(2),
        });
        let options = {
            args: args,
            argumentsCli: argumentsCli,
        };
        args = yield argsByCriterial(options);
        args = yield createDictionaryInputs(args);
        const smokeTestVariableList = [];
        let smktestConfig = yield getStandardVariables({}); //!OK
        for (const smktest of smktestConfig['smktestConfig']) {
            smokeTestVariableList.push(smktest);
        }
        let argumentsData = {};
        let listOfJestPath = [];
        for (const element of smokeTestVariableList) {
            let data = args[element.consoleValue] || element.defaultValue;
            //! If exist parameter inside of the console (* Have priority)
            let useNext = true;
            if (data) {
                process.env[element.environmentVariable] = data;
                useNext = false;
                if (element.jestTestPath !== '') {
                    listOfJestPath.push(element.jestTestPath);
                }
            }
            //! If exist environment variable get value:
            if (process.env[element.environmentVariable] && useNext) {
                data = process.env[element.environmentVariable];
                if (element.jestTestPath !== '') {
                    listOfJestPath.push(element.jestTestPath);
                }
            }
            argumentsData['listOfJestPath'] = listOfJestPath;
            argumentsData[element.variable] = data;
            // argumentsData.customDictionary = args.customDictionary;
            argumentsData = Object.assign({ listOfJestPath: listOfJestPath, data: data }, args);
        }
        return argumentsData;
    });
}
// Create Group by Criteria
function argsByCriterial(options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let args = options.args;
        let standartVariables = yield getStandardVariables(options);
        let originalArgs = args;
        standartVariables = standartVariables.smktestConfig;
        let criteriaList = [];
        for (const smktest of standartVariables) {
            let criterial = smktest['criterial'];
            if (args[criterial]) {
                if (smktest.criterial === criterial) {
                    args[smktest.consoleValue] = 'true';
                }
            }
            criteriaList.push(smktest.criterial);
        }
        // Get unics criterials from list
        // let unicsCriterials: any  = [...new Set(criteriaList)]; //TODO test Deprecied
        let unicsCriterials = Array.from(new Set(criteriaList));
        // Create dicctionary of criteria using test
        let criteriaDictionary = {};
        for (const criterial of unicsCriterials) {
            criteriaDictionary[criterial] = [];
            for (const smktest of standartVariables) {
                if (smktest.criterial === criterial) {
                    criteriaDictionary[criterial].push(smktest.consoleValue);
                }
            }
        }
        // Build the test set using the inputs and the criteriaDiccionary
        let criterialSet = {};
        // get the keys of json objects originalArgs
        let originalArgsKeys = Object.keys(originalArgs);
        for (const criterial of originalArgsKeys) {
            // Verify if criterial is inside of the list of criterials
            if (unicsCriterials.includes(criterial)) {
                criterialSet[criterial] = criteriaDictionary[criterial];
            }
        }
        // Create dictionary with credentials selected.
        // input example:
        options.args = args;
        return options;
    });
}
function getSuiteTst(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = yield getStandardVariables(options);
        let smokeTestSuites = {};
        for (const criterial of Object.keys(options.customDictionary.suites)) {
            for (const suite of Object.keys(options.customDictionary.suites[criterial])) {
                let value = options.customDictionary.suites[criterial][suite];
                // Find Test Suites
                for (const smktest of options.smktestConfig) {
                    if (smktest.criterial === criterial && smktest.consoleValue === suite) {
                        smktest.defaultValue = value;
                        try {
                            smokeTestSuites[criterial][suite] = smktest;
                        }
                        catch (error) {
                            smokeTestSuites[criterial] = {};
                            smokeTestSuites[criterial][suite] = smktest;
                        }
                    }
                }
            }
        }
        options['smokeTestSuites'] = smokeTestSuites;
        return options;
    });
}
function createCriterialDicctionary(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = yield getStandardVariables(options);
        let criteriaDictionary = {};
        for (const smktest of options.smktestConfig) {
            try {
                criteriaDictionary[smktest.criterial][smktest.consoleValue] = 'false';
            }
            catch (error) {
                criteriaDictionary[smktest.criterial] = {};
                criteriaDictionary[smktest.criterial][smktest.consoleValue] = 'false';
            }
        }
        options.criteriaDictionary = criteriaDictionary;
        return options;
    });
}
function createDictionaryInputs(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // CustomDictionary
        options = yield createCriterialDicctionary(options);
        let criteriaDictionary = options.criteriaDictionary;
        let customDictionary = options.criteriaDictionary;
        // Active single test:
        for (const criterial of Object.keys(criteriaDictionary)) {
            for (const test of Object.keys(criteriaDictionary[criterial])) {
                if (options.args[test]) {
                    customDictionary[criterial][test] = options.args[test];
                }
            }
        }
        // Active criteria:
        for (const args of Object.keys(options.args)) {
            if (customDictionary[args]) {
                for (const test of Object.keys(customDictionary[args])) {
                    if (customDictionary[args][test] === 'false') {
                        customDictionary[args][test] = 'true';
                    }
                }
            }
        }
        let generalOptions = customDictionary['--general-options'];
        delete customDictionary['--general-options'];
        options.customDictionary = {
            generalOptions: generalOptions,
            suites: customDictionary,
        };
        // Load test suite of smktest.json.
        options = yield getSuiteTst(options);
        return options;
    });
}
function inputMandatory(options, variableRequired) {
    return __awaiter(this, void 0, void 0, function* () {
        var keys = Object.keys(options.args);
        let pass = false;
        for (const key of keys) {
            if (key === variableRequired) {
                pass = true;
            }
        }
        if (pass !== true ||
            options[variableRequired] === 'false' ||
            options[variableRequired] === false) {
            console.log(chalk.red.bold('ERROR: INPUT MANDATORY'));
            throw new Error(chalk.yellow.bold(` 🛑  The Input: ${variableRequired} is required`));
        }
        return options;
    });
}
exports.default = {
    toCammel,
    getStandardVariables,
    createSuiteByCriterial,
    checkAccessToCluster,
    splitCriterial,
    getConsoleInputs,
    parseArgumentsIntoOptions,
    argsByCriterial,
    createDictionaryInputs,
    createCriterialDicctionary,
    getSuiteTst,
    inputMandatory,
};
