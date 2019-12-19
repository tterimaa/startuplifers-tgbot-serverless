import { getStoredJobs, storeJobs, getApiJobs } from './services';
import bot from './bot';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';
const apiUrl = 'https://api.lever.co/v0/postings/startuplifers?mode=json';
const fileName = 'testJobs.json';
const channelName = '@testikanava123';

export async function main() {
  let storedJobs;
  try {
    storedJobs = await getStoredJobs('startuplifersbucket', fileName);
  } catch(err) {
    console.log('Error while getting jobs ', err);
  }

  let apiJobs = await getApiJobs(apiUrl);
  let newJobs = apiJobs.filter(jobApi => !storedJobs.map(jobStored => jobStored.id).includes(jobApi.id));

  if(isTest) return newJobs;

  if(newJobs) {
    newJobs.forEach(job => {
      const message = `${job.hostedUrl}\n\n${job.text}`;
      bot.sendMessage(channelName, message);
    });
    try {
      storeJobs('startuplifersbucket', 'jobs.json', apiJobs);
    } catch(err) {
      console.log('Error while storing jobs ', err);
    }
  }
}