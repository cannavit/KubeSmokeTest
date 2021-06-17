const fs = require('fs');
const chalk = require('chalk');

async function checkPassTest() {
  var passTest = fs.readFileSync('passText.txt', 'utf8');

  console.log('SMKTEST_PASS_TEST:', passTest);
  if (passTest === 'false') {
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');
    console.log(chalk.red.bold(' 🛑  ERROR: Smoke Test'));
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');

    throw new Error('Failed the smoke test');
  } else {
    console.log(chalk.green.bold(' 🟢 🚭 SUCCESS SMOKE TEST'));
    console.log(
      chalk.bold.bold(' ✅ You can continue with the rest of the test suites')
    );
  }
}

checkPassTest();
