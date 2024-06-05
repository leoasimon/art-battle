# Artwork Battle

A tiny app that makes the [Art Institute of Chicago®](https://www.artic.edu/) art pieces battle against each other and ranks them using an [ELO rating system](https://en.wikipedia.org/wiki/Elo_rating_system).
<br />

Made possible thanks to the open [API](https://api.artic.edu) of the Art Institute of Chicago®

### What it looks like
![A few visuals of how the website looks like in mobile](./assets/Artworks%20battle%20-%20mobile%20presentation.png)


### Run locally

<strong>Prerequisites</strong>
To run the project locally or deploy it yourself, you'll need a running SQL database and a table with the correct models.

1. <strong>Set up a database</strong>
It can be remote (I used [CockroachDB](https://www.cockroachlabs.com/) myself), but if you prefer to run it locally, here's a [step-by-step guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) on how to do it with PostgreSQL on Windows, Linux, and Mac.
2. <strong>Add your connection string to the env</strong>
create the file `api/.env` and set the `DATABASE_URL` variable with your database url value:
`DATABASE_URL=<your_connection_string>`
3. <strong>Create the score table</strong> 
For this step, you need to run the following command:
`npx prisma migrate dev`
4. <strong>Optional: populate your database with some data</strong>
Optionally, you can populate your database with some fake data by running this command:
`npx prisma seed`

With your database running and your score table created, it's now time to run the App!


<strong>Installation</strong>
Install the project dependencies by running:
`yarn install`

<strong>Starting the application in development</strong>
This project uses netlify and netlify functions, to start the development server, just run:
`yarn start`

If everything went well, you should now have an app running at http://localhost:8888

<br />
Happy battling! 🎨