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
                let environmentVariable = variable.substring(2)
                    .toUpperCase();
                environmentVariable = _.replace(environmentVariable, '-', '');
                smktest['environmentVariable'] = 'SMKTEST_' + environmentVariable;
                smktest['environmentVariableResultTest'] = 'SMKTEST_RESULT_' + environmentVariable;
                smktest['environmentVariableDisabled'] = 'SMKTEST_DISABLED_' + environmentVariable;
                withStandardVariables.push(smktest);
            }
            else {
                config2 = Object.keys(smktest);
            }
        }
        options["smktestConfig"] = withStandardVariables;
        options["smktestConfigInputs"] = config2;
        return options;
    });
}
function checkAccessToCluster(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = 'kubectl cluster-info | grep -v "diagnose" | grep "running"';
        let result = yield shell.exec(command).stdout;
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
exports.default = {
    toCammel,
    getStandardVariables,
    createSuiteByCriterial,
    checkAccessToCluster
};
//# sourceMappingURL=smktestUtils.js.map