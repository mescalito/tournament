



# Tournament System

This app saves game results and ranks players according to their wins & losses.

The app follows the **Separation of concerns** software architecture design pattern.

The app is a ReactJSin the frontend, NodeJS in the backend, and docker for provisioning.

**Prerequisites**

 - Docker
 - Docker compose
```
$ sudo apt-get update
```
```
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
 - Make these ports available: 3306, 7000, 3000. They are needed for the apps to run.

## Easy Setup 1,2,3...done!

1. Download the repo
```
$: git clone git@github.com:mescalito/tournament.git
```

Note that the repo is HUGE because the node_modules folder is present (twice). I know, right!

 2. Run:
```
$: cd tournament/
````

3. Run:
```
$: docker-compose up
```

You are good to go. Open your browser and navigate to:

# FrontEnd 🤙
[http://localhost:3000](http://localhost:3000)
- ReactJS 
- Redux
- Redux-Thunk
````
    "scripts": { 
	    "start": "react-scripts start",
	    "build": "react-scripts build",
	    "test": "react-scripts test --env=jsdom",
	    "eject": "react-scripts eject"
    }
````
 
 Repository:
 [https://github.com/mescalito/tournament_frontend/tree/ping-pong](https://github.com/mescalito/tournament_frontend/tree/ping-pong)

# BackEnd API 🤘

[http://localhost:7000/api-explorer](http://localhost:7000/api-explorer)

- express
- mysql
- pino
- swagger-express-middleware
- Babel
- eslint
- prettier
- Mocha
- nodemon

````
"scripts": {
	"start": "node dist/index.js",
	"compile": "babel server --out-dir dist --delete-dir-on-start --source-maps inline --copy-files",
	"dev": "nodemon server --exec babel-node --config .nodemonrc.json | pino-pretty",
	"dev:debug": "nodemon server --exec babel-node --config .nodemonrc.json --inspect | pino-pretty",
	"test": "mocha --require @babel/register --exit",
	"test:debug": "mocha --require @babel/register --inspect-brk --exit",
	"lint": "eslint -c .eslintrc.json {server,test}/**",
	"lint:fix": "eslint --fix -c .eslintrc.json {server,test}/**"
}
````

````
backend/server/config/dbconfig.js
     {
     host:  'db', // <-------- **VERY IMPORTANT** coming from docker-compose.yml!!!!
     user:  'root',
     password:  'root',
     database:  'tournament',
     }
````

Repository:
[https://github.com/mescalito/tournament_backend](https://github.com/mescalito/tournament_backend)


# Docker Containers 🚚
## 1. Mysql
- Container Name: **mysql8**
- User:root
- Pw: root
- Port: 3306

(Just remember to make sure port 3306 is available when running docker-compose)

## 2. Backend
- Container Name: **mysql8**
- Port 7000
## 3. Frontend
- Container Name: **react**
- Port 3000

# Stored Procedure 🧠

**Payload**:

    player1: Charlie  
    player2: Nico  
    player1Score: 5  
    player2Score: 9

**Duties**:

 1. Check if the player with name "Charlie" already exists, if not then
    `create it: INSERT INTO ' players'  (' name' ) VALUES ('Charlie');`
 1. Then grabs newly created ID
 1. Check if the player with name "Sofia" already exists, if already exist then grab Sofia's ID
 1. Insert into Games `INSERT INTO ' tournament' .' games'  (' player1id' , ' player2id' , ' player1Score' , ' player2Score' ) VALUES ({Sofia'sID},
    {Chalie'sID}, '9', '5');`
 1. the player with the highest score is always inserted into column games.player1id. In other words, the column Player1Id will always contain the winners.

**SP:**

	CREATE DEFINER=`root`@`%` PROCEDURE `resultsGame`(player1 VARCHAR(45), player2 VARCHAR(45), player1Score tinyint, player2Score tinyint)
    BEGIN
    DECLARE player1ID INT;
    DECLARE player2ID INT;
    DECLARE pGameId INT;
    
    if exists(select * from players where name = player1) then
    select id into player1ID from players where name = player1;
    else
    insert into players(id, name) values (id, player1);
    SELECT LAST_INSERT_ID() INTO player1ID;
    end if;
    
    if exists(select * from players where name = player2) then
    select id into player2ID from players where name = player2;
    else
    insert into players(id, name) values (id, player2);
    SELECT LAST_INSERT_ID() INTO player2ID;
    end if;
    
    if player1Score >= player2Score then
    insert into games (player1id, player2id, player1Score, player2Score)
    values (player1ID, player2ID, player1Score, player2Score);
    else
    insert into games (player1id, player2id, player1Score, player2Score)
    values (player2ID, player1ID, player2Score, player1Score);
    end if;
    
    SELECT LAST_INSERT_ID() INTO pGameId;
    select g.id, p1.name player1name, p2.name player2name, g.player1Score, g.player2Score, g.date
    from games g
    inner join players p1 on g.player1id = p1.id
    inner join players p2 on g.player2id = p2.id
    where g.id = pGameId;
    END

## UI

API Swagger: [http://localhost:7000/api-explorer](http://localhost:7000/api-explorer)
![enter image description here](https://i.ibb.co/6NTDHy4/backend.png)

Frontend: [http://localhost:3000](http://localhost:3000)
![enter image description here](https://i.ibb.co/1mVySws/frontend.png)

## TODO 🤨

FrontEnd & backend
- Migrate code to async await
- Minify and bundling for production-ready

Frontend:

- Migrate to react hooks
- Add formik, styled-components and yup to improve UI and UX validation

Backend

- User ORM (sequalize?)
- Include Istambul for 100% code coverage
- TTD with Jest or Mocha
- Deploy to microservice in AWS.
- Use Joi library for Swagger autovalidation
- Couple endpoints with swagger spec for validation and improve gaints code injection

General:
- Remove node_modules from repo by improving dockerfile (container) to 'npm install'.
