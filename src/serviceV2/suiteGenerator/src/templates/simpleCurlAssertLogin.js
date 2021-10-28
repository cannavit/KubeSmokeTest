

test('Smoke Test $$criterial/$$consoleValue [$$assert]/$$URL', async () => {

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

