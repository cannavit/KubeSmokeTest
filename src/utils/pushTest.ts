

// Read one file using the file address 
// Inputs String
// Import dependencies 
// import fs from 'fs';
const fs = require('fs');
import smktestUtils from './smktestUtils'

// Read Text files
async function readTest(options: {testPath: string, dependenciesPath: string}) {
    // Read file only if it exist
    let file: string  
    let testFileExist = await fs.existsSync(options.testPath)

    let fileContent: string
    let dependencies: string = ""

    if (fs.existsSync(options.dependenciesPath)) {
        // Read dependencie file 
        dependencies = await getDependencies(options.dependenciesPath)
    }
    

    //Check if exist one file using fs. 
    let test: string = ""
    if (fs.existsSync(options.testPath)) {
        // Read the file 
        test = await fs.promises.readFile(options.testPath, 'utf8');    
    } 

    file = dependencies + test
     
    return file
}

module.exports.readTest = readTest;

// Read dependency files
async function getDependencies(dependenciesPath: string) {
    // Read the file 
    let dependencies = await fs.promises.readFile(dependenciesPath, 'utf8');
     
    return dependencies
}

module.exports.getDependencies = getDependencies;


// Push One string inside of the test file
// Inputs Object {testPath: string, dependenciesPath: string}
async function pushTest(options: any) {
    // Read the file 
    
    // Create test name Cammel format

    let fileName = await smktestUtils.toCammel(options.testNewName) + '.js'
    let newTest = options.testNewPath + fileName
    
    // Read the file if exist 
    let test = await readTest(options)

    //! If not exist the file test. 
    let oldTestExist = await fs.existsSync(newTest)

    if (!oldTestExist) {
        // Create file of the test. 
        await fs.promises.writeFile(newTest, test, 'utf8');
    } else {
        // Read the old test file content
        test = await fs.promises.readFile(newTest, 'utf8');
    }
    // Check if the test exist.
    // let testFileExist = await fs.existsSync(options.testPath)

    test = test + options.newTextTest

    // Update or create the text file
    await fs.promises.writeFile(newTest, test, 'utf8');

    options['newTestContent'] = test

    return options
}



export default {readTest, getDependencies, pushTest}