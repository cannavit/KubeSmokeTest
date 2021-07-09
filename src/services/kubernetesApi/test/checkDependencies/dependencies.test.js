const { getDependencies } = require('../../src/dependencies');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');

const checkDependenciesFromService =
  process.env.SMKTEST_CHECK_DEPENDENCIES_FROM_SERVICE;

test(`🧪 Check dependencies from inside of service ${checkDependenciesFromService}`, async () => {
  //! Is possible use /api-docs

  var dateInit = await new Date(); //?

  let passTest = false;
  let options = JSON.parse(process.env.SMKTEST_OPTIONS); //?

  let assertNumberOfDependenciesExited =
    process.env.SMKTEST_ASSERT_NUMBER_OF_DEPENDENCIES_EXITED || 'all';

  options = await getDependencies(options);

  let numberOfDependenciesExited =
    options.dependencies.result.numberOfDependenciesExited;

  let totalDependencies;
  if (assertNumberOfDependenciesExited === 'all') {
    totalDependencies = options.dependencies.result.dependencies.length;
    if (numberOfDependenciesExited === totalDependencies) {
      passTest = true;
    }
  } else {
    totalDependencies = Number(assertNumberOfDependenciesExited);
    if (numberOfDependenciesExited >= totalDependencies) {
      passTest = true;
    }
  }
  let responseLogTest;

  if (passTest) {
    responseLogTest =
      ` \n 🟢 Success Dependencies Test from ${checkDependenciesFromService} \n` +
      `  🎯 Captured ${String(
        numberOfDependenciesExited
      )} dependencies out of a total of ${String(totalDependencies)} \n`;
    console.log(responseLogTest);
  } else {
    responseLogTest =
      ` \n 🛑 Error Dependencies Test from ${checkDependenciesFromService} \n` +
      `  🎯 Captured ${String(
        numberOfDependenciesExited
      )} dependencies out of a total of ${String(totalDependencies)} \n`;
    console.log(responseLogTest);
  }

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  //! Report for collector:

  let reportData =
    responseLogTest + ' \n \n' + options.dependencies.result.netResponse;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'dependencies.test',
      testResult: reportData,
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
}, 120000);
