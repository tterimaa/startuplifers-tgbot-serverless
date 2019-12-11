import getJobs from './getStoredJobs';
import storeJobs from './storeJobs';
import axios from 'axios';
import bot from './bot';

export async function main() {
  let res;
  try {
    res = await getJobs('startuplifersbucket', 'testJobs.json');
  } catch(err) {
    console.log(err);
  }

  const jobsStored = JSON.parse(res.Body.toString());
  const inApi = await axios.get('https://api.lever.co/v0/postings/startuplifers?mode=json');

  if(!arraysEqual(jobsStored, inApi.data)) {
      const newJobs = inApi.data.filter(jobApi => !jobsStored.map(jobStored => jobStored.id).includes(jobApi.id));

      for(let newJob of newJobs) {
        await bot.sendMessage('@testikanava123', newJob.text);
      }

      await storeJobs('startuplifersbucket', 'jobs.json', inApi.data);
  }
}

const compareId = (a,b) => a.id > b.id;

const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    a.sort(compareId);
    b.sort(compareId);

    for (let i = 0; i < a.length; ++i) {
      if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
        return false;
      }
    }
    return true;
};