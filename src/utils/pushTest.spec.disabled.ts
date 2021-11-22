import pushTest from './pushTest';
import smktestUtils from './smktestUtils'

const fs = require('fs');
const shell= require('shelljs') 

const options = {
    testPath: "./src/utils/testMaterial/prueba.js",
    dependenciesPath: "./src/utils/testMaterial/dependencies.js",
    testNewName: "--prueba-push",
    testNewPath: "./src/utils/testMaterial/",
    newTextTest: "\nThis is the new test"
}

describe('Verify the pushTest work fine', () =>{

    test('Delete old smoke test suites', async () => {
        
          // Remove Old Smoke Test Suite
          let testPath = '../../smokeTest_kubernetes'

          if (fs.existsSync(testPath)) {
            await fs.rmdirSync(testPath, { recursive: true });
          }

          let passTest = true
          if (fs.existsSync(testPath)) {
            passTest = false
          }

      expect(passTest).toEqual(true)

    }),   
    
    test('Check the readTest', async () => {

        let file = await pushTest.readTest(options)
         
        let passTest = false
        if (file !== ""){
            passTest = true
        }

        expect(passTest).toStrictEqual(true)
    }),

    test('getDependencies Test ', async () => {

        let dependencies = await pushTest.getDependencies(options.dependenciesPath)
        let passTest = false

        if (dependencies !== ""){
            passTest = true
        }
        
        expect(passTest).toStrictEqual(true)
    }),

    test('Create one new Test if not exist the base file', async () => {

        // Delete one file using fs
        let fileName = await smktestUtils.toCammel(options.testNewName)
        let oldTestExist = await fs.existsSync(`./src/utils/testMaterial/${fileName}.js`)

        if(oldTestExist){
            shell.exec(`rm ./src/utils/testMaterial/${fileName}.js`)
        }

        const options2 = await pushTest.pushTest(options)

        expect(options2['newTestContent']).toEqual('"DEPENDENCIES"\n\n"THIS IS ONE TEXT FILE"\nThis is the new test')
    }),


    test('Push New test inside of the oldTest', async () => {
        const options2 = await pushTest.pushTest(options)
        expect(options2['newTestContent']).toEqual('"DEPENDENCIES"\n\n"THIS IS ONE TEXT FILE"\nThis is the new test\nThis is the new test')
    })
})


