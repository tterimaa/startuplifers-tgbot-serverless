import { getStoredJobs, storeJobs, getApiJobs } from './services';
import bot from './bot';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
const apiUrl = 'https://api.lever.co/v0/postings/startuplifers?mode=json';
const fileNameToFetch = isTest ? 'testJobs.json' : 'jobs.json';
const fileNameToUpload = 'jobs.json';
const bucketName = 'startuplifersbucket';
const channelName = '@testikanava123';

export async function main() {
  let storedJobs;
  try {
    storedJobs = await getStoredJobs(bucketName, fileNameToFetch);
  } catch(err) {
    return { statusCode: 500, body: `Error while getting stored jobs: ${err}` };
  }
  const apiJobs = await getApiJobs(apiUrl);
  const newJobs = apiJobs.filter(apiJob => !storedJobs.map(job => job.id).includes(apiJob.id));
  console.log('api jobs: ' + apiJobs.length);
  console.log('new jobs: ' + newJobs.length);
  if(isTest) return newJobs;

  if(newJobs) {
    const promises = newJobs.map(job => bot.sendMessage(channelName, `${job.hostedUrl}\n\n${job.text}`));
    await Promise.all(promises);
    try {
       await storeJobs(bucketName, fileNameToUpload, apiJobs);
    } catch(err) {
      return { statusCode: 500, body: `Error while storing new jobs: ${err}` };
    }
  }

  return { statusCode: 200, body: 'Function invoked succesfully' };
}