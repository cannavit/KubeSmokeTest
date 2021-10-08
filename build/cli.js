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
exports.cli = void 0;
const smktestUtils_1 = require("./utils/smktestUtils");
const Listr = require('listr');
const execa = require('execa');
const fs = require('fs');
function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = {};
        const tasksInit = new Listr([
            {
                title: 'Verify connection with kubernetes cluster',
                task: () => {
                    return new Listr([
                        {
                            title: 'Get Cluster Info (kubectl cluster-info)',
                            task: () => __awaiter(this, void 0, void 0, function* () {
                                return yield smktestUtils_1.default.checkAccessToCluster({});
                            })
                        }
                    ], { concurrent: false });
                }
            }
        ]);
        let result = yield tasksInit.run().catch(err => {
            console.error(err);
            return err.message;
        });
        options['cli'] = {
            tasksInit: result
        };
        return options;
    });
}
exports.cli = cli;
exports.default = cli;
//# sourceMappingURL=cli.js.map