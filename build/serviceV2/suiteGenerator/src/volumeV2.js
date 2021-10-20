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
const shell = require('shelljs');
function getServicesName(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = "kubectl get pods -n $$namespace -o jsonpath='{.items[*].spec.containers[*].volumeMounts[*].mountPath}'";
        console.log('@1Marker-No:_-1539542204');
        command = command.replace('$$namespace', options['--namespace']);
        let response = yield shell.exec(command, {
            silent: true,
        }).stdout;
        response = response.split(' ');
        let responseFilter = [];
        for (const r of response) {
            if (!r.includes('kubernetes')) {
                responseFilter.push(r);
            }
        }
        console.log(responseFilter);
        options.services = response;
        return options;
    });
}
const { response } = require('express');
function convertToMi(unit) {
    return __awaiter(this, void 0, void 0, function* () {
        let changeUnit = [
            { serachUnit: 'B', multiply: 0.000001 },
            { serachUnit: 'MB', multiply: 1 },
            { serachUnit: 'kB', multiply: 0.001 },
            { serachUnit: 'Mi', multiply: 1 },
            { serachUnit: 'Gi', multiply: 1024 },
        ];
        let unitMi;
        for (const key in changeUnit) {
            let element = changeUnit[key];
            let data = unit.indexOf(element.serachUnit);
            if (data !== -1) {
                unitMi = parseFloat(unit.substr(0, data)) * element.multiply;
            }
        }
        return unitMi;
    });
}
function textToList(response) {
    return __awaiter(this, void 0, void 0, function* () {
        response = response.trim().split(/\r?\n/);
        let elementList = [];
        for (const key in response) {
            let element = response[key];
            element = element.split(' ');
            let data = [];
            let count = -1;
            for (const key in element) {
                count = count + 1;
                let i = element[key];
                if (i !== '') {
                    data.push(i);
                }
            }
            elementList.push(data);
        }
        let output = {};
        for (const key in elementList[0]) {
            output[elementList[0][key]] = elementList[1][key];
        }
        return output;
    });
}
function getPodsCapacity(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield shell.exec(`kubectl get pvc --namespace=${options.customDictionary.generalOptions['--namespace']}`, {
            silent: true,
        });
        response = response.stdout;
        let responseOriginal = response;
        response = response.trim().split(/\r?\n/);
        let capacityKey, unitMi, name, status, volume, access, modes, storageclass;
        let dataOutput = [];
        for (const key in response) {
            let element = response[key];
            element = element.split(' ');
            let data = [];
            for (const key in element) {
                let i = element[key];
                if (i !== '') {
                    data.push(i);
                }
            }
            let age;
            if (data.indexOf('CAPACITY') !== -1) {
                capacityKey = data.indexOf('CAPACITY');
                name = data.indexOf('NAME');
                status = data.indexOf('STATUS');
                volume = data.indexOf('VOLUME');
                access = data.indexOf('ACCESS');
                modes = data.indexOf('MODES');
                storageclass = data.indexOf('STORAGECLASS');
                age = data.indexOf('AGE');
            }
            else {
                let capacity = data[capacityKey];
                unitMi = yield convertToMi(capacity);
                let capacityList = {
                    NAME: data[name],
                    STATUS: data[status],
                    VOLUME: data[volume],
                    CAPACITY: data[capacityKey],
                    ACCESS: data[access],
                    MODES: data[modes],
                    STORAGECLASS: data[storageclass],
                    AGE: data[age],
                    MB: unitMi,
                };
                dataOutput.push(capacityList);
            }
        }
        options.volumePvc = {
            output: dataOutput,
            responseOriginal: responseOriginal,
        };
        return options;
    });
}
function getVolumePath(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let namespace = options.args['--namespace'];
        const shell = require('shelljs');
        let response = yield shell.exec(`kubectl get pods --namespace=${namespace} -o json`, {
            silent: true,
        });
        response = response.stdout;
        response = JSON.parse(response);
        let volumes = {};
        let volumeMounts = [];
        for (const key in response.items) {
            let element = response.items[key].spec.containers;
            let name = element[0].name;
            let podName = response.items[key].metadata.name;
            for (const key2 in element) {
                let element2 = element[key2].volumeMounts;
                for (const key3 in element2) {
                    let element3 = element2[key3];
                    element3.serviceName = name;
                    if (!element3.name.includes('default-token'))
                        volumes[podName] = {
                            volume: element3.mountPath,
                        };
                }
            }
        }
        let command = "kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v 'NAME'";
        response = yield shell.exec(command.replace('$$namespace', options.args['--namespace']), { silent: true }).stdout;
        response = response.split('\n');
        response.pop();
        let podsName = Object.keys(volumes);
        let serviceVolumes = {};
        for (const service of response) {
            for (const pod of podsName) {
                if (pod.includes(service)) {
                    serviceVolumes[service] = {
                        mountPath: volumes[pod].volume,
                    };
                }
            }
        }
        options.mountPath = serviceVolumes;
        return options;
    });
}
exports.default = getVolumePath;
//# sourceMappingURL=volumeV2.js.map