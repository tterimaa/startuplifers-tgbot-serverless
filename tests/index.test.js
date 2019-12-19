import { main } from '../index';
import axios from 'axios'

test('New jobs equals jobs in api when store is empty', async () => {
  const jobs = await main();
  const api = await axios.get('https://api.lever.co/v0/postings/startuplifers?mode=json');
  expect(api.data.length).toEqual(jobs.length);
});