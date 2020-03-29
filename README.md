# Telegram bot for Startuplifers

Telegram bot that sends new job postings to a publicly available Telegram channel.

The app fetches a json file from api and compares it to the one stored in a s3 bucket. If there is difference between the two i.e. new job postings, the app sends the new jobs to the channel and saves the new json file to the s3 bucket.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

Clone the project: `git clone https://github.com/tterimaa/startuplifers-tgbot-serverless.git`

Install the dependencies: `npm install`

Install [serverless framework](https://serverless.com/): `npm i serverless`

You need to have [awscli](https://aws.amazon.com/cli/) installed. With debian linux use `sudo apt install awscli`

### Setup AWS

If you want to create an own IAM user for the bot, you need to grant the following permissions:
* AmazonS3FullAccess
* AWSCloudFormationFullAccess
* AmazonAPIGatewayAdministrator
* IAMFullAccess
* AWSLambdaFullAccess

After configuring awscli you need to **create a s3 bucket**, name it according to environment variable **BUCKET_NAME** and add **jobs.json** to the bucket. jobs.json must initially contain an **empty array []**. After the first execution this file will contains the previous state of the json file in the API.

### Setup Telegram

You need to create a new Telegram bot or use an existing one. New bot can easily be created messaging BotFather in Telegram with message `/newbot`. After creating a bot you obtain a bot token.

Create a Telegram channel and add your bot to the channel as an admin.

### Start the project

Before starting you need to create .env file containing:

```
TOKEN=your-token
BUCKET_NAME=your-bucket-name
```

Now everything should be set up. Start the project using: `npm start`

## Running the tests

Run tests using `npm run test`.

The tests are uploading files into s3, so it takes a while to run. After uploading something into the bucket it runs the index.js, thus the json file in the bucket is always left with the most recent jobs. Tests are overwriting the same file 'jobs.json' that is also used in production.

Tests could be improved to use their own file to make sure there is no interference between the tests and the production application.

## Deployment

Deploy the project with: `npm run deploy`

By default the function is set up to run every 24h after the deployment and you can also test your deployment manually using HTTP endpoint, which you get after the deployment.

These settings can be changed from the configuration file serverless.yml:

```
events:
      - http:
          method: get
          path: index
      - schedule: rate(24 hours)
```



