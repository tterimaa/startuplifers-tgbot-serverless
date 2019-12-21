import { getStoredJobs, storeJobs, getApiJobs } from './services';
import bot from './bot';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
const apiUrl = 'https://api.lever.co/v0/postings/startuplifers?mode=json';
const fileName = 'testJobs.json';
const channelName = '@testikanava123';

export async function main(event, context) {
  let storedJobs;
  try {
    storedJobs = await getStoredJobs('startuplifersbucket', fileName);
  } catch(err) {
    return { statusCode: 500, body: `Error while getting stored jobs: ${err}` };
  }

  let apiJobs = await getApiJobs(apiUrl);
  let newJobs = apiJobs.filter(jobApi => !storedJobs.map(jobStored => jobStored.id).includes(jobApi.id));

  if(isTest) return newJobs;

  if(newJobs) {
    let promises = newJobs.map(job => bot.sendMessage(channelName, `${job.hostedUrl}\n\n${job.text}`));
    await Promise.all(promises);
    try {
       await storeJobs('startuplifersbucket', 'jobs.json', apiJobs);
    } catch(err) {
      return { statusCode: 500, body: `Error while storing new jobs: ${err}` };
    }
  }

  return { statusCode: 200, body: 'Function invoked succesfully' };
}