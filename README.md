# Serverless tgbot to send jobs posting to a tg channel

1. Gets stored jobs from aws s3 bucket
2. Compares them to what's found in API (in test another s3 bucket)
3. Sends jobs that are not found from current store to telegram channel
4. Saves new data from API to the store
