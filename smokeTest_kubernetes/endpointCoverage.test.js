const smktestDep = require('smktest-utils');





// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/institution-roles"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/institution-roles");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/all"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/all");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/ambassadors"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/ambassadors");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/user"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/user");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [404] https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/logout"', async () => {
    
    // Declarative
    let assertValue = '404';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/logout");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/companies"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/companies");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/all"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/all");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/not-finished"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/not-finished");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/students/empty"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/students/empty");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/course/providestage"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/course/providestage");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/all/bystatus"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/all/bystatus");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/tutor/availables"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/tutor/availables");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs/student/allCV"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs/student/allCV");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/expired"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/expired");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/course"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/course");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/student"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/student");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/account"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/account");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/module"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/module");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/file-size"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/file-size");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/upload"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/upload");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/days-before-expiration"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/days-before-expiration");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/cloud-quota"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/cloud-quota");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/students"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/students");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/courses"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/courses");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/modules"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/modules");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/agelimit/students"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/agelimit/students");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [200] https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions"', async () => {
    
    // Declarative
    let assertValue = '200';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/statistics"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/statistics");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [200] https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/entities"', async () => {
    
    // Declarative
    let assertValue = '200';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/entities");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [200] https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/courses"', async () => {
    
    // Declarative
    let assertValue = '200';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/courses");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/languages"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/languages");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [400] https://edutelling-api-develop.openshift.techgap.it/api/v1/mail-templates"', async () => {
    
    // Declarative
    let assertValue = '400';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/mail-templates");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/medias"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/medias");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/modules"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/modules");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/nations"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/nations");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications/count"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications/count");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/notifications"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/notifications");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/general-options"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/general-options");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/upload-formats"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/upload-formats");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/stages"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/stages");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/type/all"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/type/all");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/stage/availablestages"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/stage/availablestages");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/all/bystates"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/all/bystates");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/students"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/students");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/teachers"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/teachers");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [401] https://edutelling-api-develop.openshift.techgap.it/api/v1/tutors"', async () => {
    
    // Declarative
    let assertValue = '401';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/tutors");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest --endpoint-coverage --swagger-docs [200] https://edutelling-api-develop.openshift.techgap.it/api/v1/version"', async () => {
    
    // Declarative
    let assertValue = '200';

    let statusCode = await smktestDep.getStatusCode("https://edutelling-api-develop.openshift.techgap.it/api/v1/version");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  