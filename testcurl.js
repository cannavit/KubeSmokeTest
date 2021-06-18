const axios = require('axios');
const express = require('express');
const curlirize = require('axios-curlirize');
curlirize(axios);
async function test() {
  // initializing axios-curlirize with your axios instance

  // creating dummy route

  let response = await axios.get('https://www.keycdn.com', {
    curlirize: false,
  });
}

test();
