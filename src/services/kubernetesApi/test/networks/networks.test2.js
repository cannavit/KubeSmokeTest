const { checkNetworks } = require('../../src/network');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');

const checkNetworksFromService =
  process.env.SMKTEST_CHECK_NETWORKS_FROM_SERVICE;

test(`Check Networks connections from inside of one Service : ${checkNetworksFromService}`, async () => {
  //! Is possible use /api-docs
  var dateInit = await new Date();

  let options = JSON.parse(process.env.SMKTEST_OPTIONS);

  let SMKTEST_OPTIONS_NETWORK = await process.env.SMKTEST_OPTIONS_NETWORK;

  options.networks = JSON.parse(SMKTEST_OPTIONS_NETWORK);

  console.log(options.networks.abstract);

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  //! Report for collector:

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.customDictionary.generalOptions['--namespace'],
      testName: 'networks.test',
      testResult: options.networks.abstract,
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: options.networks.passTest,
    },
  };

  await sendToSmokeCollector(options);

  expect(options.networks.passTest).toBe(true);
});
