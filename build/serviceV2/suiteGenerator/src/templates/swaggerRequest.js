

// NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>

test('SmokeTest $$criterial $$consoleValue [$$assert] $$URL_SWAGGER"', async () => {
    
    // Declarative
    let assertValue = '$$assert';

    let statusCode = await smktestDep.getStatusCode("$$URL_SWAGGER");
  
    let passTest = false

    if (statusCode == assertValue && statusCode !== "500"){
      passTest = true
    } else {
      console.log("ERROR STATUS CODE ", response.status)
    }
  
    expect(passTest).toBe(true);
  });
  
  // NEXT TEXT >>>>>>>>>>>>>>>>>>>>>>>>
  