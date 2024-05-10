# Artwork Battle

A tiny app that makes the art pieces of the [Art Institute of Chicago](https://www.artic.edu/) battle against each other, and ranks them using an [ELO rating system](https://en.wikipedia.org/wiki/Elo_rating_system).
<br />
Made possible thanks to the Art Institute of Chicago's open [API](https://api.artic.edu).

![A few visuals of how the website looks like in mobile](./assets/Artworks%20battle%20-%20mobile%20presentation.png)


### Run the server

<strong>Prerequisites</strong>
- First, you need to have a running database. It can be local or remote (I used [CockroachDB](https://www.cockroachlabs.com/) myself).
- Then run the initialization script located here: `/api/migrations/init.sql`.
- Finally, create the file `api/.env` and set the `DATABASE_URL` variable with your database url value.


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
Your app should be running here: http://localhost:8080


### Run the client

<strong>Prerequisites</strong>
Create the file `client/.env` and copy it into `client/.env.dev`.

<strong>Installation</strong>
```
cd client
yarn install
```

<strong>Starting the client</strong>
```
cd client
yarn start
```

Happy battling! 🎨