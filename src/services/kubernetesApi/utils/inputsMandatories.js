


async function inputMandatory(options, variableRquired){

    var keys = Object.keys(options)
    let pass = false
    for (const key of keys) {
        if (key === variableRquired) {
            pass = true
        }
    }

    if (!pass) {
        throw new Error(` 🛑  The Input: "${variableRquired}" is required`)
    }

    return options
}


module.exports.inputMandatory = inputMandatory
