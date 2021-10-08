import cli from './cli';

describe('Check console client inputs', () =>{
    test('Verify the cluster connection', async () => {
        
        let client :string[]=  [
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/node',
            '/Users/ceciliocannavaciuolo/.nvm/versions/node/v15.8.0/bin/create-smktest',
            '--cluster-coverage',
            '--curl-assert=curl -v www.google.com'
          ]

        let options = await cli(client)

        if (options['cli']['tasksInit']){
            console.log(options['cli']['tasksInit'])
        }

        expect(options['cli']['tasksInit']).toEqual({})

    })

})