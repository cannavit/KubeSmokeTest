const { checkVolumeSpace } = require('../../src/volumes');
const { sendToSmokeCollector } = require('../../../../utils/sendReport');
const chalk = require('chalk');

test('Check space free inside of volumes', async () => {
  //! Is possible use /api-docs
  var dateInit = await new Date(); // Init Time

  // Read NameSpace
  let options = process.env.SMKTEST_OPTIONS;

  options = JSON.parse(options);
  options = await checkVolumeSpace(options);

  let passTest = true;
  for (const key in options.volumeMounts) {
    let element = options.volumeMounts[key];

    if (element.use > 80) {
      passTest = false;

      console.log(
        ` 🧪 Check Volume >>>>>>> \n 🚀 POD NAME: ${element.podName} \n 📦  PATH VOLUME:  ${element.mountPath}\n \n` +
          chalk.red.bold('💾 ⚠️ Is necessary free space in volume\n') +
          chalk.red.bold('👎 ERROR KUBERNETES CLUSTER CONDITIONS\n') +
          chalk.red.bold(
            ' 🛑 Communicate that your kubernetes cluster administrator'
          )
      );

      console.log();
      console.log(chalk.red.bold(element.responseTestOriginal));
    } else {
      console.log(
        ` 🧪 Check Volume >>>>>>> \n 🚀 POD NAME: ${element.podName} \n 📦  PATH VOLUME:  ${element.mountPath}\n \n` +
          chalk.green('✅ 💾 Exist enough free space inside of the volume \n') +
          chalk.green.bold(element.responseTestOriginal)
      );
    }
  }

  var dateFinish = await new Date();
  let timeTestSeconds = (dateFinish.getTime() - dateInit.getTime()) / 1000;

  options.smokeCollector = {
    data: {
      projectName: options.projectName,
      context: options.context,
      namespace: options.namespace,
      testName: 'checkVolumeSpace',
      testResult: JSON.stringify(options.volumeMounts),
      testId: options.testId,
      testDuration: timeTestSeconds,
      passTest: passTest,
      GITLAB_USER_ID: process.env.GITLAB_USER_ID
        ? process.env.GITLAB_USER_ID
        : '',
      CI_PROJECT_URL: process.env.CI_PROJECT_URL
        ? process.env.CI_PROJECT_URL
        : '',
      CI_PROJECT_TITLE: process.env.CI_PROJECT_TITLE
        ? process.env.CI_PROJECT_TITLE
        : '',
      CI_PROJECT_NAME: process.env.CI_PROJECT_NAME
        ? process.env.CI_PROJECT_NAME
        : '',
      CI_PROJECT_ID: process.env.CI_PROJECT_ID ? process.env.CI_PROJECT_ID : '',
      CI_PIPELINE_ID: process.env.CI_PIPELINE_ID
        ? process.env.CI_PIPELINE_ID
        : '',
      CI_COMMIT_TAG: process.env.CI_COMMIT_TAG ? process.env.CI_COMMIT_TAG : '',
      CI_COMMIT_REF_NAME: process.env.CI_COMMIT_REF_NAME
        ? process.env.CI_COMMIT_REF_NAME
        : '',
      CI_COMMIT_SHA: process.env.CI_COMMIT_SHA ? process.env.CI_COMMIT_SHA : '',
      CI_COMMIT_MESSAGE: process.env.CI_COMMIT_MESSAGE
        ? process.env.CI_COMMIT_MESSAGE
        : '',
      CI_COMMIT_TITLE: process.env.CI_COMMIT_TITLE
        ? process.env.CI_COMMIT_TITLE
        : '',
      GITLAB_USER_EMAIL: process.env.GITLAB_USER_EMAIL
        ? process.env.GITLAB_USER_EMAIL
        : '',
    },
  };

  await sendToSmokeCollector(options);

  expect(passTest).toBe(true);
}, 100000);
