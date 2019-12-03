import AWS from 'aws-sdk';
import testapi from './mocks/testapi';

export function main(event, context, callback) {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    let uploadParams = {
      Bucket: 'startuplifersbucket',
      Key: 'testapi.json',
      Body: JSON.stringify(testapi)
    };

    s3.upload(uploadParams, function(err, data) {
      if(err) {
        console.log('Error', err);
      };
      if(data) {
        console.log('Upload success', data.Location);
      };
    });
  }