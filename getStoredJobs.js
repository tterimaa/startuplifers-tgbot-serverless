import AWS from 'aws-sdk';

export function main(event, context, callback) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  let params = {
    Bucket: 'startuplifersbucket',
    Key: 'jobs.json'
  };
  s3.getObject(params, function(err, data) {
    if(err) {
      console.log('Error', err);
    };
    if(data) {
      let storedJobs = JSON.parse(data.Body.toString());
      console.log('Jobs currently in s3 bucket: ', storedJobs);
      return storedJobs;
    };
  });
}