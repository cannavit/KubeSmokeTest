const shell = require('shelljs');

require('dotenv').config();

const swaggerSmktest = require('swagger-smktest');

async function initDependencies(options) {
  //Get environment variables.

  let SMKTEST_CURL_DEPENDENCIES = options.msg.SMKTEST_CURL_DEPENDENCIES.replace(
    '$SMKTEST_CURL_LOGIN',
    options.msg.token
  );

  console.log('>>>>>-549535235>>>>>');
  console.log(options.msg.token);
  console.log('<<<<<<<<<<<<<<<<<<<');

  console.log(
    ` \n ℹ️  Parallel Script Depenencies CURL: \n \n ${SMKTEST_CURL_DEPENDENCIES} \n`
  );

  try {
    await shell.exec(SMKTEST_CURL_DEPENDENCIES, {
      silent: false,
    });
  } catch (error) {
    console.log('🐞 ERROR :' + error.message);
    console.log('Try to execute dependencies using token CURL ');
    console.log(
      `\n ℹ️  Parallel Script dependencies CURL: \n \n ${SMKTEST_CURL_LOGIN} \n`
    );

    try {
      await shell.exec(options.msg.SMKTEST_CURL_LOGIN, {
        silent: false,
      });
    } catch (error) {
      console.log(' 🛑 ERROR: ', error.message);
    }
  }

  return options;
}

process.on('message', (msg) => {
  let options = {
    msg: msg,
  };
  if (msg.runCurl) {
    setTimeout(async () => {
      options = await initDependencies(options);
    }, 5000);
  }
});
