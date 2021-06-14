const jest = require('jest');

const options = {
  projects: [__dirname],
  silent: true,
};

jest
  .runCLI(options, options.projects)
  .then((success) => {
    console.log('@1Marker-No:_286971963');
    console.log(success);
  })
  .catch((failure) => {
    console.log('@1Marker-No:_-1570647636');
    console.error(failure);
  });
