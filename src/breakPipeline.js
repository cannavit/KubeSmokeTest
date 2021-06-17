const fs = require('fs');
const assert = require('assert');

// const makeError = require('make-error');
// const CustomError = makeError('CustomError');
// const SpecializedError = makeError('SpecializedError', CustomError);

async function checkPassTest() {
  var passTest = fs.readFileSync('passText.txt', 'utf8');

  if (passTest === 'false') {
    console.log();

    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');
    console.log(' 🛑  ERROR: Smoke Test');
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');
    console.log();

    console.log();
    const shell = require('shelljs');
    await shell.exec('echo 0', {
      silent: false,
    });
    // throw new SpecializedError(42);

    // throw new Error('ERROR: Job failed: exit code 1');
    // throw new Error('Failed the smoke test');
  } else {
    console.log();
    console.log('Job succeeded');
    console.log(' 🟢 🚭 SUCCESS SMOKE TEST');
    console.log(' ✅ You can continue with the rest of the test suites');
    console.log();
    const shell = require('shelljs');
    await shell.exec('echo 1', {
      silent: false,
    });
  }
}

checkPassTest();
