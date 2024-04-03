const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // get input values
  const bucket = core.getInput('bucket');
  const bucketRegion = core.getInput('bucket-region');
  const distFolder = core.getInput('dist-folder');

  // upload files to s3
  exec.exec('aws', ['s3', 'sync', distFolder, `s3://${bucket}`, '--region', bucketRegion]);

  const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl);
}

run();