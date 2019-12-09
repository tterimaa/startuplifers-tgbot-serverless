import getJobs from './getStoredJobs';
import storeJobs from './storeJobs';
import axios from 'axios';
import bot from './bot';

export async function main(event, context, callback) {
    // Get stored jobs
    const res = await getJobs('startuplifersbucket', 'testJobs.json');
    let jobsStored;
    console.log(res);
    res ? jobsStored = JSON.parse(res.Body.toString())
    : jobsStored = [];
    console.log(jobsStored);
    // Get jobs from api
    const inApi = await axios.get('https://api.lever.co/v0/postings/startuplifers?mode=json');
    // Compare
    if(!arraysEqual(jobsStored, inApi.data)) {
        console.log('Arrays not equal');
        const newJobs = inApi.data.filter(jobApi => !jobsStored.map(jobStored => jobStored.id).includes(jobApi.id));

        for(let newJob of newJobs) {
          await bot.sendMessage('@testikanava123', newJob.text);
        }
    } else console.log('arrays equal');
    console.log(inApi.data.map(j => j.text));
    await storeJobs('startuplifersbucket', 'jobs.json', inApi.data);
    // Send changed job postings to tg channel
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