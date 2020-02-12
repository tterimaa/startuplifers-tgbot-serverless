import AWS from 'aws-sdk';
import axios from 'axios';

export async function getStoredJobs(bucketName, fileName) {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});

  const params = {
    Bucket: bucketName,
    Key: fileName
  };

  try {
    const res = await s3.getObject(params).promise();
    return JSON.parse(res.Body.toString());
  } catch(err) {
    throw err;
  }
};

export async function storeJobs(bucketName, fileName, json) {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    let uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: JSON.stringify(json)
    };

    try {
      await s3.upload(uploadParams).promise();
    } catch(err) {
      throw err;
    }
};

export async function getApiJobs(url) {
    const res = await axios.get(url);
    return res.data;
};