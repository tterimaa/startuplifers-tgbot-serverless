import AWS from 'aws-sdk';

export function getJobs(bucketName, fileName) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const params = {
    Bucket: bucketName,
    Key: fileName
  };

  try {
    return s3.getObject(params).promise();
  } catch(err) {
    throw err;
  }
};

export function storeJobs(bucketName, fileName, json) {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    let uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(json)
    };

    try {
      return s3.upload(uploadParams).promise();
    } catch(err) {
      throw err;
    }
};