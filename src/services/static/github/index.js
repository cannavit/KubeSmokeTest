'use strict';

const { Octokit } = require('@octokit/rest');
const querystring = require('querystring');
const axios = require('axios');

// new Buffer(); // Old
// Buffer.alloc(); // New

async function test(options) {
  console.log('@1Marker-No:_354467327');

  const octokit = new Octokit({
    auth: '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',
  }); //?

  console.log('>>>>>-651340833>>>>>');
  console.log(octokit);
  console.log('<<<<<<<<<<<<<<<<<<<');

  //Read publics repositories with mode 5 starts with octokit library

  // Get repositorie data.
  let repo = await octokit.rest.repos.get({
    owner: options.owner,
    repo: options.repo,
  }); //?

  //Get list of branches.
  let branches = await octokit.rest.repos.listBranches({
    owner: options.owner,
    repo: options.repo,
  }); //?

  // Get list of files.
  let files = await octokit.rest.pulls.listFiles({
    owner: options.owner,
    repo: options.repo,
    pull_number: options.pull_number,
  });

  // let specificFile = await octokit.rest.search.code({
  //   q: options.fileName,
  // });

  // let specificFiles2 = await octokit.rest.search.repos({
  //   q: options.fileName,
  //   language: 'Dockerfile',
  // });

  // let projectUsingTopics = await octokit.rest.search.topics({
  //   q: 'kubernetes',
  // });
}

let options = {
  owner: 'livekit',
  repo: 'livekit-server',
  pull_number: 3,
  fileName: 'Dockerfile',
  token: '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',
};

// test(options);

//Get the projects github with limit of score
// use the library octokit
// inputs: numberStart, tokenAccess
async function getProjectsUsingStar(numberStart, tokenAccess) {
  const github = new Octokit({
    auth: tokenAccess,
  });
  const projects = await github.search.repos({
    q: 'stars:>' + numberStart,
    sort: 'stars',
    order: 'desc',
    per_page: 100,
  });

  return projects;
}

// getProjectsUsingStar(350384, options.token);

// Filter document with specific file
// https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-code

// Get projects on github that contain a specific file inside
// use the library octokit
// inputs: fileName, tokenAccess
async function getProjectsUsingFile(fileName, tokenAccess) {
  //
  const github = new Octokit({
    auth: tokenAccess,
  });

  const projects = await github.search.code({
    q: 'filename:' + fileName,
    sort: 'stars',
    order: 'desc',
    per_page: 100,
  });

  let totalCount = projects.data.total_count;
  console.log(totalCount);

  let example = projects.data.items[9];
  console.log(example);
  // console.log(totalCount);
  // console.log(projects.data);

  // console.log(example.html_url);

  return projects;
}

// getProjectsUsingFile('Dockerfile', options.token);

// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess
async function getProjectsUsingFileContent(fileName, tokenAccess) {
  //
  const github = new Octokit({
    auth: tokenAccess,
  });

  const projects = await github.search.code({
    q: 'filename:' + fileName,
    // q: 'filename:' + fileName + '&&stars:>10',
    sort: 'stars',
    order: 'desc',
    per_page: 100,
  });

  // console.log(projects.data);

  let example = projects;

  for (const key in projects.data.items) {
    let items = projects.data.items[key];
    let fileContent = await getFilesFromUrl(items.git_url);

    console.log('>>>>>1253360499>>>>>');
    console.log(fileContent);
    console.log('<<<<<<<<<<<<<<<<<<<');
  }

  return projects;
}

// Get response of one api using axios and GET request.
function getFilesFromUrl(url) {
  return axios.get(url).then((response) => {
    let fileContent = convertBase64ToString(response.data.content);

    return fileContent;
  });
}

// Convert base64 to string
async function convertBase64ToString(base64) {
  return new Buffer(base64, 'base64').toString();
}

getProjectsUsingFileContent('Dockerfile', options.token);
