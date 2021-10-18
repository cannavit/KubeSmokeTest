const { getKS } = require('./connect');
const shell = require('shelljs');
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);

// async function getLogs(options) {
module.exports.getLogs = async function (options) {
  const k8sApi = await getKS();

  let namespace =
    options.customDictionary.generalOptions['--namespace'] ||
    options.testConfig.kubernetes.namespace;
  let pods = options.testConfig.kubernetes.pods;

  let logs = [];

  let logsReportText = '\n\r';

  for (const key in pods) {
    let pod = pods[key];
    let name = pod.pod;

    //TODO is necessary check how red with --since-time

    let dataLogs = await k8sApi.readNamespacedPodLog(
      name,
      namespace,
      undefined, //container
      undefined, // follow,
      undefined, //insecureSkipTLSVerifyBackend,
      undefined, // limitBytes
      true, //pretty,
      undefined, // previous
      300, // sinceSeconds  //TODO add dynamic way for get seconds
      undefined, //tailLines,
      true //timestampssss
    );

    k8sApi.readNamespacedPodL;

    let body = dataLogs.body;
    let isLogError = false;
    let logsShort;
    let wordError = '';

    if (body) {
      // Check if exist one body for process it.
      let errorList = [
        'error',
        'internal Server Error',
        'typeError',
        '[error]',
        'error in connection',
      ];
      for (const key in errorList) {
        let e = errorList[key];

        if (body.toLowerCase().includes(e)) {
          isLogError = true;
          wordError = e;
        }
        body = String(body);
      }

      // Create short logs for create report.

      try {
        logsShort =
          body.substring(0, 100) +
          ' ........... ' +
          body.substring(body.length - 100, body.length);
      } catch (error) {
        logsShort = '';
      }
    }

    logsShort = logsShort ? logsShort : '';
    logsReportText = logsReportText + 'POD: ' + name + '\n\r';
    logsReportText = logsReportText + 'ERROR : ' + isLogError + '\n\r';
    let logReport = isLogError ? body : logsShort;
    logsReportText = logsReportText + 'LOG : ' + logReport + '\n\r';
    logsReportText = logsReportText + 'errorWold : ' + wordError + '\n\r';
    logsReportText = logsReportText + ' --------- ' + wordError + '\n\r \n\r';

    logs.push({
      name: name,
      logs: body ? body : '',
      isLogError: isLogError ? isLogError : false,
      logsShort: logsShort ? logsShort : '',
      wordError: wordError,
    });
  }

  options.testConfig.kubernetes.logs = logs;
  options.testConfig.kubernetes.logs.reportText = logsReportText;

  options.responseTest = {
    getLogs: logsReportText,
  };

  return options;
};

//Using Shell Commands
// async function getLogsV2(options) {
module.exports.getLogsV2 = async function (options) {
  // options = {
  //   testConfig: {
  //     kubernetes: {
  //       namespace: 'edutelling-develop',
  //     },
  //   },
  // };

  // options = await getPods(options);

  const k8sApi = await getKS();

  let namespace = options.testConfig.kubernetes.namespace;
  let pods = options.testConfig.kubernetes.pods;

  let logs = [];

  let logsReportText = '\n\r';

  for (const key in pods) {
    let pod = pods[key];
    let name = pod.pod;

    // let response = await shell.exec(
    //   `kubectl logs ${name} --namespace=${namespace} --since=2m`,
    //   {
    //     silent: true,
    //   }
    // );

    let response = await exec(
      `kubectl logs ${name} --namespace=${namespace} --since=2m`
    );

    let isLogError = false;
    if (response.stderr !== '') {
      isLogError = true;
    }

    let body;
    let logsShort;

    if (!isLogError) {
      body = response.stdout;

      logsShort =
        body.substring(0, 100) +
        ' ........... ' +
        body.substring(body.length - 100, body.length);
    } else {
      body = response.stderr;
    }

    logsShort = logsShort ? logsShort : '';
    logsReportText = logsReportText + ' ******************' + '\n\r';
    logsReportText = logsReportText + ' >>>>> POD: ' + name + '\n\r';
    logsReportText = logsReportText + '\n\r';
    logsReportText = logsReportText + 'ERROR : ' + isLogError + '\n\r';
    let logReport = isLogError ? logsShort : body;
    logsReportText = logsReportText + 'LOG : ' + logReport + '\n\r';
    logsReportText = logsReportText + ' <<<<<<' + '\n\r \n\r';

    logs.push({
      name: name,
      logs: body ? body : '',
      isLogError: isLogError ? isLogError : false,
      logsShort: logsShort ? logsShort : '',
    });
  }

  options.testConfig.kubernetes.logs = logs;
  options.testConfig.kubernetes.logs.reportText = logsReportText;

  return options;
};
