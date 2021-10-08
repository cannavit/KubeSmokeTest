
const fs = require('fs');


async function grepTemplate(options,testName,smktest,suitesTest){

    // TestTypes      for (const test02 of Object.keys(tests)) {

      let dependenciesFile =
      './src/services/suitesGenerator/src/initDependencies.js';
    
      //! Load the template case GREP
      if (testName === 'grep') {

        let criterial = smktest.criterial

        let grepTemplate = await fs.promises.readFile(
          './src/services/suitesGenerator/src/grepTemplate.js',
          'utf-8'
        );
        
        // grepTemplate = String(grepTemplate)
        grepTemplate = grepTemplate.replaceAll(
          '$$criterial',
          smktest.criterial
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$consoleValue',
          smktest.consoleValue
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$reportCommand',
          smktest.testType.grep.reportCommand
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$testCommand',
          smktest.testType.grep.testCommand.replace(
            '$$namespace',
            options.customDictionary.generalOptions['--namespace']
          )
        );
        grepTemplate = grepTemplate.replaceAll(
          '$$assert',
          smktest.testType.grep.assert
        );
        
        grepTemplate = grepTemplate.replaceAll(
          '$$environmentVariableResultTest',
          smktest.environmentVariableResultTest.replace(
            '$$namespace',
            options.customDictionary.generalOptions['--namespace']
          )
        );
        

        suitesTest[criterial] = suitesTest[criterial] + grepTemplate;

        //! Read Test
        // Read one file only if exist using fs
        // import dependencies 


        //! Write Testc



      }


      return suitesTest
}

// Export module
module.exports.grepTemplate = grepTemplate;
