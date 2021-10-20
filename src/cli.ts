// import arg from 'arg';
// import inquirer from 'inquirer';
import smktestUtils from './utils/smktestUtils';
import criteria from './serviceV2/suiteGenerator/criteria';
import suiteGenerator from './serviceV2/suiteGenerator/suiteGenerator';

const Listr = require('listr');

// import Listr from 'listr';

const execa = require('execa'); 
const fs = require('fs');


async function printHelp(args :string[]){
  console.log()
  
  let continueCli = true
  for (const arg of args) {

    if (arg === "--help" || arg === "-h"){

       console.log()
       console.log()

       console.log("---------------- SMOKE TEST GENERATOR HELP ---------------")

       console.log(" This library's to generates smoke test suites using kubernetes.") 
       console.log(" Apply adequacy criteria. Each criterion offers a specific coverage ")
       console.log("and automatic level. Below is an example of how to use the criteria")
       console.log()
       console.log()
       console.log()
       console.log("Example of use:")
       console.log()
       console.log("create-smktest --cluster-coverage")
       console.log()
       console.log()
       console.log("  Criteria           | Descriptions")
       console.log("--cluster-coverage   | Verify kubernetes nodes conditions ")
       console.log("       Tests:          Description:                                        Input Required:")
       console.log("       --check-disc:     Check free space inside of the cluster                  No")
       console.log("       --check-memory:   Check if exist memory pressure                          No")
       console.log("       --check-disc   :  Check if exist hard disk pressure                       No")
       console.log("       --check-cluster:  Verify the conditions of the cluster                    No")
       console.log("       --check-nodes:    Verify the conditions of the cluster nodes              No")
       console.log()
       console.log("--ingress-coverage   | Verify cluster ingress access from outside")
       console.log("       Tests:          Description:                                        Input Required:  VIDEO* ---")  
       console.log("       --check-ingress:     Check all exposed ingress                          --namespace")       
       console.log()
       console.log("--service-coverage   | Verify if all cluster services and pods are Running")
       console.log("       Tests:          Description:                                        Input Required:")
       console.log("       --check-pods-logs:      Search logs error                               --namespace")
       console.log("       --check-pods-running:   Check if all services are active                --namespace")  
       console.log("       --execution-unit-coverage:  Check if all pods are active                --namespace")                       
       console.log()      
       console.log("--resource-up   | Verify if all volume and files area accessible VIDEO* ---")
       console.log("       Tests:          Description:                                        Input Required:")
       console.log("       --volumes-free-space:    Verify if the volume have enough space         --namespace")    
       console.log("       --volumes-exist-files:   Verify if exist files inside of the volumes    --namespace")             
       console.log()      
       console.log("--endpoint-coverage  | Verify endpoint list  ** PENDING **")
       console.log("       Tests:          Description:                                        Input Required:")
       console.log("       --curl-assert:       Check response of the curl                         --curl-assert='[\"curl -v www.google.com\", \" curl -v www.googleFalse.com\"]'")    
       console.log("       --swagger-docs:      Check response of the curl                         --swagger-docs='Swagger apis docs url'")           
       console.log("       --check-pods-logs:   Verify if exist files inside of the volumes        --namespace")     
       console.log()  
       console.log("--dependency-coverage  | Verify endpoint list  ** PENDING **")     
       console.log("       Tests:          Description:                                        Input Required:")
       console.log("       --curl-assert:       Check response of the curl                         --curl-assert='[\"curl -v www.google.com\", \" curl -v www.googleFalse.com\"]'")    
       console.log("       --swagger-docs:      Check response of the curl                         --swagger-docs='Swagger apis docs url'")   
       console.log("       --cross-ping:        Verify if exist files inside of the volumes        --namespace")                          
       console.log("       --check-pods-logs:   Verify if exist files inside of the volumes        --namespace")           
       console.log("       --check-dependencies:   Verify if dependencies are active               --namespace")           
       console.log() 
       console.log() 
       console.log() 
       console.log()

     continueCli = false

    }
  }


  return continueCli

}
//? Read the standards Variables
export async function cli(args) {

  let options
  let continueCli = await printHelp(args)


  if (continueCli){
    
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
  options = await smktestUtils.parseArgumentsIntoOptions(args);
  options['projectDir']  = __dirname; // SmokeTest route
  options['smktestFolder'] = 'smktest'; // SmokeTet base directory
  options['testId'] = "00120102301230123"; //TODO PENDING TO ADD IF IS NECESSARY
  

  options = await criteria.promptForContext(options)

  process.env.SMKTEST_OPTIONS = JSON.stringify(options);

  // import dependencies.
  await suiteGenerator.suiteGenerator(options);

  options['cli'] = {
    tasksInit: result
  }


}

return options


}

export default cli
