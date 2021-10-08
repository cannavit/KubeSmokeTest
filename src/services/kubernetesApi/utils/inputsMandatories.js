
const chalk = require('chalk');


async function inputMandatory(options, variableRquired){

    var keys = Object.keys(options)
    let pass = false

    for (const key of keys) {
        if (key === variableRquired) {
            pass = true
        }
    }

    if (!pass | options[variableRquired] === "false" | options[variableRquired] === false) {
        console.log(chalk.red.bold('ERROR: INPUT MANDATORY'));
        throw new Error(chalk.yellow.bold(` 🛑  The Input: "${variableRquired}" is required`))
    }

    return options
}


module.exports.inputMandatory = inputMandatory
