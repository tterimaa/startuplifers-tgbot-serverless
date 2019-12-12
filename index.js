import { getJobs, storeJobs } from './services';
import axios from 'axios';
import bot from './bot';

export async function main() {
  let res;
  try {
    res = await getJobs('startuplifersbucket', 'testJobs.json');
  } catch(err) {
    console.log('Error while getting jobs', err);
  }

  const jobsStored = JSON.parse(res.Body.toString());
  const inApi = await axios.get('https://api.lever.co/v0/postings/startuplifers?mode=json');

  const newJobs = inApi.data.filter(jobApi => !jobsStored.map(jobStored => jobStored.id).includes(jobApi.id));

  if(newJobs) {
    for(let newJob of newJobs) {
      await bot.sendMessage('@testikanava123', newJob.text);
    }
    await storeJobs('startuplifersbucket', 'jobs.json', inApi.data);
  }
}