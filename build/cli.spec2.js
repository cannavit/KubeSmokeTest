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
const cli_1 = __importDefault(require("./cli"));
function removeTestDirectory() {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = require('fs');
        let testPath = './smokeTest_kubernetes';
        // Remove Old Smoke Test Suite
        if (fs.existsSync(testPath)) {
            yield fs.rmdirSync(testPath, { recursive: true });
        }
    });
}
describe('Check console client inputs', () => {
    test('Verify --help', () => __awaiter(void 0, void 0, void 0, function* () {
        let client = [
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v14.17.0/bin/create-smktest',
            '--help'
        ];
        let options = yield (0, cli_1.default)(client);
        expect(options).toEqual(undefined);
    }));
    // test('Verify the cluster connection', async () => {
    //     await removeTestDirectory()
    //     let client :string[]=  [
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //         '--cluster-coverage'
    //     ]
    //     let options = await cli(client)
    //     if (options['cli']['tasksInit']){
    //         console.log(options['cli']['tasksInit'])
    //     }
    //     expect(options['cli']['tasksInit']).toEqual({})
    // }),
    //   test('Verify the --ingress-coverage', async () => {
    //     await removeTestDirectory()
    //     let client :string[]=  [
    //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //       '--ingress-coverage',
    //       '--namespace=edutelling-develop'
    //     ]
    //     let options = await cli(client)
    //     if (options['cli']['tasksInit']){
    //         console.log(options['cli']['tasksInit'])
    //     }
    //     expect(options['cli']['tasksInit']).toEqual({})
    // }),
    // test('Verify the --service-coverage', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--service-coverage',
    //     '--namespace=edutelling-develop'
    //   ]
    //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   expect(options['cli']['tasksInit']).toEqual({})
    // })
    // test('Verify the--resource-up', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--resource-up',
    //     '--namespace=edutelling-develop'
    //   ]
    35; //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   expect(options['cli']['tasksInit']).toEqual({})
    // }),
    // test('Verify the --endpoint-up', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--curl-assert="[\'curl -v www.google.com\', \'curl -v https://www.facebook.com/\']"'
    //   ]
    //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   expect(options['cli']['tasksInit']).toEqual({})
    // }),
    // test('Create Publics Access', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--swagger-docs=https://edutelling-api-develop.openshift.techgap.it/api/v1/api-docs/'
    //   ]
    //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   expect(options['cli']['tasksInit']).toEqual({})
    // },100000),
    // test('Create test using swagger and login api', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--swagger-docs=https://edutelling-api-develop.openshift.techgap.it/api/v1/api-docs/',
    //     '--swagger-login-curl=curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\\"email\\\": \\\"formazione@edutelling.it\\\", \\\"password\\\": \\\"Passw0rd\\\", \\\"stayLogged\\\": false }"'
    //   ]
    //   // curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"
    //   // curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd", \"stayLogged\": false }"
    //   // curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json"  -d "{ "email": "formazione@edutelling.it", "password": "Passw0rd", "stayLogged": false }"
    //   // curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ 'email': 'formazione@edutelling.it', 'password': 'Passw0rd', 'stayLogged': false }"
    //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   expect(options['cli']['tasksInit']).toEqual({})
    // },1000000)
    // test('Verify Fail of the test the --endpoint-up', async () => {
    //   await removeTestDirectory()
    //   let client :string[]=  [
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //     '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //     '--curl-assert="[\'curl -v www.googdasdasdle.com\', \'curl -v https://www.facebadadadsasdook.com/\']"'
    //   ]
    //   let options = await cli(client)
    //   if (options['cli']['tasksInit']){
    //       console.log(options['cli']['tasksInit'])
    //   }
    //   console.log(">>>>>505954351>>>>>")
    //   console.log(options['cli'])
    //   console.log("<<<<<<<<<<<<<<<<<<<")
    //   expect(options['cli']['tasksInit']).toEqual({})
    // })
    //   test('Using All Test Smoke Test cases', async () => {
    //     await removeTestDirectory()
    //     let client :string[]=  [
    //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //       '--cluster-coverage',
    //       '--ingress-coverage',
    //       '--service-coverage',
    //       '--resource-up',
    //       '--namespace=edutelling-develop'
    //     ]
    //     let options = await cli(client)
    //     if (options['cli']['tasksInit']){
    //         console.log(options['cli']['tasksInit'])
    //     }
    //     expect(options['cli']['tasksInit']).toEqual({})
    // })
});
