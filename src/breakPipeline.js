var fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');

async function checkPassTest() {
  var passTest = fs.readFileSync('passText.txt', 'utf8');

  console.log('SMKTEST_PASS_TEST:', passTest);
  if (passTest === 'false') {
    throw new Error(' 🛑  Failed the smoke test 💨 💨 💨 🔥');
  } else {
    console.log(chalk.red.green(' 🟢 🚭 SUCCESS SMOKE TEST'));
    console.log(
      chalk.red.green(' ✅ You can continue with the rest of the test suites')
    );
  }
}

checkPassTest();
