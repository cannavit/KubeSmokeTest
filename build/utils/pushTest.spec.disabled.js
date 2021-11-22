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
const pushTest_1 = __importDefault(require("./pushTest"));
const smktestUtils_1 = __importDefault(require("./smktestUtils"));
const fs = require('fs');
const shell = require('shelljs');
const options = {
    testPath: "./src/utils/testMaterial/prueba.js",
    dependenciesPath: "./src/utils/testMaterial/dependencies.js",
    testNewName: "--prueba-push",
    testNewPath: "./src/utils/testMaterial/",
    newTextTest: "\nThis is the new test"
};
describe('Verify the pushTest work fine', () => {
    test('Delete old smoke test suites', () => __awaiter(void 0, void 0, void 0, function* () {
        // Remove Old Smoke Test Suite
        let testPath = '../../smokeTest_kubernetes';
        if (fs.existsSync(testPath)) {
            yield fs.rmdirSync(testPath, { recursive: true });
        }
        let passTest = true;
        if (fs.existsSync(testPath)) {
            passTest = false;
        }
        expect(passTest).toEqual(true);
    })),
        test('Check the readTest', () => __awaiter(void 0, void 0, void 0, function* () {
            let file = yield pushTest_1.default.readTest(options);
            let passTest = false;
            if (file !== "") {
                passTest = true;
            }
            expect(passTest).toStrictEqual(true);
        })),
        test('getDependencies Test ', () => __awaiter(void 0, void 0, void 0, function* () {
            let dependencies = yield pushTest_1.default.getDependencies(options.dependenciesPath);
            let passTest = false;
            if (dependencies !== "") {
                passTest = true;
            }
            expect(passTest).toStrictEqual(true);
        })),
        test('Create one new Test if not exist the base file', () => __awaiter(void 0, void 0, void 0, function* () {
            // Delete one file using fs
            let fileName = yield smktestUtils_1.default.toCammel(options.testNewName);
            let oldTestExist = yield fs.existsSync(`./src/utils/testMaterial/${fileName}.js`);
            if (oldTestExist) {
                shell.exec(`rm ./src/utils/testMaterial/${fileName}.js`);
            }
            const options2 = yield pushTest_1.default.pushTest(options);
            expect(options2['newTestContent']).toEqual('"DEPENDENCIES"\n\n"THIS IS ONE TEXT FILE"\nThis is the new test');
        })),
        test('Push New test inside of the oldTest', () => __awaiter(void 0, void 0, void 0, function* () {
            const options2 = yield pushTest_1.default.pushTest(options);
            expect(options2['newTestContent']).toEqual('"DEPENDENCIES"\n\n"THIS IS ONE TEXT FILE"\nThis is the new test\nThis is the new test');
        }));
});
