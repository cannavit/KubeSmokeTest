import cli from './cli';

async function removeTestDirectory(){

  const fs = require('fs');

  let testPath =  './smokeTest_kubernetes'  
  // Remove Old Smoke Test Suite
  if (fs.existsSync(testPath)) {
    await fs.rmdirSync(testPath, { recursive: true });
  }

}

describe('Check console client inputs', () =>{

    // test('Verify --help', async () => {
        
    //     let client :string[]=  [
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //         '--help'
    //       ]
        
    //     let options = await cli(client)

    //     expect(options).toEqual(undefined)

    // }),

    // test('Verify the cluster connection', async () => {

    //     await removeTestDirectory()
        
    //     let client :string[]=  [
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    //         '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    //         '--cluster-coverage'
    //     ]
  
    //     let options = await cli(client)

    //     if (options['cli']['tasksInit']){
    //         console.log(options['cli']['tasksInit'])
    //     }

    //     expect(options['cli']['tasksInit']).toEqual({})

    // }),

  //   test('Verify the --ingress-coverage', async () => {

  //     await removeTestDirectory()
        
  //     let client :string[]=  [
  //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
  //       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
  //       '--ingress-coverage',
  //       '--namespace=edutelling-develop'
  //     ]

  //     let options = await cli(client)
  //     if (options['cli']['tasksInit']){
  //         console.log(options['cli']['tasksInit'])
  //     }
  //     expect(options['cli']['tasksInit']).toEqual({})
  // }),


//   test('Verify the --service-coverage', async () => {

//     await removeTestDirectory()
      
//     let client :string[]=  [
//       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
//       '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
//       '--service-coverage',
//       '--namespace=edutelling-develop'
//     ]

//     let options = await cli(client)

//     if (options['cli']['tasksInit']){
//         console.log(options['cli']['tasksInit'])
//     }

//     expect(options['cli']['tasksInit']).toEqual({})

// }),

test('Verify the--resource-up', async () => {

  console.log('@1Marker-No:_956628332');
  await removeTestDirectory()
    
  console.log('@1Marker-No:_2028145097');
  let client :string[]=  [
    '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
    '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
    '--resource-up',
    '--namespace=edutelling-develop'
  ]

  console.log('@1Marker-No:_1381512308');
  let options = await cli(client)

  console.log('@1Marker-No:_2124408663');
  if (options['cli']['tasksInit']){
      console.log(options['cli']['tasksInit'])
  }


  expect(options['cli']['tasksInit']).toEqual({})

})


  test('Using All Test Smoke Test cases', async () => {

    await removeTestDirectory()
      
    let client :string[]=  [
      '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
      '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
      '--cluster-coverage',
      '--ingress-coverage',
      '--service-coverage',
      '--resource-up',
      '--namespace=edutelling-develop'
    ]

    let options = await cli(client)

    if (options['cli']['tasksInit']){
        console.log(options['cli']['tasksInit'])
    }

    expect(options['cli']['tasksInit']).toEqual({})
})

})