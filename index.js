import { getStoredJobs, storeJobs, getApiJobs } from "./services";
import bot from "./bot";
import dotenv from "dotenv";
dotenv.config();

const apiUrl = "https://api.lever.co/v0/postings/startuplifers?mode=json";
const fileName = "jobs.json";
const bucketName = "leverjobs";
const channelName = "@testikanava123";

export async function main() {
  let storedJobs;
  try {
    storedJobs = await getStoredJobs(bucketName, fileName);
  } catch (err) {
    return { statusCode: 500, body: `Error while getting stored jobs: ${err}` };
  }
  const apiJobs = await getApiJobs(apiUrl);
  const newJobs = apiJobs.filter(
    apiJob => !storedJobs.map(job => job.id).includes(apiJob.id)
  );

  if (newJobs) {
    const promises = newJobs.map(job =>
      bot.sendMessage(channelName, `${job.hostedUrl}\n\n${job.text}`)
    );
    await Promise.all(promises);
    try {
      await storeJobs(bucketName, fileName, apiJobs);
    } catch (err) {
      return { statusCode: 500, body: `Error while storing new jobs: ${err}` };
    }
  }

  return {
    statusCode: 200,
    body: {
      message: "Function invoked succesfully",
      jobsSent: newJobs
    }
  };
}
