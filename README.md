# Artworks Battle

A tiny App that makes the art pieces of the [Art Institute of Chicago](https://www.artic.edu/) battle against each other, and rank them using an [ELO rating system](https://en.wikipedia.org/wiki/Elo_rating_system).
<br />
Made possible thanks to the Art Institute of Chicago's [open API](https://api.artic.edu)

![A few visuals of how the website looks like in mobile](./assets/Artworks%20battle%20-%20mobile%20presentation.png)


### Run the server

<strong>prerequiste</strong>
- First, you need to have a running database, it can be local or remote (I used [CockroachDB](https://www.cockroachlabs.com/) myself)
- Then you must run the initialization script located here: `/api/migrations/init.sql`
- Finally, create `api/.env` and create the `DATABASE_URL` variable with your database url for value


<strong>Installation</strong>
```
cd api
yarn install
```

<strong>Starting the API</strong>
```
cd api
yarn start
```
Your App should be running here: http://localhost:8080


### Run the client

<strong>Prerequiste</strong>
Create the file `client/.env` and copy into it the content of `client/.env.dev`

<strong>Installation</strong>
```
cd client
yarn install
```

<strong>Starting the Client</strong>
```
cd client
yarn start
```