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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const inquirer_1 = __importDefault(require("inquirer"));
//! 1) Option: Criterial
function promptForContext(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultSelection = 'localhost';
        if (options.skipPrompts) {
            return Object.assign(Object.assign({}, options), { criterial: options.context || defaultSelection });
        }
        const questions = [];
        if (!options.projectName) {
            questions.push({
                type: 'input',
                name: 'projectName',
                message: 'Add your projectName:',
            });
        }
        if (!options.environmentVariable) {
            questions.push({
                type: 'input',
                name: 'environmentVariable',
                message: 'Add an environment variable to associate (example: NODE_ENV):',
            });
        }
        if (!options.environment) {
            questions.push({
                type: 'input',
                name: 'environment',
                message: 'Add the smoke test environment where apply the test (example: develop, production, test):',
            });
        }
        if (!options.context) {
            questions.push({
                type: 'rawlist',
                name: 'context',
                message: 'Please choose a smoke test context:',
                choices: [
                    'localhost',
                    'specific host',
                    'docker',
                    'kubernetes',
                    'remote-server',
                ],
            });
        }
        let answers;
        if (options.configFile) {
            // only with --create-config-file
            answers = yield inquirer_1.default.prompt(questions);
        }
        //! Default values >>>
        let projectName;
        try {
            projectName = answers.projectName;
        }
        catch (error) {
            projectName = 'undefined';
        }
        let environmentVariable;
        try {
            projectName = answers.environmentVariable;
        }
        catch (error) {
            environmentVariable = 'undefined';
        }
        let environment;
        try {
            projectName = answers.environment;
        }
        catch (error) {
            environment = 'kubernetes';
        }
        let context;
        try {
            projectName = answers.context;
        }
        catch (error) {
            context = 'kubernetes';
        }
        return Object.assign(Object.assign({}, options), { projectName: options.projectName || projectName, environmentVariable: options.environmentVariable || environmentVariable, environment: options.environment || environment, context: options.context || context });
    });
}
exports.default = {
    promptForContext
};
