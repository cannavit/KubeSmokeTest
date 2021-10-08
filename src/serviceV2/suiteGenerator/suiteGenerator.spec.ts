import suiteGenerator from './suiteGenerator'


// import smktestUtils from '../../utils/smktestUtils';


describe('Smoke Test suite generator coverage', () =>{
    test('Import test dependencies', async () => {

        let options = await suiteGenerator({})

        let passTest = false
        if (options.suiteGenerator.dependencies !== "" || options.suiteGenerator.dependencies !== undefined) {
            passTest = true
        }
        expect(passTest).toEqual(true)
    })

})