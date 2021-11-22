import smktestUtils from './smktestUtils';

describe('Verify the utils commands work fine', () =>{

    // test('Check the readTest', async () => {
        
    //     // '--check-cluster-info' to checkClusterInfo
    //     let cammelName = await smktestUtils.toCammel('--hello-world')
    //     expect(cammelName).toEqual("helloWorld")
        
    // }),

    // test('Get the configuration file smktest.config.js', async () => {
    //     // '--check-cluster-info' to checkClusterInfo
    //     let options3 = await smktestUtils.getStandardVariables({})
    //     let passTest = false 

    //     if (options3.smktestConfig.length > 0) {
    //         passTest = true
    //     }
    //     expect(passTest).toEqual(true)
    // }),

    // test('Check if exist access to cluster before to run the test suite', async () => {
    //     // '--check-cluster-info' to checkClusterInfo
    //     let passTest = await smktestUtils.checkAccessToCluster({})

    //     expect(passTest).toEqual(true)
    // }),

    // test('Create suite test using the smoke test criteria', async () => {
    //     // '--check-cluster-info' to checkClusterInfo
    //     let options3 = await smktestUtils.createSuiteByCriterial({})

    //     let passTest = true //TODO pending 
    //     // if (options3.smktestConfig.length > 0) {
    //     //     passTest = true
    //     // }
    //     expect(passTest).toEqual(true)
    // }),

    // test('Verify the getConsoleInputs function', async () => {
    //     // '--check-cluster-info' to checkClusterInfo

    //     let commands = await smktestUtils.getConsoleInputs({})

    //     let numberOfCommaands = Object.keys(commands).length
    //     let passTest = false 
    //     if (numberOfCommaands > 0) {
    //         passTest = true
    //     }
    //     expect(passTest).toEqual(true)
    // }),


    // test('Verify the parseArgumentsIntoOptions function', async () => {
    //     // '--check-cluster-info' to checkClusterInfo
    //     let args = [
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //         '--cluster-coverage',
    //         '--curl-assert="curl -v www.google.com"'
    //       ]

    //     let options3 = await smktestUtils.parseArgumentsIntoOptions(args)
    //     let passTest :boolean = false

    //     if (options3['listOfJestPath'] !== undefined) {
    //         if (options3['argumentsCli']['--general-options'] !== undefined) {
    //             if (options3['smktestConfig'][0] !== undefined) {
    //                     if (options3['smokeTestSuites'][0] !== undefined) {
    //                         passTest = true
    //                     }
    //                 passTest = true
    //             }
    //         }
    //     }
    //     expect(passTest).toEqual(true)
    // })

})