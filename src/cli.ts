// import arg from 'arg';
// import inquirer from 'inquirer';
import smktestUtils from './utils/smktestUtils';
const Listr = require('listr');

// import Listr from 'listr';

const execa = require('execa'); 
const fs = require('fs');

//? Read the standards Variables
export async function cli(args) {
  
  let options  = {
   
  };
  options['projectDir']  = __dirname; // SmokeTest route
  options['smktestFolder'] = 'smktest'; // SmokeTet base directory

  // Check if the library have access to kubernetes cluster
  // This part is for avoid the error of the generate command
  const tasksInit = new Listr([
    {
        title: 'Verify connection with kubernetes cluster',
        task: () => {
            return new Listr([
                {
                    title: 'Get Cluster Info (kubectl cluster-info)',
                    task: async () => {
                      return await smktestUtils.checkAccessToCluster({})
                    }
                }
            ], {concurrent: false});
        }
    }
  ]);
 
  let result = await tasksInit.run().catch(err => {
      console.error(err);
      return err.message
  });
  

  // console.log('@1Marker-No:_-886104069');
  await smktestUtils.parseArgumentsIntoOptions(args);





 


  
  // let options = {
  //   '--help': Boolean,
  //   'configFile': String,
  // }



  //! Verify cluster connection 
  //! Presentation text:
  // console.log("HELLO")


  options['cli'] = {
    tasksInit: result
  }

  return options

}

export default cli
