const shell = require('shelljs');
const { inputMandatory } = require('../utils/inputsMandatories');

async function getServicesName(options) {
  await inputMandatory(options, '--namespace');

  let command =
    'kubectl get services -n $$namespace -o=custom-columns=NAME:.metadata.name | grep -v "NAME"';
  command = command.replace('$$namespace', options['--namespace']);

  let response = await shell.exec(command, {
    silent: true,
  }).stdout;

  response = response.split('\n');

  // Delete the last element of one list
  response.pop();

  options.services = response;

  return options;
}

// export module
module.exports.getServicesName = getServicesName;
