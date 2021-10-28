const shell = require('shelljs');
const chalk = require('chalk');
const smktestDep = require('smktest-utils');
const axios = require('axios');




test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/institution-roles', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/institution-roles';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/all', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts/roles/all';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/ambassadors', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/ambassadors';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/user', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/user';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [404]/https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/logout', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/logout';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '404';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/companies', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/companies';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/all', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/all';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/not-finished', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/state/not-finished';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/students/empty', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/students/empty';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/course/providestage', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/course/providestage';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/all/bystatus', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/all/bystatus';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/tutor/availables', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/courses/tutor/availables';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs/student/allCV', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/cvs/student/allCV';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/expired', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/expired';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/course', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/course';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/student', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/student';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/account', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/account';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [404]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/module', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/module';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '404';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/file-size', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/file-size';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/upload', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/allow/upload';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/days-before-expiration', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/days-before-expiration';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/cloud-quota', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/cloud-quota';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/students', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/students';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/courses', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/courses';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [404]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/modules', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/available/modules';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '404';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/agelimit/students', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/edition/agelimit/students';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","token":"$$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/statistics', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/statistics';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/entities', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/entities';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","token":"$$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/courses', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/institutions/public/courses';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","token":"$$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/languages', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/languages';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [400]/https://edutelling-api-develop.openshift.techgap.it/api/v1/mail-templates', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/mail-templates';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '400';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/medias', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/medias';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/modules', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/modules';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/nations', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/nations';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications/count', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications/count';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/notifications';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/notifications', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/notifications';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/general-options', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/general-options';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/upload-formats', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/settings/upload-formats';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/stages', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/stages';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/type/all', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/type/all';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/stage/availablestages', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/stage/availablestages';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/all/bystates', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/stages/all/bystates';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/students', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/students';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/teachers', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/teachers';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/tutors', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/tutors';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","Authorization":"Bearer $$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-docs [200]/https://edutelling-api-develop.openshift.techgap.it/api/v1/version', async () => {

  // Declarative
  let url = 'https://edutelling-api-develop.openshift.techgap.it/api/v1/version';
  let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"';
  let assertValue = '200';
  let header = {"accept":"application/json","Content-Type":"application/json","token":"$$TOKEN"};

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = 'curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"formazione@edutelling.it\", \"password\": \"Passw0rd\", \"stayLogged\": false }"'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>



test('Smoke Test --endpoint-coverage/--swagger-login-curl [$$assert]/$$URL', async () => {

  // Declarative
  let url = '$$URL';
  let curlLogin = '$$curlLogin';
  let assertValue = '$$assert';
  let header = $$header;

  // let url = "https://edutelling-api-develop.openshift.techgap.it/api/v1/accounts";
  // let assertValue = '200';
  // let curlLogin ='curl -X POST "https://edutelling-api-develop.openshift.techgap.it/api/v1/auth/authentication" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \\"email\\": \\"formazione@edutelling.it\\", \\"password\\": \\"Passw0rd\\", \\"stayLogged\\": false }"'
  // let header =  {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer $$TOKEN'};
 

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
  // let curlLogin = '$$curlLogin'
  let token = await smktestDep.getNewToken(curlLogin)
  header = header.replace('$$TOKEN', token)
  header = await JSON.parse(header)

  const options = {
    method: 'GET',
    headers: header,
    url: url
  };

  let statusCode = await smktestDep.getStatusCodeToken(options);
  
  let passTest = false
  if (statusCode == assertValue && statusCode !== "500"){
    passTest = true
  } else {
    console.log("ERROR STATUS CODE ", response.status)
  }

  expect(passTest).toBe(true);
});


// >>>>> Next Test >>>>>>>

