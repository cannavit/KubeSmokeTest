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
exports.cli = void 0;
// import arg from 'arg';
// import inquirer from 'inquirer';
const smktestUtils_1 = __importDefault(require("./utils/smktestUtils"));
const criteria_1 = __importDefault(require("./serviceV2/suiteGenerator/criteria"));
const suiteGenerator_1 = __importDefault(require("./serviceV2/suiteGenerator/suiteGenerator"));
// import runJestTest from './runJestTest'
const Listr = require('listr');
// import Listr from 'listr';
const execa = require('execa');
const fs = require('fs');
function printHelp(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let continueCli = true;
        for (const arg of args) {
            if (arg === '--help' || arg === '-h') {
                console.log();
                console.log();
                console.log('---------------- SMOKE TEST GENERATOR HELP ---------------');
                console.log(" This library's to generates smoke test suites using kubernetes.");
                console.log(' Apply adequacy criteria. Each criterion offers a specific coverage ');
                console.log('and automatic level. Below is an example of how to use the criteria');
                console.log();
                console.log(' Utils commands');
                console.log('       --run-tests:       Run tests suites after of generate suites');
                console.log();
                console.log('Example of use:');
                console.log();
                console.log('create-smktest --cluster-coverage');
                console.log();
                console.log();
                console.log('  Criteria           | Descriptions');
                console.log('--cluster-coverage   | Verify kubernetes nodes conditions ');
                console.log('       Tests:          Description:                                        Input Required:');
                console.log('       --check-disc:     Check free space inside of the cluster                  No');
                console.log('       --check-memory:   Check if exist memory pressure                          No');
                console.log('       --check-disc   :  Check if exist hard disk pressure                       No');
                console.log('       --check-cluster:  Verify the conditions of the cluster                    No');
                console.log('       --check-nodes:    Verify the conditions of the cluster nodes              No');
                console.log();
                console.log('--ingress-coverage   | Verify cluster ingress access from outside');
                console.log('       Tests:          Description:                                        Input Required:  VIDEO* ---');
                console.log('       --check-ingress:     Check all exposed ingress                          --namespace');
                console.log();
                console.log('--service-coverage   | Verify if all cluster services and pods are Running');
                console.log('       Tests:          Description:                                        Input Required:');
                console.log('       --check-pods-logs:      Search logs error                               --namespace');
                console.log('       --check-pods-running:   Check if all services are active                --namespace');
                console.log('       --execution-unit-coverage:  Check if all pods are active                --namespace');
                console.log();
                console.log('--resource-up   | Verify if all volume and files area accessible VIDEO* ---');
                console.log('       Tests:          Description:                                        Input Required:');
                console.log('       --volumes-free-space:    Verify if the volume have enough space         --namespace');
                console.log('       --volumes-exist-files:   Verify if exist files inside of the volumes    --namespace');
                console.log();
                console.log('--endpoint-coverage  | Verify endpoint list  ** PENDING **');
                console.log('       Tests:          Description:                                        Input Required:');
                console.log('       --curl-assert:         Check response of the curl                       --curl-assert=\'["curl -v www.google.com", " curl -v www.googleFalse.com"]\'');
                console.log("       --swagger-docs:        Check response of the curl                       --swagger-docs='Swagger apis docs url'");
                console.log("       --swagger-login-curl:  Check response of the curl                       --swagger-docs='Swagger apis docs url'");
                console.log('       --check-pods-logs:   Verify if exist files inside of the volumes        --namespace');
                console.log();
                console.log('--dependency-coverage  | Verify endpoint list  ** PENDING **');
                console.log('       Tests:          Description:                                        Input Required:');
                console.log('       --curl-assert:            Check response of the curl                     --curl-assert=\'["curl -v www.google.com", " curl -v www.googleFalse.com"]\'');
                console.log("       --swagger-docs:           Check response of the curl                     --swagger-docs='Swagger apis docs url'");
                console.log('       --cross-ping:             Verify if exist files inside of the volumes    --namespace');
                console.log('       --check-pods-logs:        Verify if exist files inside of the volumes    --namespace');
                console.log('       --check-dependencies:     Verify if dependencies are active              --namespace');
                console.log('       --check-images:           Verify if dependencies are active              --namespace');
                console.log('       --check-internet-access:  Verify if dependencies are active              --namespace');
                console.log();
                console.log();
                console.log();
                console.log();
                console.log();
                continueCli = false;
            }
        }
        return continueCli;
    });
}
//? Read the standards Variables
function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let options;
        let continueCli = yield printHelp(args);
        if (continueCli) {
            // Check if the library have access to kubernetes cluster
            // This part is for avoid the error of the generate command
            const tasksInit = new Listr([
                {
                    title: 'Verify connection with kubernetes cluster',
                    task: () => {
                        return new Listr([
                            {
                                title: 'Get Cluster Info (kubectl cluster-info)',
                                task: () => __awaiter(this, void 0, void 0, function* () {
                                    return yield smktestUtils_1.default.checkAccessToCluster({});
                                }),
                            },
                        ], { concurrent: false });
                    },
                },
            ]);
            // @ts-ignore
            let result = yield tasksInit.run().catch((err) => {
                console.error(err);
                return err.message;
            });
            options = yield smktestUtils_1.default.parseArgumentsIntoOptions(args);
            options['projectDir'] = __dirname; // SmokeTest route
            options['smktestFolder'] = 'smktest'; // SmokeTet base directory
            options['testId'] = '00120102301230123'; //TODO PENDING TO ADD IF IS NECESSARY
            options = yield criteria_1.default.promptForContext(options);
            process.env.SMKTEST_OPTIONS = JSON.stringify(options);
            // import dependencies.
            yield suiteGenerator_1.default.suiteGenerator(options);
            options['cli'] = {
                tasksInit: result,
            };
        }
        return options;
    });
}
exports.cli = cli;
exports.default = cli;
