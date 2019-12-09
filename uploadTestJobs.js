import AWS from 'aws-sdk';
import testJobs from './testJobs.json';

export function main() {
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});

    let uploadParams = {
      Bucket: 'startuplifersbucket',
      Key: 'testJobs.json',
      Body: JSON.stringify(testJobs)
    };

    s3.upload(uploadParams, (err, data) => {
        if(err) {
            throw err;
        };
    });
}