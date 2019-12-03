import AWS from 'aws-sdk';

export function getJobs(bucketName, fileName) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const params = {
    Bucket: bucketName,
    Key: fileName
  };

  return s3.getObject(params, err => {
    if(err) {
      console.log(err);
    };
  }).promise();
}

export default getJobs;