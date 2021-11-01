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
exports.suiteGenerator = exports.createSuiteByCriterialV2 = void 0;
const smktestUtils_1 = require("../../utils/smktestUtils");
const shell = require('shelljs');
const fs = require('fs');
const Listr = require('listr');
const _ = require('lodash');
const chalk = require('chalk');
const swaggerSmktest = require('swagger-smktest');
const smktestDep = require('smktest-utils');
const volumeV2_1 = require("./src/volumeV2");
function getServicesName(options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield smktestUtils_1.default.inputMandatory(options, '--namespace');
        let command = 'kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v "NAME"';
        command = command.replace('$$namespace', options.args['--namespace']);
        let response = yield shell.exec(command, {
            silent: true,
        }).stdout;
        response = response.split('\n');
        response.pop();
        options.services = response;
        return options;
    });
}
function getKubeIngress(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let testCommand = "kubectl get ingress -n $$namespace  -o=jsonpath='{.items[*].spec.rules[*]}'";
        testCommand = testCommand.replace('$$namespace', options.args['--namespace']);
        let responseReport = yield shell.exec(testCommand, {
            silent: true,
        }).stdout;
        responseReport = responseReport.split(' ');
        let ingressList = [];
        for (var response of responseReport) {
            response = JSON.parse(response);
            var keys = Object.keys(response);
            for (var path in response) {
                for (var p in response[path].paths) {
                    let res = 'http://' + response.host + response[path].paths[p].path;
                    ingressList.push(res);
                }
            }
        }
        options.ingressList = ingressList;
        return options;
    });
}
function cleanCriterialsNotUsed(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let smokeTestSuitesActive = options.smokeTestSuites;
        for (const criterial of Object.keys(options.smokeTestSuites)) {
            for (const test of Object.keys(options.smokeTestSuites[criterial])) {
                if (options.smokeTestSuites[criterial][test].defaultValue === 'false') {
                    delete smokeTestSuitesActive[criterial][test];
                }
            }
        }
        for (const criterial of Object.keys(options.smokeTestSuites)) {
            if (Object.keys(smokeTestSuitesActive[criterial]).length === 0) {
                delete smokeTestSuitesActive[criterial];
            }
        }
        options.smokeTestSuites = smokeTestSuitesActive;
        return options;
    });
}
function addDependencies(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const dependenciesFile = __dirname + '/src/templates/initDependencies.js';
        let suiteSmokeTest = '';
        let dependencies = yield fs.promises.readFile(dependenciesFile, 'utf8', function (err, data) { });
        for (const criterial of Object.keys(options.smokeTestSuites)) {
            for (const test of Object.keys(options.smokeTestSuites[criterial])) {
                options.smokeTestSuites[criterial][test]['textDependencies'] =
                    dependencies;
            }
        }
        return options;
    });
}
function replaceAll(str, search, replacement) {
    return __awaiter(this, void 0, void 0, function* () {
        var newStr = '';
        if (_.isString(str)) {
            newStr = yield str.split(search).join(replacement);
        }
        return newStr;
    });
}
function addTestCase(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let listOfTestPath = {
            '--check-cluster': '/src/templates/grepTemplate.js',
            '--check-disc': '/src/templates/grepTemplate.js',
            '--check-memory': '/src/templates/grepTemplate.js',
            '--check-pods-running': '/src/templates/grepTemplate.js',
            '--check-cluster-info': '/src/templates/grepTemplate.js',
            '--check-nodes': '/src/templates/grepTemplate.js',
            '--check-ingress': '/src/templates/ingressTemplate.js',
            '--check-pods-logs': '/src/templates/grepTemplate.js',
            '--volumes-free-space': '/src/templates/grepTemplate.js',
            '--volumes-exist-files': '/src/templates/grepTemplate.js',
            '--curl-url': '',
            '--curl-assert': '/src/templates/grepTemplate.js',
            '--service-up': '',
            '--swagger-docs': '/src/templates/swaggerRequest.js',
            '--swagger-login-curl': '/src/templates/swaggerRequest.js'
        };
        for (const criterial of Object.keys(options.smokeTestSuites)) {
            for (const test of Object.keys(options.smokeTestSuites[criterial])) {
                let swaggerLoginCurl;
                try {
                    swaggerLoginCurl = options.smokeTestSuites['--endpoint-coverage']['--swagger-login-curl'];
                }
                catch (error) { }
                if (swaggerLoginCurl) {
                    listOfTestPath[test] = '/src/templates/simpleCurlAssertLogin.js';
                }
                let smktest = options.smokeTestSuites[criterial][test];
                const testPath = __dirname + listOfTestPath[test];
                let testType = Object.keys(smktest.testType)[0];
                let testContent = yield fs.promises.readFile(testPath, 'utf8', function (err, data) { });
                testContent = yield replaceAll(testContent, '$$criterial', smktest.criterial);
                testContent = yield replaceAll(testContent, '$$consoleValue', smktest.consoleValue);
                if (testType == "checkPodsLogs") {
                    testContent = yield replaceAll(testContent, '$$reportCommand', smktest.testType.checkPodsLogs.reportCommand);
                    testContent = yield replaceAll(testContent, '$$assert', smktest.testType.checkPodsLogs.assert);
                    testContent = yield replaceAll(testContent, '$$testCommand', smktest.testType.checkPodsLogs.testCommand);
                    options = yield getServicesName(options);
                    let testContentOne = "";
                    for (const service of options.services) {
                        let testContentTwo = yield replaceAll(testContent, '$$serviceName', service);
                        testContentOne = testContentOne + testContentTwo;
                    }
                    testContent = testContentOne;
                }
                if (testType == "grep") {
                    testContent = yield replaceAll(testContent, '$$reportCommand', smktest.testType.grep.reportCommand);
                    testContent = yield replaceAll(testContent, '$$testCommand', smktest.testType.grep.testCommand);
                    testContent = yield replaceAll(testContent, '$$assert', smktest.testType.grep.assert);
                }
                if (testType == "checkIngress") {
                    let allTest = "";
                    yield smktestUtils_1.default.inputMandatory(options, '--namespace');
                    options = yield getKubeIngress(options);
                    let ingressList = options.ingressList;
                    let count2 = -1;
                    for (const ingress of ingressList) {
                        count2 = count2 + 1;
                        let initTestContent = testContent;
                        for (const test of smktest.testType.checkIngress.testCommand) {
                            let testCommand = test.test.replace('$$ingress', ingress);
                            initTestContent = initTestContent.replaceAll('$$testCommand', testCommand);
                            initTestContent = initTestContent.replaceAll('$$assert', test.assert);
                            initTestContent = initTestContent.replaceAll('$$reportCommand', test.reportCommand);
                            initTestContent = yield replaceAll(initTestContent, '$$assert', test.assert);
                        }
                        allTest = allTest + initTestContent;
                    }
                    testContent = allTest;
                }
                if (testType == "checkVolumes") {
                    options = yield (0, volumeV2_1.default)(options);
                    let mountPath = options.mountPath;
                    let service = Object.keys(mountPath);
                    let grepTemplate02 = "";
                    for (const serviceName of service) {
                        let grepTemplate = yield replaceAll(testContent, '$$testCommand', smktest.testType.checkVolumes.testCommand);
                        grepTemplate = yield replaceAll(grepTemplate, '$$service', serviceName);
                        grepTemplate = yield replaceAll(grepTemplate, '$$assert', smktest.testType.checkVolumes.assert);
                        grepTemplate = yield replaceAll(grepTemplate, '$$reportCommand', smktest.testType.checkVolumes.reportCommand);
                        grepTemplate = yield replaceAll(grepTemplate, '$mountPath', mountPath[serviceName].mountPath);
                        grepTemplate02 = grepTemplate02 + grepTemplate;
                    }
                    testContent = grepTemplate02;
                }
                if (testType == "simpleCurlAssert") {
                    let curlList = smktest.defaultValue;
                    try {
                        curlList = eval(eval(curlList));
                    }
                    catch (error) {
                        console.log(error);
                        throw new Error(chalk.yellow.bold(` 🛑  The Input: ${curlList} not is possible eval it. `));
                    }
                    let curlGeneralGTemplate = "";
                    for (const curl of curlList) {
                        let curlTemplate = testContent;
                        curlTemplate = yield replaceAll(curlTemplate, '$$testCommand', curl);
                        curlTemplate = yield replaceAll(curlTemplate, '$$assert', smktest.testType.simpleCurlAssert.assert);
                        curlTemplate = yield replaceAll(curlTemplate, '$$reportCommand', curl);
                        curlGeneralGTemplate = curlGeneralGTemplate + curlTemplate;
                    }
                    testContent = curlGeneralGTemplate;
                }
                if (testType == "swaggerDocs") {
                    let swaggerAll = "";
                    if (!swaggerLoginCurl) {
                        console.log('@1Marker-No:_-1175368663');
                        let { responseOfRequest, coverage, successSmokeTest, report, abstractReport, } = yield swaggerSmktest.smokeTest(smktest.defaultValue);
                        for (const swagger of responseOfRequest) {
                            let swaggerTemplate = testContent;
                            swaggerTemplate = yield replaceAll(swaggerTemplate, '$$testCommand', swagger.curlRequest);
                            swaggerTemplate = yield replaceAll(swaggerTemplate, '$$reportCommand', swagger.curlRequest);
                            swaggerTemplate = yield replaceAll(swaggerTemplate, '$$assert', swagger.status);
                            swaggerTemplate = yield replaceAll(swaggerTemplate, '$$requestUrl', swagger.status);
                            swaggerTemplate = yield replaceAll(swaggerTemplate, '$$URL_SWAGGER', swagger.requestUrl);
                            swaggerAll = swaggerAll + swaggerTemplate;
                        }
                        testContent = swaggerAll;
                    }
                    if (swaggerLoginCurl) {
                        let swaggerLoginCurlURL = swaggerLoginCurl.defaultValue;
                        let { responseOfRequest, coverage, successSmokeTest, report, abstractReport } = yield swaggerSmktest.smokeTest(smktest.defaultValue, {
                            tokenConfig: {
                                curlRequest: swaggerLoginCurlURL,
                            },
                        });
                        let testContentSwaggerLogin = "";
                        for (const swagger of responseOfRequest) {
                            let testContentElement = testContent;
                            let objectHeader = JSON.parse(swagger.headers);
                            let header = {};
                            for (const headerName of Object.keys(objectHeader)) {
                                let content = objectHeader[headerName];
                                if (content.length > 100) {
                                    if (content.includes('Bearer')) {
                                        header[headerName] = 'Bearer $$TOKEN';
                                    }
                                    else {
                                        header[headerName] = '$$TOKEN';
                                    }
                                }
                                else {
                                    header[headerName] = content;
                                }
                            }
                            let urlCurl;
                            for (const urlG of swaggerLoginCurl.defaultValue.split(' ')) {
                                if (urlG.includes('http')) {
                                    urlCurl = urlG;
                                }
                            }
                            testContentElement = yield replaceAll(testContentElement, '$$curlLogin', swaggerLoginCurl.defaultValue);
                            testContentElement = yield replaceAll(testContentElement, '$$URL', swagger.requestUrl);
                            testContentElement = yield replaceAll(testContentElement, '$$header', JSON.stringify(header));
                            const options = {
                                method: 'GET',
                                headers: objectHeader,
                                url: swagger.requestUrl
                            };
                            let statusCode = yield smktestDep.getStatusCodeToken(options);
                            testContentElement = yield replaceAll(testContentElement, '$$assert', JSON.stringify(statusCode));
                            testContentSwaggerLogin = testContentSwaggerLogin + testContentElement;
                        }
                        testContent = testContentSwaggerLogin;
                    }
                }
                try {
                    testContent = yield replaceAll(testContent, '$$namespace', options.args['--namespace']);
                }
                catch (error) { }
                options.smokeTestSuites[criterial][test]['testText'] = testContent;
            }
        }
        return options;
    });
}
function pushTestV2(options) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function camelize(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
        .replace(/\s+/g, '');
}
function createTestSuite(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let testPath = './smokeTest_kubernetes';
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath);
        }
        options.testPath = testPath;
        if (fs.existsSync(testPath)) {
            yield fs.rmdirSync(testPath, { recursive: true });
        }
        if (!fs.existsSync(testPath)) {
            yield fs.mkdirSync(testPath);
            yield fs.mkdirSync(testPath + '/src');
        }
        try {
            yield fs.promises.copyFile('smktest.config.json', testPath + '/src/smktest.config.json');
        }
        catch (error) {
            console.log(error.message);
        }
        for (const criterial of Object.keys(options.smokeTestSuites)) {
            let criterialFile = criterial.substring(2);
            criterialFile = camelize(criterialFile);
            criterialFile = yield replaceAll(criterialFile, '-', '');
            criterialFile = criterialFile + '.test.js';
            let count = -1;
            for (const test of Object.keys(options.smokeTestSuites[criterial])) {
                let pathTestOne = `smokeTest_kubernetes/${criterialFile}`;
                let smktest = options.smokeTestSuites[criterial][test];
                count = count + 1;
                var tasksInit;
                if (count === 0) {
                    if (yield fs.existsSync(pathTestOne)) {
                        yield fs.unlinkSync(pathTestOne, 'utf8');
                    }
                    var tasksInit = new Listr([
                        {
                            title: `Create Criterial ${criterial} in ${testPath}/${criterialFile}`,
                            task: () => __awaiter(this, void 0, void 0, function* () {
                                yield fs.promises.writeFile(pathTestOne, smktest.textDependencies, function (err) { });
                            })
                        }
                    ]);
                    yield tasksInit.run().catch(err => {
                        console.error(err);
                        return err.message;
                    });
                }
                var testOne = new Listr([
                    {
                        title: `     Add ${testPath}/${criterialFile} ${test}`,
                        task: () => __awaiter(this, void 0, void 0, function* () {
                            let testOld = "AAA";
                            testOld = yield fs.promises.readFile(pathTestOne, 'utf8');
                            let newTest = testOld + smktest.testText;
                            yield fs.promises.writeFile(pathTestOne, newTest, 'utf8');
                        })
                    }
                ]);
                yield testOne.run().catch(err => {
                    console.error(err);
                    return err.message;
                });
            }
        }
        return options;
    });
}
function createSuiteByCriterialV2(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = yield cleanCriterialsNotUsed(options);
        options = yield addDependencies(options);
        options = yield addTestCase(options);
        options = yield createTestSuite(options);
        return options;
    });
}
exports.createSuiteByCriterialV2 = createSuiteByCriterialV2;
function suiteGenerator(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const dependenciesFile = __dirname + '/src/templates/initDependencies.js';
        let suiteSmokeTest = '';
        let dependencies = yield fs.promises.readFile(dependenciesFile, 'utf8', function (err, data) { });
        suiteSmokeTest = suiteSmokeTest + dependencies;
        options = yield createSuiteByCriterialV2(options);
        return options;
    });
}
exports.suiteGenerator = suiteGenerator;
exports.default = {
    suiteGenerator,
    createSuiteByCriterialV2,
    cleanCriterialsNotUsed,
};
//# sourceMappingURL=suiteGenerator.js.map