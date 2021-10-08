import smktestUtils from '../../utils/smktestUtils'
const fs = require('fs');


// Add function for parse Config JSON FILE smktest.config.json
// function typescript, inputs list of string
//? Old Name of the function parseArgumentsIntoOptions
async function suiteGenerator(options: any = {}) {
    console.log('@1Marker-No:_-1161686263');


    // TODO PENDING
   
    // Import Config File
    const dependenciesFile :string = __dirname + '/src/templates/initDependencies.js'
    let suiteSmokeTest :string = '';
    
    let dependencies = await fs.promises.readFile(
        dependenciesFile,
        'utf8',
        function (err, data) {
        }
      );
     

    suiteSmokeTest = suiteSmokeTest + dependencies;
  
    options = await smktestUtils.getStandardVariables(options);

   


    options['suiteGenerator'] = {
        dependencies: dependencies
    }
    

    //TODO Delete this line

    return options;
  
  }



export default suiteGenerator
