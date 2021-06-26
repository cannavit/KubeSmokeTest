const { checkNetworks } = require('../../src/network');

const checkNetworksFromService =
  process.env.SMKTEST_CHECK_NETWORKS_FROM_SERVICE;

test(`Check Networks connections from inside of one Service : ${checkNetworksFromService}`, async () => {
  //! Is possible use /api-docs

  let SMKTEST_OPTIONS_NETWORK = await process.env.SMKTEST_OPTIONS_NETWORK;

  let options = JSON.parse(SMKTEST_OPTIONS_NETWORK);

  console.log(options.abstract);

  expect(options.passTest).toBe(true);
});
