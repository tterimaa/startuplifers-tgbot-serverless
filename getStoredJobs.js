import AWS from 'aws-sdk';

export function getJobs(bucketName, fileName) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const params = {
    Bucket: bucketName,
    Key: fileName
  };
  try {
    return s3.getObject(params).promise();
  } catch(error) {
    console.log(error);
  }
};

export default getJobs;