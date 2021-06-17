const fs = require('fs');

async function checkPassTest() {
  var passTest = fs.readFileSync('passText.txt', 'utf8');

  if (passTest === 'false') {
    console.log();
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');
    console.log(' 🛑  ERROR: Smoke Test');
    console.log('💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥 💨 💨 💨 🔥');
    console.log();
    console.log();

    throw new Error('Failed the smoke test');
  } else {
    console.log();
    console.log(' 🟢 🚭 SUCCESS SMOKE TEST');
    console.log(' ✅ You can continue with the rest of the test suites');
    console.log();
  }
}

checkPassTest();
