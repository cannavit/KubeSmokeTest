import smktestUtils from './smktestUtils';


describe('Verify the utils commands work fine', () =>{
    test('Check the readTest', async () => {
        
        // '--check-cluster-info' to checkClusterInfo

        let cammelName = await smktestUtils.toCammel('--hello-world')
        expect(cammelName).toEqual("helloWorld")
    }),

    test('Get the configuration file smktest.config.js', async () => {
        // '--check-cluster-info' to checkClusterInfo
        let options3 = await smktestUtils.getStandardVariables({})
        let passTest = false 

        if (options3.smktestConfig.length > 0) {
            passTest = true
        }
        expect(passTest).toEqual(true)
    }),
    test('Check if exist access to cluster before to run the test suite', async () => {
        // '--check-cluster-info' to checkClusterInfo
        let passTest = await smktestUtils.checkAccessToCluster({})

        expect(passTest).toEqual(true)
    }),

    test('Create suite test using the smoke test criteria', async () => {
        // '--check-cluster-info' to checkClusterInfo
        let options3 = await smktestUtils.createSuiteByCriterial({})

        let passTest = true //TODO pending 
        // if (options3.smktestConfig.length > 0) {
        //     passTest = true
        // }
        expect(passTest).toEqual(true)
    }),

    test('Verify the getConsoleInputs function', async () => {
        // '--check-cluster-info' to checkClusterInfo

        let commands = await smktestUtils.getConsoleInputs({})

        let numberOfCommaands = Object.keys(commands).length
        let passTest = false 
        if (numberOfCommaands > 0) {
            passTest = true
        }
        expect(passTest).toEqual(true)
    }),


    test('Verify the parseArgumentsIntoOptions function', async () => {
        // '--check-cluster-info' to checkClusterInfo

        let args = [
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
            '--cluster-coverage',
            '--curl-assert=curl -v www.google.com'
          ]

        let commands = await smktestUtils.parseArgumentsIntoOptions(args)
        

        // let expectedOputput {
        //     '--general-options': [Function: String],
        //     '--yes': [Function: String],
        //     '--project-name': [Function: String],
        //     '--namespace': [Function: String],
        //     '--context': [Function: String],
        //     '--environmentVariable': [Function: String],
        //     '--environment': [Function: String],
        //     '--not-run': [Function: String],
        //     '--cluster-coverage': [Function: String],
        //     '--check-cluster-info': [Function: String],
        //     '--check-nodes': [Function: String],
        //     '--check-cluster': [Function: String],
        //     '--check-disc': [Function: String],
        //     '--check-memory': [Function: String],
        //     '--service-coverage': [Function: String],
        //     '--check-pods-running': [Function: String],
        //     '--ingress-coverage': [Function: String],
        //     '--check-ingress': [Function: String],
        //     '--check-pods-logs': [Function: String],
        //     '--resource-up': [Function: String],
        //     '--volumes-free-space': [Function: String],
        //     '--volumes-exist-files': [Function: String],
        //     '--endpoint-coverage': [Function: String],
        //     '--curl-url': [Function: String],
        //     '--assert': [Function: String],
        //     '--curl-assert': [Function: String],
        //     '--execution-unit-coverage': [Function: String],
        //     '--service-up': [Function: String]
        //   }


        console.log(">>>>>-1191886562>>>>>")
        console.log(commands)   
        console.log("<<<<<<<<<<<<<<<<<<<")


        expect(false).toEqual(true)
    })

})