const base64 = require('base-64');
const axios = require('axios');

module.exports.sendToSmokeCollector = async function (options) {
  // export async function sendToSmokeCollector(options) {
  // Decode
  console.log(' 💾 SEND REPORT TO SMOKE-COLLECTOR');
  let urlSomeCollectorCoded = process.env.SMOKE_COLLECTOR;

  let data = options.smokeCollector.data;

  if (urlSomeCollectorCoded) {
    var urlSomeCollector = base64.decode(urlSomeCollectorCoded) + 'smktest';

    let result = await axios({
      method: 'post',
      url: urlSomeCollector,
      data: data,
    });

    if (result.status === 200) {
      console.log(' 📝 Send report to smoke-collector');
      console.log(' ✅ OK. send repot to ' + urlSomeCollector);
    } else {
      console.log(
        ' 🛑 ERROR. not was possible send repot to ' + urlSomeCollector
      );
    }
  }
  return options;
};

// sendToSmokeCollector();
