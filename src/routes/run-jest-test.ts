const jest = require('jest');
const path = require('path');


export async function executeJestTest() {
    let directoryTest = path.join(__dirname, '../../');
    directoryTest = directoryTest + 'smokeTest_kubernetes'
  
  
    const optionsJest = {
      projects: [
        directoryTest
        // __dirname
      ],
      // roots: ['smokeTest_suites'],
      silent: true,
    }; 
    
    let testResult

    try {
       testResult = await jest.runCLI(optionsJest, optionsJest.projects);
      
    } catch (error) {
      console.log(error)
    }
  
    let testResultsElements: { fullName: any; status: any; title: any; failureMessages: string; duration: any; }[] = []
    testResult.results.testResults.forEach((element: { testResults: any[]; }) => {
  
      element.testResults.forEach((test: { fullName: any; status: any; title: any; failureMessages: any; duration: any; }) => {
        console.log(test);
  
            testResultsElements.push({
              fullName: test.fullName,
              status: test.status,
              title: test.title,
              failureMessages: JSON.stringify(test.failureMessages),
              duration: test.duration,
      })
      });
  
      
    });
  
    return {
      testResultsElements: testResultsElements,
      testResult: testResult
    }
  
  }

// module.exports.default = executeJestTest


export default executeJestTest;
