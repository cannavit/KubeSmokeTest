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
function getStandardVariables(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let pathConfigurationFile = './smktest.config.json';
        let existConfigFile = yield fs.existsSync(pathConfigurationFile);
        if (!existConfigFile) {
            throw new Error(`The configuration file ${pathConfigurationFile} does not exist.`);
        }
        const smokeConfig = require('../../smktest.config.json');
        let withStandardVariables = [];
        let config2 = [];
        for (const smktest of smokeConfig) {
            let consoleValue = smktest.consoleValue;
            if (consoleValue !== undefined) {
                let criterial = smktest.criterial;
                let variable = yield this.toCammel(consoleValue);
                smktest.variable = variable;
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
function checkAccessToCluster(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = 'kubectl cluster-info | grep -v "diagnose" | grep "running"';
        let result = yield shell.exec(command, {
            silent: true,
        }).stdout;
        let passTest = false;
        if (result !== '') {
            passTest = true;
        }
        else {
            throw new Error('Not is possible generate the suite test, loss cluster connection');
        }
        return passTest;
    });
}
function createSuiteByCriterial(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return options;
    });
}
function splitCriterial(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let criterialSplit = options.smokeConfig;
    });
}
function getConsoleInputs(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let standartVariables = yield this.getStandardVariables(options);
        let consoleInputs = [];
        for (const params of standartVariables.smktestConfigInputs) {
            consoleInputs.push(params);
        }
        for (const stdVariable of standartVariables.smktestConfig) {
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
        consoleInputs = [...new Set(consoleInputs)];
        let commands = {};
        for (const inputs of consoleInputs) {
            commands[inputs] = String;
        }
        return commands;
    });
}
function parseArgumentsIntoOptions(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let argumentsCli = yield this.getConsoleInputs({});
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
        for (const iterator of Object.keys(argumentsCli)) {
            if (iterator.includes('async ()')) {
                delete argumentsCli[iterator];
            }
        }
        args = arg(argumentsCli, {
            argv: argsL.slice(2),
        });
        let options = {
            args: args,
            argumentsCli: argumentsCli,
        };
        args = yield this.argsByCriterial(options);
        args = yield this.createDictionaryInputs(args);
        const smokeTestVariableList = [];
        let smktestConfig = yield this.getStandardVariables({});
        for (const smktest of smktestConfig['smktestConfig']) {
            smokeTestVariableList.push(smktest);
        }
        let argumentsData = {};
        let listOfJestPath = [];
        for (const element of smokeTestVariableList) {
            let data = args[element.consoleValue] || element.defaultValue;
            let useNext = true;
            if (data) {
                process.env[element.environmentVariable] = data;
                useNext = false;
                if (element.jestTestPath !== '') {
                    listOfJestPath.push(element.jestTestPath);
                }
            }
            if (process.env[element.environmentVariable] && useNext) {
                data = process.env[element.environmentVariable];
                if (element.jestTestPath !== '') {
                    listOfJestPath.push(element.jestTestPath);
                }
            }
            argumentsData['listOfJestPath'] = listOfJestPath;
            argumentsData[element.variable] = data;
            argumentsData = Object.assign({ listOfJestPath: listOfJestPath, data: data }, args);
        }
        return argumentsData;
    });
}
function argsByCriterial(options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let args = options.args;
        let standartVariables = yield this.getStandardVariables(options);
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
        let unicsCriterials = [...new Set(criteriaList)];
        let criteriaDictionary = {};
        for (const criterial of unicsCriterials) {
            criteriaDictionary[criterial] = [];
            for (const smktest of standartVariables) {
                if (smktest.criterial === criterial) {
                    criteriaDictionary[criterial].push(smktest.consoleValue);
                }
            }
        }
        let criterialSet = {};
        let originalArgsKeys = Object.keys(originalArgs);
        for (const criterial of originalArgsKeys) {
            if (unicsCriterials.includes(criterial)) {
                criterialSet[criterial] = criteriaDictionary[criterial];
            }
        }
        options.args = args;
        return options;
    });
}
function getSuiteTst(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = yield this.getStandardVariables(options);
        let smokeTestSuites = {};
        for (const criterial of Object.keys(options.customDictionary.suites)) {
            for (const suite of Object.keys(options.customDictionary.suites[criterial])) {
                let value = options.customDictionary.suites[criterial][suite];
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
        options = yield this.getStandardVariables(options);
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
        options = yield this.createCriterialDicctionary(options);
        let criteriaDictionary = options.criteriaDictionary;
        let customDictionary = options.criteriaDictionary;
        for (const criterial of Object.keys(criteriaDictionary)) {
            for (const test of Object.keys(criteriaDictionary[criterial])) {
                if (options.args[test]) {
                    customDictionary[criterial][test] = options.args[test];
                }
            }
        }
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
        options = yield this.getSuiteTst(options);
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
//# sourceMappingURL=smktestUtils.js.map