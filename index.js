import getJobs from './getStoredJobs';

export async function main(event, context, callback) {
    // Get stored jobs
    const jobs = await getJobs('startuplifersbucket', 'jobs.json');
    console.log('index.js', JSON.parse(jobs.Body.toString()));
    // Get jobs from api
    // Compare
    // Send changed job postings to tg channel
}