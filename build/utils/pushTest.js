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
// Read one file using the file address 
// Inputs String
// Import dependencies 
// import fs from 'fs';
const fs = require('fs');
const smktestUtils_1 = __importDefault(require("./smktestUtils"));
// Read Text files
function readTest(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read file only if it exist
        let file;
        let testFileExist = yield fs.existsSync(options.testPath);
        let fileContent;
        let dependencies = "";
        if (fs.existsSync(options.dependenciesPath)) {
            // Read dependencie file 
            dependencies = yield getDependencies(options.dependenciesPath);
        }
        //Check if exist one file using fs. 
        let test = "";
        if (fs.existsSync(options.testPath)) {
            // Read the file 
            test = yield fs.promises.readFile(options.testPath, 'utf8');
        }
        file = dependencies + test;
        return file;
    });
}
module.exports.readTest = readTest;
// Read dependency files
function getDependencies(dependenciesPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the file 
        let dependencies = yield fs.promises.readFile(dependenciesPath, 'utf8');
        return dependencies;
    });
}
module.exports.getDependencies = getDependencies;
// Push One string inside of the test file
// Inputs Object {testPath: string, dependenciesPath: string}
function pushTest(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the file 
        // Create test name Cammel format
        let fileName = (yield smktestUtils_1.default.toCammel(options.testNewName)) + '.js';
        let newTest = options.testNewPath + fileName;
        // Read the file if exist 
        let test = yield readTest(options);
        //! If not exist the file test. 
        let oldTestExist = yield fs.existsSync(newTest);
        if (!oldTestExist) {
            // Create file of the test. 
            yield fs.promises.writeFile(newTest, test, 'utf8');
        }
        else {
            // Read the old test file content
            test = yield fs.promises.readFile(newTest, 'utf8');
        }
        // Check if the test exist.
        // let testFileExist = await fs.existsSync(options.testPath)
        test = test + options.newTextTest;
        // Update or create the text file
        yield fs.promises.writeFile(newTest, test, 'utf8');
        options['newTestContent'] = test;
        return options;
    });
}
exports.default = { readTest, getDependencies, pushTest };
