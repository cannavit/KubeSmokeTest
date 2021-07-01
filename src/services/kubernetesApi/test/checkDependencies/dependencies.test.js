const { getDependencies } = require('../../src/dependencies');

const checkDependenciesFromService =
  process.env.SMKTEST_CHECK_DEPENDENCIES_FROM_SERVICE;

test(`🧪 Check dependencies from inside of service ${checkDependenciesFromService}`, async () => {
  //! Is possible use /api-docs

  let passTest = false;
  let options = JSON.parse(process.env.SMKTEST_OPTIONS);

  let assertNumberOfDependenciesExited =
    process.env.SMKTEST_ASSERT_NUMBER_OF_DEPENDENCIES_EXITED || 'all';

  options = await getDependencies(options);

  if (assertNumberOfDependenciesExited === 'all') {
    if (
      options.dependencies.result.netResponse === options.dependencies.length
    ) {
      passTest = true;
    }
  } else {
    if (
      options.dependencies.result.netResponse ===
      Number(assertNumberOfDependenciesExited)
    ) {
      passTest = true;
    }
  }

  console.log('>>>>>479816951>>>>>');
  console.log(assertNumberOfDependenciesExited);
  console.log(options.dependencies.result.netResponse);
  console.log('<<<<<<<<<<<<<<<<<<<');

  expect(passTest).toBe(true);
}, 3000000);
