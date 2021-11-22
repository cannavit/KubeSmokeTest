

test('Smoke Test $$criterial/$$consoleValue [$$assert]/$$URL', async () => {

  // Declarative
  let url = '$$URL';
  let curlLogin = '$$curlLogin';
  let assertValue = '$$assert';
  let header = $$header;

  smktestDep.replaceAll(curlLogin,'\"', '\\"')
  header = await JSON.stringify(header)

  //! Get New Token
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


