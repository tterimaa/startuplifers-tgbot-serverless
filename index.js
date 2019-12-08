import getJobs from './getStoredJobs';
import storeJobs from './storeJobs';
import axios from 'axios';

export async function main(event, context, callback) {
    // Get stored jobs
    const res = await getJobs('startuplifersbucket', 'jobs.json');
    const jobs = JSON.parse(res.Body.toString());
    // Get jobs from api
    const inApi = await axios.get('https://api.lever.co/v0/postings/startuplifers?mode=json');
    // Compare
    if(!arraysEqual(jobs, inApi.data)) {
        console.log('Arrays not equal');
    } else console.log('arrays equal');
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