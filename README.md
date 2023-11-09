# Carbon Contribution Portfolio Manager (CCPM)

The Carbon Contribution Portfolio Manager (CCPM) is a web application that helps companies track their carbon emissions, set targets for reducing emissions, and manage carbon investments. 
This README.md provides an overview of the project, its technologies, and how to set it up.

## Technologies Used
Remix.run: A modern web framework for building fast and dynamic web applications.
Apollo Client: A powerful GraphQL client for making API requests.
GraphQL: A query language for your API.
graphql-codegen: A tool for generating strongly typed code from GraphQL schema and operations.
emailjs: A service for sending emails.

## Environment Variables
To get the CCPM project up and running, you will need to set up the following environment variables in your .env file:

```sh
DATABASE_URL=
SESSION_EXPIRATION_IN_SECONDS=
SESSIONS_SECRETS=
HASH_SECRET=
MAILJS_PUBLIC_KEY=
MAILJS_PRIVATE_KEY=
MAILJS_SERVICE_ID=
MAILJS_TEMPLATE_ID=

GRAPHQL_ENDPOINT=
ENABLE_EMAIL_VERIFICATION=
```

## Generating Types
To generate types for the GraphQL schema, run the following command:

```sh
npm run compile
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

4. If you've followed the setup instructions already, all you need to do is run this:

```sh
fly deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.
