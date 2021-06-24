const base64 = require('base-64');
const axios = require('axios');

module.exports.sendToSmokeCollector = async function (options) {
  // export async function sendToSmokeCollector(options) {
  // Decode
  let urlSomeCollectorCoded = process.env.SMOKE_COLLECTOR;
  let data = options.smokeCollector.data;

  console.log(
    ' 💾 SEND REPORT TO SMOKE_COLLECTOR \n' +
      ' 💾 Code address: ' +
      urlSomeCollectorCoded +
      '\n \n'
  );

  if (urlSomeCollectorCoded) {
    var urlSomeCollector = base64.decode(urlSomeCollectorCoded) + 'smktest';

    console.log(' 📬 Decode Address: ' + urlSomeCollector + '\n');

    let result = await axios({
      method: 'post',
      url: urlSomeCollector,
      data: data,
      curlirize: false,
    });

    if (result.status === 200) {
      console.log(
        ' 📝 Send report to smoke-collector \n' +
          ' ✅ OK. send repot to ' +
          urlSomeCollector +
          '\n'
      );
    } else {
      console.log(
        ' 🛑 ERROR. not was possible send repot to ' + urlSomeCollector
      );
    }
  }
  return options;
};

// sendToSmokeCollector();
