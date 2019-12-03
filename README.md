# Serverless tgbot to send jobs posting to a tg channel

1. Gets stored jobs from aws s3 bucket
2. Compares them to what's found in API (in test another s3 bucket)
3. Sends jobs that are not found from current store to telegram channel
4. Saves new data from API to the store

### To-do

- Get jobs from api (for now from s3 testapi.json)
- Compare function
- Test that compare works
- Initialize tg bot
- Test tg bot
- Write tests
- Deploy index.js function (fire with http get)
- Schedule index.js using CloudWatch events
