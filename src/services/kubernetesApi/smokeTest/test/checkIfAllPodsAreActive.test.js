const assertCurl = process.env.SMKTEST_ASSERT_CURL;

test('Check if all Pods are Active ', async () => {
  //! Is possible use /api-docs
  const resultTest =
    process.env.SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE;

  let passTest =
    process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE'];
  let podName =
    process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE_POD_NAME'];
  let podStatus =
    process.env['SMKTEST_TEST_RESULTS_CHECK_IF_ALL_PODS_ARE_ACTIVE_POD_STATUS'];

  if (passTest !== 'true') {
    console.log(' ERROR IN CHECK IF ALL PODS ARE ACTIVE: ');
    console.log('passTest: ', passTest);
    console.log('podName: ', podName);
    console.log('podStatus:', podStatus);
  }

  expect(passTest).toBe('true');
});
