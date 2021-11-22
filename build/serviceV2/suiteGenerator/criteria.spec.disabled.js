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
//   projectName: options.projectName || projectName,
//   environmentVariable: options.environmentVariable || environmentVariable,
//   environment: options.environment || environment,
//   context: options.context || context,
const criteria_1 = __importDefault(require("./criteria"));
describe('Test of criterial functions', () => {
    test('Verify the output with the function promptForContext', () => __awaiter(void 0, void 0, void 0, function* () {
        let options = {
            listOfJestPath: [],
            data: 'false',
            args: {
                _: [],
                '--cluster-coverage': 'true',
                '--curl-assert': 'curl -v www.google.com',
                '--check-cluster-info': 'true',
                '--check-nodes': 'true',
                '--check-cluster': 'true',
                '--check-disc': 'true',
                '--check-memory': 'true'
            },
            argumentsCli: {},
            smktestConfig: [
                {
                    SMKTEST_ENV: '',
                    criterial: '--general-options',
                    consoleValue: '--yes',
                    defaultValue: null,
                    jestTestPath: '',
                    variable: 'yes',
                    environmentVariable: 'SMKTEST_S',
                    environmentVariableResultTest: 'SMKTEST_RESULT_S',
                    environmentVariableDisabled: 'SMKTEST_DISABLED_S'
                }
            ],
            smktestConfigInputs: [],
            criteriaDictionary: {
                '--cluster-coverage': {
                    '--check-cluster-info': 'true',
                    '--check-nodes': 'true',
                    '--check-cluster': 'true',
                    '--check-disc': 'true',
                    '--check-memory': 'true'
                },
                '--service-coverage': { '--check-pods-running': 'false', '--check-pods-logs': 'false' },
                '--ingress-coverage': { '--check-ingress': 'false' },
                '--resource-up': {
                    '--volumes-free-space': 'false',
                    '--volumes-exist-files': 'false'
                },
                '--endpoint-coverage': {
                    '--curl-url': 'false',
                    '--curl-assert': 'curl -v www.google.com'
                },
                '--execution-unit-coverage': { '--service-up': 'false' }
            },
            customDictionary: {
                generalOptions: {
                    '--yes': 'false',
                    '--project-name': 'false',
                    '--namespace': 'false',
                    '--context': 'false',
                    '--environmentVariable': 'false',
                    '--environment': 'false',
                    '--not-run': 'false'
                },
                suites: {}
            },
            smokeTestSuites: {
                '--cluster-coverage': {}
            },
            projectDir: '/Users/ceciliocannavaciuolo/Documents/workspace/phd/smoke-master/src',
            smktestFolder: 'smktest',
            testId: '00120102301230123'
        };
        options = yield criteria_1.default.promptForContext(options);
        let passTest = false;
        if (options['projectName'] !== undefined) {
            if (options['environmentVariable'] !== undefined) {
                if (options['environment'] !== undefined) {
                    if (options['context'] !== undefined) {
                        passTest = true;
                    }
                }
            }
        }
        expect(passTest).toEqual(true);
    }));
    // test('Verify if exist the SMKTEST_OPTIONS environment variable', async () => {
    //     let options = process.env.SMKTEST_OPTIONS
    //     console.log(">>>>>-1369944130>>>>>")
    //     console.log(options)
    //     console.log("<<<<<<<<<<<<<<<<<<<")
    //     expect(true).toEqual(true)
    // })
});
