const { evalCurl } = require('../../smktestTools/src/curlCheck');
const assert = require('assert');
const shell = require('shelljs');
const jest = require('jest');

export async function curlSingleTest(options) {
  // options = await evalCurl(options);

  //! ADD enviroment variable if not exit.
  if (!process.env.SMKTEST_ASSERT_CURL) {
    process.env['SMKTEST_ASSERT_CURL'] = options.assertCurl;
  }

  //! Run Jest Test. >>>

  const optionsJest = {
    projects: [__dirname],
    roots: [__dirname],
    // projects: ['./'],
    silent: true,
  };

  jest
    .runCLI(optionsJest, optionsJest.projects)
    .then((success) => {
      // console.log(success);
    })
    .catch((failure) => {
      console.error(failure);
    });

  //! <<<

  return options;
}
