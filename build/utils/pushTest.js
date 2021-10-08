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
const fs = require('fs');
const smktestUtils_1 = require("./smktestUtils");
function readTest(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let file;
        let testFileExist = yield fs.existsSync(options.testPath);
        let fileContent;
        let dependencies;
        if (fs.existsSync(options.dependenciesPath)) {
            dependencies = yield getDependencies(options.dependenciesPath);
        }
        let test;
        if (fs.existsSync(options.testPath)) {
            test = yield fs.promises.readFile(options.testPath, 'utf8');
        }
        file = dependencies + test;
        return file;
    });
}
module.exports.readTest = readTest;
function getDependencies(dependenciesPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let dependencies = yield fs.promises.readFile(dependenciesPath, 'utf8');
        return dependencies;
    });
}
module.exports.getDependencies = getDependencies;
function pushTest(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileName = (yield smktestUtils_1.default.toCammel(options.testNewName)) + '.js';
        let newTest = options.testNewPath + fileName;
        let test = yield this.readTest(options);
        let oldTestExist = yield fs.existsSync(newTest);
        if (!oldTestExist) {
            yield fs.promises.writeFile(newTest, test, 'utf8');
        }
        else {
            test = yield fs.promises.readFile(newTest, 'utf8');
        }
        test = test + options.newTextTest;
        yield fs.promises.writeFile(newTest, test, 'utf8');
        options['newTestContent'] = test;
        return options;
    });
}
exports.default = { readTest, getDependencies, pushTest };
//# sourceMappingURL=pushTest.js.map