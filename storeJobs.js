import AWS from 'aws-sdk';

export function storeJobs(bucketName, fileName, json) {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    let uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(json)
    };

    try {
      return s3.upload(uploadParams).promise();
    } catch(error) {
      console.log(error);
    }
};

export default storeJobs;